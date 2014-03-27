package com.wizardcast;
import android.util.Log;

/**
 * Created by joe on 3/27/14.
 * communicates with chromecast
 * should this be a separate class and not use runnable, then we can have it return true or false
 */
// TODO - should we just have a function inside the gamecontrol to do handle messaging the chromecast?
public class SendAction implements Runnable {
    private static final String TAG = "SendAction";
    boolean isRunning = true;

    @Override
    public void run() {

        Log.i(TAG, "run()");
    }

    //this is where we would put the command into a json object and send it to chromecast
    public void send(String command) {
        Log.i(TAG, "send() command" +command);
    }
}