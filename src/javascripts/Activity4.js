import { WebGLHelper } from './webgl_helper'
import * as dat from 'dat.gui'

export function sierpinski() {
    const vs_script = `#version 300 es
    in vec3 coordinates;
    in vec3 color;
    uniform float pointSize;
    out vec4 vColor;
    void main(void) {
      gl_Position = vec4(coordinates, 1.0);
      gl_PointSize = pointSize;
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

    let vertices = []

    let controls = {
        pointSize: 1,
        pointColor: '#0000FF',
        pointCount: 1000,
        draw: true
    }

    let buffers = WebGLHelper.initBuffers(gl, program, [{
        name: 'coordinates',
        size: 3,
        data: vertices
    }])

    // v1, v2, v3
    let points = [[-1, 1, 0], [1, 1, 0], [0, -1, 0]]
    let q = [.3, .5, 0]
    function redraw() {
        if (controls.draw) {
            for (let i = 0; i < controls.pointCount; i++) {
                let p = points[Math.floor(Math.random() * 3)]

                q = [(q[0] + p[0]) / 2, (q[1] + p[1]) / 2, 0.0]
                vertices.push(...q)
            }

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
            WebGLHelper.loadAttributeF(gl, program, 'color', ...WebGLHelper.getColorFromHex(controls.pointColor))
            WebGLHelper.loadUniformF(gl, program, 'pointSize', controls.pointSize)

            WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])

            gl.drawArrays(gl.POINTS, 0, vertices.length / 3)
        }
    }

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'pointSize').min(1).max(10).onChange(redraw)
    gui.add(controls, 'pointCount').min(1000).max(100000).onChange(redraw)
    gui.addColor(controls, 'pointColor').onChange(redraw)

    gui.add(controls, 'draw')

    document.onkeyup = function (e) {
        if (e.key === "Escape") {
            controls.draw = !controls.draw
            gui.updateDisplay()
        }
    }

    redraw()
}