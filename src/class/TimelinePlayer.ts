import { Timeline } from '../type/Timeline';
import { Choice } from '../type/Choice';
import { DialogBox } from './DialogBox';

export class TimelinePlayer {
  private backgroundLayer: Phaser.GameObjects.Container;

  private foregroundLayer: Phaser.GameObjects.Container;

  private uiLayer: Phaser.GameObjects.Container;

  private hitArea: Phaser.GameObjects.Zone;

  private timeline?: Timeline;

  private timelineIndex = 0;

  constructor(private scene: Phaser.Scene, private dialogBox: DialogBox, private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {}) {
    // なるほど、背景・前傾・UIで分けるのか
    this.backgroundLayer = this.scene.add.container(0, 0);
    this.foregroundLayer = this.scene.add.container(0, 0);
    this.scene.add.existing(this.dialogBox);
    this.uiLayer = this.scene.add.container(0, 0);

    const { width, height } = this.scene.game.canvas;
    this.hitArea = new Phaser.GameObjects.Zone(this.scene, width / 2, height / 2, width, height);
    this.hitArea.setInteractive({
      useHandCursor: true,
    });
    this.hitArea.on('pointerdown', () => {
      this.next();
    });
    this.uiLayer.add(this.hitArea);
  }

  public start(timeline: Timeline) {
    this.timeline = timeline;
    this.next();
  }

  private setBackground(x: number, y: number, texture: string) {
    this.backgroundLayer.removeAll();
    const backgroundImage = new Phaser.GameObjects.Image(this.scene, x, y, texture);
    this.backgroundLayer.add(backgroundImage);
  }

  private addForeground(x:number, y:number, texture: string) {
    const foregroundImage = new Phaser.GameObjects.Image(this.scene, x, y, texture);
    this.foregroundLayer.add(foregroundImage);
  }

  private clearForeground() {
    this.foregroundLayer.removeAll();
  }

  private setChoiceButtons(choices: Choice[]) {
    if (choices.length === 0) {
      return;
    }
    this.hitArea.disableInteractive(); // hitAreaを無効化

    const buttonHeight = 40;
    const buttonMargin = 40;
    const { width, height } = this.scene.game.canvas;
    const buttonGroupHeight = buttonHeight * choices.length + buttonMargin * (choices.length = 1);
    const buttonGroupOriginY = height / 2 - buttonGroupHeight / 2;

    choices.forEach((choice, index) => {
      const y = buttonGroupOriginY + buttonHeight * (index + 0.5) + buttonMargin * (index);

      const button = new Phaser.GameObjects.Rectangle(this.scene, width / 2, y, width - buttonMargin * 2, buttonHeight, 0x000000).setStrokeStyle(1, 0xffffff);
      button.setInteractive({
        useHandCursor: true,
      });
      button.on('pointerover', () => {
        button.setFillStyle(0x333333);
      });
      button.on('pointerout', () => {
        button.setFillStyle(0x000000);
      });
      // button が押されたら、choice に結びついた timelineID を再生する
      button.on('pointerdown', () => {
        this.scene.scene.restart({ timelineID: choice.timelineID });
      });
      this.uiLayer.add(button);

      const buttonText = new Phaser.GameObjects.Text(this.scene, width / 2, y, choice.text, this.textStyle).setOrigin(0.5);
      this.uiLayer.add(buttonText);
    });
  }

  private next() {
    if (!this.timeline) {
      return;
    }
    if (this.timelineIndex >= this.timeline.length) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const timelineEvent = this.timeline[this.timelineIndex++];
    switch (timelineEvent.type) {
      case 'dialog':
        if (timelineEvent.actorName) {
          this.dialogBox.setActorNameText(timelineEvent.actorName);
        } else {
          this.dialogBox.clearActorNameText();
        }
        this.dialogBox.setText(timelineEvent.text);
        break;

      case 'setBackground':
        this.setBackground(timelineEvent.x, timelineEvent.y, timelineEvent.key);
        this.next();
        break;

      case 'addForeground':
        this.addForeground(timelineEvent.x, timelineEvent.y, timelineEvent.key);
        this.next();
        break;

      case 'clearForeground':
        this.clearForeground();
        this.next();
        break;

      case 'timelineTransition':
        this.scene.scene.restart({ timelineID: timelineEvent.timelineID });
        break;

      case 'sceneTransition':
        this.scene.scene.start(timelineEvent.key, timelineEvent.data);
        break;

      case 'choice':
        this.setChoiceButtons(timelineEvent.choices);
        break;

      default:
        break;
    }
  }
}
