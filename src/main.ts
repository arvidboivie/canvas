class Game {
  private readonly WIDTH = 24;
  private readonly HEIGHT = 16;
  private readonly SQUARE_SIDE = 20;

  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  private readonly world: boolean[][] = [];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.SQUARE_SIDE * this.WIDTH;
    this.canvas.height = this.SQUARE_SIDE * this.HEIGHT;

    let contextOrNull = this.canvas.getContext('2d');
    if (contextOrNull === null) {
      throw new Error('Failed to get canvas context');
    }

    this.ctx = contextOrNull;
    document.body.appendChild(this.canvas);
  }
}

new Game();
