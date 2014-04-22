/**
 * Vertex
 */
package com.wizardcast;

import android.util.Log;

public class Vertex {
	private float x, y, z;
	
	public Vertex () {
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
	public Vertex (float x, float y, float z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	public float getX(){
		return this.x;
	}
	
	public float getY(){
		return this.y;
	}
	
	public float getZ(){
		return this.z;
	}
	// returns midpoint of this vector and passed in vector
	public Vertex getMidpoint (Vertex b) {
		Vertex midpoint = new Vertex(((this.x + b.x)/2),((this.y + b.y)/2),((this.z + b.z)/2)); // create new vertex w/ midpoint coord		
		return midpoint;
	}
	
	public Vertex segmentLine(Vertex b, int pos, int total) {		
		Vertex segment = new Vertex();
		segment.x = (float) (this.x + ((double) (b.x - this.x) / (double) total) * pos);
		segment.y = (float) (this.y + ((double) (b.y - this.y) / (double) total) * pos);	
		return segment;
	}
	
	public Vertex getPerpMidpoint (Vertex b, int repeat, int x) {
		Vertex midpoint = new Vertex(((this.x + b.x)/2),((this.y + b.y)/2),((this.z + b.z)/2));	
		Vertex p = new Vertex((b.x - this.x), (b.y - this.y), (b.z - this.z));
		Vertex n = new Vertex (-(p.y), p.x, p.z);
		Log.i("Vertex.java", "Midpoint: " + midpoint.toString());
		Log.i("Vertex.java", "Vector p: " + p.toString());
		Log.i("Vertex.java", "Vector n: " + n.toString());
		Vertex offsetMidpoint = new Vertex( (midpoint.x + n.x), (midpoint.y + n.y), midpoint.z);
		return offsetMidpoint;
	}

	/**
	 *  returns distance between two vertices
	 *  formula: 
	 */
	public double distance(Vertex a, Vertex b) {
		return Math.sqrt( Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2) + Math.pow((a.z - b.z), 2));
	}
	public void write(float[] fBuffer, int index) {
		fBuffer[index] = this.x;
		fBuffer[index+1] = this.y;
		fBuffer[index+2] = this.z;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Float.floatToIntBits(x);
		result = prime * result + Float.floatToIntBits(y);
		result = prime * result + Float.floatToIntBits(z);
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vertex other = (Vertex) obj;
		if (Float.floatToIntBits(x) != Float.floatToIntBits(other.x))
			return false;
		if (Float.floatToIntBits(y) != Float.floatToIntBits(other.y))
			return false;
		if (Float.floatToIntBits(z) != Float.floatToIntBits(other.z))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return (this.getX() + "," +this.getY() + ", " + this.getZ());
	}
	
	public boolean isLessThan(Vertex p1, Vertex p2) {
		// TODO - return false if p2 is larger magnitude than p1
		return true;
	}
}

