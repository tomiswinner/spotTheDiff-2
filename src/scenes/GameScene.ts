import { CountdownTimer } from '../class/CountdownTimer';
import { GameManager } from '../class/GameManager';

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

    // リセットボタンの表示
    // タイマーの表示, ここで管理しないと update ができない   
    const textStyle = { fontSize: 24, color: '#ff0000'}
    const timerLabel = this.add.text(width / 2, height / 32, '5.00', textStyle).setOrigin(0.5)
    this.countdownTimer = new CountdownTimer(this, timerLabel)

    // 画像の表示
    const saize1 = this.add.image(width/2 - 200, height/2, 'saize1')
    const saize2 = this.add.image(width - 200, height/2, 'saize2')

    const {x, y} = saize2.getBounds()


    // TODO: 次は、画面を縦長にするか

    // ゲームを管理するクラスを作成
    const gameManger = new GameManager(
      this,
      {
        leftImage: saize1,
        rightImage: saize2,
        spots: [
          { x: x, y: y, width: 10, height: 10 },
          { x: x/2, y: y/2, width: 10, height: 10 }
        ],
        countdownTimer: this.countdownTimer,
        failedCallback: () => {
          // TODO: failedCallback の中身をちゃんとかく　
          alert('失敗')
          // リセットボタンを表示させる
          this.add.text(width / 2, height / 16, 'ゲーム失敗、リスタートする？').setOrigin(0.5)
          const zone = this.add.zone(width / 2, height / 16, width, height)
          zone.setInteractive({
            useHandCursor: true
          })
          zone.on('pointerdown', () => {
            this.scene.restart()
          })
        },
        completedCallback: () => {
          // TODO: completedCallback の中身をちゃんとかく　
          alert('クリア')
        }
      }
    )
  }

  update() {
    if (!this.countdownTimer) {
      return
    }
    // タイマーの更新
    this.countdownTimer.update()
  }
}
