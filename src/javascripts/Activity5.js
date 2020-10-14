import { WebGLHelper } from './webgl_helper'
import * as dat from 'dat.gui'
import * as THREE from 'three'

export class Cube {
    constructor() {
        this.vertices = [
            -.5, -.5, .5, // 0
            .5, -.5, .5, // 1
            .5, .5, .5, // 2
            -.5, .5, .5, // 3
            -.5, -.5, -.5, // 4
            .5, -.5, -.5, // 5
            .5, .5, -.5, // 6
            -.5, .5, -.5  // 7
        ]

        this.indices = []

        this.face(0, 1, 2, 3) // front
        this.face(5, 4, 7, 6) // back
        this.face(3, 2, 6, 7) // top
        this.face(1, 0, 4, 5) // bottom
        this.face(4, 0, 3, 7) // left
        this.face(1, 5, 6, 2) // right

        this.v_out = []
        for (let i of this.indices) {
            this.v_out.push(this.vertices[3 * i],
                this.vertices[3 * i + 1],
                this.vertices[3 * i + 2])
        }

        this.colors = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 0],
            [1, 0, 1],
            [0, 1, 1]
        ]

        this.c_out = []
        for (let c of this.colors) {
            for (let i = 0; i < 6; i++) {
                this.c_out.push(c[0], c[1], c[2])
            }
        }
    }

    face(a, b, c, d) {
        this.indices.push(a, b, c)
        this.indices.push(a, c, d)
    }
}

export function displayCube() {

    const vs_script = `#version 300 es
    in vec3 coordinates;
    in vec3 color;
    out vec4 vColor;
    uniform mat4 transformBy;
    void main(void) {
      gl_Position = transformBy * vec4(coordinates, 1.0);
      vColor = vec4(color, 1.0);
    } 
  `

    const fs_script = `#version 300 es
    precision mediump float;
    in vec4 vColor;
    out vec4 fragColor;
    void main(void) {
      fragColor = vColor;
    }
  `

    let canvas = document.querySelector("#webgl-scene")

    let gl = WebGLHelper.initWebGL(canvas)

    let program = WebGLHelper.initShaders(gl, vs_script, fs_script)

    gl.useProgram(program)

    let cube = new Cube()

    let buffers = WebGLHelper.initBuffers(gl, program, [{
        name: 'coordinates',
        size: 3,
        data: cube.v_out

    }, {

        name: 'color',

        size: 3,

        data: cube.colors

    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {
        axis: 1,
        theta: 30,
        front: '#FF0000',
        back: '#00FF00',
        top: '#0000FF',
        bottom: '#FFFF00',
        left: '#FF00FF',
        right: '#00FFFF'
    }

    function instantiate(i, thetaIncrement, scaleBy, translateTo) {
        theta[controls.axis] += thetaIncrement

        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)

        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)

        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)

        let r = new THREE.Matrix4().multiplyMatrices(rx, ryz)

        let s = new THREE.Matrix4().makeScale(...scaleBy)

        let t = new THREE.Matrix4().makeTranslation(...translateTo)

        // TRS transformation

        let m = new THREE.Matrix4().multiplyMatrices(t, new THREE.Matrix4().multiplyMatrices(r, s))

        gl.uniformMatrix4fv(transformByLoc, false, m.elements)

        gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)
    }

    let theta = [0, 0, 0]

    WebGLHelper.clear(gl, [1, 1, 1, 1])

    function animate() {
        instantiate(0, 0.8, [.9, .9, .9], [0, 0, 0])

        requestAnimationFrame(animate)
    }

    function getNewColors() {
        let newColors = cube.colors

       
        let frontColor = WebGLHelper.getColorFromHex(controls.front)  
        WebGLHelper.loadAttributeF(gl, program, 'color', 1, 0, 0)  
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers['frontColor'])
        // gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)

        let backColor = WebGLHelper.getColorFromHex(controls.back)
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers['backColor'])
        // gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)

        let topColor = WebGLHelper.getColorFromHex(controls.top)
        let bottomColor = WebGLHelper.getColorFromHex(controls.bottom)
        let leftColor = WebGLHelper.getColorFromHex(controls.left)
        let rightColor = WebGLHelper.getColorFromHex(controls.right)       
    }

    animate()

    let gui = new dat.GUI()

    document.querySelector('aside').appendChild(gui.domElement)

    gui.add(controls, 'axis', { x: 0, y: 1, z: 2 })

    gui.addColor(controls, 'front').onChange(getNewColors())

    gui.addColor(controls, 'back').onChange()

    gui.addColor(controls, 'top').onChange()

    gui.addColor(controls, 'bottom').onChange()

    gui.addColor(controls, 'left').onChange()

    gui.addColor(controls, 'right').onChange()
}