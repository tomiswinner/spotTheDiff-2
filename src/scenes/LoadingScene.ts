export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    this.load.image('logo', 'assets/spotthediff.png');
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width / 2, height / 2, 'logo');

    this.add.text(width / 2, height / 2 + 200, 'Loading...').setOrigin(0.5);

    // アセットをロード（一度ロードしたアセットは他のシーンでも使用可）
    this.load.image('street', 'assets/street.png');
    this.load.image('robot', 'assets/robot.png');

    // アセットロード完了時の処理
    this.load.on('complete', () => {
      this.scene.start('title');
    });

    // preload 以外でアセットをロードする場合は以下のメソッドを呼ぶ
    this.load.start();
  }
}
