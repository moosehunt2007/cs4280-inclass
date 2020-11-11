// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "William 'Chris' Hunt"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else
// Shaders
// import vs_script from "../shaders/vertex-color.glsl"
// import fs_script from "../shaders/fragment-color.glsl"

// JavaScript
// import {scribble} from './week05'
// scribble()

// import { displayCube, displayCubeIndexed, displayPyramid } from './week06'
// displayCubeIndexed()

// import {displayMultipleCubes} from './Week07'
// displayMultipleCubes()

// import {displaySphere, displayCube} from './Week07'
// displayCube()
// displaySphere()

// import {displayCube} from './Activity5'
// displayCube()

// import {displayThreeHelloWorld, displayAnimatedCube, displayCubeScene} from './Week08'
// displayThreeHelloWorld()
// displayAnimatedCube()
// displayCubeScene()

// import { displayMeshes } from './Week09'
// displayMeshes()

// import {displayTexturedScene, displayCity} from './Week10'
// // displayTexturedScene()
// displayCity()

// import { displayCubeScene } from './Activity08'
// displayCubeScene()

// import {displayTexturedScene2} from './Week12'
// displayTexturedScene2()
// import {displayOcean} from './Week12'
// displayOcean()

// import {displayScene} from './Week12-physics'
// displayScene()

import {displayPath} from './Week12-path'
displayPath()


// import { displayTexturedScene, displayCity, displaySolar, displayCubes, displayTexturedScene2} from './week11'
// //displayCity()
// // displaySolar()
// // displayCubes()
// displayTexturedScene2()

// import { WebGLHelper } from './webgl_helper'

// // displayColoredTriangles(vs_script, fs_script)

// export function displayColoredTriangles(vs_script, fs_script) {
//     let canvas = document.querySelector("#webgl-scene")
//     let gl = WebGLHelper.initWebGL(canvas)

//     let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
//     gl.useProgram(program)

//     WebGLHelper.initBuffers(gl, program, [{
//         name: 'coordinates',
//         size: 3,
//         data: [0, 0, 0, .5, .5, 0, .5, -.5, 0]
//     }, {
//         name: 'color',
//         size: 3,
//         data: [1, 0, 0, 0, 1, 0, 0, 0, 1]
//     }])

//     WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])
//     gl.drawArrays(gl.TRIANGLES, 0, 3)
// }
