import { nameToRgba } from "./util"

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

const getRgba = (name) => {
  if (!namedColors[name]) {
    namedColors[name] = nameToRgba(name)
    console.log(`identified ${name} as ${namedColors[name]}`)
  }
  return namedColors[name]
}

const filterEffects = {
  'green': {
    name: 'Green',
    function: (r, g, b, a) => [r, 150, b, a]
  },
  'blue': {
    name: 'Blue',
    function: (r, g, b, a) => [r, g, 150, a]
  },
  'red': {
    name: 'Red',
    function: (r, g, b, a) => [150, g, b, a]
  },
  'r-green': {
    name: 'Reverse Green',
    function: (r, g, b, a) => [r, 255 - g, b, a]
  },
  'r-blue': {
		name: 'Reverse Blue',
		function: (r, g, b, a) => [r, g, 255 - b, a]
  },
  'r-red': {
		name: 'Reverse Red',
		function: (r, g, b, a) => [255 - r, g, b, a]
	},
  'mix': {
		name: 'Mix',
		function: (r, g, b, a) => [g, b, r, a]
	},
  'mix-back': {
		name: 'Mix Back',
		function: (r, g, b, a) => [b, g, r, a]
	},
  'step1': {
		name: 'Step 1',
		function: (r, g, b, a) => [b, r, g, a]
	},
  'step2': {
		name: 'Step 2',
		function: (r, g, b, a) => [g, b, r, a]
	},
  'b-w1': {
		name: 'Black and White 1',
		function: (r, g, b, a) => [r, r, r, a]
	},
  'b-w2': {
		name: 'Black and White 2',
		function: (r, g, b, a) => [g, g, g, a]
	},
  'b-w3': {
		name: 'Black and White 3',
		function: (r, g, b, a) => [b, b, b, a]
	},
  'opposite': {
		name: 'Opposite',
		function: (r, g, b, a) => [255 - g, 255 - b, 255 - r, a]
	},
  'weirdy': {
		name: 'Weirdy',
		function: (r, g, b, a) => {
      const min = Math.min(r, g, b)
      return (min > 180) ? getRgba('white')
        : (min > 150) ? getRgba('papayawhip')
        : (min > 130) ? getRgba('yellow')
        : (min > 100) ? getRgba('orange')
        : (min > 80) ? getRgba('mauve')
        : (min > 60) ? getRgba('purple')
        : (min > 40) ? getRgba('#2f026e')
        : (min > 20) ? getRgba('black')
        : getRgba('blue')
    }
  },
  'k-bots': {
		name: 'Evil!!!!!',
    function: (r, g, b, a) => {
      const min = Math.min(r, g, b)
      if (min > 180) return getRgba('black')
      if (min > 150) return getRgba('papayawhip')
      if (min > 130) return getRgba('purple')
      if (min > 100) return getRgba('yellow')
      if (min > 80) return getRgba('mauve')
      if (min > 60) return getRgba('orange')
      if (min > 40) return getRgba('red')
      if (min > 20) return getRgba('white')
      return getRgba('blue')
    }
  },
  'greeny': {
		name: 'Greeny',
		function: (r, g, b, a) => {
      const min = Math.min(r, g, b)
      if (min > 220) return getRgba('white')
      if (min > 200) return getRgba('#e3fce1')
      if (min > 180) return getRgba('#ccfac8')
      if (min > 150) return getRgba('#a8f7a1')
      if (min > 130) return getRgba('#73f268')
      if (min > 100) return getRgba('#56db4b')
      if (min > 80) return getRgba('#42c437')
      if (min > 60) return getRgba('#24991a')
      if (min > 40) return getRgba('#0f7a06')
      if (min > 20) return getRgba('#063002')
      return getRgba('#18f705')
    }
  },
  'standard': {
		name: 'Standard',
		function: (r, g, b, a) => [r, g, b, a]
	},
}

export default filterEffects;