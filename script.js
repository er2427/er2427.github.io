import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    console.log(cursor.y)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Axes
var points1 = [];
points1.push(
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(10, 0, 0));

var geometry1 = new THREE.BufferGeometry().setFromPoints(points1);

let mesh1 = new THREE.Line(
    geometry1,
    new THREE.LineBasicMaterial({ color: 'blue', linewidth: 10 })
);

var points2 = [];
points2.push(
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(0, 10, 0));

var geometry2 = new THREE.BufferGeometry().setFromPoints(points2);

let mesh2 = new THREE.Line(
    geometry2,
    new THREE.LineBasicMaterial({ color: 'green'})
);

var points3 = [];
points3.push(
    new THREE.Vector3(0, 0, -10),
    new THREE.Vector3(0, 0, 10));

var geometry3 = new THREE.BufferGeometry().setFromPoints(points3);

let mesh3 = new THREE.Line(
    geometry3,
    new THREE.LineBasicMaterial({ color: 'red', linewidth: 10 })
);

scene.add(mesh1, mesh2, mesh3)

// Vector Objects


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

camera.position.set(10,10,10)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

controls.target.y = 1
controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()