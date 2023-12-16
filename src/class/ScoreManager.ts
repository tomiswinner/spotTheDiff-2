export class ScoreManager {
  private scene: Phaser.Scene;

  private label: Phaser.GameObjects.Text;

  private count: number = 0;

  private maxCount: number;

  /** ゲームクリア時に呼ばれる関数 */
  private callback?: () => void;
  // TODO: ここに

  constructor(scene: Phaser.Scene, label: Phaser.GameObjects.Text, maxCount: number, callback: () => void) {
    this.scene = scene;
    this.label = label;
    this.maxCount = maxCount;
    this.callback = callback;
  }

  public increment(): void {
    // https://eslint.org/docs/latest/rules/no-plusplus
    // ++ は↑ルールの通り、セミコロンの挿入場所によって挙動が変わるので使わない
    this.count += 1;
    this.label.text = this.count.toString();
    if (this.count >= this.maxCount) {
      // Execute the callback function if it exists
      if (this.callback) {
        this.callback();
      }
    }
  }
}
