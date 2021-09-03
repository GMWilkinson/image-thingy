import React, {useState, useEffect} from 'react'
import './App.css'


function App() {
  const width = 200
  const height = 300
  const [drawnImage, setDrawnImage] = useState(null)
  const [pixels, setPixels] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    createCanvas()
    if (pixels) {
      console.log('draw')
      setDrawnImage(pixels)
    }
  });

  const createCanvas = () => {
    let img = document.getElementById('my-image')
    let canvas = document.getElementById('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
  }

  const effect = {
    'green': (r, g, b, a) => `rgba(${r}, ${150}, ${b}, ${a})`,
    'blue': (r, g, b, a) => `rgba(${r}, ${g}, ${150}, ${a})`,
    'red': (r, g, b, a) => `rgba(${150}, ${g}, ${b}, ${a})`,
    'r-green': (r, g, b, a) => `rgba(${r}, ${255 - g}, ${b}, ${a})`,
    'r-blue': (r, g, b, a) => `rgba(${r}, ${g}, ${255 - b}, ${a})`,
    'r-red': (r, g, b, a) => `rgba(${255 - r}, ${g}, ${b}, ${a})`,
    'mix': (r, g, b, a) => `rgba(${g}, ${b}, ${r}, ${a})`,
    'mix-back': (r, g, b, a) => `rgba(${b}, ${g}, ${r}, ${a})`,
    'step1': (r, g, b, a) => `rgba(${b}, ${r}, ${g}, ${a})`,
    'step2': (r, g, b, a) => `rgba(${g}, ${b}, ${r}, ${a})`,
    'b-w1': (r, g, b, a) => `rgba(${r}, ${r}, ${r}, ${a})`,
    'b-w2': (r, g, b, a) => `rgba(${g}, ${g}, ${g}, ${a})`,
    'b-w3': (r, g, b, a) => `rgba(${b}, ${b}, ${b}, ${a})`,
    'opposite': (r, g, b, a) => `rgba(${255 - g}, ${255 - b}, ${255 - r}, ${a})`,
    'standard': (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`,
    'default': (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`,
    'weirdy': (r, g, b, a) => {
      const min = Math.min(r, g, b)
      if (min > 180) return `white`
      if (min > 150) return 'papayawhip'
      if (min > 130) return 'yellow'
      if (min > 100) return 'orange'
      if (min > 80) return 'mauve'
      if (min > 60) return 'purple'
      if (min > 40) return '#2f026e'
      if (min > 20) return 'black'
      return 'blue'
    },
    'k-bots': (r, g, b, a) => {
      if (r > 180 && g > 180 && b > 180) return `black`
      if (r > 150 && g > 150 && b > 150) return 'papayawhip'
      if (r > 130 && g > 130 && b > 130) return 'purple'
      if (r > 100 && g > 100 && b > 100) return 'yellow'
      if (r > 80 && g > 80 && b > 80) return 'mauve'
      if (r > 60 && g > 60 && b > 60) return 'orange'
      if (r > 40 && g > 40 && b > 40) return 'red'
      if (r > 20 && g > 20 && b > 20) return 'white'
      return 'blue'
    },
    'greeny': (r, g, b, a) => {
      if (r > 220 && g > 220 && b > 220) return `white`
      if (r > 200 && g > 200 && b > 200) return `#e3fce1`
      if (r > 180 && g > 180 && b > 180) return `#ccfac8`
      if (r > 150 && g > 150 && b > 150) return '#a8f7a1'
      if (r > 130 && g > 130 && b > 130) return '#73f268'
      if (r > 100 && g > 100 && b > 100) return '#56db4b'
      if (r > 80 && g > 80 && b > 80) return '#42c437'
      if (r > 60 && g > 60 && b > 60) return '#24991a'
      if (r > 40 && g > 40 && b > 40) return '#0f7a06'
      if (r > 20 && g > 20 && b > 20) return '#063002'
      return '#18f705'
    }
  }

  const getPixel = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const pixelData = ctx.getImageData(1,1,width, height).data
    const pixelArray = []
    let numberOfPixels = width * height
    console.log('start')
    for (numberOfPixels; numberOfPixels; numberOfPixels--) {
      const [r, g, b, a] = pixelData.slice((numberOfPixels - 1) * 4, numberOfPixels * 4)
      let colorString
      if (a === 0) {
        colorString = 'black'
      } else {
        const effectFunction = effect[type] || effect.default
        colorString = effectFunction(r, g, b, a)
      }
      pixelArray.unshift(<div style={{width: 1, height: 1, backgroundColor: colorString}}></div> )
    }
    console.log('finish')
    setPixels(pixelArray)
  }

  return (
    <div className="App">
      <main className="App-header">
        <img 
          id="my-image" 
          src={process.env.PUBLIC_URL + '/400.jpg'} 
        />
        <div className="box">
          {drawnImage && drawnImage.map((pixel) => 
            pixel
          )}
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
        <button onClick={getPixel} >Clickeroo</button>
      </aside>
    </div>
  );
}

export default App;
