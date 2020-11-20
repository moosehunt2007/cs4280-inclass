import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { checkerboard, sinusoidal, somePattern } from './textures'
import { Water } from 'three/examples/jsm/objects/Water2'

export function displayTexturedScene2() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Loading Textures
    let texLoader = new THREE.TextureLoader()
    let textures = {
        crate: texLoader.load('./images/crate0.png', function () {
            renderer.render(scene, camera)
        }),
        crate_bump: texLoader.load('./images/crate0_bump.png', function () {
            renderer.render(scene, camera)
        }),
        crate_normal: texLoader.load('./images/crate0_normal.png', function () {
            renderer.render(scene, camera)
        }),
       
        floor: texLoader.load('./images/floor.jpg', function () {
            renderer.render(scene, camera)
        }), 
      
        checkerboard: checkerboard(256, 256),
      
        water1: texLoader.load('./images/water_normal_1.jpg'), function() {
            renderer.render(scene, camera)
        },
        water2: texLoader.load('./images/water_normal_2.jpg'), function() {
            renderer.render(scene, camera)
        },
        grass: texLoader.load('./images/grass.jpg'), function() {
            renderer.render(scene, camera)
        }
    }

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    // Adding the Crate
    let geometry = new THREE.BoxGeometry(100, 100, 100)
    let crate = new THREE.Mesh(geometry)
    crate.materialParams = {}
    crate.position.set(0, 55, 0)
    crate.name = 'checkerboard'
    scene.add(crate)
    crate.castShadow = true
    crate.material = new THREE.MeshPhongMaterial(crate.materialParams)
    crate.material.map = textures[crate.name]
    crate.material.bumpMap = textures['crate_bump']
    crate.material.bumpScale = .6
    crate.material.normalMap = textures['crate_normal']

    // Adding the Floor
    geometry = new THREE.PlaneGeometry(1000, 500)
    let plane = new THREE.Mesh(geometry)
    plane.materialParams = { side: THREE.DoubleSide }
    plane.rotateX(Math.PI / 2)
    plane.name = 'grass'
    scene.add(plane)
    plane.receiveShadow = true
    plane.material = new THREE.MeshPhongMaterial(plane.materialParams)
    plane.material.map = textures[plane.name]

    let waterGeometry = new THREE.PlaneBufferGeometry(900, 400)
    let water = new Water(waterGeometry, {
        color: '#33FCFF',
        scale: 4,
        flowDirection: new THREE.Vector2(4, 1),
        textureWidth: 1024,
        textureHeight: 1024,
        normalMap0: textures['water1'],
        normalMap1: textures['water2']
    })

    water.position.y = 3
    water.rotation.x = Math.PI * -.5
    scene.add(water)   

    // adding light sources
    let ambientLight = new THREE.AmbientLight(0x333333)   
    // let directionalLight = new THREE.DirectionalLight(0x555555)
    // directionalLight.position.set(0, 400, 0)
    // directionalLight.castShadow = true
    let pointLight = new THREE.PointLight(0x999999)
    pointLight.position.set(50, 200, 0)
    pointLight.castShadow = true
    pointLight.target = crate
    let spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(0, 500, 0)
    spotLight.castShadow = true
    spotLight.target = crate

    scene.add(ambientLight)
    // scene.add(directionalLight)
    scene.add(pointLight)
    scene.add(spotLight)

    let controls = {

    }

    camera.position.set(-200, 400, -200)

    function animate() {
        renderer.shadowMap.enabled = true

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()

        requestAnimationFrame(animate)
    }

    animate()
}
