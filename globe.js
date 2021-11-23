
import * as THREE from "three";
import {vertexShader} from "./vertexShader.vert";
import {fragmentShader} from "./fragmentShader.frag";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import {
//   PostProcessRenderer,
//   ChromaticAberrationShaderPass,
// } from "threejs-postprocess";
import { BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

App({ el: 'canvas' });

function App(conf) {
  conf = {
    fov: 75,
    cameraZ: 75,
    xyCoef: 50,
    zCoef: 10,
    lightIntensity: 0.7,
    ambientColor: 0x000000,
    light1Color: 0x050A30,
    light2Color: 0x000C66,
    light3Color: 0x0000FF,
    light4Color: 0x7EC8E3,
    ...conf
  };

  let renderer, scene, camera;
  let width, height,cx, cy, wWidth, wHeight;
  const TMath = THREE.Math;
  let geometry, plane, material;
  let composer;



  // const simplex = new SimplexNoise();

  // const mouse = new THREE.Vector2();
  // const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  // const mousePosition = new THREE.Vector3();
  // const raycaster = new THREE.Raycaster();

  // const noiseInput = document.getElementById('noiseInput');
  // const heightInput = document.getElementById('heightInput');


  init();

  function init() {
    const el = document.getElementById(conf.el);
    renderer = new THREE.WebGLRenderer({
        canvas: el,
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        alpha: true });
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;
    renderer.setPixelRatio(window.devicePixelRatio);
    console.log("init", el);
    //const OrbitControl = oc(camera, el);
    // controls = new OrbitControls( camera, el );
//     controls.enableDamping = true
// controls.dampingFactor = 0.25
// controls.enableZoom = true;
//     controls.autoRotate = true;
    //  console.log(controls);
//     controls.update();


    updateSize();
    window.addEventListener('resize', updateSize, false);

    // document.addEventListener('mousemove', e => {
    //   const v = new THREE.Vector3();
    //   camera.getWorldDirection(v);
    //   v.normalize();
    //   mousePlane.normal = v;
    //   mouse.x = (e.clientX / width) * 2 - 1;
    //   mouse.y = - (e.clientY / height) * 2 + 1;
    //   raycaster.setFromCamera(mouse, camera);
    //   raycaster.ray.intersectPlane(mousePlane, mousePosition);
    // });

    //initScene();
    initScene();
    
    //initGui();
	renderer.setAnimationLoop( animate );
    initPost();

    //initTween();
  }

  // function initTween() {
  //   tween = new TWEEN.Tween(noiseInput.value)
  //   .to(100, 2000)
  //   .delay(1000)
  //   .easing(TWEEN.Easing.Elastic.InOut);
  // }



  function initPost() {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new  EffectPass(camera, new ChromaticAberrationEffect()));
    composer.addPass(new EffectPass(camera, new BloomEffect({
        intensity:3
    })));
    // postProcessRender = new PostProcessRenderer(scene, camera, renderer); 
    // const pass = new ChromaticAberrationShaderPass();
    // const bloom = new UnrealBloomPass();
    // pass.rate = .2;
    
    // //bloom.radius 
    // postProcessRender.addComposer([pass,bloom]);
  }

  // function initGui() {
  //   noiseInput.value = 101 - conf.xyCoef;
  //   heightInput.value = conf.zCoef * 100 / 25;

  //   noiseInput.addEventListener('input', e => {
  //     conf.xyCoef = 101 - noiseInput.value;
  //   });
  //   heightInput.addEventListener('input', e => {
  //     conf.zCoef = heightInput.value * 25 / 100;
  //   });

  // }

  // function initScene2() {
  //   scene = new THREE.Scene();
  //   initLights();

  //   let mat = new THREE.MeshLambertMaterial({ color: 0xffffff, opacity:0.9, side: THREE.DoubleSide});
  //   let particles = new Three
    
  //   //mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
  //   // let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
  //   let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
  //   plane = new THREE.Mesh(geo, shaderMaterial);
  //   scene.add(plane);

  //   plane.rotation.x = -Math.PI / 2 - 0.2;
  //   plane.position.y = -62;
  //   camera.position.z = 160;
  // }

  function initScene() {
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xff1111);
    //initLights();

    geometry = new THREE.SphereBufferGeometry(10,40,30);
    //material = new THREE.MeshBasicMaterial({color: 0x000000});
    //material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
    //material = new THREE.PointsMaterial({ color: 0xff0000 });
    material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0},
        //resolution: { value : new THREE.Vector4()},
        uColor1: { value: new THREE.Color(0xffc300)},
        uColor2: { value: new THREE.Color(0xffd60a)},
        uColor3: { value: new THREE.Color(0x1954ec)}
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending
    })
    //material = mat;
    plane = new THREE.Points(geometry, material);


    console.log(geometry);
    var number = geometry.index.array.length;
    let randoms = new Float32Array(number);
    let colorRandoms = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      randoms.set([Math.random()],i);
      colorRandoms.set([Math.random()],i);      
    }

    geometry.setAttribute("randoms", new THREE.BufferAttribute(randoms,1));
    geometry.setAttribute("colorRandoms", new THREE.BufferAttribute(colorRandoms,1));
    
    //mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
    // let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
    // plane = new THREE.Mesh(geo, shaderMaterial);
    scene.add(plane);

    //plane.rotation.x = -Math.PI / 2 - 0.2;
    //plane.position.y = -62;
    camera.position.z = 18;
  }


  function animate() {
    //requestAnimationFrame(animate);

    //animatePlane();
    rotate();
    //animateLights();

    //controls.update();
    //renderer.render(scene, camera);
    composer.render();

  };

  function rotate() {
    plane.rotation.x += .001;
    plane.rotation.z += .002;
    plane.rotation.y += .001;
  }

  // function animatePlane() {
  //   gArray = plane.geometry.attributes.position.array;
  //   //conf.xyCoef = 100;
  //   const time = Date.now() * 0.0002;
  //   conf.xyCoef = Math.abs(Math.sin(time * 0.8) * 100) +10;
    
  //   // console.log(conf.xyCoef);
  //   for (let i = 0; i < gArray.length; i += 3) {
  //     gArray[i + 2] = simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, mouse.x + mouse.y) * conf.zCoef;
  //   }
  //   plane.geometry.attributes.position.needsUpdate = true;
  //   // plane.geometry.computeBoundingSphere();
  // }



  function updateSize() {
    width = 800;
    cx = width / 2;
    height = 800;
    cy = height / 2;
    if (renderer && camera) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const wsize = getRendererSize();
      wWidth = wsize[0];
      wHeight = wsize[1];
    }
  }

  function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    const vFOV = cam.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
  }
}
