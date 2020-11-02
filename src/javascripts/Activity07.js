import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export function displayCubeScene() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)


    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(6)
    scene.add(axes)

    let geometry = new THREE.BoxBufferGeometry(15, 15, 15)
    let material = new THREE.MeshBasicMaterial()

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

                    box.material = new THREE.MeshBasicMaterial()
                    box.material.color = new THREE.Color(Math.random(), Math.random(), Math.random())
                    scene.add(box)
                }
            }
        }
    }

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    let controls = {
        radius: 800,
        theta: 1,
        phi: 1
    }

    // adding light sources
    let ambientLight = new THREE.AmbientLight(0x666666)
    let directionalLight = new THREE.DirectionalLight(0x777777)
    let pointLight = new THREE.PointLight(0x999999)
    cube.material = new THREE.MeshStandardMaterial(cube.materialParams)
    // cube.material.map = textures[cube.name]

    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(pointLight)

    function animate() {
        camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
        camera.position.y = controls.radius * Math.cos(controls.theta)
        camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

        camera.lookAt(scene.position)

        renderer.render(scene, camera)
    }
    animate()
}