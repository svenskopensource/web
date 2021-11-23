export const fragmentShader = `
uniform float time;
//uniform vec2 resolution;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying float vColorRandoms;

void main()	{

    float disc = smoothstep(0.5,-0.3,length(gl_PointCoord - vec2(0.5)));

    vec3 finalColor = uColor1;
    if(vColorRandoms > .33) {
        finalColor = uColor2;
    } 
    if(vColorRandoms > .66) {
        finalColor = uColor3;
    }
    //float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
    //float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
    //gl_FragColor = vec4(finalColor, 1.0);
    gl_FragColor =  vec4(finalColor, disc);
}

`;

export default fragmentShader;