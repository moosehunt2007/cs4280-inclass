import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function displayCubeScene() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)
    // let camera = new THREE.OrthographicCamera(-20, 20, 24, -24, 10, -100)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(5)
    scene.add(axes)

    // create the geometry and material
    let geometry = new THREE.BoxBufferGeometry(15, 15, 15)
    let material = new THREE.MeshNormalMaterial()    

    // create the cube
    let cube = new THREE.Mesh(geometry, material)    

    // A 1000 cubes
    let cube_number = 10

    for (let i = 0; i < cube_number; i++) {
        for (let j = 0; j < cube_number; j++) {
            for (let k = 0; k < cube_number; k++) {
                if (Math.random() > .2) {
                    let box = cube.clone()
                    box.position.x = i * 25
                    box.position.y = j * 25
                    box.position.z = k * 25

                    box.material = new THREE.MeshBasicMaterial()
                    box.material.color = new THREE.Color(Math.random(), Math.random(), Math.random())
                    scene.add(box)                   
                }
            }
        }
    }

    let pointLight = new THREE.PointLight(0xFFFFFF, 2)
    pointLight.position.set(200, 250, 600)
    pointLight.castShadow = true
    scene.add(pointLight)    
    
    let spotLight = new THREE.SpotLight(0xFFFFFF, 2)
    spotLight.position.set(200, 250, 600)
    spotLight.target.position.set(100, -50, 0)
    spotLight.castShadow = true
    scene.add(spotLight.target)
    scene.add(spotLight)

    let ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)
 

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    function animate() {
        camera.position.x = 510 * Math.sin(1) * Math.cos(.8)
        camera.position.y = 510 * Math.cos(1)
        camera.position.z = 510 * Math.sin(1) * Math.sin(.8)

        camera.lookAt(scene.position)      

        renderer.render(scene, camera)        
    }
    animate()    
}