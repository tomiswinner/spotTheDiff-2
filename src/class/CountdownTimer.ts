export class CountdownTimer {
  private scene: Phaser.Scene
  private timerEvent?: Phaser.Time.TimerEvent
  private duration: number = 0
  private label: Phaser.GameObjects.Text
  private finishedCallback?: () => void

  constructor(scene: Phaser.Scene, label: Phaser.GameObjects.Text) {
    this.scene = scene
    this.label = label
  }

  /**
   * タイマーを開始する 
   */
  start(callback: () => void, duration: number = 45000) {
    this.stop()

    this.finishedCallback = callback
    this.duration = duration

    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        this.label.text = '0'
        this.stop()
        if(callback) {
          callback()
        }
      }
    })
  }

  /**  
   * タイマーを止める
  */
  stop() {
    if (this.timerEvent) {
      this.timerEvent.destroy()
      this.timerEvent = undefined
    }
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return
    }

    const elapsed = this.timerEvent.getElapsed()
    const remaining = this.duration - elapsed
    const seconds = remaining / 1000

    this.label.text = `残り${seconds.toFixed(2)}`

  }
  
}
