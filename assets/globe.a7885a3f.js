var F=Object.defineProperty;var p=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var C=(r,e,t)=>e in r?F(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,w=(r,e)=>{for(var t in e||(e={}))M.call(e,t)&&C(r,t,e[t]);if(p)for(var t of p(e))L.call(e,t)&&C(r,t,e[t]);return r};import{W as _,P as y,E as I,R as O,a as P,C as B,B as j,S as N,b as W,c as Z,d as v,A as G,e as U,f as b}from"./vendor.2f0b8dd2.js";const V=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}};V();const q=`
uniform float time;
//varying vec2 vUv;
//varying vec3 vPosition;
varying float vColorRandoms;

attribute float randoms;
attribute float colorRandoms;
void main()	{
    //vUv= uv;
    vColorRandoms= colorRandoms;
    vec4 mvPosition = modelViewMatrix* vec4(position, 1.);
    gl_PointSize = 3. +(100. * randoms ) * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;// vec4( position, 1.0 );
}
`,K=`
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

`;T({el:"canvas"});function T(r){r=w({fov:75,cameraZ:75,xyCoef:50,zCoef:10,lightIntensity:.7,ambientColor:0,light1Color:330288,light2Color:3174,light3Color:255,light4Color:8308963},r);let e,t,i,o,n,a,c,g,f,u=!0;x();function x(){const s=document.getElementById(r.el);e=new _({canvas:s,powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1,alpha:!0}),i=new y(r.fov),i.position.z=r.cameraZ,e.setPixelRatio(window.devicePixelRatio),new IntersectionObserver(l=>{var d=l[0];d.isIntersecting?u=!0:u=!1},{threshold:.1}).observe(s),h(),window.addEventListener("resize",h,!1),S(),e.setAnimationLoop(A),R()}function R(){f=new I(e),f.addPass(new O(t,i)),f.addPass(new P(i,new B)),f.addPass(new P(i,new j({intensity:3})))}function S(){t=new N,a=new W(10,40,30),g=new Z({uniforms:{time:{value:0},uColor1:{value:new v(16761600)},uColor2:{value:new v(16766474)},uColor3:{value:new v(1660140)}},transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:q,fragmentShader:K,blending:G}),c=new U(a,g);var s=a.index.array.length;let m=new Float32Array(s),l=new Float32Array(s);for(let d=0;d<s;d++)m.set([Math.random()],d),l.set([Math.random()],d);a.setAttribute("randoms",new b(m,1)),a.setAttribute("colorRandoms",new b(l,1)),t.add(c),i.position.z=18}function A(){u&&(z(),f.render())}function z(){c.rotation.x+=.001,c.rotation.z+=.002,c.rotation.y+=.001}function h(){o=800,n=800,e&&i&&(e.setSize(o,n),i.aspect=o/n,i.updateProjectionMatrix(),E())}function E(){const s=new y(i.fov,i.aspect),m=s.fov*Math.PI/180,l=2*Math.tan(m/2)*Math.abs(r.cameraZ);return[l*s.aspect,l]}}
//# sourceMappingURL=globe.a7885a3f.js.map
