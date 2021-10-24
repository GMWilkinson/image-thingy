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

const mixEffects = (images, effectFunction, height) => {
  const image1 = {
      data: images[0].data,
      width: images[0].width,
      pixelQuantity: images[0].data.length * 0.25
  }
  const image2 = {
      data: images[1].data,
      width: images[1].width,
      pixelQuantity: images[1].data.length * 0.25
  }
  const h = height
  const w = image1.width
  const mixedPixelData = []
  for (image1.pixelQuantity; image1.pixelQuantity; image1.pixelQuantity--) {
      if (!(image1.pixelQuantity % 10000)) {
          console.log(`${image1.pixelQuantity} pixels left`)
      }
      if (image1.pixelQuantity % 2 === 0) {
          const [r, g, b, a] = image1.data.slice((image1.pixelQuantity - 1) * 4, image1.pixelQuantity * 4) 
          const convertedRgba = effectFunction(r, g, b, a, w, h, image1.pixelQuantity)
          mixedPixelData.unshift(...convertedRgba)
      } else {
          const [r, g, b, a] = image2.data.slice((image1.pixelQuantity - 1) * 4, image1.pixelQuantity * 4) 
          const convertedRgba = effectFunction(r, g, b, a, w, h, image1.pixelQuantity)
          mixedPixelData.unshift(...convertedRgba)
      }
  }
  return mixedPixelData
}

const convolve = (
  pixelData = [],
  width = 0,
  kernel = {
    mask: [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ],
    normal: 1
  }
) => {
  const convolution = []
  const maskSize = kernel.mask.length
  const maskOffset = maskSize - 1 * 0.5
  const factor = 1/kernel.normal
  const w4 = width * 4
  let pixelYOffset = 0
  let pixelXOffset = 0
  let pointsLeft = pixelData.length - 1
  for (pointsLeft; pointsLeft >= 0; pointsLeft--) {
    let newValue = pixelData[pointsLeft] // original
    if ((pointsLeft + 1) % 4) {
      let total = 0;
      for (let i = 0; i < maskSize; i++) {
        pixelYOffset = (i - maskOffset) * w4
        for (let j = 0; j < maskSize; j++) {
          pixelXOffset = (j - maskOffset) * 4
          const pixelValue = pixelData[pointsLeft + pixelXOffset + pixelYOffset]
          total += kernel.mask[i][j] * (pixelValue !== undefined ? pixelValue : newValue)
        }
      }
      newValue = total * factor
    }
    convolution.unshift(newValue)
    if (!(pointsLeft % 10000)) {
      console.log(`${pointsLeft} pixels left`)
    }
  }
  console.log('converted pixels now exist')
  return convolution
}

const applyEdgeDetect = (pixelData, width) => {
  // should be, black&white, then convolve with edge detect kernel
  const convertedPixelData = []
  let dataPoints = pixelData.length
  const w4 = width * 4;
  for (dataPoints; dataPoints; dataPoints--) { 
    const pointAbove = pixelData[dataPoints-w4] || 0
    const pointLeft = pixelData[dataPoints-4] || 0
    const pointRight = pixelData[dataPoints+4] || 0
    const pointBelow = pixelData[dataPoints+w4] || 0
    const thisPoint = pixelData[dataPoints]
    let edgeDiff = Math.max(
      Math.abs(thisPoint - pointAbove),
      Math.abs(thisPoint - pointLeft),
      Math.abs(thisPoint - pointRight),
      Math.abs(thisPoint - pointBelow)
    )
    if (edgeDiff < 15) edgeDiff = 0;
    convertedPixelData.unshift(edgeDiff)
    
  }
  console.log('converted pixels now exist')
  return convertedPixelData
}

const toColorString = (rgba) => `rgba(${rgba.join()})`

module.exports = {
  nameToRgba,
  applyEffect,
  mixEffects,
  toColorString,
  applyEdgeDetect,
  convolve
}