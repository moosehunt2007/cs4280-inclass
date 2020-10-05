import { WebGLHelper } from './webgl_helper'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import {Cube} from './cube'
import {Sphere} from './sphere'

// Sphere
export function displaySphere() {
    const vs_script = `#version 300 es
    in vec3 coordinates;
    in vec3 color;
    out vec4 vColor;
    uniform mat4 transformBy;
    void main(void) {
      gl_Position = transformBy * vec4(coordinates, 1.0);
      gl_PointSize = .3;
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

    let sphere = new Sphere(.9, 72)

    let buffers = WebGLHelper.initBuffers(gl, program, [{
        name: 'coordinates',
        size: 3,
        data: sphere.vertices
      }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {
        axis: 1,
        theta: 30
    }

    let theta = [30, 0, 30]
    function animate() {
        theta[controls.axis] += .9
        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        let rxyz = new THREE.Matrix4().multiplyMatrices(rx, ryz)

        WebGLHelper.clear(gl, [1, 1, 1, 1])
        gl.uniformMatrix4fv(transformByLoc, false, rxyz.elements)

        WebGLHelper.loadAttributeF(gl, program, 'color', 1, 0, 0)

        gl.drawArrays(gl.POINTS, 0, sphere.vertices.length / 3)

        requestAnimationFrame(animate)
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', { x: 0, y: 1, z: 2 })

}




// Multiple instances of cube
export function displayMultipleCubes() {
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
        data: cube.c_out
    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {
        axis: 1,
        theta: 30
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

        // TRS Transformation scaling then translation then rotation
        let m = new THREE.Matrix4().multiplyMatrices(t, new THREE.Matrix4().multiplyMatrices(r,s))
        gl.uniformMatrix4fv(transformByLoc, false, m.elements)

        gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)
    }

    let theta = [0, 0, 0]
    WebGLHelper.clear(gl, [1, 1, 1, 1])
    function animate() {
        // theta[controls.axis] += .9

        instantiate(0, .1, [.5, .5, 1.9], [0, 0, 0])

        instantiate(1, .1, [.3, .3, .3], [-.7, -.7, .4])

        instantiate(2, .1, [.3, .6, .3], [.6, .6, .4])

        instantiate(3, .8, [.2, .2, .2], [-.6, .7, -.4])

        instantiate(4, .1, [.2, .6, .1], [.6, -.6, .1])       

        requestAnimationFrame(animate)
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', { x: 0, y: 1, z: 2 })
}
