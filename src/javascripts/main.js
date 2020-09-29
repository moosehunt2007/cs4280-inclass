// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//Then: comes everything else
// Shaders
import vs_script from "../shaders/vertex-color.glsl"
import fs_script from "../shaders/fragment-color.glsl"

// JavaScript
 import { scribble, displayMultiprogram, sierpinski } from './week05'
//  displayMultiprogram()
sierpinski()

// import { displayColoredTriangles } from './Activity3'

import {displayCube} from './week06'
// displayCube()
