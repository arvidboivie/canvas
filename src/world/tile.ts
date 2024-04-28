export class Tile {
  x: number;
  y: number;
  color: 'green' | 'blue';

  constructor(x: number, y: number, color: 'green' | 'blue') {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    return (size: number) => {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * size, this.y * size, size, size);
    };
  }
}
