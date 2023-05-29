export const removeDragGhost = (e: React.DragEvent) => {
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  e.dataTransfer.setDragImage(img, 0, 0);
}

export function throttle(cb: any, delay = 250) {
  let shouldWait = false

  return (...args: any) => {
    if (shouldWait) return
    cb(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}