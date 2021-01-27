/*
 * @Author: Kanata You 
 * @Date: 2021-01-27 17:52:45 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-27 20:32:26
 */

import React from "react";
import { ReactCanvasProps } from "./ReactCanvas";


let mouse = {
  x: 0,
  y: 0,
  leftBtn:  false,
  rightBtn: false
};

let keyboard = {
  altKey:   false,
  ctrlKey:  false,
  shiftKey: false
};

export interface ReactCanvasWindowProps {
  width:    number;
  height:   number;
  children: React.ComponentElement<ReactCanvasProps, any> | React.ComponentElement<ReactCanvasProps, any>[];
  onMouseMove?:   (ev: ReactCanvasWindowEvent<"mouseMove">) => void;
  onMouseDown?:   (ev: ReactCanvasWindowEvent<"mouseDown">) => void;
  onClick?:       (ev: ReactCanvasWindowEvent<"click">) => void;
  onMouseUp?:     (ev: ReactCanvasWindowEvent<"mouseUp">) => void;
  onRightClick?:  (ev: ReactCanvasWindowEvent<"rightClick">) => void;
};

const ReactCanvasWindow: React.FC<ReactCanvasWindowProps> = props => {
  const keepMouseDown = () => {
    if (mouse.leftBtn) {
      if (props.onMouseDown) {
        const ev: ReactCanvasWindowEvent<"mouseDown"> = {
          type:       "mouseDown",
          mouseX:     mouse.x,
          movementX:  0,
          mouseY:     mouse.y,
          movementY:  0,
          mouseLeft:  mouse.leftBtn,
          mouseRight: mouse.rightBtn,
          altKey:     keyboard.altKey,
          ctrlKey:    keyboard.ctrlKey,
          shiftKey:   keyboard.shiftKey,
          WIDTH:      props.width,
          HEIGHT:     props.height
        };
        props.onMouseDown(ev);
      }
    }
    requestAnimationFrame(keepMouseDown);
  };

  requestAnimationFrame(keepMouseDown);

  return (
    <div tabIndex={ 0 }
      style={{
        width:  props.width,
        height: props.height,
        outline:  'none'
      }}
      onMouseOver={
        e => {
          (e.target as HTMLDivElement).focus();
        }
      }
      onMouseMove={
        e => {
          e.stopPropagation();
          e.preventDefault();
          mouse.leftBtn = e.buttons === 1;
          mouse.rightBtn = e.buttons === 2;
          const ev: ReactCanvasWindowEvent<"mouseMove"> = {
            type:       "mouseMove",
            mouseX:     e.clientX - (e.target as HTMLDivElement).offsetLeft,
            movementX:  e.movementX,
            mouseY:     e.clientY - (e.target as HTMLDivElement).offsetTop,
            movementY:  e.movementY,
            mouseLeft:  mouse.leftBtn,
            mouseRight: mouse.rightBtn,
            altKey:     e.altKey,
            ctrlKey:    e.ctrlKey,
            shiftKey:   e.shiftKey,
            WIDTH:      props.width,
            HEIGHT:     props.height
          };
          if (props.onMouseMove) {
            props.onMouseMove(ev);
          }
        }
      }
      onMouseDown={
        e => {
          e.stopPropagation();
          e.preventDefault();
          mouse.leftBtn = e.buttons === 1;
          mouse.rightBtn = e.buttons === 2;
        }
      }
      onClick={
        e => {
          e.stopPropagation();
          e.preventDefault();
          const ev: ReactCanvasWindowEvent<"click"> = {
            type:       "click",
            mouseX:     e.clientX - (e.target as HTMLDivElement).offsetLeft,
            movementX:  e.movementX,
            mouseY:     e.clientY - (e.target as HTMLDivElement).offsetTop,
            movementY:  e.movementY,
            mouseLeft:  e.buttons === 1,
            mouseRight: e.buttons === 2,
            altKey:     e.altKey,
            ctrlKey:    e.ctrlKey,
            shiftKey:   e.shiftKey,
            WIDTH:      props.width,
            HEIGHT:     props.height
          };
          if (props.onClick) {
            props.onClick(ev);
          }
        }
      }
      onMouseUp={
        e => {
          e.stopPropagation();
          e.preventDefault();
          mouse.leftBtn = e.buttons === 1;
          mouse.rightBtn = e.buttons === 2;
          const ev: ReactCanvasWindowEvent<"mouseUp"> = {
            type:       "mouseUp",
            mouseX:     e.clientX - (e.target as HTMLDivElement).offsetLeft,
            movementX:  e.movementX,
            mouseY:     e.clientY - (e.target as HTMLDivElement).offsetTop,
            movementY:  e.movementY,
            mouseLeft:  mouse.leftBtn,
            mouseRight: mouse.rightBtn,
            altKey:     e.altKey,
            ctrlKey:    e.ctrlKey,
            shiftKey:   e.shiftKey,
            WIDTH:      props.width,
            HEIGHT:     props.height
          };
          if (props.onMouseUp) {
            props.onMouseUp(ev);
          }
        }
      }
      onContextMenu={
        e => {
          e.stopPropagation();
          e.preventDefault();
          mouse.leftBtn = e.buttons === 1;
          mouse.rightBtn = e.buttons === 2;
          const ev: ReactCanvasWindowEvent<"rightClick"> = {
            type:       "rightClick",
            mouseX:     e.clientX - (e.target as HTMLDivElement).offsetLeft,
            movementX:  e.movementX,
            mouseY:     e.clientY - (e.target as HTMLDivElement).offsetTop,
            movementY:  e.movementY,
            mouseLeft:  mouse.leftBtn,
            mouseRight: mouse.rightBtn,
            altKey:     e.altKey,
            ctrlKey:    e.ctrlKey,
            shiftKey:   e.shiftKey,
            WIDTH:      props.width,
            HEIGHT:     props.height
          };
          if (props.onRightClick) {
            props.onRightClick(ev);
          }
        }
      } >
        {
          // @ts-ignore
          [].concat(props.children).map((Layer, i) => {
            // @ts-ignore
            const element = Layer.type({
              width:  props.width,
              height: props.height,
              index:  i,
              children: (Layer as any).props.children
            });
            return {
              ...element,
              key:      i,
              // @ts-ignore
              props:    {
                ...element.props,
                children: (Layer as any).props.children
              }
            };
          })
        }
    </div>
  );
};

export type ReactCanvasWindowEventType = "mouseMove" | "mouseDown" | "mouseUp" | "click"
                                        | "rightClick";

export interface ReactCanvasWindowEvent<T extends ReactCanvasWindowEventType> {
  type:       T;
  mouseX:     number;
  movementX:  number;
  mouseY:     number;
  movementY:  number;
  mouseLeft:  boolean;
  mouseRight: boolean;
  ctrlKey:    boolean;
  altKey:     boolean;
  shiftKey:   boolean;
  WIDTH:      number;
  HEIGHT:     number;
};

export default ReactCanvasWindow;
