import * as THREE from 'three'
import * as dat from 'dat.gui'

export function displayThreeHelloWorld() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Adding a point
    let geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(0, 10, -10),
        new THREE.Vector3(20, 40, -30)
    )

    let material = new THREE.PointsMaterial({
        size: 3,
        color: 0xFF0000
    })

    scene.add(new THREE.Points(geometry, material))

    // Adding a line
    geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(50, -10, 15),
        new THREE.Vector3(3, 40, 30),
        new THREE.Vector3(10, 10, 10)
    )

    material = new THREE.LineBasicMaterial({
        color: 0x0000FF
    })

    scene.add(new THREE.Line(geometry, material))

    // Adding a triangle
    geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(40, 20, 0),
        new THREE.Vector3(30, 45, 0),
        new THREE.Vector3(20, 20, 0)
    )
    geometry.faces.push(new THREE.Face3(0, 1, 2))

    material = new THREE.MeshBasicMaterial({
        color: 0xFFFF00
    })

    let mesh = new THREE.Mesh(geometry, material)
    mesh.drawMode = THREE.TrianglesDrawMode
    scene.add(mesh)

    // Adding a plane
    geometry = new THREE.PlaneGeometry(200, 70, 40, 20)
    material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true })
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotateY(Math.PI / 2)
    scene.add(mesh)

    // Adding a cube
    geometry = new THREE.BoxGeometry(30, 30, 30)
    material = new THREE.MeshNormalMaterial({ color: 0xFF00FF })
    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Cloning the cube and doing a 2nd cube
    let box2 = mesh.clone()
    box2.translateZ(40)
    scene.add(box2)

    // Adding a Sphere
    geometry = new THREE.SphereGeometry(20, 40, 40)
    material = new THREE.MeshNormalMaterial({ wireframe: false })
    mesh = new THREE.Mesh(geometry, material)

    mesh.position.X = 30
    mesh.position.Y = 30
    mesh.position.Z = 50
    scene.add(mesh)

    let sphere2 = mesh.clone()
    sphere2.translateX(50)
    scene.add(sphere2)

    let sphere3 = mesh.clone()
    sphere3.translateY(50)
    scene.add(sphere3)

    let sphere4 = mesh.clone()
    sphere4.translateZ(80)
    scene.add(sphere4)

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
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'radius').min(2).max(900).onChange(animate)
    gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
    gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)
}

export function displayAnimatedCube() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    // let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)
    let camera = new THREE.OrthographicCamera(-20, 20, 24, -24, 10, -100)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(6)
    scene.add(axes)

    let geometry = new THREE.BoxBufferGeometry(3, 3, 3)
    let material = new THREE.MeshNormalMaterial()

    let cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    camera.position.z = 9

    function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        cube.rotation.z += 0.01

        renderer.render(scene, camera)
    }
    animate()
}

export function displayCubeScene() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)
    // let camera = new THREE.OrthographicCamera(-20, 20, 24, -24, 10, -100)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(6)
    scene.add(axes)

    let geometry = new THREE.BoxBufferGeometry(15, 15, 15)
    let material = new THREE.MeshBasicMaterial()

    let cube = new THREE.Mesh(geometry, material)

    // let geometry = new THREE.SphereBufferGeometry(50, 90, 90)
    // let material = new THREE.MeshNormalMaterial({wireframe: false})
    // let sphere = new THREE.Mesh(geometry, material)

    // scene.add(sphere)

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
               

                    // // Adding a Sphere
                    // geometry = new THREE.SphereGeometry(50, 90, 90)
                    // material = new THREE.MeshNormalMaterial({ wireframe: false })
                    // sphere = new THREE.Mesh(geometry, material)

                   
                    // sphere.position.X = i * .25
                    // sphere.position.Y = j * .25
                    // sphere.position.Z = k * .25
                    // scene.add(sphere)
                }
            }
        }
    }

    let controls = {
        radius: 800,
        theta: 1,
        phi: 1
    }

    function animate() {
        camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
        camera.position.y = controls.radius * Math.cos(controls.theta)
        camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

        camera.lookAt(scene.position)

        renderer.render(scene, camera)
    }
    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'radius').min(50).max(1000).onChange(animate)
    gui.add(controls, 'theta').min(-1 * Math.Pi).max(Math.PI).onChange(animate)
    gui.add(controls, 'phi').min(-1 * Math.Pi).max(Math.PI).onChange(animate)
}