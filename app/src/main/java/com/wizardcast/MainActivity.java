package com.wizardcast;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.MediaRouteActionProvider;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;

import com.wizardcast.cast.CastHandler;

public class MainActivity extends ActionBarActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private ImageButton mBtnExit;
    private ImageButton mBtnStart;
    private ImageButton mBtnCast;
    private CastHandler mCastHandler;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //turn off window title bar
        //requestWindowFeature(Window.FEATURE_NO_TITLE);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_menu);

        mBtnExit = (ImageButton) findViewById(R.id.btnExit);
        mBtnStart = (ImageButton) findViewById(R.id.btnStart);
        mBtnCast = (ImageButton) findViewById(R.id.castButton);

        mCastHandler = CastHandler.getInstance(getApplicationContext());

        mBtnStart.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startGame();
            }
        });
    }

    private void startGame() {
        /*
        //Intent intent = new Intent(getBaseContext(), CastActivity.class);
        //startActivity(intent);
        if(mApiClient == null || !mApiClient.isConnected()) {
            Toast.makeText(MainActivity.this, "Not Connected to Chromecast", Toast.LENGTH_SHORT).show();
        } else {
            sendMessage("TEST");
        }
        */
        Intent intent = new Intent(getBaseContext(), GameControl.class);
        startActivity(intent);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //super.onCreateOptionsMenu(menu);
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);

        //CAST BUTTON ON ACTION BAR
        MenuItem mediaRouteMenuItem = menu.findItem(R.id.media_route_menu_item);
        MediaRouteActionProvider mediaRouteActionProvider =
                (MediaRouteActionProvider) MenuItemCompat.getActionProvider(mediaRouteMenuItem);

        mediaRouteActionProvider.setRouteSelector(mCastHandler.getMediaRouteSelector());

        return true;
    }

    @Override
    protected void onPause() {
        //if (isFinishing())
        //mMediaRouter.removeCallback(mMediaRouterCallback);

        super.onPause();
    }

    @Override
    protected void onResume() {
        //if (mCastListener != null) {
        //    mCastListener.addCastListener(mCastListener);
        //}
        super.onResume();

        // Add the callback to start device discovery
        //mMediaRouter.addCallback(mMediaRouteSelector, mMediaRouterCallback,
        //        MediaRouter.CALLBACK_FLAG_PERFORM_ACTIVE_SCAN);
    }

    @Override
    protected void onDestroy() {
        if (mCastHandler != null) {
            mCastHandler.onDestroy();
        }
        super.onStop();

        //mMediaRouter.removeCallback(mMediaRouterCallback);
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
}
