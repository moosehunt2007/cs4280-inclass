import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { checkerboard, sinusoidal, somePattern } from './textures'

export function displayCubeScene() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(6)
    scene.add(axes)

    // Loading Textures
    let texLoader = new THREE.TextureLoader()
    let textures = [
        texLoader.load('./images/crate0.png', function () {           
            renderer.render(scene, camera)
        }),
        texLoader.load('./images/waldo.png', function () {          
            renderer.render(scene, camera)
        }),
        texLoader.load('./images/stone.jpg', function () {
            renderer.render(scene, camera)
        }),
        texLoader.load('./images/moon.jpg', function () {
            renderer.render(scene, camera)
        })        
    ]

    let geometry = new THREE.BoxBufferGeometry(15, 15, 15)
    let material = new THREE.MeshPhongMaterial()  
    let cube = new THREE.Mesh(geometry, material)    

    // A 1000 cubes
    let cube_number = 10
    for (let i = 0; i < cube_number; i++) {
        for (let j = 0; j < cube_number; j++) {
            for (let k = 0; k < cube_number; k++) {
                if (Math.random() > .2) {
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.position.x = (i % 10) * 3;
                    mesh.position.y = Math.floor(j / 10) * 3;
                    mesh.position.z = Math.floor(k / 10) * 3

                    let box = cube.clone()
                    box.position.x = i * 25
                    box.position.y = j * 25
                    box.position.z = k * 25       
                    
                    box.materialParams = {}                               
                  
                    scene.add(box)         
                    
                    box.material = new THREE.MeshPhongMaterial(box.materialParams)

                    function getRandomIntInclusive(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }
                    box.material.map = textures[getRandomIntInclusive(0, 3)]
                }                      
            }
        }
    }

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    let controls = {
       
    }

    // adding light sources
    let ambientLight = new THREE.AmbientLight(0x666666)
    let directionalLight = new THREE.DirectionalLight(0x777777)
    directionalLight.castShadow = true
    let pointLight = new THREE.PointLight(0x999999)
    pointLight.position.set(50, 200, 50)
    pointLight.castShadow = true
    let spotLight = new THREE.SpotLight(0x999999)
    spotLight.position.set(100, 200, 100)
    // spotLight.castShadow = true
    spotLight.target = cube

    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(pointLight)
    // scene.add(spotLight)

    camera.position.set(-200, 400, -200)

    function animate() {
        renderer.shadowMap.enabled = true

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }
    animate()
}