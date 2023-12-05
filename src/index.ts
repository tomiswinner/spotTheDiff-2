import * as Phaser from 'phaser';
import { Scenes } from './scenes';
import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // webGLかCanvasかを phaser が自動で判定してくれる
  width: 800,
  height: 800,
  parent: 'game-app',
  // scene: Scenes,
  scene: GameScene
}


new Phaser.Game(config)
