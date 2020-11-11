import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function getCurve() {
    let path = new THREE.CurvePath()
    path.add(new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0), 
        new THREE.Vector3(-1, 0, 0)
    ))

    path.add(new THREE.LineCurve3(
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 1, 0)
    ))

    path.add(new THREE.CubicBezierCurve3(
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(-.5, 1.5, -1),
        new THREE.Vector3(1.5, 1.5, 0),
        new THREE.Vector3(0, 0, -1)
    ))

    return path
}

export function displayPath() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)     
    
    let cube = new THREE.Mesh(new THREE.BoxGeometry(.15, .15, .15), new THREE.MeshNormalMaterial())
    scene.add(cube)

    let path = getCurve()

    let points = path.curves.reduce((p, d) => [...p, ...d.getPoints(40)], [])
    
    scene.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points), 
        new THREE.LineBasicMaterial({color: 0xFFFF00})
        ))

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    camera.position.set(2, -1, 3)

    camera.lookAt(scene.position)  
    
    let fraction = 0
    const up = new THREE.Vector3(0, 1, 0)
    const axis = new THREE.Vector3()
    
    function animate() {
        let newPosition = path.getPoint(fraction)
        let tangent = path.getTangent(fraction)
        cube.position.copy(newPosition)

        axis.crossVectors(up, tangent).normalize()

        let angle = Math.acos(up.dot(tangent))
        cube.quaternion.setFromAxisAngle(axis, angle)        

        renderer.render(scene, camera)

        fraction += .001
        if (fraction > 1) {
            fraction = 0
        }

        cameraControls.update()
        requestAnimationFrame(animate)
    }

    animate()
}
