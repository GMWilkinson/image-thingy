// import { fireEvent } from '@testing-library/react';
import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import {
  toColorString,
  applyEffect,
  mixEffects,
  applyEdgeDetect,
  convolve
} from './util'
import filterEffect from './filterEffects'

const assetsPath = process.env.PUBLIC_URL

function App() {
  const sourceImages = {
    'small': `${assetsPath}/toadhat2.png`,
    'default': `${assetsPath}/400.jpg`
  }

  const [loadingState, setLoadingState] = useState(null)
  const [imageData, setImageData] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [type, setType] = useState(null)
  const [appliedType, setAppliedType] = useState(null)
  const [convertedPixels, setConvertedPixels] = useState(null)

  // a queue for useEffect to shove loaded images into state
  const parsedImageQueue = useRef([])

  useEffect(() => {
    // kick off loading of source images
    if(!loadingState) {
      console.log('start loading source images')
      setLoadingState('loading')
      loadSourceImages(sourceImages, assetsPath)
    }
  }, [loadingState, sourceImages])

  useEffect(() => {
    // check if all images are ready in app state
    if (loadingState !== 'loaded'
      && imageData.length === Object.keys(sourceImages).length
    ) {
      console.log('all source images loaded')
      setLoadingState('loaded')
    }
  }, [loadingState, imageData, sourceImages])

  useEffect(() => {
    // use a queue to get loaded images into app state
    if (loadingState === 'parsing'
      && parsedImageQueue.current.length
    ) {
      setImageData([...imageData, parsedImageQueue.current.pop()])
      setLoadingState('loading')
    }
  }, [loadingState, imageData])

  useEffect(() => {
    // kick off applying a filter to pixeldata
    if (type !== appliedType) {
      setAppliedType(type)
      if (type === 'edgeDetect') {
        setConvertedPixels(applyEdgeDetect(
          imageData[imageIndex].data,
          imageData[imageIndex].width
        ))
      } else if (type === 'convolve') {
        setConvertedPixels(convolve(imageData[imageIndex].data, imageData[imageIndex]))
      } else {
        const effect = filterEffect[type] || filterEffect.standard
        const pixelData = imageData[imageIndex].data
        const width = imageData[imageIndex].width
        // apply effect to source image data
        setConvertedPixels(applyEffect(effect.function, pixelData, width))
      }
    }
  }, [imageData, type, appliedType, imageIndex]);

  const loadSourceImages = (sourceImages) => {
    for (const [key, filePath] of Object.entries(sourceImages)) {
      const sourceImage = new Image() 
      sourceImage.onload = function () {
        console.log(`queueing ${key} to move it into state`)
        const parsedImage = parseImage(key, sourceImage)
        parsedImageQueue.current.push(parsedImage);
        setLoadingState('parsing')
      }.bind(null, key, sourceImage)
      sourceImage.src = `${filePath}`
    }
  }

  const parseImage = (key, sourceImage) => {
    const canvas = document.createElement('canvas')
    canvas.id = key
    const context = canvas.getContext('2d')
    // grr .. do scaling things here
    const width = 250 
    const height = Math.floor(250/sourceImage.width*sourceImage.height)
    canvas.width = width
    canvas.height = height 
    context.drawImage(sourceImage, 0, 0, width, height)
    const data = context.getImageData(0, 0, width, height).data
    return {
      key,
      canvas,
      context,
      data,
      width,
      height
    }
  }

  const injectDivArray = (convertedPixels, width, height) => {
    console.log('building box fragment')
    const box = document.getElementById('box')
    box.innerHTML = ''
    const boxFragment = document.createDocumentFragment()
    let numberOfPixels = convertedPixels.length * 0.25
    for (numberOfPixels; numberOfPixels; numberOfPixels--) {
      const rgba = convertedPixels.slice((numberOfPixels - 1) * 4, numberOfPixels * 4)
      const pixelElement = document.createElement('div')
      pixelElement.style.cssText = `width:1px;height:1px;background-color:${toColorString(rgba)}`
      boxFragment.insertBefore(pixelElement, boxFragment.firstChild)
      if (!(numberOfPixels % 10000)) {
        console.log(`${numberOfPixels} pixels left`)
      }
    }
    box.style = `width: ${width}px; height: ${height}px`
    box.appendChild(boxFragment)
    console.log('appended box fragment')
  }

  const drawImage = () => {
    const width = imageData[imageIndex].width
    const height = imageData[imageIndex].height
    injectDivArray(convertedPixels, width, height)
  }

  const switchImage = (index) => {
    setImageIndex(index)
  }

  const mixEmUp = () => {
    const width = imageData[imageIndex].width
    const height = imageData[imageIndex].height
    const effect = filterEffect[type] || filterEffect.standard
    const mixedPixels = mixEffects(imageData, effect.function, height)
    injectDivArray(mixedPixels, width, height)
  }

  return (
    <div className="App">
      <main className="App-header">
        <div id="sourceImages">
          {imageData.map((data, index)=>{
            return <img
              alt={data.key}
              key={data.key}
              src={data.canvas.toDataURL()}
              onClick={()=>switchImage(index)}
            />
          })}
        </div>
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
        <button onClick={mixEmUp} >Start mixing</button>
        <button onClick={() => setType('edgeDetect')}>edgeDetect</button>
        <button onClick={() => setType('convolve')}>convolve</button>
        <button onClick={drawImage} >Clickeroo</button>
      </aside>
    </div>
  );
}

export default App;
