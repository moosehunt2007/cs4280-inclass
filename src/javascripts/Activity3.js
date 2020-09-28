// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "William 'Chris' Hunt"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else
// JavaScript
import vs_script from "../shaders/vertex-color.glsl"
import fs_script from "../shaders/fragment-color.glsl"
import { WebGLHelper } from './webgl_helper'

displayColoredTriangles(vs_script, fs_script)

export function displayColoredTriangles(vs_script, fs_script) {
    let canvas = document.querySelector("#webgl-scene")
    let gl = WebGLHelper.initWebGL(canvas)

    let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    gl.useProgram(program)

    WebGLHelper.initBuffers(gl, program, [{
        name: 'coordinates',
        size: 3,
        data: [0, 0, 0, .5, .5, 0, -.5, .5, 0,
            0, 0, 0, .5, .5, 0, .5, -.5, 0,            
            - .5, .5, 0, 0, 0, 0, - .5, -.5, 0,
            0, 0, 0, -.5, -.5, 0, .5, -.5, 0,]       
    }, {
        name: 'color',
        size: 3,
        data: [0, 0, 1, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 0, 0, 1,      
            1, 0, 0, 1, 0, 0, 1, 0, 0,     
            0, 1, 0, 0, 1, 0, 0, 1, 0,
            ]
    }])

    gl.drawArrays(gl.TRIANGLES, 0, 15)

    // WebGLHelper.initBuffers(gl, program, [{
    //     name: 'coordinates',
    //     size: 3,
    //     data: [0, 0, 0, .5, -.5, 0, -.5, -.5, 0,
    //         -.3, .5, 0, .5, .5, 0, -0.3, .5, 0]
    // }, {
    //     name: 'color',
    //     size: 3,
    //     data: [
    //         0.254, 0.790, .0237, .254, .790, .0237, .254, .790, .0237]
    // }])

    // gl.drawArrays(gl.TRIANGLES, 1, 15)

    // -.3, .5, 0, .5, .5, 0, -0.3, .5, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0,
}