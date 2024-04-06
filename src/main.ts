import { getRealMousePosition } from './helpers';

class Game {
  private readonly WIDTH = 24;
  private readonly HEIGHT = 16;
  private readonly SQUARE_SIDE = 20;
  private PLAY = true;
  private readonly FPS = 1;

  private secondsPassed: number = 0;
  private previousGameLoop: number = 0;

  private readonly canvas: HTMLCanvasElement;
  private readonly infoWindow: HTMLParagraphElement;
  private readonly pauseButton: HTMLButtonElement;
  private readonly ctx: CanvasRenderingContext2D;

  private world: boolean[][] = [];

  constructor() {
    this.infoWindow = document.createElement(`p`);
    this.pauseButton = document.createElement('button');
    this.pauseButton.textContent = 'Pause';

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.SQUARE_SIDE * this.WIDTH;
    this.canvas.height = this.SQUARE_SIDE * this.HEIGHT;

    let contextOrNull = this.canvas.getContext('2d');
    if (contextOrNull === null) {
      throw new Error('Failed to get canvas context');
    }
    this.ctx = contextOrNull;
    this.canvas.addEventListener('mouseup', this.releaseEventHandler);
    this.pauseButton.addEventListener('click', () => {
      this.PLAY = !this.PLAY;
      this.pauseButton.textContent = this.PLAY ? 'Pause' : 'Play';
    });

    document.body.appendChild(this.canvas);
    document.body.appendChild(this.infoWindow);
    document.body.appendChild(this.pauseButton);

    this.world = this.populateWorld();
    // this.draw();
    requestAnimationFrame(this.loop);
  }

  private releaseEventHandler = (event: MouseEvent) => {
    const { x, y } = getRealMousePosition(this.canvas, event);

    const squareX = Math.floor(x / this.SQUARE_SIDE);
    const squareY = Math.floor(y / this.SQUARE_SIDE);

    const square = this.world[squareX][squareY];

    this.infoWindow.textContent = `${square}`;
    this.world[squareX][squareY] = !square;
    this.draw();
  };

  private populateWorld(): boolean[][] {
    return [...Array(this.WIDTH)].map(() =>
      [...Array(this.HEIGHT)].map(() => (Math.random() > 0.5 ? true : false))
    );
  }

  private loop = (timestamp: number) => {
    this.secondsPassed = (timestamp - this.previousGameLoop) / 1000;

    if (this.secondsPassed - this.previousGameLoop > 1 / this.FPS) {
      if (this.PLAY) {
        this.world = this.populateWorld();
      }
      this.previousGameLoop = this.secondsPassed;
    }

    console.log(this);

    this.draw();
    requestAnimationFrame(this.loop);
  };

  public draw() {
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        this.ctx.fillStyle = this.world[x][y] ? 'black' : 'white';
        this.ctx.fillRect(
          x * this.SQUARE_SIDE,
          y * this.SQUARE_SIDE,
          this.SQUARE_SIDE,
          this.SQUARE_SIDE
        );
      }
    }
  }
}

new Game();
