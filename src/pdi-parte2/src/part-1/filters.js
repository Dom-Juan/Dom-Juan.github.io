// Filtro da média.
const convolutionAverage = (imgData, kernel) => {
  console.log("Entrou!!!");
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let clampedArray = [];
  let result = [];
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      let pixel = (
        kernel[0][0]*pixelAt(x - 1, y - 1) +
        kernel[0][1]*pixelAt(x, y - 1) +
        kernel[0][2]*pixelAt(x + 1, y - 1) +
        kernel[1][0]*pixelAt(x - 1, y) +
        kernel[1][1]*pixelAt(x, y) +
        kernel[1][2]*pixelAt(x + 1, y) +
        kernel[2][0]*pixelAt(x - 1, y + 1) +
        kernel[2][1]*pixelAt(x, y + 1) +
        kernel[2][2]*pixelAt(x + 1, y + 1)
      );
      pixel = Math.round((pixel/9));
      // R, G, B, A. 255 é para a transparência.
      result.push(pixel, pixel, pixel, 255);
    }
  }

  clampedArray = result;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(result);
  }

  
  if(imgData.data === clampedArray) console.log("Q porra é essa ?", clampedArray);

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

// Filtro da mediana
const convolutionMedian = (imgData, mask) => {
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let clampedArray = [];
  let result = [];
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      mask[0] = pixelAt(x - 1, y - 1);
      mask[1] = pixelAt(x, y - 1);
      mask[2] = pixelAt(x + 1, y - 1);
      mask[3] = pixelAt(x - 1, y);
      mask[4] = pixelAt(x, y);
      mask[5] = pixelAt(x + 1, y);
      mask[6] = pixelAt(x - 1, y + 1);
      mask[7] = pixelAt(x, y + 1);
      mask[8] = pixelAt(x + 1, y + 1);
      bubbleSort(mask, mask.length);
      // R, G, B, A. 255 é para a transparência.
      result.push(mask[4], mask[4], mask[4], 255);
    }
  }

  clampedArray = result;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(result);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

// Filtro do ponto médio
const convolutionAveragePoint = (imgData, mask) => {
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let clampedArray = [];
  let result = [];
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      mask[0] = pixelAt(x - 1, y - 1);
      mask[1] = pixelAt(x, y - 1);
      mask[2] = pixelAt(x + 1, y - 1);
      mask[3] = pixelAt(x - 1, y);
      mask[4] = pixelAt(x, y);
      mask[5] = pixelAt(x + 1, y);
      mask[6] = pixelAt(x - 1, y + 1);
      mask[7] = pixelAt(x, y + 1);
      mask[8] = pixelAt(x + 1, y + 1);
      let min = Math.min(...mask);
      let max = Math.max(...mask);
      let pm = (max + min)/2
      // R, G, B, A. 255 é para a transparência.
      result.push(pm, pm, pm, 255);
    }
  }

  clampedArray = result;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(result);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

// Filtro do mínimo
const convolutionMin = (imgData, mask) => {
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let clampedArray = [];
  let result = [];
  
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      mask[0] = pixelAt(x - 1, y - 1);
      mask[1] = pixelAt(x, y - 1);
      mask[2] = pixelAt(x + 1, y - 1);
      mask[3] = pixelAt(x - 1, y);
      mask[4] = pixelAt(x, y);
      mask[5] = pixelAt(x + 1, y);
      mask[6] = pixelAt(x - 1, y + 1);
      mask[7] = pixelAt(x, y + 1);
      mask[8] = pixelAt(x + 1, y + 1);
      let min = Math.min(...mask);
      // R, G, B, A. 255 é para a transparência.
      result.push(min, min, min, 255);
    }
  }

  clampedArray = result;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(result);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

// Filtro do máximo
const convolutionMax = (imgData, mask) => {
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let clampedArray = [];
  let result = [];
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      mask[0] = pixelAt(x - 1, y - 1);
      mask[1] = pixelAt(x, y - 1);
      mask[2] = pixelAt(x + 1, y - 1);
      mask[3] = pixelAt(x - 1, y);
      mask[4] = pixelAt(x, y);
      mask[5] = pixelAt(x + 1, y);
      mask[6] = pixelAt(x - 1, y + 1);
      mask[7] = pixelAt(x, y + 1);
      mask[8] = pixelAt(x + 1, y + 1);
      let max = Math.max(...mask);
      // R, G, B, A. 255 é para a transparência.
      result.push(max, max, max, 255);
    }
  }

  clampedArray = result;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(result);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

// Filtro da média.
const filterByAverage = () => {
  console.log("** Filtro por média **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  // Pegando o conteudo da imagem.

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);
  
  // Máscara.
  let m = [
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
  ];

  console.table({imgData, m});

  let result = convolutionAverage(imgData, m);
  
  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  console.table({imgData, m});

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  console.log("Sucesso");
}

// Filtro da mediana.
const filterByMedian = () => {
  console.log("** Filtro por mediana **");
  
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  // Pegando o conteudo da imagem.

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);
  
  // Máscara.
  let m = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  let result = convolutionMedian(imgData, m);
  
  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  console.log("Sucesso");
}

// Filtro do ponto médio.
const filterByAveragePoint = () => {
  console.log("** Filtro por mediana **");
  
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  // Pegando o conteudo da imagem.

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);
  
  // Máscara.
  let m = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  let result = convolutionAveragePoint(imgData, m);
  
  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  console.log("Sucesso");
}

// Filtro do mínimo.
const filterByMin = () => {
  console.log("** Filtro por mediana **");
  
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  // Pegando o conteudo da imagem.

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);
  
  // Máscara.
  let m = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  let result = convolutionMin(imgData, m);
  
  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  console.log("Sucesso");
}

// Filtro do máximo.
const filterByMax = () => {
  console.log("** Filtro por mediana **");
  
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  // Pegando o conteudo da imagem.

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);
  
  // Máscara.
  let m = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  let result = convolutionMax(imgData, m);
  
  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  console.log("Sucesso");
}
