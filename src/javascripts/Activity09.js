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
                o.material = new THREE.MeshPhongMaterial({ color: c })
                o.receiveShadow = true
                o.castShadow = true
                scene.add(o)
            }

            city.receiveShadow = true
            scene.add(city)
            renderer.render(city, camera)
        })
    })

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    // adding light sources
    // let ambient = new THREE.AmbientLight(0xf3d950, 1)
    // scene.add(ambient)

    let point = new THREE.PointLight(0xf3d940, .8, 300, 1)
    // point.position.set(-500, -500, 0)
    scene.add(point)

    let directional = new THREE.DirectionalLight(0xf3d950, 2)
    // directional.position.set(200, 200, 50)
    directional.castShadow = true
    scene.add(directional)

    let spotLight = new THREE.SpotLight(0xfaf4df, 1.5)
    spotLight.position.set(70, 300, 0)
    spotLight.angle = 0.6
    spotLight.penumbra = .2
    spotLight.decay = 1
    spotLight.distance = 500000

    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = canvas.clientWidth
    spotLight.shadow.mapSize.height = canvas.clientHeight
    spotLight.shadow.camera.near = 10
    spotLight.shadow.camera.far = 500
    spotLight.shadow.focus = .6
    scene.add(spotLight)

    let controls = {}

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

        lightHelper.update();

        shadowCameraHelper.update();

    }

    animate()
}