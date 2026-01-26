import {
    Application,
    extend,
} from '@pixi/react';
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js';
import { BunnySprite } from "~/BunnySprite.js";
import { BoardProps } from '~/types.js';

// extend tells @pixi/react what Pixi.js components are available
extend({
    Container,
    Graphics,
    Sprite,
});

export function Game({}: BoardProps) {
  return (
    <Application>
      <BunnySprite />
    </Application>
  )
}
