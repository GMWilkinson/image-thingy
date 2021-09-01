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
    let canvas = document.getElementById('canvas')
    const pixelArray = []
    console.log('start')
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        let pixelData = canvas.getContext('2d').getImageData(j, i, 1, 1).data
        let colorString
        if (type === 'green') {
          colorString = `rgba(${pixelData[0]}, 150, ${pixelData[2]}, ${pixelData[3]})`
        } else if (type === 'blue') {
          colorString = `rgba(${pixelData[0]}, ${pixelData[1]}, 150, ${pixelData[3]})`
        } else if (type === 'red') {
          colorString = `rgba(150, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`
        } else if (type === 'r-green') {
          colorString = `rgba(${pixelData[0]}, ${255 - pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`
        } else if (type === 'r-blue') {
          colorString = `rgba(${pixelData[0]}, ${pixelData[1]}, ${255 - pixelData[2]}, ${pixelData[3]})`
        } else if (type === 'r-red') {
          colorString = `rgba(${255 - pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`
        } else if (type === 'mix') {
          colorString = `rgba(${pixelData[1]}, ${pixelData[2]}, ${pixelData[0]}, ${pixelData[3]})`
        } else if (type === 'mix-back') {
          colorString = `rgba(${pixelData[2]}, ${pixelData[1]}, ${pixelData[0]}, ${pixelData[3]})`
        } else if (type === 'step1') {
          colorString = `rgba(${pixelData[2]}, ${pixelData[0]}, ${pixelData[1]}, ${pixelData[3]})`
        } else if (type === 'step2') {
          colorString = `rgba(${pixelData[1]}, ${pixelData[2]}, ${pixelData[0]}, ${pixelData[3]})`
        } else if (type === 'weirdy') {
          if (pixelData[0] > 180 && pixelData[1] > 180 && pixelData[2] > 180) {
            colorString = `white`
          } else if (pixelData[0] > 150 && pixelData[1] > 150 && pixelData[2] > 150) {
            colorString = 'papayawhip'
          } else if (pixelData[0] > 130 && pixelData[1] > 130 && pixelData[2] > 130) {
            colorString = 'yellow'
          } else if (pixelData[0] > 100 && pixelData[1] > 100 && pixelData[2] > 100) {
            colorString = 'orange'
          } else if (pixelData[0] > 80 && pixelData[1] > 80 && pixelData[2] > 80) {
            colorString = 'mauve'
          } else if (pixelData[0] > 60 && pixelData[1] > 60 && pixelData[2] > 60) {
            colorString = 'purple'
          } else if (pixelData[0] > 40 && pixelData[1] > 40 && pixelData[2] > 40) {
            colorString = '#2f026e'
          } else if (pixelData[0] > 20 && pixelData[1] > 20 && pixelData[2] > 20) {
            colorString = 'black'
          }  else {
            colorString = 'blue'
          }
        } else if (type === 'k-bots') {
          if (pixelData[0] > 180 && pixelData[1] > 180 && pixelData[2] > 180) {
            colorString = `black`
          } else if (pixelData[0] > 150 && pixelData[1] > 150 && pixelData[2] > 150) {
            colorString = 'papayawhip'
          } else if (pixelData[0] > 130 && pixelData[1] > 130 && pixelData[2] > 130) {
            colorString = 'purple'
          } else if (pixelData[0] > 100 && pixelData[1] > 100 && pixelData[2] > 100) {
            colorString = 'yellow'
          } else if (pixelData[0] > 80 && pixelData[1] > 80 && pixelData[2] > 80) {
            colorString = 'mauve'
          } else if (pixelData[0] > 60 && pixelData[1] > 60 && pixelData[2] > 60) {
            colorString = 'orange'
          } else if (pixelData[0] > 40 && pixelData[1] > 40 && pixelData[2] > 40) {
            colorString = 'red'
          } else if (pixelData[0] > 20 && pixelData[1] > 20 && pixelData[2] > 20) {
            colorString = 'white'
          }  else {
            colorString = 'blue'
          }
        } else if (type === 'greeny') {
          if (pixelData[0] > 220 && pixelData[1] > 220 && pixelData[2] > 220) {
            colorString = `white`
          } else if (pixelData[0] > 200 && pixelData[1] > 200 && pixelData[2] > 200) {
            colorString = `#e3fce1`
          } else if (pixelData[0] > 180 && pixelData[1] > 180 && pixelData[2] > 180) {
            colorString = `#ccfac8`
          } else if (pixelData[0] > 150 && pixelData[1] > 150 && pixelData[2] > 150) {
            colorString = '#a8f7a1'
          } else if (pixelData[0] > 130 && pixelData[1] > 130 && pixelData[2] > 130) {
            colorString = '#73f268'
          } else if (pixelData[0] > 100 && pixelData[1] > 100 && pixelData[2] > 100) {
            colorString = '#56db4b'
          } else if (pixelData[0] > 80 && pixelData[1] > 80 && pixelData[2] > 80) {
            colorString = '#42c437'
          } else if (pixelData[0] > 60 && pixelData[1] > 60 && pixelData[2] > 60) {
            colorString = '#24991a'
          } else if (pixelData[0] > 40 && pixelData[1] > 40 && pixelData[2] > 40) {
            colorString = '#0f7a06'
          } else if (pixelData[0] > 20 && pixelData[1] > 20 && pixelData[2] > 20) {
            colorString = '#063002'
          }  else {
            colorString = '#18f705'
          }
        } else if (type === 'b-w1') {
          colorString = `rgba(${pixelData[0]}, ${pixelData[0]}, ${pixelData[0]}, ${pixelData[3]})`
        } else if (type === 'b-w2') {
          colorString = `rgba(${pixelData[1]}, ${pixelData[1]}, ${pixelData[1]}, ${pixelData[3]})`
        } else if (type === 'b-w3') {
          colorString = `rgba(${pixelData[2]}, ${pixelData[2]}, ${pixelData[2]}, ${pixelData[3]})`
        } else if (type === 'opposite') {
          colorString = `rgba(${255 - pixelData[1]}, ${255 - pixelData[2]}, ${255 - pixelData[0]}, ${pixelData[3]})`
        } else if (type === 'standard') {
          colorString = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`
        } else {
          colorString = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`
        }
        if (pixelData[3] !== 0) {
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
