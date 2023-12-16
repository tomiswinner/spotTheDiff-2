import { LoadingScene } from './LoadingScene';
import { TitleScene } from './TitleScene';
import { StoryScene } from './StoryScene';
import { EndingScene } from './EndingScene';
import { GameScene } from './GameScene';

// scene を配列でまとめて管理しやすくする
export const Scenes = [LoadingScene, TitleScene, StoryScene, GameScene, EndingScene];
