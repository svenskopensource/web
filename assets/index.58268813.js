var E=Object.defineProperty;var g=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var h=(r,e,t)=>e in r?E(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,C=(r,e)=>{for(var t in e||(e={}))F.call(e,t)&&h(r,t,e[t]);if(g)for(var t of g(e))M.call(e,t)&&h(r,t,e[t]);return r};import{W as L,P as w,E as _,R as B,a as y,C as O,B as I,S as V,b as j,c as N,V as W,d as u,A as Z,e as G,f as P}from"./vendor.816035e8.js";const U=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}};U();const q=`
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying float vColorRandoms;

attribute float randoms;
attribute float colorRandoms;
void main()	{
    vUv= uv;
    vColorRandoms= colorRandoms;
    vec4 mvPosition = modelViewMatrix* vec4(position, 1.);
    gl_PointSize = 2. +(200. * randoms ) * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;// vec4( position, 1.0 );
}
`,K=`
uniform float time;
uniform vec2 resolution;

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
    float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
    float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
    gl_FragColor = vec4(finalColor, 1.0);
    gl_FragColor = vec4(finalColor, disc);
}

`;T({el:"canvas"});function T(r){r=C({fov:75,cameraZ:75,xyCoef:50,zCoef:10,lightIntensity:.7,ambientColor:0,light1Color:330288,light2Color:3174,light3Color:255,light4Color:8308963},r);let e,t,i,o,n,a,l,v,c;x();function x(){const s=document.getElementById(r.el);e=new L({canvas:s,powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1,alpha:!0}),i=new w(r.fov),i.position.z=r.cameraZ,e.setPixelRatio(window.devicePixelRatio),p(),window.addEventListener("resize",p,!1),R(),e.setAnimationLoop(S),b()}function b(){c=new _(e),c.addPass(new B(t,i)),c.addPass(new y(i,new O)),c.addPass(new y(i,new I({intensity:3})))}function R(){t=new V,a=new j(10,40,30),v=new N({uniforms:{time:{value:0},resolution:{value:new W},uColor1:{value:new u(16761600)},uColor2:{value:new u(16766474)},uColor3:{value:new u(1660140)}},transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:q,fragmentShader:K,blending:Z}),l=new G(a,v);var s=3699/3;let m=new Float32Array(s),d=new Float32Array(s);for(let f=0;f<s;f++)m.set([Math.random()],f),d.set([Math.random()],f);a.setAttribute("randoms",new P(m,1)),a.setAttribute("colorRandoms",new P(d,1)),t.add(l),i.position.z=18}function S(){A(),c.render()}function A(){l.rotation.x+=.001,l.rotation.z+=.002,l.rotation.y+=.001}function p(){o=800,n=800,e&&i&&(e.setSize(o,n),i.aspect=o/n,i.updateProjectionMatrix(),z())}function z(){const s=new w(i.fov,i.aspect),m=s.fov*Math.PI/180,d=2*Math.tan(m/2)*Math.abs(r.cameraZ);return[d*s.aspect,d]}}
