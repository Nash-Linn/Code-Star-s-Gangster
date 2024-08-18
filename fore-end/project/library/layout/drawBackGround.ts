export function drawCodeRain(selector:string) {
  const canvas = document.querySelector(selector) as HTMLCanvasElement
  const ctx = canvas.getContext('2d') !

  //获取窗口尺寸
  const width = window.innerWidth * devicePixelRatio
  const height = window.innerHeight * devicePixelRatio

  canvas.width = width
  canvas.height = height

  //字体大小
  const fontSize = 20 * devicePixelRatio

  //列宽
  const columnWidth = fontSize

  //列数
  const columnsCount = Math.floor(width / columnWidth)

  //每一列下一个文字是第几个文字
  const nextChar = new Array(columnsCount).fill(0)

  //随机颜色
  function randomColor() {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
  }

  //随机文字
  function getRandomChar() {
    const str = "Code Star's Gangster welcome you"
    return str[Math.floor(Math.random() * str.length)]
  }

  //画一行文字
  function draw() {
    if(ctx === null) return
    ctx.fillStyle = 'rgba(240,240,240,0.1)'
    ctx.fillRect(0, 0, width, height)
    for (let i = 0; i < columnsCount; i++) {
      ctx.fillStyle = randomColor()
      const char = getRandomChar()
      ctx.font = `${fontSize}px Arial`

      const x = i * columnWidth
      const s = nextChar[i]
      const y = (s + 1) * fontSize
      ctx.fillText(char, x, y)
      if (y > height && Math.random() > 0.9) {
        nextChar[i] = 0
      } else {
        nextChar[i]++
      }
      nextChar[i]++
    }
  }

  draw()
  setInterval(() => {
    draw()
  }, 50)
}
