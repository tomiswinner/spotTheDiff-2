import { DialogBox, DialogBoxConfig } from '../class/DialogBox';
import { Timeline } from '../type/Timeline';
import { TimelinePlayer } from '../class/TimelinePlayer';
import { timelineData } from '../data/timeline';

export class StoryScene extends Phaser.Scene {
  private timeline?: Timeline;

  constructor() {
    super('story');
  }

  init(data: any) {
    const timelineID = data.timelineID || 'start';

    if (!(timelineID in timelineData)) {
      console.error(`timelineID: ${timelineID} は存在しません`);
      // 登録されていない timelineID が指定された場合はタイトル画面に戻る
      this.scene.start('title');
      return;
    }
    this.timeline = timelineData[timelineID];
  }

  create() {
    if (!this.timeline) {
      return;
    }

    const { width, height } = this.game.canvas;
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: '24px',
    };

    const dialogBoxHeight = 150;
    const dialogBoxMargin = 10;
    const dialogBoxConfig: DialogBoxConfig = {
      x: width / 2,
      y: height - dialogBoxHeight / 2 - dialogBoxMargin,
      width: width - dialogBoxMargin * 2,
      height: dialogBoxHeight,
      padding: 10,
      margin: dialogBoxMargin,
      textStyle,
    };
    const dialogBox = new DialogBox(this, dialogBoxConfig);

    const timelinePlayer = new TimelinePlayer(this, dialogBox, textStyle);
    timelinePlayer.start(this.timeline);
  }
}
