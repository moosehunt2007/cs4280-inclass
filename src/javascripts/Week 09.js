import * as THREE from 'three'
import * as dat from 'dat.gui'
import { data256 } from './honolulu'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function sombrero(R, C) {
    let data = []
    let x0 = -2, z0 = -2, dx = 4 / R, dz = 4 / C
    for (let i = 0; i < R; i++) {
        let x = x0 + dx * i
        for (let j = 0; j < C; j++) {
            let z = z0 + dz * j
            let r = Math.sqrt(x * x + z * z)
            let y = Math.sign(Math.PI * r) / (Math.PI * r) * 300

            data.push(y)
        }
    }

    return data
}
function loadMeshGeometry(geometry, data, R, C, yscale = .1) {
    let x0 = 0, y0 = 0, z0 = 0
    let dx = 2, dz = 2

    // Vertices
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            geometry.vertices.push(new THREE.Vector3(
                x0 + i * dx,
                y0 + data[i * R + j] * yscale,
                z0 + j * dz
            ))
        }
    }

    // Faces
    for (let i = 0; i < R - 1; i++) {
        for (let j = 0; j < C - 1; j++) {
            geometry.faces.push(new THREE.Face3(
                i * R + j,
                i * R + j + 1,
                (i + 1) * R + j + 1
            ))

            geometry.faces.push(new THREE.Face3(
                i * R + j,
                (i + 1) * R + j + 1,
                (i + 1) * R + j
            ))
        }
    }

}

export function displayMeshes() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Adding the mesh
    let geometry = new THREE.Geometry()

    //loadMeshGeometry(geometry, data256, 256, 256)
    loadMeshGeometry(geometry, sombrero(64, 64), 64, 64, .1)

    geometry.computeFaceNormals()
    let material = new THREE.MeshNormalMaterial()
    let mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    let controls = {
        radius: 400,
        theta: 1,
        phi: 1
    }

    function animate() {
        camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
        camera.position.y = controls.radius * Math.cos(controls.theta)
        camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'radius').min(2).max(900).onChange(animate)
    gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
    gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)
}