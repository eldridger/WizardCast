package com.wizardcast;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

import com.wizardcast.cast.CastHandler;

import org.json.JSONException;
import org.json.JSONObject;

public class GameControl extends ActionBarActivity {
    private static final boolean CHROMECAST_MODE = true; // Set to false to test without chromecast connection
    private static final String DEBUG_TAG = "GameControl";
    private static int width, height;
    private static final float MOVETHRESH = 30f; // distance between ACTIONDOWN and ACTIONMOVE required to count as movement
    private static float angle, power, originX, originY, currentX, currentY;
    private static float rOriginX, rOriginY, rCurrentX, rCurrentY; // coordinates for right side of screen controls
    long setProjectileDown;
    boolean fingerDown = false;
    private SendAction sAction; // thread that waits to send message to chromecast
    private CastHandler mCastHandler;
    /**  openGL variables  */
    private MyGLSurfaceView glView;
    private GLRenderer renderer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DisplayMetrics metrics = this.getResources().getDisplayMetrics();
        width = metrics.widthPixels;
        height = metrics.heightPixels;
        Log.i(DEBUG_TAG, "resolution "+ width + " " + height);
        sAction = new SendAction();
        renderer = new GLRenderer();
        glView = new MyGLSurfaceView(this, renderer);
        glView.setRenderer(renderer);

        setContentView(R.layout.activity_game_control);
        FrameLayout frame = (FrameLayout) findViewById(R.id.myframelayout);
        frame.addView(glView);
        //Get the cast handler for sending messages to chromecast
        mCastHandler = CastHandler.getInstance(getApplicationContext());

        //  Set buttons
        setButtonClick();


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




    public void setButtonClick() {
        Button leftBtn = (Button) findViewById(R.id.btnLeft);
        leftBtn.setOnTouchListener(new View.OnTouchListener() {
            @Override public boolean onTouch(View v, MotionEvent event) {
                switch(event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        mCastHandler.sendMessage("MOVE", "LEFT");
                        break;
                    case MotionEvent.ACTION_UP:
                        mCastHandler.sendMessage("ACTION", "RELEASE");
                        break;
                }
                return false;
            }
        });

        // move right
        Button rightBtn = (Button) findViewById(R.id.btnRight);
        rightBtn.setOnTouchListener(new View.OnTouchListener() {
            @Override public boolean onTouch(View v, MotionEvent event) {
                switch(event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        mCastHandler.sendMessage("MOVE", "RIGHT");
                        break;
                    case MotionEvent.ACTION_UP:
                        mCastHandler.sendMessage("ACTION", "RELEASE");
                        break;
                }
                return false;
            }
        });

        //  Cast spell
        Button castBtn = (Button) findViewById(R.id.btnCast);
        castBtn.setOnTouchListener(new View.OnTouchListener() {

            @Override public boolean onTouch(View v, MotionEvent event) {
                switch(event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        angle = renderer.getAngle();
                        power = renderer.getPower();
                        if(power>.94f) power = 1.0f;
                        Log.i(DEBUG_TAG, "castSpell_ (power, angle radians) "+ power +", " +angle);
                        JSONObject jsonObject = new JSONObject();
                        try {
                            jsonObject.put("angle", angle);
                            jsonObject.put("power", power);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        mCastHandler.sendMessage("SHOOT", jsonObject.toString());
                }
                return false;
            }
        });
    }
}
