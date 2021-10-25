const kernels = {
  identity: {
    mask: [
      [0,0,0],
      [0,1,0]
      [0,0,0]
    ],
    normal: 1
  },
  edgeDetect: {
    mask:[
      [-1,-1,-1],
      [-1, 8,-1],
      [-1,-1,-1]
    ],
    normal: 1
  },
  blur: {
    mask: [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ],
    normal: 9
  }
}

export default kernels