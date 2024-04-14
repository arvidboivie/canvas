export class Tile {
  x: number;
  y: number;
  color: string = 'green';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    return (size: number) => {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * size, this.y * size, size, size);
    };
  }
}
