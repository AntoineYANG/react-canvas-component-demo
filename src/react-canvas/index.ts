/*
 * @Author: Kanata You 
 * @Date: 2021-01-27 16:07:05 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-27 17:59:45
 */

import ReactCanvas from "./src/ReactCanvas";
import ReactCanvasRect from "./src/CanvasRect";
import ReactCanvasWindow from "./src/ReactCanvasWindow";


const reactCanvas = {
  Window:   ReactCanvasWindow,
  Layer:    ReactCanvas,
  Rect:     ReactCanvasRect
};

export default reactCanvas;
