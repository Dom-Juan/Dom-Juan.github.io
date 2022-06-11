/*
A função é criada em tempo de interpretação utilizando
    const foo = (params) => {code...}
Desse jeito evita uso desnecessário da memória interpretador JavaScript no seu navegador,
usando e dando free() nas funções automaticamente.
*/

// Variáveis globais
let hoveredColor = document.getElementById('hovered-color');
let selectedColor = document.getElementById('selected-color');
let button = document.getElementById("btn-save");
let sobelButton = document.getElementById("btn-sobel");

// Canvas e seu contexto para saber o que renderizar.
let canvas1 = document.getElementById("canvas-pdi1");
let context1 = canvas1.getContext("2d");
const img = new Image();
const channels = {
  red: "#F00",
  green: "#0F0",
  blue: "#00F",
};

// Leitura da imagem.
const readImage = (input) => {
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  let imgSrc = '';
  if (input.value !== '') {
    imgSrc = window.URL.createObjectURL(input.files[0]);
  }

  img.onload = function () {
    context1.drawImage(img, 0, 0);
    img.style.display = 'none';
  }
  img.src = imgSrc;
};

// Copia a saida para entrada.
const copyToEntry = () => {
  //let canvas1 = document.getElementById("canvas-pdi1");
  let canvas2 = document.getElementById("canvas-pdi2");

  //let context1 = canvas1.getContext("2d");
  let context2 = canvas2.getContext("2d");

  let img2 = document.getElementById("canvas-pdi2");
  let imgData = context2.getImageData(0, 0, canvas2.width, canvas2.height);

  context1.putImageData(imgData, 0, 0);
};

button.addEventListener("click", (e) => {
  let canvas = document.querySelector("#canvas-pdi1");
  let dataURL = canvas.toDataURL("image/jpeg", 1.0);
  let filename = "saved-from-canvas.jpg";
  button.href = dataURL;
  button.download = filename;
});

const arrayMin = (arr) => {
  let len = arr.length, min = Infinity;
  while (len--) {
    if (Number(arr[len]) < min) {
      min = Number(arr[len]);
    }
  }
  return min;
};

const arrayMax = (arr) => {
  let len = arr.length, max = -Infinity;
  while (len--) {
    if (Number(arr[len]) > max) {
      max = Number(arr[len]);
    }
  }
  return max;
};

// ordenação de vetores
const bubbleSort = (array, size) => {
  if (size <= 1) return;
  let count = 0, auxiliar = 0;
  for (let i = 1; i < size; i++) {
    for (let j = 0; j < size - i; j++) {
      if (array[j] > array[j + 1]) {
        auxiliar = array[j];
        array[j] = array[j + 1];
        array[j + 1] = auxiliar;
        count++;
      }
    }
    if (count == 0) return;
  }
};

const toImgData = function toImgData(data, width, height) {
  // Caso necessite criar um canvas direto.
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Uint16Array]') {
    return new ImageData(data, width, height);
  }
  // Caso o canvas já exista.
  if (typeof window === 'object' && typeof window.document === 'object') {
    let canvas = document.createElement('canvas'); // Cria um canvas "falso".
    if (typeof canvas.getContext === 'function') { // Caso o vetor tenha um tipo função dentro dele.
      // Pegando contexto e criando imgData.
      let context = canvas.getContext('2d');
      let imageData = context.createImageData(width, height);
      imageData.data.set(data);
      return imageData;
    }
    // Retorna um array do "tipo" imgData.
    return new FakeImageData(data, width, height);
  }
  // Retorna um array do "tipo" imgData.
  return new FakeImageData(data, width, height);
};

// pega o pixel na coordenada x, y, utilizada na maioria das operações.
const bindPixelAt = (data, width) => {
  // retorna o pixel na posição requisitada.
  return function(x, y, i) {
    i = i || 0;
    return data[((width * y) + x) * 4 + i];
  }
};

// Adicionar ruído.
const pepperAndSalt = () => {
  let num = (Math.random() * 1);
  if(num >= 0.5)
    return 255;
  return 0;
}

const addNoise = () => {
  console.log("** Adicionar ruido **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  let noiseSize = Math.round(Math.random() * 100);
  console.log(imgData.width, imgData.height, noiseSize);
  let pixels = imgData.data;

  let count = 0;
  while (count < noiseSize) {
    for (let i = 0; i < imgData.height; i++) {
      for (let j = 0; j < imgData.width; j++) {
        let x = Math.floor(Math.random() * (imgData.width - 0) + 0) * i;
        let y = Math.floor(Math.random() * (imgData.height - 0) + 0) * j;
        let pixelIndex = (y * (imgData.width + x)) * 4;
        let saltOrPepper = pepperAndSalt();
        let color = parseInt((saltOrPepper + saltOrPepper + saltOrPepper) / 3);
        pixels[pixelIndex + 0] = color;
        pixels[pixelIndex + 1] = color;
        pixels[pixelIndex + 2] = color;
      }
    }
    count++;
  }
  
  imgData.data = pixels;
  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
};

// Pegar os canais RGB.
const copyToCanvas = (image) => {
  const can = document.createElement("canvas");
  can.width = "640" || image.width;
  can.height = "480"|| image.height;
  can.context = can.getContext("2d");
  can.context.drawImage(image, 0, 0);
  return can;
}

const getChannel = (channelName, image) => {
  const copy = copyToCanvas(image);
  const context = copy.context;
  context.fillStyle = channels[channelName];
  context.globalCompositeOperation = "multiply";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.globalCompositeOperation = "destination-in";
  context.drawImage(image, 0, 0);
  context.globalCompositeOperation = "source-over";
  return copy;
}

const seperateRGB = (image) => {
  return {
    red: getChannel("red", image),
    green: getChannel("green", image),
    blue: getChannel("blue", image),
  };
}

const createCanvas = (w, h, c) => {
  const can = document.getElementById(c);
  can.width = w;
  can.height = h;
  can.context = can.getContext("2d");
  return can;
}

const makeRGBChannel = () => {
  const RGB = seperateRGB(img);

  const recombined1 = createCanvas(RGB.red.width, RGB.red.height, "canvas-pdi2");
  const recombined2 = createCanvas(RGB.red.width, RGB.red.height, "canvas-pdi3");
  const recombined3 = createCanvas(RGB.red.width, RGB.red.height, "canvas-pdi4");
  
  const ctx1 = recombined1.context;
  const ctx2 = recombined2.context;
  const ctx3 = recombined3.context;
  
  // Canvas 1
  ctx1.drawImage(RGB.red, -2, -2);
  ctx1.drawImage(RGB.red, 0, 0);
  ctx1.drawImage(RGB.red, 2, 2);
  ctx1.globalCompositeOperation = "destination-in";
  ctx1.drawImage(img, 0, 0);
  ctx1.globalCompositeOperation = "source-over";

  // Canvas 2
  ctx2.drawImage(RGB.green, -2, -2);
  ctx2.drawImage(RGB.green, 0, 0);
  ctx2.drawImage(RGB.green, 2, 2);
  ctx2.globalCompositeOperation = "destination-in";
  ctx2.drawImage(img, 0, 0);
  ctx2.globalCompositeOperation = "source-over";

  // Canvas 3
  ctx3.drawImage(RGB.blue, -2, -2);
  ctx3.drawImage(RGB.blue, 0, 0);
  ctx3.drawImage(RGB.blue, 2, 2);
  ctx3.globalCompositeOperation = "destination-in";
  ctx3.drawImage(img, 0, 0);
  ctx3.globalCompositeOperation = "source-over";
}

const getRGBChannel = () => {
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let imgData2 = imgData, imgData3 = imgData, imgData4 = imgData;
  let pixels = imgData.data;

  // Red
  for(let i = 0; i < imgData2.data.length; i+=4) {
    imgData2.data[i] = imgData2.data[i];
    imgData2.data[i + 1] = 0;
    imgData2.data[i + 2] = 0;
  }

  // Green
  for(let i = 0; i < imgData3.data.length; i+=4) {
    imgData3.data[i] = 0;
    imgData3.data[i + 1] = imgData3.data[i + 1];
    imgData3.data[i + 2] = 0;
  }

  // Blue
  for(let i = 0; i < imgData4.data.length; i+=4) {
    imgData4.data[i] = 0;
    imgData4.data[i + 1] = 0;
    imgData4.data[i + 2] = imgData4.data[i + 2];
  }
  
  context2.putImageData(imgData2, 0, 0);
  context3.putImageData(imgData3, 0, 0);
  context4.putImageData(imgData4, 0, 0);
  
  console.log("Sucesso"); 
}

// Pegando a cor do pixel, ambas funções fazem o mesmo papel, apenas foi mudado
//o display de cores por clique do mouse ou passar o mouse em cima.
const pick = (event, destination) => {
  let x = event.layerX;
  let y = event.layerY;
  let pixel = context1.getImageData(x, y, 1, 1);
  let data = pixel.data;

  // Pegando as cores dos pixeis
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

  destination.style.background = rgba;
  document.getElementById("hover-rgba").innerHTML = rgba;
  return rgba;
}

const pick2 = (event, destination) => {
  let x = event.layerX;
  let y = event.layerY;
  let pixel = context1.getImageData(x, y, 1, 1);
  let data = pixel.data;

  // Pegando as cores dos pixeis
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

  destination.style.background = rgba;
  document.getElementById("click-rgba").innerHTML = rgba;
  return rgba;
}

// Adiciona os listeners do evento para setar as informações.
canvas1.addEventListener('mousemove', (event) => {
  pick(event, hoveredColor);
});

canvas1.addEventListener('click', (event) => {
  pick2(event, selectedColor);
});
// Operações passadas em aula.