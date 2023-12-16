import { Choice } from './Choice';

type DialogEvent = {
  type: 'dialog',
  text: string,
  actorName?: string,
};

// 背景設定イベント
type SetBackgroundEvent = {
  type: 'setBackground',
  x: number,
  y: number,
  key: string,
};

// 前景追加イベント
type AddForegroundEvent = {
  type: 'addForeground',
  x: number,
  y: number,
  key: string,
};

type ClearForegroundEvent = {
  type: 'clearForeground'
};

type TimelineTransitionEvent = {
  type: 'timelineTransition',
  timelineID: string,
};

type SceneTransitionEvent = {
  type: 'sceneTransition',
  key: string,
  data?: object,
};

type ChoiceEvent = {
  type: 'choice',
  choices: Choice[],
};

// event の配列で表現する
export type Timeline = (DialogEvent | SetBackgroundEvent | AddForegroundEvent | ClearForegroundEvent | TimelineTransitionEvent | SceneTransitionEvent | ChoiceEvent)[];
