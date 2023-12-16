import { GameManager } from './GameManager';

export class StopButton extends Phaser.GameObjects.Zone {
  private text: Phaser.GameObjects.Text;

  private isButtonEnabled: boolean = true;

  private graphics: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    private gameManager: GameManager,
    private menuScreen: Phaser.GameObjects.Container,
  ) {
    super(scene, x, y, width, height);
    scene.add.existing(this);
    this.setInteractive({ useHandCursor: true }).setOrigin(0, 0);
    this.text = scene.add.text(x + width / 2, y + height / 2, 'STOP', { fontSize: 24, color: '#ff0000' }).setOrigin(0.5);
    // TODO: fillRect あってるかチェック
    this.graphics = this.scene.add.graphics();
    this.graphics.fillStyle(0x000000, 0.5);
    this.graphics.fillRect(x, y, width, height);

    this.on('pointerdown', () => {
      if (this.gameManager.isGamePaused) {
        this.resumeGame();
      } else {
        this.pauseGame();
      }
    });
  }

  /**
   * ゲームを一時停止する
   */
  // TODO: GameManager にもポーズ機能を実装する
  public pauseGame() {
    if (!this.isButtonEnabled) return;

    this.gameManager.pauseGame();
    this.text.setText('RESTART');
    // メニューを表示する
    this.menuScreen.setVisible(true);
  }

  /**
   * ゲームを再開する
   */
  public resumeGame() {
    if (!this.isButtonEnabled) return;
    this.gameManager.resumeGame();
    this.text.setText('STOP');
    // メニューを非表示にする
    this.menuScreen.setVisible(false);
  }

  public disableButton() {
    this.isButtonEnabled = false;
  }
}
