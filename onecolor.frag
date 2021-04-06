#ifdef GL_ES

precision mediump float;

#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 resolution;
uniform float time;
uniform float mouse;

uniform float ball_0_x;
uniform float ball_0_y;
uniform float ball_0_r;

uniform float ball_1_x;
uniform float ball_1_y;
uniform float ball_1_r;


// function that turns an rgb value 0-255 to 0.0-1.0
vec3 rgb(float r, float g, float b){
	return vec3(r/ 255.0, g /255.0, b / 255.0);
}

float Circle(vec2 uv, vec2 p, float r, float blur){
	float d = length(uv-p);
	float c = smoothstep(r,r-blur,d);
	
	return c;
}

vec3 hsv2rgb(vec3 c) {
// https://github.com/hughsk/glsl-hsv2rgb/blob/master/index.glsl
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


void main(){

	vec2 ball_0_p = vec2(ball_0_x,ball_0_y);
	ball_0_p = ball_0_p.xy / resolution.xy;

	vec2 ball_1_p = vec2(ball_1_x,ball_1_y);
	ball_1_p = ball_1_p.xy / resolution.xy;

	vec2 uv = gl_FragCoord.xy / resolution.xy /2.;

	// uv -= .5;
	//uv.x *= resolution.x/resolution.y;
	
	vec3 col = vec3(0.0);

	float d = length(uv.xy-ball_0_p.xy);

	col.x = 50.*ball_0_r /d;

	d = length(uv.xy-ball_1_p.xy);

	col.x += 50.*ball_0_r /d;

	col.x *= 0.00005;
	
	col = hsv2rgb(vec3(col.x,col.x,col.x));



	//float mask = Circle(uv, ball_0_p, col.x, .05);
	//mask += Circle(uv, ball_1_p, col.x, .05);

	
	//col *= mask;

	gl_FragColor = vec4(col,1.0);	// 1.0 as alpha
}
