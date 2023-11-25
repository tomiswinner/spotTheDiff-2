import CountdownTimer from '../class/CountdownTimer';

export class GameScene extends Phaser.Scene { 
  // TODO: タイマーを undefined にせずに初期化する方法はないか
  private countdownTimer: CountdownTimer | undefined

  constructor() {
    super('game')

  }

  preload() {
    // 画像の読み込み
  }

  create() {
    // 画像の表示
    // クリック判定の表示
    // リセットボタンの表示
    // タイマーの表示    
    const {width, height} = this.game.canvas
    const textStyle = { fontSize: 48, color: '#ff0000'}
    const timerLabel = this.add.text(width / 2, height / 16, '5.00', textStyle).setOrigin(0.5)
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
