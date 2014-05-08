/**
 * BezierCurve
 */
package com.wizardcast;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;

import javax.microedition.khronos.opengles.GL10;

import android.util.Log;

public class BezierCurve {
	private static FloatBuffer vertexBuffer;
	private static ByteBuffer indexBuffer;
	public float angle = 0f;
    public float power = 0f;
	static final int COORDS_PER_VERTEX = 3;
	private static float[] vertexCoordinates;//, colorCoordinates;
	private static byte[] indices = {(byte)0,(byte)1};
	private static Vertex points[];
	
	public BezierCurve() {
		vertexCoordinates = new float[COORDS_PER_VERTEX * 2];
		points = new Vertex[2];
		indices = new byte[points.length];

        /**
         * There will only be two points
         * origin will be anchored to middle of screen
         * second point will be placed by user from onTouch
         */
		points[0] = new Vertex(0f,0f,0f);
		//points[1] = new Vertex(0f,0f,0f);
		setPoints(new Vertex(0f, 0f, 0f));
		

	}
	/**
     * setPoints( vertex )
     * updates the second vertex coordinate information from user interaction
     **/
	public void setPoints(Vertex newPoint){
		this.points[1] = newPoint;

		//  put line points into vertexbuffer
		int vIndex=0;
		for(int iii=0;iii<points.length;iii++) {
			points[iii].write(vertexCoordinates, vIndex);
			vIndex+=3;
			}

		angle = (float) Math.atan2(newPoint.getY(), newPoint.getX()) * -1f;
        power = (float) Math.sqrt(Math.pow(newPoint.getX(),2) + Math.pow(newPoint.getY(),2));

        Log.i("bCurve", "Angle from x-axis: " + angle + "\nPower of projectile: " + power);
		ByteBuffer byteBuf = ByteBuffer.allocateDirect  (vertexCoordinates.length*4);
		byteBuf.order(ByteOrder.nativeOrder());
		vertexBuffer = byteBuf.asFloatBuffer();
		vertexBuffer.put(vertexCoordinates);
		
		indexBuffer = ByteBuffer.allocateDirect(indices.length);
		indexBuffer.put(indices);
		indexBuffer.position(0);

	}

	public void onDrawFrame(GL10 gl) {
		gl.glFrontFace(GL10.GL_CW);
		gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
		vertexBuffer.position(0);
	     gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
		//vertexBuffer.position(3);
	     vertexBuffer.position(0);
        gl.glDrawArrays(GL10.GL_LINES, 0, 2);
	    //gl.glDrawElements(GL10.GL_LINES, 1, GL10.GL_UNSIGNED_BYTE, indexBuffer);
		gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);		
	}
	
}


