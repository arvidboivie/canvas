import { getRealMousePosition } from './helpers/get-real-mouse-position.helper';
import { World } from './world/world';

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

  private world: World;

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
    // The size of the emoji is set with the font
    this.ctx.font = `${this.SQUARE_SIDE}px serif`;
    // use these alignment properties for "better" positioning
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.canvas.addEventListener('mouseup', this.releaseEventHandler);
    this.pauseButton.addEventListener('click', () => {
      this.PLAY = !this.PLAY;
      this.pauseButton.textContent = this.PLAY ? 'Pause' : 'Play';
    });

    document.body.appendChild(this.canvas);
    document.body.appendChild(this.infoWindow);
    document.body.appendChild(this.pauseButton);

    this.world = new World();
    this.world.populate();

    requestAnimationFrame(this.loop);
  }

  private releaseEventHandler = (event: MouseEvent) => {
    const { x, y } = getRealMousePosition(this.canvas, event);

    const squareX = Math.floor(x / this.SQUARE_SIDE);
    const squareY = Math.floor(y / this.SQUARE_SIDE);

    const entities = this.world.getPos({ x: squareX, y: squareY });

    this.infoWindow.textContent = `${squareX}, ${squareY} ${entities
      .map((entity) => entity.type)
      .join(' ')}`;

    this.draw();
  };

  private loop = (timestamp: number) => {
    this.secondsPassed = (timestamp - this.previousGameLoop) / 1000;

    if (this.secondsPassed - this.previousGameLoop > 1 / this.FPS) {
      if (this.PLAY) {
        this.world.update();
      }
      this.previousGameLoop = this.secondsPassed;
    }

    this.draw();
    requestAnimationFrame(this.loop);
  };

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.draw(this.ctx, this.SQUARE_SIDE);
  }
}

new Game();
