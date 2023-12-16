import { ScoreManager } from './ScoreManager';
import { CountdownTimer } from './CountdownTimer';

type GameManagerConfig = {
  leftImage: Phaser.GameObjects.Image
  rightImage: Phaser.GameObjects.Image
  spots: { x: number, y: number, width: number, height: number }[]
  countdownTimer: CountdownTimer,
  failedCallback: () => void,
  completedCallback: () => void
};

export class GameManager {
  public leftImage: Phaser.GameObjects.Image;

  public rightImage: Phaser.GameObjects.Image;

  private scoreManager: ScoreManager;

  private countdownTimer: CountdownTimer;

  private spots: Phaser.GameObjects.Zone[] = [];

  public isGamePaused: boolean = false;

  /** @param ゲーム失敗時のコールバック */
  private failedCallback: () => void;

  /** @param finishedCallback ゲームがクリアになった時のコールバック */
  private completedCallback: () => void;

  constructor(private scene: Phaser.Scene, private config: GameManagerConfig) {
    // 画像を設定
    this.leftImage = this.config.leftImage;
    this.rightImage = this.config.rightImage;

    // spots から間違い探しのスポットを作成
    while (this.config.spots.length > 0) {
      const spot = this.config.spots.pop();
      if (spot) {
        // spot を作成して、scene と spots に追加
        this.spots.push(this.scene.add.existing(this.generateSpot(spot.x, spot.y, spot.width, spot.height)));
      }
    }

    // スコアマネージャー作成
    const scoreLabel = this.scene.add.text(0, 0, '0', { fontSize: '32px' });
    this.scoreManager = new ScoreManager(this.scene, scoreLabel, 2, () => {
      this.completeGame();
    });

    // タイマーを設定
    this.countdownTimer = this.config.countdownTimer;

    // ゲーム失敗時のコールバックを設定
    this.failedCallback = this.config.failedCallback;

    // ゲームクリアしたとのコールバックを設定
    this.completedCallback = this.config.completedCallback;

    // ゲームスタート
    this.startGame();
  }

  /**
   * ゲームをポーズする
   */
  public pauseGame() {
    this.countdownTimer.pause();
    this.isGamePaused = true;
    this.disableSpots();
  }

  /**
   * ゲームを再開する
   */
  public resumeGame() {
    this.countdownTimer.resume();
    this.isGamePaused = false;
    this.enableSpots();
  }

  private startGame() {
    // タイマー起動
    this.countdownTimer.start(() => {
      // 時間切れならゲームオーバー
      this.failGame();
    }, 5000);
  }

  /**
   * ゲーム失敗時の処理
   */
  private failGame() {
    this.countdownTimer.stop();
    this.failedCallback();
  }

  /**
   * ゲームクリア時の処理
   */
  private completeGame() {
    this.countdownTimer.stop();
    this.completedCallback();
  }

  /**
   * 間違っている場所を作成する
   */
  private generateSpot(x: number, y: number, width: number, height: number) {
    const spot = this.scene.add.zone(x, y, width, height);
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xff0000, 0.5);
    graphics.fillRect(spot.x - 5, spot.y - 5, 10, 10);
    spot.setInteractive({
      useHandCursor: true,
    });
    spot.on('pointerdown', () => {
      this.scoreManager.increment();
      // クリック判定を消す
      spot.removeInteractive();

      // 正解のオブジェクトに spot を変更する
      this.generateCorrectObject(x, y, width, width / 2);

      // もとの graphics を消す
      spot.destroy();
      graphics.destroy();
    });
    return spot;
  }

  /**
   * 間違ってる箇所をクリックできないようにする
   */
  private disableSpots() {
    this.spots.forEach((spot) => {
      spot.removeInteractive();
    });
  }

  /**
   * 間違ってる箇所をクリックできるようにする
   */
  private enableSpots() {
    this.spots.forEach((spot) => {
      spot.setInteractive({
        useHandCursor: true,
      });
    });
  }

  /**
   * 正解オブジェクトの作成
   * @param x 正解スポットの中心のX座標
   * @param y 正解スポットの中心のY座標
   * @param outerRadius 外側の円の半径
   * @param thickness ドーナツの太さ（外側の円と内側の円の半径の差）
   */
  private generateCorrectObject(x: number, y: number, outerRadius: number = 15, thickness: number = 5) {
    const graphics = this.scene.add.graphics();

    graphics.lineStyle(thickness, 0x00ff00, 0.5); // 線の太さ、色（緑）、不透明度
    graphics.strokeCircle(x, y, outerRadius - thickness / 2);
  }
}
