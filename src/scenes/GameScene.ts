import CountdownTimer from '../class/CountdownTimer';

export class GameScene extends Phaser.Scene { 
  // TODO: タイマーを undefined にせずに初期化する方法はないか
  private countdownTimer: CountdownTimer | undefined

  constructor() {
    super('game')

  }

  preload() {
    // 画像の読み込み
    this.load.image('saize1', 'assets/saize-1.png')
    this.load.image('saize2', 'assets/saize-2.png')

  }

  create() {
    const {width, height} = this.game.canvas

    // 画像の表示
      // UIもフロントと、、、分ける、、いやわけない
      // 正解判定と、画像判定で分けりゃいいだけだ
      // あーでもこれ多分クラスにした方がいいよな
      // 画像、正解判定をもつクラスを作って、それを配列で管理する
      // DialogBox を参考にするか、ただ先に zone で作ってからクラスに移動させよう
    const saize1 = this.add.image(width / 2 + 200 , height / 2, 'saize1')
    const saize2 = this.add.image(width / 2 - 200, height / 2, 'saize2')

    const {x, y} = saize2.getBounds()

    // クリック判定の表示
      // こいつは zone で作る
    

    // リセットボタンの表示
    // タイマーの表示    
    const textStyle = { fontSize: 24, color: '#ff0000'}
    const timerLabel = this.add.text(width / 2, height / 32, '5.00', textStyle).setOrigin(0.5)
    this.countdownTimer = new CountdownTimer(this, timerLabel)
    this.countdownTimer.start(()=> {
      this.scene.start('ending')
    }, 5000)

    // 仮置きのボタン
    this.add.text(width / 2, height / 2, 'ゲーム画面,クリックしてエンディング').setOrigin(0.5)
    const zone = this.add.zone(width / 2, height / 2, width, height)
    zone.setInteractive({
      useHandCursor: true
    })
    zone.on('pointerdown', () => {
      this.scene.start('ending')
    })
  }

  update() {
    if (!this.countdownTimer) {
      return
    }
    // タイマーの更新
    this.countdownTimer.update()
  }
}
