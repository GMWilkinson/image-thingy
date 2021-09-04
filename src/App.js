// import { fireEvent } from '@testing-library/react';
import React, {useState, useEffect} from 'react'
import './App.css'


function App() {
  let width,
    height,
    pixelScale = 1,
    inverseScale = 1/pixelScale;

  const [pixelData, setPixelData] = useState(null)
  const [type, setType] = useState(null)
  const [appliedType, setAppliedType] = useState(null)
  const [convertedPixels, setConvertedPixels] = useState(null)
  // const [pixelDivArray, setPixelDivArray] = useState(null)

  useEffect(() => {
    if (type !== appliedType) {
      setAppliedType(type)
      setConvertedPixels(applyEffect(type, pixelData))
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
    setPixelData(getPixelData);
  }

  // const nameToRgba = (name) => {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //   canvas.width = 1;
  //   canvas.height = 1;
  //   context.fillStyle = name;
  //   context.fillRect(0,0,1,1);
  //   return [...context.getImageData(0,0,1,1).data];
  // }

  const namedColors = {
    "white":[255,255,255,255],
    "papayawhip":[255,239,213,255],
    "yellow":[255,255,0,255],
    "orange":[255,165,0,255],
    "mauve":[0,0,0,255],
    "purple":[128,0,128,255],
    "#2f026e":[47,2,110,255],
    "black":[0,0,0,255],
    "blue":[0,0,255,255],
    "red":[255,0,0,255],
    "#e3fce1":[227,252,225,255],
    "#ccfac8":[204,250,200,255],
    "#a8f7a1":[168,247,161,255],
    "#73f268":[115,242,104,255],
    "#56db4b":[86,219,75,255],
    "#42c437":[66,196,55,255],
    "#24991a":[36,153,26,255],
    "#0f7a06":[15,122,6,255],
    "#063002":[6,48,2,255],
    "#18f705":[24,247,5,255]
  }
  // for (const name in namedColors) {
  //   namedColors[name] = nameToRgba(name)
  // }
  // console.log(namedColors);

  const effect = {
    'green': (r, g, b, a) => [r, 150, b, a],
    'blue': (r, g, b, a) => [r, g, 150, a],
    'red': (r, g, b, a) => [150, g, b, a],
    'r-green': (r, g, b, a) => [r, 255 - g, b, a],
    'r-blue': (r, g, b, a) => [r, g, 255 - b, a],
    'r-red': (r, g, b, a) => [255 - r, g, b, a],
    'mix': (r, g, b, a) => [g, b, r, a],
    'mix-back': (r, g, b, a) => [b, g, r, a],
    'step1': (r, g, b, a) => [b, r, g, a],
    'step2': (r, g, b, a) => [g, b, r, a],
    'b-w1': (r, g, b, a) => [r, r, r, a],
    'b-w2': (r, g, b, a) => [g, g, g, a],
    'b-w3': (r, g, b, a) => [b, b, b, a],
    'opposite': (r, g, b, a) => [255 - g, 255 - b, 255 - r, a],
    'standard': (r, g, b, a) => [r, g, b, a],
    'default': (r, g, b, a) => [r, g, b, a],
    'weirdy': (r, g, b, a) => {
      const min = Math.min(r, g, b)
      return (min > 180) ? namedColors['white']
        : (min > 150) ? namedColors['papayawhip']
        : (min > 130) ? namedColors['yellow']
        : (min > 100) ? namedColors['orange']
        : (min > 80) ? namedColors['mauve']
        : (min > 60) ? namedColors['purple']
        : (min > 40) ? namedColors['#2f026e']
        : (min > 20) ? namedColors['black']
        : namedColors['blue']
    },
    'k-bots': (r, g, b, a) => {
      const min = Math.min(r, g, b)
      if (min > 180) return namedColors['black']
      if (min > 150) return namedColors['papayawhip']
      if (min > 130) return namedColors['purple']
      if (min > 100) return namedColors['yellow']
      if (min > 80) return namedColors['mauve']
      if (min > 60) return namedColors['orange']
      if (min > 40) return namedColors['red']
      if (min > 20) return namedColors['white']
      return namedColors['blue']
    },
    'greeny': (r, g, b, a) => {
      const min = Math.min(r, g, b)
      if (min > 220) return namedColors['white']
      if (min > 200) return namedColors['#e3fce1']
      if (min > 180) return namedColors['#ccfac8']
      if (min > 150) return namedColors['#a8f7a1']
      if (min > 130) return namedColors['#73f268']
      if (min > 100) return namedColors['#56db4b']
      if (min > 80) return namedColors['#42c437']
      if (min > 60) return namedColors['#24991a']
      if (min > 40) return namedColors['#0f7a06']
      if (min > 20) return namedColors['#063002']
      return namedColors['#18f705']
    }
  }

  const getPixelData = () => {
    console.log('getting pixel data from canvas')
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    return ctx.getImageData(0,0,width, height).data
  }

  const applyEffect = (type, pixelData) => {
    console.log('applying effect to pixel data')
    const effectFunction = effect[type] || effect.default
    const convertedPixelData = []
    let numberOfPixels = pixelData.length * 0.25
    for (numberOfPixels; numberOfPixels; numberOfPixels--) {
      const [r, g, b, a] = pixelData.slice((numberOfPixels - 1) * 4, numberOfPixels * 4)  
      const convertedRgba = effectFunction(r, g, b, a)
      convertedPixelData.unshift(...convertedRgba)
      if (!(numberOfPixels % 10000)) {
        console.log(`${numberOfPixels} pixels left`)
      }
    }
    console.log('converted pixels now exist')
    return convertedPixelData
  }

  // const mapPixelsToDivArray = (pixelData) => {
  //   console.log('building div array')
  //   const pixelDivArray = []
  //   let numberOfPixels = pixelData.length * 0.25
  //   for (numberOfPixels; numberOfPixels; numberOfPixels--) {
  //     const [r, g, b, a] = pixelData.slice((numberOfPixels - 1) * 4, numberOfPixels * 4)
  //     let colorString
  //     if (a === 0) {
  //       colorString = 'black'
  //     } else {
  //       colorString = toColorString([r, g, b, a])
  //     }
  //     pixelDivArray.unshift(<div key={numberOfPixels} style={{width: pixelScale, height: pixelScale, backgroundColor: colorString}}></div> )
  //   }
  //   console.log('div array built')
  //   return pixelDivArray
  // }

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
        console.log(pixelElement)
        console.log(`${numberOfPixels} pixels left`)
      }
    }
    console.log('appending box fragment')
    box.appendChild(boxFragment)
    console.log('appended box fragment')
  }

  const toColorString = (rgba) => `rgba(${rgba.join()})`

  const drawImage = () => {
    //setPixelDivArray(mapPixelsToDivArray(convertedPixels))
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
        <div id="box" className="box">
          {/* {pixelDivArray ? [...pixelDivArray]: null} */}
        </div>
        <canvas style={{visibility: 'hidden'}} id="canvas"></canvas>
      </main>
      <aside className="buttons">
        <div>{type}</div>
        <button onClick={() => setType('green')} >Green</button>
        <button onClick={() => setType('red')} >Red</button>
        <button onClick={() => setType('blue')} >Blue</button>
        <button onClick={() => setType('r-green')} >Reverse Green</button>
        <button onClick={() => setType('r-red')} >Reverse Red</button>
        <button onClick={() => setType('r-blue')} >Reverse Blue</button>
        <button onClick={() => setType('mix-back')} >Mix Back</button>
        <button onClick={() => setType('mix')} >Mix</button>
        <button onClick={() => setType('step1')} >Step 1</button>
        <button onClick={() => setType('step2')} >Step 2</button>
        <button onClick={() => setType('opposite')} >Opposite</button>
        <button onClick={() => setType('weirdy')} >Weirdy</button>
        <button onClick={() => setType('k-bots')} >Evil!!!!!</button>
        <button onClick={() => setType('greeny')} >Greeny</button>
        <button onClick={() => setType('b-w1')} >Black and white 1</button>
        <button onClick={() => setType('b-w2')} >Black and white 2</button>
        <button onClick={() => setType('b-w3')} >Black and white 3</button>
        <button onClick={() => setType('standard')} >Standard</button>
        <button onClick={drawImage} >Clickeroo</button>
      </aside>
    </div>
  );
}

export default App;
