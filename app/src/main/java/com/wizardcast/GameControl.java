package com.wizardcast;

import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.MotionEvent;
import android.os.Build;

public class GameControl extends ActionBarActivity {

    private static final String DEBUG_TAG = "GameControl";
    private static int width, height;
    private static final float MOVETHRESH = 30f; // distance between ACTIONDOWN and ACTIONMOVE required to count as movement
    private static float originX, originY, currentX, currentY;
    private static float rOriginX, rOriginY, rCurrentX, rCurrentY; // coordinates for right side of screen controls
    boolean fingerDown = false;

    //private SendAction sAction; // thread that waits to send message to chromecast

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DisplayMetrics metrics = this.getResources().getDisplayMetrics();
        width = metrics.widthPixels;
        height = metrics.heightPixels;
        Log.i(DEBUG_TAG, "resolution "+ width + " " + height);
        //bsAction = new SendAction();
        setContentView(R.layout.activity_game_control);

        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholderFragment())
                    .commit();
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.game_control, menu);
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
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_game_control, container, false);
            return rootView;
        }
    }

}
