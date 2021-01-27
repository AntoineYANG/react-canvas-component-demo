/*
 * @Author: Kanata You 
 * @Date: 2021-01-27 16:07:30 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-27 19:42:41
 */

import React, { useRef, useLayoutEffect } from 'react';


export interface ReactCanvasProps {
  width:  number;
  height: number;
  index:  number;
};

export class ReactCanvasContext {

  protected _loaded:          boolean;
  public get loaded()         { return this._loaded;      }
  protected _ctxGettor:       () => (CanvasRenderingContext2D | null);
  public get ctx()            { return this._ctxGettor(); }
  protected readonly _width:  number;
  public get width()          { return this._width;       }
  protected readonly _height: number;
  public get height()         { return this._height;      }

  public constructor(width:  number, height: number, ctxGettor: () => (CanvasRenderingContext2D | null)) {
    this._loaded  = false;
    this._ctxGettor     = ctxGettor;
    this._width   = width;
    this._height  = height;
  }

};

export interface ReactCanvasChildrenOrigin {
  alpha?:   number;
  fill?:    string;
  stroke?:  string;
  strokeWidth?: number;
};

export type _React_Canvas_Children_<P={}> = (
  props: P & { ctx: CanvasRenderingContext2D; } & ReactCanvasChildrenOrigin
) => null;

export type ReactCanvasChildren<P={}> = (
  props: P & ReactCanvasChildrenOrigin
) => JSX.Element;

const ReactCanvas: React.FC<ReactCanvasProps> = props => {
  const context = new ReactCanvasContext(
    props.width,
    props.height,
    () => ref.current?.getContext('2d') || null
  );

  const ref = useRef<HTMLCanvasElement>() as React.RefObject<HTMLCanvasElement>;

  const play = (time: number) => {
    const ctx = context.ctx;
    const children = ([] as any[]).concat(props.children || []);
    if (ctx) {
      ctx.clearRect(0, 0, props.width, props.height);
      children.forEach(child => {
        child.type({ ...child.props, ctx });
      });
    }
    // requestAnimationFrame(play);
    return children;
  };

  useLayoutEffect(() => {
    requestAnimationFrame(play);
  });

  return (
    <canvas width={ context.width } height={ context.height }
      ref={ ref }
      style={{
        transform:  `translateY(-${ props.index * (context.height + 6) }px)`,
        pointerEvents:  'none',
        background: "#ffffff10"
      }} />
  );
};

export default ReactCanvas as React.FC;
