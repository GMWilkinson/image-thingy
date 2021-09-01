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

  const getPixel = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const pixelArray = []
    console.log('start')
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        const [r, g, b, a] = ctx.getImageData(j, i, 1, 1).data
        let colorString
        if (type === 'green') {
          colorString = `rgba(${r}, 150, ${b}, ${a})`
        } else if (type === 'blue') {
          colorString = `rgba(${r}, ${g}, 150, ${a})`
        } else if (type === 'red') {
          colorString = `rgba(150, ${g}, ${b}, ${a})`
        } else if (type === 'r-green') {
          colorString = `rgba(${r}, ${255 - g}, ${b}, ${a})`
        } else if (type === 'r-blue') {
          colorString = `rgba(${r}, ${g}, ${255 - b}, ${a})`
        } else if (type === 'r-red') {
          colorString = `rgba(${255 - r}, ${g}, ${b}, ${a})`
        } else if (type === 'mix') {
          colorString = `rgba(${g}, ${b}, ${r}, ${a})`
        } else if (type === 'mix-back') {
          colorString = `rgba(${b}, ${g}, ${r}, ${a})`
        } else if (type === 'step1') {
          colorString = `rgba(${b}, ${r}, ${g}, ${a})`
        } else if (type === 'step2') {
          colorString = `rgba(${g}, ${b}, ${r}, ${a})`
        } else if (type === 'weirdy') {
          if (r > 180 && g > 180 && b > 180) {
            colorString = `white`
          } else if (r > 150 && g > 150 && b > 150) {
            colorString = 'papayawhip'
          } else if (r > 130 && g > 130 && b > 130) {
            colorString = 'yellow'
          } else if (r > 100 && g > 100 && b > 100) {
            colorString = 'orange'
          } else if (r > 80 && g > 80 && b > 80) {
            colorString = 'mauve'
          } else if (r > 60 && g > 60 && b > 60) {
            colorString = 'purple'
          } else if (r > 40 && g > 40 && b > 40) {
            colorString = '#2f026e'
          } else if (r > 20 && g > 20 && b > 20) {
            colorString = 'black'
          }  else {
            colorString = 'blue'
          }
        } else if (type === 'k-bots') {
          if (r > 180 && g > 180 && b > 180) {
            colorString = `black`
          } else if (r > 150 && g > 150 && b > 150) {
            colorString = 'papayawhip'
          } else if (r > 130 && g > 130 && b > 130) {
            colorString = 'purple'
          } else if (r > 100 && g > 100 && b > 100) {
            colorString = 'yellow'
          } else if (r > 80 && g > 80 && b > 80) {
            colorString = 'mauve'
          } else if (r > 60 && g > 60 && b > 60) {
            colorString = 'orange'
          } else if (r > 40 && g > 40 && b > 40) {
            colorString = 'red'
          } else if (r > 20 && g > 20 && b > 20) {
            colorString = 'white'
          }  else {
            colorString = 'blue'
          }
        } else if (type === 'greeny') {
          if (r > 220 && g > 220 && b > 220) {
            colorString = `white`
          } else if (r > 200 && g > 200 && b > 200) {
            colorString = `#e3fce1`
          } else if (r > 180 && g > 180 && b > 180) {
            colorString = `#ccfac8`
          } else if (r > 150 && g > 150 && b > 150) {
            colorString = '#a8f7a1'
          } else if (r > 130 && g > 130 && b > 130) {
            colorString = '#73f268'
          } else if (r > 100 && g > 100 && b > 100) {
            colorString = '#56db4b'
          } else if (r > 80 && g > 80 && b > 80) {
            colorString = '#42c437'
          } else if (r > 60 && g > 60 && b > 60) {
            colorString = '#24991a'
          } else if (r > 40 && g > 40 && b > 40) {
            colorString = '#0f7a06'
          } else if (r > 20 && g > 20 && b > 20) {
            colorString = '#063002'
          }  else {
            colorString = '#18f705'
          }
        } else if (type === 'b-w1') {
          colorString = `rgba(${r}, ${r}, ${r}, ${a})`
        } else if (type === 'b-w2') {
          colorString = `rgba(${g}, ${g}, ${g}, ${a})`
        } else if (type === 'b-w3') {
          colorString = `rgba(${b}, ${b}, ${b}, ${a})`
        } else if (type === 'opposite') {
          colorString = `rgba(${255 - g}, ${255 - b}, ${255 - r}, ${a})`
        } else if (type === 'standard') {
          colorString = `rgba(${r}, ${g}, ${b}, ${a})`
        } else {
          colorString = `rgba(${r}, ${g}, ${b}, ${a})`
        }
        if (a !== 0) {
          pixelArray.push(<div style={{width: 1, height: 1, backgroundColor: colorString}}></div> )
        } else {
          pixelArray.push(<div style={{width: 1, height: 1, backgroundColor: 'black'}}></div> )
        }
      }
    }
    console.log('finish')
    setPixels(pixelArray)
  }

  return (
    <div className="App">
      <main className="App-header">
        <img 
          id="my-image" 
          src={process.env.PUBLIC_URL + '/strad.jpg'} 
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
