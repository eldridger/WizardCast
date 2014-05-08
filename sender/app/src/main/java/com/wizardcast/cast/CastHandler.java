package com.wizardcast.cast;

import android.content.Context;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.support.v7.media.MediaRouteSelector;
import android.support.v7.media.MediaRouter;
import android.util.Log;
import android.widget.ImageButton;

import com.google.android.gms.cast.ApplicationMetadata;
import com.google.android.gms.cast.Cast;
import com.google.android.gms.cast.CastDevice;
import com.google.android.gms.cast.CastMediaControlIntent;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.wizardcast.R;

import org.json.JSONObject;

import java.io.IOException;

/**
 * Created by eldri_000 on 3/27/14.
 */
public class CastHandler extends MediaRouter.Callback {
    private static final String TAG = "CastHandler";
    private static CastHandler mInstance;

    /**
     * APP ID received from registering with Google
     */
    private static final String APP_ID = "5F455926";     //Ryan
    //private static final String APP_ID = "0412A5C4";  //Joe
    private Context mContext;
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

    synchronized public static CastHandler getInstance(Context context) {
        if (mInstance == null) {
            mInstance = new CastHandler(context);
        }
        return mInstance;
    }

    private CastHandler(Context context) {
        mContext = context;

        mMediaRouter = MediaRouter.getInstance(mContext);
        mMediaRouteSelector = new MediaRouteSelector.Builder()
                .addControlCategory(CastMediaControlIntent.categoryForCast(APP_ID))
                .build();
        mMediaRouterCallback = new MyMediaRouterCallback();

        mMediaRouter.addCallback(mMediaRouteSelector, mMediaRouterCallback,
                MediaRouter.CALLBACK_FLAG_PERFORM_ACTIVE_SCAN);
    }

    /**
     * Sends message with default command
     * @param message
     */
    public void sendMessage(String message) {
        //This doesn't actually do anything on the receiver side yet, might be useful later
        sendMessage(message, "default");
    }

    /**
     * Sends Messages to the receiver
     * FOR EXAMPLE:
     *         mCastHandler.sendMessage("MOVE", "RIGHT);
     * @param command
     * @param message
     */
    public void sendMessage(String command, String message) {

        try {
        //USING JSON
        JSONObject object = new JSONObject();
        object.put("command", command);
        object.put("message", message);

            Log.i(TAG, "SENDING MESSAGE: " + object.toString());
        if (mApiClient != null && mWizCastChannel != null) {



                Cast.CastApi.sendMessage(
                        mApiClient, mWizCastChannel.getNamespace(), object.toString()
                ).setResultCallback(new ResultCallback<Status>() {
                    @Override
                    public void onResult(Status status) {
                        if (!status.isSuccess()) {
                            Log.e(TAG, "Sending message failed");
                        }
                    }
                });
        }
        } catch (Exception e) {
            Log.e(TAG, "Exception while sending message", e);
        }

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
            mApiClient = new GoogleApiClient.Builder(mContext)
                    .addApi(Cast.API, apiOptionsBuilder.build())
                    .addConnectionCallbacks(mConnectionCallbacks)
                    .addOnConnectionFailedListener(mConnectionFailedListener)
                    .build();
            mApiClient.connect();

        } catch (Exception e) {
            Log.e(TAG, "Failed launchReceiver", e);
        }
    }


    public MediaRouteSelector getMediaRouteSelector() {
        return mMediaRouteSelector;
    }

    /**
     * Clean Up
     */
    public void onDestroy() {
        tearDown();
        mMediaRouter.removeCallback(this);
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
                            Log.d(TAG, "ApplicationConnectionResultCallback.onResult: statusCode "
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
                                sendMessage(mContext.getString(R.string.instructions));
                            } else {
                                Log.e(TAG, "application could not launch");
                                tearDown();
                            }
                        }
                    });
                }
            } catch (Exception e) {
                Log.e(TAG, "Failed to launch application", e);
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

            //Toast.makeText(MainActivity.this, "CONNECTING", Toast.LENGTH_SHORT).show();
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
            return mContext.getString(R.string.namespace);
        }

        @Override
        public void onMessageReceived(CastDevice castDevice, String namespace, String message) {
            Log.d(TAG, "onMessageReceived: " + message);
        }
    }
}
