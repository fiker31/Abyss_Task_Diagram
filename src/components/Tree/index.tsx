import { FC, useCallback, useEffect } from 'react'
import { Node } from '../Node'
import { getTree } from '../../models/Tree'
import { removeDragGhost, throttle } from '../../utils';

import './index.css'
import { defaultPosition, defaultTranstition } from '../../constans/transformations';
import { Position } from '../../types/position';
import { Shift } from '../../types/shift';

const tree = getTree();

type TreeProps = {
  position: Position
  scale: number,
  shift: Shift,
  onPositionChange: (v: Position) => void
}

export const Tree: FC<TreeProps> = ({
  position,
  scale,
  shift,
  onPositionChange,
}) => {

  useEffect(() => {
    const beforeunload = () => {
      window.localStorage.setItem('tree', JSON.stringify(tree))
    }
    window.addEventListener('beforeunload', beforeunload)
    return () => window.removeEventListener('beforeunload', beforeunload)
  }, [])

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.left < 0 || rect.top < 0) {
      onPositionChange(defaultPosition)
    }
  }

  const onDragEnd = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.transition = defaultTranstition
  }

  const onDrag = useCallback((e: React.DragEvent<HTMLElement>) => {
    const container = e.currentTarget.parentElement
    if (!container) {
      return false
    }
    const rect = container.getBoundingClientRect();
    const top = e.pageY - rect.y
    const left = e.pageX - rect.x
    const newPosition = { top: top + 'px', left: left  + 'px' }
    if (top > 0 && left > 0) {
      onPositionChange(newPosition)
    }
    return false
  }, [onPositionChange])

  const throttledOnDrag = useCallback(throttle(onDrag, 10), [onDrag])

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.transition = 'none'
    removeDragGhost(e)
  }
  return  <div draggable onDrop={onDrop} onDrag={throttledOnDrag} onDragStart={onDragStart} onDragEnd={onDragEnd} className="tree" style={{
    ...position,
    transform: `scale(${scale}) translate(-${shift.x / scale}%, -${shift.y / scale}%)`,
  }}>
    <Node isChild={false} node={tree.root} />
  </div>
}