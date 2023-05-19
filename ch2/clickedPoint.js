const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  
  if(!gl) {
    console.log('webgl is not supported!')
    return 
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Init shaders failed')
    return
  }

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get position')
    return 
  }

  canvas.addEventListener('click', (ev) => {
    click(ev, gl, canvas, a_Position)
  }, false)

  // gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);
  gl.clear(gl.COLOR_BUFFEER_BIT)
}

var gl_points = [];
function click(ev, gl, canvas, a_Position){
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();
  x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
  y = ((canvas.width / 2 - (y - rect.top)) / (canvas.width/2));
  gl_points.push(x);
  gl_points.push(y);
  gl.clear(gl.COLOR_BUFFEER_BIT)

  console.log('gl_points:', gl_points)

  var len = gl_points.length;
  for(var i = 0; i < len; i += 2) {
    gl.vertexAttrib3f(a_Position, gl_points[i], gl_points[i + 1], 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
