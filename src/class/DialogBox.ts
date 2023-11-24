export type DialogBoxConfig = {
  x: number,
  y: number,
  width: number,
  height: number,
  padding?: number,
  margin?: number,
  textStyle?: Phaser.Types.GameObjects.Text.TextStyle,
}

export class DialogBox extends Phaser.GameObjects.Container {
  private box: Phaser.GameObjects.Rectangle
  private text: Phaser.GameObjects.Text

  private actorNameBox: Phaser.GameObjects.Rectangle
  private actorNameText: Phaser.GameObjects.Text

  private padding: number

  constructor(public scene: Phaser.Scene, { x, y, width, height, padding=10, margin=10, textStyle={} }: DialogBoxConfig) {
    // Phaser.GameObjects.Containerのコンストラクタ
    super(scene, 0, 0);

    this.box = new Phaser.GameObjects.Rectangle(this.scene, x, y, width, height, 0x000000).setStrokeStyle(1, 0xffffff)
    this.add(this.box)

    const dialogBoxTextStyle = {
      ...textStyle,
      wordWrap: { width: width - padding * 2 }, useAdvancedWrap: true // useAdvanceWrap で日本語の折り返し対応
    }

    // 会話テキスト用のTextを作成
    this.text = new Phaser.GameObjects.Text(this.scene, x - width/2 + padding, y - height/2 + padding, '', dialogBoxTextStyle);
    this.add(this.text);  // Containerへの追加


    // 高さ40の白枠付きの黒いRectangleを作成
    this.actorNameBox = new Phaser.GameObjects.Rectangle(this.scene, x - width/2, y - height/2 - margin, 0, 40, 0x000000).setStrokeStyle(1, 0xffffff);
    this.actorNameBox.setOrigin(0, 1);  // 原点を左下に設定
    this.actorNameBox.setVisible(false);  // 初期状態では非表示
    this.add(this.actorNameBox);  // Containerへの追加

    // 名前テキスト用の text 
    this.actorNameText = new Phaser.GameObjects.Text(this.scene, x - width/2 + padding, y - height/2  - margin - 20, '', textStyle)
    this.actorNameText.setOrigin(0, 0.5) // 原点を左中央に設定
    this.actorNameText.setVisible(false)
    this.add(this.actorNameText)

    this.padding = padding
  }

  // 会話のセット
  public setText(text: string) {
    this.text.setText(text)
  }

  // 名前のセット
  public setActorNameText(name: string) {
    this.actorNameText.setText(name)

    // getBounds でテキストの幅を取得して、白枠の幅を更新
    const bounds = this.actorNameText.getBounds()
    this.actorNameBox.width = bounds.width + this.padding * 2

    // Rectangleのサイズを変更した際にstrokeがおいてかれる問題の解消
    // https://github.com/photonstorm/phaser/issues/4811
    // @ts-ignore
    this.actorNameBox.geom.width = this.actorNameBox.width;
    // @ts-ignore
    this.actorNameBox.updateData();

    this.actorNameBox.setVisible(true)
    this.actorNameText.setVisible(true)
  }

  public clearActorNameText() {
    this.actorNameBox.setVisible(false)
    this.actorNameText.setVisible(false)
  }
}
