import { CountdownTimer } from '../class/CountdownTimer';
import { GameManager } from '../class/GameManager';
import { StopButton } from '../class/StopButton';

export class GameScene extends Phaser.Scene {
  // ここで初期化しておくことで、GameScene の中で this.countdownTimer としてアクセスできる
  private countdownTimer?: CountdownTimer;

  private stopButton?: StopButton;

  constructor() {
    super('game');
    this.countdownTimer = undefined;
  }

  preload() {
    // 画像の読み込み
    this.load.image('saize1', 'assets/saize-1.png');
    this.load.image('saize2', 'assets/saize-2.png');
  }

  create() {
    const { width, height } = this.game.canvas;

    // TODO: このままだと技術的負債が溜まっていくから、何かしら開発にプラスになる拡張やテストなど調べる

    // TODO: タイマーの装飾
    // タイマーの表示 ※ここで管理しないと update ができない
    const textStyleTimer = { fontSize: 24, color: '#ff0000' };
    const timerLabel = this.add.text(width / 2, height / 32, '5.00', textStyleTimer).setOrigin(0.5);
    this.countdownTimer = new CountdownTimer(this, timerLabel);

    // 画像の表示
    const saize1 = this.add.image(width / 2 - 200, height / 2, 'saize1');
    const saize2 = this.add.image(width - 200, height / 2, 'saize2');

    const { x, y } = saize2.getBounds();

    // ゲームを管理するクラスを作成
    const gameManeger = new GameManager(
      this,
      {
        leftImage: saize1,
        rightImage: saize2,
        spots: [
          {
            x, y, width: 10, height: 10,
          },
          {
            x: x / 2, y: y / 2, width: 10, height: 10,
          },
        ],
        countdownTimer: this.countdownTimer,
        // timer
        failedCallback: () => {
          // TODO: failedCallback の中身をちゃんとかく
          console.log('失敗');

          // TODO: リセットボタンの装飾
          // リセットボタンを表示させる
          this.add.text(width / 2, height / 16, 'ゲーム失敗、リスタートする？').setOrigin(0.5);
          const zone = this.add.zone(width / 2, height / 16, width, height);
          zone.setInteractive({
            useHandCursor: true,
          });
          zone.on('pointerdown', () => {
            this.scene.restart();
          });

          // TODO: これあれだ、ゲームのUI設計をなんかで作らないといけないな
        },
        completedCallback: () => {
          // TODO: completedCallback の中身をちゃんとかく
          console.log('成功');
        },
      },
    );

    // ポーズ中のメニュー画面、最初は非表示

    // TODO: menuScreen のクラスを作る
    // TODO: GameManager にもポーズ機能を実装する
    const blackOverlay = this.add.rectangle(0, 0, width, height, 0X000000, 0.9).setOrigin(0, 0).setInteractive();
    const menuScreen = this.add.container(0, 0);
    menuScreen.add(blackOverlay);
    menuScreen.setVisible(false);

    // TODO: stop ボタンの装飾
    const stopButton = new StopButton(this, width - 100, 100, 100, 50, gameManeger, menuScreen);

    // TODO: 多分セーブポイント見たいの作らないとだるくてやってられないよな

    // TODO: 次は、画面を縦長にするか

    // TODO: こいつをステージに対応させるためにも、GameConfig を GameScene に渡す必要がある
    // TODO: ゲームのデータってどう管理したらいいんだろう
  }

  update() {
    if (!this.countdownTimer) {
      return;
    }
    // タイマーの更新
    this.countdownTimer.update();
  }

  /**
   * ゲームが完了したときの処理
   */
  completeGame() {
    // TODO: 多分だけど、ゲームが終了した時の処理とゲームが失敗した時の処理をどちらも書く必要があり、さらにその中で共通でやらなきゃいかん処理を切り出す必要がある
    // TODO: 多分これの関数を completedCallback へ渡す必要がある
    this.stopButton?.disableButton();
  }
}
