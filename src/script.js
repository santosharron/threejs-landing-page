import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'


const scene = new THREE.Scene()
scene.environment = new RGBELoader().load('/env.hdr')
scene.environment.mapping = THREE.EquirectangularReflectionMapping

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load('/model.glb', (gltf) =>
{
    const model = gltf.scene

    model.position.set(0,-1,-2)
    model.rotation.set(0,0,0)
    model.scale.set(1,1,1)
    scene.add(model)
})

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let scrollY = window.scrollY

window.addEventListener('scroll', () =>{
    scrollY = window.scrollY
})

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {

    camera.position.y = -scrollY / window.innerHeight * .09
    camera.position.z = -scrollY / window.innerHeight * .09

    requestAnimationFrame(animate)

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}
animate()