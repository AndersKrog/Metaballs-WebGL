#ifdef GL_ES

precision mediump float;

#endif


// buildin p5 

attribute vec3 aPosition;
attribute vec2 aTexCoord;


void main(){
	vec4 positionVec4 = vec4(aPosition,1.0); // copy position data into a vec4, adding 1.0 as 2

	//scale pixel position to fit canvas
	positionVec4.xy = positionVec4.xy * 2.0 -1.0; // .xy means both for x and y

	gl_Position = positionVec4;
}

