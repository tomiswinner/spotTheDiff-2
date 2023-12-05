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
   * タイマーを一時停止する
   */
  pause() {
    if (this.timerEvent) {
      this.timerEvent.paused = true
    }
  }

  /**
   * タイマーを再開する
   */
  resume() {
    if (this.timerEvent) {
      this.timerEvent.paused = false
    }
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
    // タイマーが開始してるか、duration が 0 か、一時停止中ならタイマーを更新しない
    if (!this.timerEvent || this.duration <= 0 || this.timerEvent.paused) {
      return
    }

    // elapsed は経過時間
    const elapsed = this.timerEvent.getElapsed()
    const remaining = this.duration - elapsed
    const seconds = remaining / 1000

    this.label.text = `残り${seconds.toFixed(2)}`

  }
  
}
