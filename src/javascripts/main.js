// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "William 'Chris' Hunt"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else
// Shaders
import vs_script from "../shaders/vertex.glsl"
import fs_script from "../shaders/fragment.glsl"

// JavaScript
import {scribble, sierpinski, displayMultiProgram} from './week05'
displayMultiProgram()

import { WebGLHelper } from './webgl_helper'

