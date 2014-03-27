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
    long setProjectileDown;
    boolean fingerDown = false;
    private SendAction sAction; // thread that waits to send message to chromecast

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DisplayMetrics metrics = this.getResources().getDisplayMetrics();
        width = metrics.widthPixels;
        height = metrics.heightPixels;
        Log.i(DEBUG_TAG, "resolution "+ width + " " + height);
        sAction = new SendAction();
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

    /*
     * onTouchEvent
     * This method deals with both projectile and movement controls with one listener
     * Touch events on the left side of screen control movement commands and returns LEFT RIGHT STILL JUMP
     * Right side returns projectile information such radians and power(0 - 1)
     *
     * TODO - There has to be a better way to implement controls.  Either by having multiple ontouch
     * listeners (perhaps using different views) or by creating a virtual dpad or joystick and then use
     * onTouch for projectile information
     *
     * It also seems that the projectile won't "fire" if the left side touch is pressed and not moving,
     * after there is an additional action the right side projectile information finishes
     */
    @Override
    public boolean onTouchEvent(MotionEvent e) {
        int action = e.getAction() & MotionEvent.ACTION_MASK;
        int pointerIndex = e.getActionIndex();
        //int pointerId = e.getPointerId(pointerIndex);

        if(e.getX(pointerIndex) <= width/2) {	// left side of screen handles movement
            Log.i(DEBUG_TAG, "onTouch() left side");
            switch(action) {

                case MotionEvent.ACTION_POINTER_DOWN:
                case MotionEvent.ACTION_DOWN:
                    originX = e.getX(pointerIndex); // set origin coordinates
                    originY = e.getY(pointerIndex);
                    Log.i(DEBUG_TAG, "MotionEvent_ ACTION_DOWN:  " + originX+", "+originY);
                    fingerDown = true;
                    break;

                case MotionEvent.ACTION_POINTER_UP:
                case MotionEvent.ACTION_UP:
                    Log.i(DEBUG_TAG, "MotionEvent_ ACTION_UP " + fingerDown);
                    fingerDown = false;
                    break;

                case MotionEvent.ACTION_MOVE:
                    currentX = e.getX(pointerIndex);
                    currentY = e.getY(pointerIndex);
                    //Log.i(DEBUG_TAG, "MotionEvent_ ACTION_MOVE" + currentX+", "+currentY + " " + sendMessage.ACTION);
                    break;
            }
            moveChar();
        }

        /*
            TODO - Instead of doing multiple touches and going through this convoluted mess can
            we use look for gesture and determine flick with angle and power?
         */
        else {
            Log.i(DEBUG_TAG, "onTouch() right side");
            switch(action) {
                case MotionEvent.ACTION_POINTER_UP:
                case MotionEvent.ACTION_UP:
                    double projectile_power = Math.sqrt(Math.pow((e.getX(pointerIndex) - rOriginX), 2) +  Math.pow((e.getY(pointerIndex) - rOriginY), 2));
                    double angle = Math.atan2(e.getY(pointerIndex) - rOriginY, e.getX(pointerIndex) - rOriginX)*-1;
                    System.out.println ( "motion angle projectile is being fired: " +Math.atan2(e.getY(pointerIndex) - rOriginY, e.getX(pointerIndex) - rOriginX)*-1);
                    System.out.println("projectile distance " + projectile_power);
                    castSpell(projectile_power, angle);
                    break;

                case MotionEvent.ACTION_POINTER_DOWN:
                case MotionEvent.ACTION_DOWN:
                    rOriginX = e.getX(pointerIndex);
                    rOriginY = e.getY(pointerIndex);
                    System.out.println("projectile action down: "+ rOriginX + ", " + rOriginY);
                    break;
            }
        }
        return true;
    }
    /*
        sends command to cast spell
        sends angle and will take distance and calculate power from 0 - 1 (min max)
       TODO - power needs to be calculated better either by having set distance for power or
       be able to take into account some screens having different amount of screen space
       using 250 for distance to be considered max power
     */
    public void castSpell(double distance, double angle) {
        String action;
        double projectilePower = distance / 250;
        if (projectilePower > 1)
            projectilePower = 1;
        Log.i(DEBUG_TAG, "castSpell_ (power, angle radians) "+ projectilePower +", " +angle);
        action = projectilePower+", "+angle;
        sAction.send(action);
    }
    /*
     * sends desired move to chromecast message interface
     * TODO - send movement and jump command together
     */
    public void moveChar(){
        String action;
        float diffX = originX - currentX;
        float diffY = originY - currentY; // used to determine if jumped
        if(Math.abs(diffX) > MOVETHRESH && fingerDown == true) {
            if (diffX > 0) // move left
                action = "LEFT";
            else
                action = "RIGHT";
        }
        else
            action = "STILL";

        sAction.send(action);
        //System.out.println("ACTION: " + action);
        // check for jump
        if (Math.abs(diffY) < MOVETHRESH && fingerDown == true) {
            action = "JUMP";
            System.out.println("ACTION: " + action);
            sAction.send(action);
        }
    }

}
