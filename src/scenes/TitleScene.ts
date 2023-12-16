export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width / 2, height / 2, 'logo');

    this.add.text(width / 2, height / 2 + 60, 'クリックでスタート').setOrigin(0.5);
    // 画面全体にゾーンを作成
    const zone = this.add.zone(width / 2, height / 2, width, height);

    zone.setInteractive({
      useHandCursor: true, // マウスオーバー時にカーソルをpointerに変更
    });

    // クリックでメインシーンへ移動
    zone.on('pointerdown', () => {
      this.scene.start('story', { timelineID: 'start' });
    });
  }
}
