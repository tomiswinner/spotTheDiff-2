import * as Phaser from 'phaser';
import { Scenes } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // webGLかCanvasかを phaser が自動で判定してくれる
  width: 800,
  height: 600,
  parent: 'game-app',
  scene: Scenes,
}


new Phaser.Game(config)
