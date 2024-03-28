export function getRealMousePosition(
  canvas: HTMLCanvasElement,
  evt: MouseEvent
) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
