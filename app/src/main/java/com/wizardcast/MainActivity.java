package com.wizardcast;

import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.MediaRouteActionProvider;
import android.support.v7.media.MediaRouteSelector;
import android.support.v7.media.MediaRouter;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.Toast;

import com.google.android.gms.cast.ApplicationMetadata;
import com.google.android.gms.cast.Cast;
import com.google.android.gms.cast.CastDevice;
import com.google.android.gms.cast.CastMediaControlIntent;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;

import java.io.IOException;

public class MainActivity extends ActionBarActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private static final String APP_ID = "5F455926";
    private GLSurfaceView glSurfaceView;
    private MediaRouter mMediaRouter;
    private MediaRouteSelector mMediaRouteSelector;
    private MediaRouter.Callback mMediaRouterCallback;
    private CastDevice mSelectedDevice;
    private ImageButton mBtnExit;
    private ImageButton mBtnStart;
    private ImageButton mBtnCast;
    private GoogleApiClient mApiClient;
    private Cast.Listener mCastClientListener;
    private GoogleApiClient.ConnectionCallbacks mConnectionCallbacks;
    private GoogleApiClient.OnConnectionFailedListener mConnectionFailedListener;
    private Cast.Listener mCastListener;
    private boolean mWaitingForReconnect;
    private WizCastChannel mWizCastChannel;
    private boolean mApplicationStarted;
    //private RealTimeMultiplayer mGameChannel;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //turn off window title bar
        //requestWindowFeature(Window.FEATURE_NO_TITLE);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_menu);

        mBtnExit = (ImageButton) findViewById(R.id.btnExit);
        mBtnStart = (ImageButton) findViewById(R.id.btnStart);
        mBtnCast = (ImageButton) findViewById(R.id.castButton);

        // Fullscreen mode
        //getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        /*
        ActionBar actionBar = getSupportActionBar();
        actionBar.setBackgroundDrawable(new ColorDrawable(
                android.R.color.transparent
        ));
        */

        //Start button
        mBtnStart.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startGame();
            }
        });

        mMediaRouter = MediaRouter.getInstance(getApplicationContext());
        mMediaRouteSelector = new MediaRouteSelector.Builder()
                .addControlCategory(CastMediaControlIntent.categoryForCast(APP_ID))
                .build();
        mMediaRouterCallback = new MyMediaRouterCallback();
    }

    private void startGame() {
        //Intent intent = new Intent(getBaseContext(), CastActivity.class);
        //startActivity(intent);
        if(mApiClient == null || !mApiClient.isConnected()) {
            Toast.makeText(MainActivity.this, "Not Connected to Chromecast", Toast.LENGTH_SHORT).show();
        } else {
            sendMessage("TEST");
        }

    }
/*
    @Override
    protected void onStart() {
        super.onStart();

        mMediaRouter.addCallback(mSelector, mMediaRouterCallback,
                MediaRouter.CALLBACK_FLAG_PERFORM_ACTIVE_SCAN);
                //MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY);

        MediaRouter.RouteInfo route = mMediaRouter.updateSelectedRoute(mSelector);
        //do something with route
    }
*/
    @Override
    protected void onPause() {
        //if (isFinishing())
            mMediaRouter.removeCallback(mMediaRouterCallback);

        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();

        // Add the callback to start device discovery
        mMediaRouter.addCallback(mMediaRouteSelector, mMediaRouterCallback,
                MediaRouter.CALLBACK_FLAG_PERFORM_ACTIVE_SCAN);
    }

    @Override
    protected void onStop() {
        super.onStop();

        mMediaRouter.removeCallback(mMediaRouterCallback);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);

        //CAST BUTTON ON ACTION BAR
        MenuItem mediaRouteMenuItem = menu.findItem(R.id.media_route_menu_item);
        MediaRouteActionProvider mediaRouteActionProvider =
                (MediaRouteActionProvider) MenuItemCompat.getActionProvider(mediaRouteMenuItem);

        mediaRouteActionProvider.setRouteSelector(mMediaRouteSelector);

        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }


    /**
     * Tear down connection to the receiver
     */
    private void tearDown() {
        Log.d(TAG, "tearDown");
        if (mApiClient != null) {
            if (mApplicationStarted) {
                if (mApiClient.isConnected()) {
                    try {
                        Cast.CastApi.stopApplication(mApiClient);
                        if (mWizCastChannel != null) {
                            Cast.CastApi.removeMessageReceivedCallbacks(
                                    mApiClient, mWizCastChannel.getNamespace()
                            );
                            mWizCastChannel = null;
                        }
                    } catch (IOException e) {
                        Log.e(TAG, "Exception while removing channel", e);
                    }
                    mApiClient.disconnect();
                }
                mApplicationStarted = false;
            }
            mApiClient = null;
        }
        mSelectedDevice = null;
        mWaitingForReconnect = false;
    }

    /**
     * Launch the receiver app
     */
    private void launchReceiver() {
        try {
            mCastListener = new Cast.Listener() {
                @Override
                public void onApplicationDisconnected(int statusCode) {
                    Log.d(TAG, "application has stopped");
                    tearDown();
                }
            };
            mConnectionCallbacks = new ConnectionCallbacks();
            mConnectionFailedListener = new ConnectionFailedListener();
            Cast.CastOptions.Builder apiOptionsBuilder = Cast.CastOptions
                    .builder(mSelectedDevice,   mCastListener);
            mApiClient = new GoogleApiClient.Builder(this)
                    .addApi(Cast.API, apiOptionsBuilder.build())
                    .addConnectionCallbacks(mConnectionCallbacks)
                    .addOnConnectionFailedListener(mConnectionFailedListener)
                    .build();
            mApiClient.connect();

        } catch (Exception e) {
            Log.e(TAG, "Failed launchReceiver", e);
        }
    }

    /**
     * Sends Messages to the receiver
     * @param message
     */
    private void sendMessage(String message) {
        if (mApiClient != null && mWizCastChannel != null) {
            try {
                Cast.CastApi.sendMessage(
                        mApiClient, mWizCastChannel.getNamespace(), message
                ).setResultCallback(new ResultCallback<Status>() {
                    @Override
                    public void onResult(Status status) {
                        if (!status.isSuccess()) {
                            Log.e(TAG, "Sending message failed");
                        }
                    }
                });
            } catch (Exception e) {
                Log.e(TAG, "Exception while sending message", e);
            }

        } else {

            //Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
        }

    }

    /**
     * Google Play services Callbacks
     */
    private final class ConnectionCallbacks implements GoogleApiClient.ConnectionCallbacks {

        @Override
        public void onConnected(Bundle connectionHint) {
            Log.d(TAG, "onConnected");

            if (mApiClient == null) {
                // We got disconnected while this runnable was pending
                // execution.
                return;
            }

            try {
                if (mWaitingForReconnect) {
                    mWaitingForReconnect = false;

                    //check if receiver app is still running
                    if ((connectionHint != null) && connectionHint.getBoolean(Cast.EXTRA_APP_NO_LONGER_RUNNING)) {
                        Log.d(TAG, "App is no longer running");
                        tearDown();
                    } else {
                        //re-create the custom message channel
                        try {
                            Cast.CastApi.setMessageReceivedCallbacks(
                                    mApiClient, mWizCastChannel.getNamespace(), mWizCastChannel
                            );
                        } catch (IOException e) {
                            Log.e(TAG, "Exception while creating channel", e);
                        }
                    }
                } else {
                    //Launch the reciever app
                    Cast.CastApi.launchApplication(
                            mApiClient, APP_ID, false
                    ).setResultCallback(new ResultCallback<Cast.ApplicationConnectionResult>() {
                        @Override
                        public void onResult(Cast.ApplicationConnectionResult result) {
                            Status status = result.getStatus();
                            Log.d(TAG, "ApplicationConnectionResultCallback.onResultL statusCode"
                                + status.getStatusCode());
                            if (status.isSuccess()) {
                                ApplicationMetadata applicationMetadata = result.getApplicationMetadata();
                                String sessionId = result.getSessionId();
                                String applicationStatus = result.getApplicationStatus();
                                boolean wasLaunched = result.getWasLaunched();
                                Log.d(TAG, "application name:" + applicationMetadata.getName()
                                            + ", status: "
                                            + applicationStatus
                                            + ", sessionId: "
                                            + sessionId
                                            + ", wasLaunched: "
                                            + wasLaunched);
                                mApplicationStarted = true;

                                // create the custom message channel

                                mWizCastChannel = new WizCastChannel();

                                try {
                                    Cast.CastApi.setMessageReceivedCallbacks(
                                            mApiClient, mWizCastChannel.getNamespace(),
                                            mWizCastChannel );

                                } catch (IOException e) {
                                    Log.e(TAG, "Exception while creating channel", e);
                                }

                                // set the initial instructions on the receiver
                                sendMessage(getString(R.string.instructions));
                            } else {
                                Log.e(TAG, "application could not launch");
                                tearDown();
                            }
                        }
                    });
                }
            } catch (Exception e) {
                Log.e(TAG, "Failed to launch applecation", e);
            }
        }

        @Override
        public void onConnectionSuspended(int i) {
            Log.d(TAG, "onConnectionSuspended");
            mWaitingForReconnect = true;

        }
    }

    private class ConnectionFailedListener implements GoogleApiClient.OnConnectionFailedListener {
        @Override
        public void onConnectionFailed(ConnectionResult connectionResult) {
            Log.e(TAG, "onConnectionFailed");

            tearDown();
        }
    }

    private final class MyMediaRouterCallback extends MediaRouter.Callback {
        @Override
        public void onRouteSelected(MediaRouter router, MediaRouter.RouteInfo route) {
            //super.onRouteSelected(router, route);
            Log.d(TAG, "onRouteSelected");
            mSelectedDevice = CastDevice.getFromBundle(route.getExtras());

            Toast.makeText(MainActivity.this, "CONNECTING", Toast.LENGTH_SHORT).show();
            launchReceiver();
            //String routeId = route.getId();
        }

        @Override
        public void onRouteUnselected(MediaRouter router, MediaRouter.RouteInfo route) {
            //super.onRouteUnselected(router, route);
            Log.d(TAG, "onRouteUnselected: info=" + route);
            tearDown();
            mSelectedDevice = null;
        }
    }

    class WizCastChannel implements Cast.MessageReceivedCallback {

        /**
         * @return custom namespace
         */
        public String getNamespace() {
            return getString(R.string.namespace);
        }

        @Override
        public void onMessageReceived(CastDevice castDevice, String namespace, String message) {
            Log.d(TAG, "onMessageReceived: " + message);
        }
    }


}
