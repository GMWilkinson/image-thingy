const nameToRgba = (name) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.fillStyle = name;
  context.fillRect(0,0,1,1);
  return [...context.getImageData(0,0,1,1).data];
}

const applyEffect = (effectFunction, pixelData, width) => {
  console.log('applying effect to pixel data')
  const convertedPixelData = []
  let numberOfPixels = pixelData.length * 0.25
  const height = numberOfPixels / width
  const [w, h] = [width, height];
  for (numberOfPixels; numberOfPixels; numberOfPixels--) {
    const [r, g, b, a] = pixelData.slice((numberOfPixels - 1) * 4, numberOfPixels * 4)  
    const convertedRgba = effectFunction(r, g, b, a, w, h, numberOfPixels)
    convertedPixelData.unshift(...convertedRgba)
    if (!(numberOfPixels % 10000)) {
      console.log(`${numberOfPixels} pixels left`)
    }
  }
  console.log('converted pixels now exist')
  return convertedPixelData
}

const toColorString = (rgba) => `rgba(${rgba.join()})`

module.exports = {
  nameToRgba,
  applyEffect,
  toColorString
}