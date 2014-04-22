/**
 * MyGLSurfaceView
 */
package com.wizardcast;
import android.content.Context;
import android.opengl.GLSurfaceView;
import android.util.Log;
import android.view.MotionEvent;
import android.widget.FrameLayout;

public class MyGLSurfaceView extends GLSurfaceView {
	private GLRenderer mRenderer;
    private Vertex point;  //  user defined point, upon update will be passed to the drawable line
	public boolean originSet = false;
    public float angle = 0;
    public float power = 0;
	private int curIndex = 0;
	private int selectedToMove = 0;
	
	public MyGLSurfaceView(Context context) {
		super(context);	
        this.point = new Vertex();
        this.mRenderer = new GLRenderer();
    }
	
	public MyGLSurfaceView(Context context, GLRenderer renderer) {
		super(context);
		this.point = new Vertex();
		this.mRenderer = renderer;		
	}
	
	//  Set points in curve to mPoints
	public void setPoints(){
		Log.i("MyGLSurfaceView", "Entering setPoints()");
		this.queueEvent(new Runnable() {
			@Override
			public void run() {
				mRenderer.setPoints(point);
                angle = mRenderer.getAngle();
                power = mRenderer.getPower();
			}
		});
	}
	
	//  Input:  x and y position of touch
	//  Output:  vector with world coords of touch
	public Vertex worldCoord(float x, float y, int width, int height){
		float worldX, worldY;
		 //  If finger x is less than half of width, world coord will be negative x
		 if(x < (width/2)) {
			 worldX = -((width/2) - x) / (width/2);
		 }else{  //  positive world x coord
			 worldX = (x / width);
		 }
		 //  If finger y is less than half of height, world coord y will be positive
		 if(y < (height/2)) {
			 worldY = (height/2 - y) / (height/2) ;
		 }else{
			 worldY = -(y / height);
		 }
		Vertex fingerVertex = new Vertex(worldX, worldY,0f);
		return fingerVertex;
	}
	@Override
	public boolean onTouchEvent(MotionEvent event) {
        int height = this.getHeight();
        int width = this.getWidth();
        Log.i("MyGLSurfaceView", "Width of view: " + width + "\nHeight of view: " + height);
        switch(event.getAction()){
            case MotionEvent.ACTION_DOWN:
                point = worldCoord(event.getX(), event.getY(), width, height);
                setPoints();
                break;

            case MotionEvent.ACTION_MOVE:
                point = worldCoord(event.getX(), event.getY(), width, height);
                setPoints();
                break;
        }
		invalidate();
		return true;
	}
	@Override
	public void onPause() {
		// TODO Auto-generated method stub
		super.onPause();
	}
	@Override
	public void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
	}
}