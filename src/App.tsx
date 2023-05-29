import { useState } from "react"
import { Directions } from "./constans/directions"
import { symbols } from "./constans/symbols"
import { defaultPosition, defaultShift, scaleStep, shiftStep } from "./constans/transformations"
import { Tree } from "./components/Tree"


function App() {
  const [treePosition, setTreePostition] = useState(defaultPosition)
  const [treeShift, setTreeShift] = useState(defaultShift)
  const [treeScale, setTreeScale] = useState(1)

  const onScale = (v: number) => {
    setTreeScale(prev => prev + v >= scaleStep ? +(prev + v).toFixed(1) : scaleStep)
  }

  const onMoveCanvas = (direction: keyof typeof Directions) => {
    switch (direction) {
      case Directions.top:
        setTreeShift(prev => ({ ...prev, y: prev.y + shiftStep }))
        break;
      case Directions.bottom:
        setTreeShift(prev => ({ ...prev, y: prev.y - shiftStep }))
        break;
      case Directions.left:
        setTreeShift(prev => ({ ...prev, x: prev.x - shiftStep }))
        break;
      case Directions.right:
        setTreeShift(prev => ({ ...prev, x: prev.x + shiftStep }))
        break;
      default:
        break;
    }
  }

  const onClickCenter = () => {
    setTreePostition(defaultPosition)
    setTreeShift(defaultShift)
  }

  

  return (
    <div className="wrapper">
      <header className="header">
        <h3>
          Services 0
        </h3>

        <div className="controls">
          <button onClick={onClickCenter} className="btn box">
            center
          </button>
          <div className="scale">
            <button onClick={() => onScale(-scaleStep)} className="btn box">
              {symbols.minus}
            </button>
            <p className="btn box">
              {treeScale * 100}%
            </p>
            <button onClick={() => onScale(scaleStep)} className="btn box">
              {symbols.plus}
            </button>
          </div>
        </div>
      </header>
      <main onDragOver={(e) => e.preventDefault()} className="main">
        <button onClick={() => onMoveCanvas(Directions.top)} className="move-btn move-btn_top" />
        <button onClick={() => onMoveCanvas(Directions.left)} className="move-btn move-btn_left" />
        <button onClick={() => onMoveCanvas(Directions.bottom)} className="move-btn move-btn_bottom" />
        <button onClick={() => onMoveCanvas(Directions.right)} className="move-btn move-btn_right" />

        <Tree
          onPositionChange={setTreePostition}
          position={treePosition}
          scale={treeScale}
          shift={treeShift}
        />
      </main>
    </div>
  )
}



export default App
