const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
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

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  canvas.addEventListener('click', (ev) => {
    click(ev, gl, canvas, a_Position, u_FragColor)
  }, false)

  var gl_points = [];
  var gl_colors = [];
  function click(ev, gl, canvas, a_Position){
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = ((canvas.width / 2 - (y - rect.top)) / (canvas.width/2));
    gl_points.push([x, y]);

    if (x >= 0.0 && y >= 0.0) { // 第一象限
      gl_colors.push([1.0, 0.0, 0.0, 1.0]) // 红色
    } else if(x < 0.0 && y < 0.0) { // 第三象限
      gl_colors.push([0.0, 1.0, 0.0, 1.0]) // 绿色
    } else {
      gl_colors.push([1.0, 1.0, 1.0, 1.0])
    }
    gl.clear(gl.COLOR_BUFFEER_BIT)
  
    console.log('gl_points:', gl_points)
  
    var len = gl_points.length;
    for(var i = 0; i < len; i++) {
      var xy = gl_points[i];
      var rgba = gl_colors[i];
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
}