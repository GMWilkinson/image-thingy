// import { fireEvent } from '@testing-library/react';
import React, {useState, useEffect} from 'react'
import './App.css'
import { toColorString, applyEffect } from './util'
import filterEffect from './filterEffects'

function App() {
  let width,
    height,
    pixelScale = 1,
    inverseScale = 1/pixelScale;

  const [pixelData, setPixelData] = useState(null)
  const [type, setType] = useState(null)
  const [appliedType, setAppliedType] = useState(null)
  const [convertedPixels, setConvertedPixels] = useState(null)

  useEffect(() => {
    if (type !== appliedType) {
      setAppliedType(type)
      const effect = filterEffect[type] || filterEffect.standard
      setConvertedPixels(applyEffect(effect.function, pixelData))
    }
  }, [pixelData, type, appliedType]);

  const drawToCanvas = () => {
    console.log('drawing to canvas')
    let img = document.getElementById('my-image')
    let box = document.getElementById('box')
    let canvas = document.getElementById('canvas')    
    let context = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    width = Math.floor(img.width * inverseScale)
    height = Math.floor(img.height * inverseScale)
    context.scale(inverseScale, inverseScale)
    context.drawImage(img, 0, 0, img.width, img.height)
    box.style = `width: ${img.width}px; height: ${img.height}px`
    console.log('image on canvas')
    setPixelData(getPixelData());
  }

  const getPixelData = () => {
    console.log('getting pixel data from canvas')
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    return ctx.getImageData(0,0,width, height).data
  }

  const injectDivArray = (convertedPixels) => {
    console.log('building box fragment')
    const box = document.getElementById('box')
    box.innerHTML = ''
    const boxFragment = document.createDocumentFragment()
    let numberOfPixels = convertedPixels.length * 0.25
    for (numberOfPixels; numberOfPixels; numberOfPixels--) {
      const rgba = convertedPixels.slice((numberOfPixels - 1) * 4, numberOfPixels * 4)
      const pixelElement = document.createElement('div')
      pixelElement.style.cssText = `width:${pixelScale}px;height:${pixelScale}px;background-color:${toColorString(rgba)}`
      boxFragment.insertBefore(pixelElement, boxFragment.firstChild)
      if (!(numberOfPixels % 10000)) {
        console.log(`${numberOfPixels} pixels left`)
      }
    }
    box.appendChild(boxFragment)
    console.log('appended box fragment')
  }

  const drawImage = () => {
    injectDivArray(convertedPixels)
  }

  return (
    <div className="App">
      <main className="App-header">
        <img 
          id="my-image" 
          alt="source"
          src={process.env.PUBLIC_URL + '/strad.jpg'} 
          onLoad={() => drawToCanvas()}
        />
        <div id="box" className="box"></div>
        <canvas style={{visibility: 'hidden'}} id="canvas"></canvas>
      </main>
      <aside className="buttons">
        <div>{type}</div>
        {
          Object.keys(filterEffect).map(key => <button
            onClick={() => setType(key)}
            key={key}
          >
            {filterEffect[key].name}
          </button>)
        }
        <button onClick={drawImage} >Clickeroo</button>
      </aside>
    </div>
  );
}

export default App;
