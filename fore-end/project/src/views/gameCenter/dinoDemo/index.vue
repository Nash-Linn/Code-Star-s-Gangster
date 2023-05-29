<template>
  <div id="dino-demo"></div>
</template>
<script setup>
import * as PIXI from 'pixi.js'
import { onMounted } from 'vue'
import gameBaseTexture from '@/assets/games/dino/game.png'
onMounted(() => {
  renderGame()
})

const renderGame = () => {
  const containerDom = document.querySelector('#dino-demo')
  //创建应用
  const app = new PIXI.Application({
    width: containerDom.clientWidth - 40,
    height: containerDom.clientHeight - 40,
    backgroundColor: 0xffffff,
    resolution: containerDom.devicePixelRatio || 1,
    antialias: true //抗锯齿
  })

  //将应用画布添加到dom中
  containerDom.appendChild(app.view)

  //创建容器
  const container = new PIXI.Container()
  //将容器添加到舞台
  app.stage.addChild(container)
  //添加恐龙游戏的精灵纹理
  const baseTexture = PIXI.BaseTexture.from(gameBaseTexture)

  //创建恐龙纹理
  const dinoTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(75, 0, 88, 100))
  //创建恐龙精灵
  const dino = new PIXI.Sprite(dinoTexture)
  dino.visible = false
  container.addChild(dino)

  //恐龙跑步动画
  const runTextures = []
  for (let i = 0; i < 2; i++) {
    runTextures.push(
      new PIXI.Texture(baseTexture, new PIXI.Rectangle(1680 + (2 + i) * 88, 0, 82, 100))
    )
  }
  const runAnimation = new PIXI.AnimatedSprite(runTextures)
  runAnimation.animationSpeed = 0.1
  runAnimation.play()
  runAnimation.visible = false
  container.addChild(runAnimation)

  //恐龙跳跃精灵
  const jumpTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(1680, 0, 82, 100))
  const jumpSprite = new PIXI.Sprite(jumpTexture)
  jumpSprite.x = 60
  jumpSprite.y = app.screen.height - 50 - 100
  jumpSprite.visible = false
  container.addChild(jumpSprite)

  //创建地面精灵
  const groundTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(50, 100, 2300, 30))
  const groundSprite = new PIXI.TilingSprite(groundTexture, 2300, 30) //平铺精灵
  groundSprite.width = app.screen.width
  groundSprite.y = 30
  //设置地面精灵的位置
  groundSprite.position.set(0, app.screen.height - 50)
  container.addChild(groundSprite)

  //创建仙人掌精灵
  const cactusTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(515, 0, 30, 60))
  const cactusSprite = new PIXI.Sprite(cactusTexture)
  cactusSprite.visible = true
  cactusSprite.x = app.screen.width / 2
  cactusSprite.y = app.screen.height - 50 - 60
  container.addChild(cactusSprite)

  //创建文字 开始游戏
  const startText = new PIXI.Text('开始游戏', {
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: '#333333',
    aligfn: 'center'
  })
  startText.x = app.screen.width / 2
  startText.y = app.screen.height / 2
  startText.anchor.set(0.5)
  container.addChild(startText)

  //设置文字交互
  startText.interactive = true
  startText.on('click', () => {
    palyGame()
  })

  //判断是否在游戏中
  let isGaming = false
  //游戏结束
  let isGameover = false

  //开始游戏
  function palyGame() {
    isGaming = true

    //隐藏文字
    startText.visible = false

    //显示恐龙跑步动画
    runAnimation.visible = true
    runAnimation.x = 60
    runAnimation.y = app.screen.height - 50 - 100
  }

  // 游戏得分
  let score = 0

  //创建文字 分数
  const scoreText = new PIXI.Text(`分数：${score}`, {
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: '#333333',
    aligfn: 'center'
  })
  scoreText.x = app.screen.width - 200
  scoreText.y = 50
  scoreText.anchor.set(0.5)
  container.addChild(scoreText)

  //初始化跳跃的速度
  let jumpVelocity = 20
  //初始化重力
  let gravity = 1

  //游戏循环
  app.ticker.add(() => {
    if (isGameover) return
    if (!isGaming) return

    //地面移动
    groundSprite.tilePosition.x -= 10
    //仙人掌移动
    cactusSprite.x -= 10
    if (cactusSprite.x < -30) {
      cactusSprite.x = app.screen.width
      score++
      scoreText.text = `分数：${score}`
    }

    if (jumpSprite.visible) {
      jumpVelocity -= gravity
      jumpSprite.y -= jumpVelocity
      if (jumpSprite.y >= app.screen.height - 50 - 100) {
        jumpSprite.y = app.screen.height - 50 - 100
        jumpVelocity = 20
        jumpSprite.visible = false
        runAnimation.visible = true
      }
    }

    //检测碰撞
    if (
      runAnimation.visible &&
      runAnimation.y + 60 > cactusSprite.y &&
      runAnimation.x + 60 > cactusSprite.x &&
      runAnimation.x - 60 < cactusSprite.x
    ) {
      gameOver()
    }
  })

  //游戏结束
  function gameOver() {
    isGaming = false
    isGameover = true
    runAnimation.visible = false
    jumpSprite.visible = false
    overText.visible = true
    overText.text = `游戏结束，得分：${score}`
  }

  //创建文字 结束游戏
  const overText = new PIXI.Text(`游戏结束，得分：`, {
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: '#333333',
    aligfn: 'center'
  })
  overText.x = app.screen.width / 2
  overText.y = app.screen.height / 2
  overText.anchor.set(0.5)
  overText.visible = false
  container.addChild(overText)

  //重新开始游戏
  overText.interactive = true
  overText.on('click', () => {
    isGameover = false
    score = 0
    overText.visible = false
    cactusSprite.x = app.screen.width / 2
    palyGame()
  })

  //恐龙跳跃
  window.addEventListener('keydown', (e) => {
    if (jumpSprite.visible || !isGaming) {
      return
    }
    if (e.code === 'Space') {
      runAnimation.visible = false
      jumpSprite.visible = true
      jumpVelocity = 20
    }
  })
}
</script>

<style lang="less" scoped>
#dino-demo {
  width: 100%;
  padding: 20px;
  height: @main-height;
  border-radius: @base-border-radius;
}
</style>
