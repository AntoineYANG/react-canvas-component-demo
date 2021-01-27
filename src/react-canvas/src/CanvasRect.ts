/*
 * @Author: Kanata You 
 * @Date: 2021-01-27 16:39:41 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-27 19:34:24
 */

import { _React_Canvas_Children_, ReactCanvasChildren } from './ReactCanvas';


export interface ReactCanvasRectProps {
  x:  number;
  y:  number;
  w:  number;
  h:  number;
};

const ReactCanvasRect: _React_Canvas_Children_<ReactCanvasRectProps> = props => {
  const ctx = props.ctx;

  if (ctx) {
    if (props.stroke) {
      ctx.strokeStyle = props.stroke;
      if (props.strokeWidth) {
        ctx.lineWidth = props.strokeWidth;
      }
      ctx.strokeRect(props.x, props.y, props.w, props.h);
    }
    if (props.fill) {
      ctx.fillStyle = props.fill;
      ctx.fillRect(props.x, props.y, props.w, props.h);
    }
  }

  return null;
};

const _ReactCanvasRect = ReactCanvasRect as unknown as ReactCanvasChildren<ReactCanvasRectProps>;


export default _ReactCanvasRect;
