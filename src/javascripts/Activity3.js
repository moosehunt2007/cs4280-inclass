import { WebGLHelper } from './webgl_helper'
import * as dat from 'dat.gui'

export function displayActivity3() {
    let canvas = document.querySelector("#webgl-scene")
    let gl = WebGLHelper.initWebGL(canvas)
    const vs_script = `#version 300 es
    in vec3 coordinates;
    in vec3 color;
    uniform float theta;
    out vec4 vColor;
    void main(void) {
      gl_Position.x = coordinates.x * cos(theta);
      gl_Position.y = coordinates.y * sin(theta);
      gl_Position.z = coordinates.z;
      gl_Position.w = 1.0;
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
    let objects = [{
        name: "triangle",
        vs_shader: vs_script,
        fs_shader: fs_script,
        vertices: [-1, 1, 0, -.5, 1, 0, -1, .5, 0],
        controls: {
            color: '#FF0000',
            speed: 0.01,
            theta: 0.0,
            direction: 1, // anticlockwise
            primitive: gl.TRIANGLES
        }
    }
    , {
        name: "rectangle",
        vs_shader: vs_script,
        fs_shader: fs_script,
        vertices: [.5, -1, 0, 1, -.5, 0, 1, -1, 0,
            .5, -1, 0, 1, -.5, 0, .5, -.5, 0],
        controls: {
            color: '#00FF00',
            speed: 0.02,
            theta: 0.0,
            direction: -1, // clockwise
            primitive: gl.TRIANGLES
        }
    }, {
        name: "circle",
        vs_shader: vs_script,
        fs_shader: fs_script,
        vertices: (function () {
            let points = [0, 0, 0]
            let pcount = 40
            let ang = 2 * Math.PI / pcount
            let r = .3
            for (let i = 0; i <= pcount; i++) {
                points.push(r * Math.cos(ang * i) + .45, r * Math.sin(ang * i) - .45, 0)
            }

            return points
        }
        )(),
        controls: {
            color: '#0000FF',
            speed: 0.01,
            theta: 0.0,
            direction: 1, // anticlockwise
            primitive: gl.TRIANGLE_FAN
        }
    }
]

    for (let o of objects) {
        o.program = WebGLHelper.initShaders(gl, o.vs_shader, o.fs_shader)
        gl.useProgram(o.program)
        WebGLHelper.initBuffers(gl, o.program, [
            {
                name: 'coordinates',
                size: 3,
                data: o.vertices
            }
        ])

        o.program.theta = 0.0
    }

    function animate() {
        WebGLHelper.clear(gl, [1, 1, 1, 1])

        for (let o of objects) {
            gl.useProgram(o.program)

            WebGLHelper.resetBuffers(gl, o.program, [
                {
                    name: 'coordinates',
                    size: 3,
                    data: o.vertices
                }
            ])

            WebGLHelper.loadAttributeF(gl, o.program, 'color', ...WebGLHelper.getColorFromHex(o.controls.color))
            o.program.theta = (o.program.theta + o.controls.speed) % (Math.PI * 2)

            // let th = gl.getUniformLocation(o.program, 'theta')
            // gl.uniform1f(th, o.program.theta * o.controls.direction);
            WebGLHelper.loadUniformF(gl, o.program, 'theta', o.program.theta * o.controls.direction)

            console.log(o.controls.primitive)
            gl.drawArrays(o.controls.primitive, 0, o.vertices.length / 3)
        }

        requestAnimationFrame(animate)
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    for (let o of objects) {
        let f = gui.addFolder(o.name)
        f.addColor(o.controls, 'color')
        f.add(o.controls, 'speed').min(0.001).max(.1)
        f.add(o.controls, 'theta').min(0).max(2 * Math.PI)
        f.add(o.controls, 'direction', { clockwise: 1, counterclockwise: -1 })
        f.add(o.controls, 'primitive', {
            points: gl.POINTS,
            lines: gl.LINES,
            line_strip: gl.LINE_STRIP,
            line_loop: gl.LINE_LOOP,
            triangles: gl.TRIANGLES,
            triangle_strip: gl.TRIANGLE_STRIP,
            triangle_fan: gl.TRIANGLE_FAN
        })
        f.open()
    }
}
