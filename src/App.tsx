import React from 'react';
import './App.css';
import reactCanvas from './react-canvas';
import { ReactCanvasWindowEvent } from './react-canvas/src/ReactCanvasWindow';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CanvasWindow />
      </header>
    </div>
  );
}

type Scatters = {
  x:  number;
  y:  number;
  r:  number;
};

class CanvasWindow extends React.Component {

  protected scatters: Scatters[];
  protected mouse: { x: number; y: number; };

  public constructor(props: {}) {
    super(props);
    this.scatters = [];
    this.mouse = { x: 0, y: 0 };
  }

  public componentDidMount() {
    const update = () => {
      this.scatters = this.scatters.sort(_ => Math.random() - 0.5).map(sct => {
        const dx = this.mouse.x - sct.x;
        const dy = this.mouse.y - sct.y;
        const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return {
          dist,
          x: sct.x + (Math.random() - 0.5) * 0.5 + (dx / dist * Math.random()) * 128,
          y: sct.y + (Math.random() - 0.5) * 0.5 + (dy / dist * Math.random()) * 128,
          r: sct.r
        };
      }).filter(sct => sct.dist >= 8);
      this.forceUpdate();
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  public render() {
    return (
      <reactCanvas.Window width={ 1200 } height={ 600 }
        onMouseMove={ this.onMouseMove.bind(this) }
        onMouseDown={ this.onMouseDown.bind(this) }
        onClick={ this.onClick.bind(this) }
        onRightClick={ this.onRightClick.bind(this) } >
        <reactCanvas.Layer />
        <reactCanvas.Layer />
        <reactCanvas.Layer>
          {
            this.scatters.map((sct, i) => {
              return (
                <reactCanvas.Rect key={ i }
                  x={ sct.x - sct.r / 2 }
                  y={ sct.y - sct.r / 2 }
                  w={ sct.r }
                  h={ sct.r }
                  fill="rgba(47,162,215,0.8)" />
              );
            })
          }
        </reactCanvas.Layer>
      </reactCanvas.Window>
    );
  }

  public onMouseMove(e: ReactCanvasWindowEvent<"mouseMove">) {
    this.mouse = {
      x: e.mouseX,
      y: e.mouseY
    };
  }

  public onMouseDown(e: ReactCanvasWindowEvent<"mouseDown">) {
    if (e.mouseLeft) {
      if (Math.random() < 0.2 / Math.pow(this.scatters.length, 0.1)) {
        const deg = Math.random() * 2 * Math.PI;
        const dist = ~~((Math.random() * 0.8 + 0.2) * (1200 + 600));
        this.scatters.push({
          x: this.mouse.x + Math.cos(deg) * dist,
          y: this.mouse.y + Math.sin(deg) * dist,
          r: ~~(Math.random() * 2) + 2,
        });
      }
    }
  }

  public onClick(e: ReactCanvasWindowEvent<"click">) {
    console.log(e);
  }

  public onRightClick(e: ReactCanvasWindowEvent<"rightClick">) {
    console.log(e);
  }

};

export default App;
