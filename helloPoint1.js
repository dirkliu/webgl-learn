const VSHADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
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

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 1.0, 1.0)

  // 清空canvas
  gl.clear(gl.COLOR_BUFFEER_BIT)

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1)
}