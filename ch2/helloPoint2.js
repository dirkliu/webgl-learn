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
  const canvas = document.getElementById('webgl')

  const gl = getWebGLContext(canvas)
  if (!gl) {
    console.log('webgl is not suportted!')
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

  gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 1.0, 1.0)

  // 清空canvas
  gl.clear(gl.COLOR_BUFFEER_BIT)

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1)
}