/**
 * GLRenderer
 */
package com.wizardcast;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import android.opengl.GLSurfaceView.Renderer;
import android.util.Log;

public class GLRenderer implements Renderer {
	private float zoom = 1f;
	private float mRotation = 77;
	private BezierCurve mBezier;
	public boolean drawBez = true;

	@Override
	public void onDrawFrame(GL10 gl) {
		//mRotation = (mRotation -1f)%360;
		gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
		gl.glMatrixMode(GL10.GL_MODELVIEW);
		gl.glLoadIdentity(); // reset the matrix to its default state
	    //gl.glRotatef(mRotation, .3f, .4f, 0);	// no rotation yet
	    gl.glMatrixMode(GL10.GL_PROJECTION);
	    gl.glLoadIdentity();
        gl.glOrthof(-1f*zoom, 1f*zoom, -1f*zoom, 1f*zoom, -1f, 1f);
       if(drawBez){
    	   mBezier.onDrawFrame(gl);
	       // mArrow.onDrawFrame(gl);
       }

	}

    public float getPower(){
        return mBezier.power;
    }
    public float getAngle(){
        return mBezier.angle;
    }

	@Override
	public void onSurfaceChanged(GL10 gl, int width, int height) {
		int delta;
		
		if(width<height){
			delta=(height-width)/2;
			gl.glViewport(0, 0, width, height);
		}else{
			delta=(width-height)/2;
			gl.glViewport(0, 0, width, height);
		}
		gl.glMatrixMode(GL10.GL_PROJECTION); //to work with the projection matrix
		//to do: set up ortho projection
		gl.glLoadIdentity();
		gl.glMatrixMode(GL10.GL_MODELVIEW);//methods should restore model view matrix mode

	}

	public void setPoints(Vertex point){
		Log.i("GLRenderer", "setPoints()");
		mBezier.setPoints(point);
		//drawBez = true;
	}
	
	public void resetCurve(){
		
	}
	@Override
	public void onSurfaceCreated(GL10 gl, EGLConfig config) {
		gl.glClearColor(0f, 0f, 0f, 0f);
		gl.glClearDepthf(1.0f);
        gl.glEnable(GL10.GL_DEPTH_TEST);
        gl.glDepthFunc(GL10.GL_LEQUAL);
        gl.glHint(GL10.GL_PERSPECTIVE_CORRECTION_HINT,
                  GL10.GL_NICEST);
		mBezier = new BezierCurve();
	}

}
