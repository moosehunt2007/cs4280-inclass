import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

export function displayCity() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Loading Textures
    let mtlLoader = new MTLLoader()
    let objLoader = new OBJLoader()
    mtlLoader.load("./models/city.mtl", function (material) {
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./models/city.obj", function (city) {
            for (let o of city.children) {
                let c = new THREE.Color(0xFFFFFF)
                c.setHex(Math.random() * 0xFFFFFF)
                o.material = new THREE.MeshStandardMaterial({ color: c })
                scene.add(o)
            }

            scene.add(city)
            renderer.render(city, camera)
        })
    })

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    // adding light sources
    let ambientLight = new THREE.AmbientLight(0x333333)
    let directionalLight = new THREE.DirectionalLight(0x777777)
    let pointLight = new THREE.PointLight(0x999999)
    // pointLight.position.set(0, 300, 0)
    let spotLight = new THREE.SpotLight(0x999999)
    // spotLight.position.set(0, 200, 0)
    spotLight.castShadow = true

    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(pointLight)
    scene.add(spotLight)

    let controls = {

    }

    window.onkeyup = function (e) {
        let t = cameraControls.target
        switch (e.keyCode) {
            case 40: // down
                break;
            case 38: // up
                //t.position.set(t.x - 5, t.y, t.z)
                break;
            case 39: // right
                t.position.set(t.x - 5, t.y, t.z)
                break;
            case 37: // left
                t.position.set(t.x + 5, t.y, t.z)
                break;
        }
    }

    camera.position.set(-200, 400, -200)

    function animate() {

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }

    animate()

}