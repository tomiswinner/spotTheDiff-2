
export class ScoreManager {
    private scene: Phaser.Scene
    private label: Phaser.GameObjects.Text 
    private count: number = 0
    private maxCount: number 

    /** ゲームクリア時に呼ばれる関数 */
    private callback?: () => void
    // TODO: ここに

    constructor(scene: Phaser.Scene, label: Phaser.GameObjects.Text, maxCount: number, callback: () => void) {
      this.scene = scene
      this.label = label
      this.maxCount = maxCount
      this.callback = callback
    }

    public increment(): void {
      this.count++;
      this.label.text = this.count.toString();
      if (this.count >= this.maxCount) {
        // この書き方は、callback が存在する場合は実行する
        this.callback && this.callback()
      }
    }

}
