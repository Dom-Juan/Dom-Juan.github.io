/*
A função é criada em tempo de interpretação utilizando
    const foo = (params) => {code...}
Desse jeito evita uso desnecessário da memória interpretador JavaScript no seu navegador,
usando e dando free() nas funções automaticamente.
*/

// Variáveis globais
let hoveredColor = document.getElementById('hovered-color');
let selectedColor = document.getElementById('selected-color');

// Canvas e seu contexto para saber o que renderizar.
let canvas1 = document.getElementById("canvas-pdi1");
let context1 = canvas1.getContext("2d");
const img = new Image();

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

const saveImage = () => {
  return;
};

// Converter cores
const HUEtoRGB = (p, q, t) => {
  if(t < 0 )
    t += 1;
  if(t > 1)
    t -= 1;
  if(t < 1/6)
    return p + (q - p) * 6 * t;
  if(1/2)
    return q;
  if(t < 2/3)
    return p + (q - p) * (2/3 - t) * 6;
  return p;
};

const RGBtoHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const l = Math.max(r, g, b);
  const s = 1 - Math.min(r, g, b);
  const h = s
            ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / 2 : 0;
  return [
    Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
    Math.round((100 * (2 * l - s)) / 2),
  ];
};

const HSLtoRGB = (h, s, l) => {
  let r, g, b;

  if(s == 0)
    r = g = b = l; // Caso acromático.
  else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = HUEtoRGB(p, q, h + 1/3);
    g = HUEtoRGB(p, q, h);
    b = HUEtoRGB(p, q, h - 1/3);
  }
  return [
    Math.round(r * 255), 
    Math.round(g * 255), 
    Math.round(b * 255)
  ];
};

// Converter cores.

// Adicionar ruído.
// Adicionar ruído.
const pepperAndSalt = () => {
  let num = (Math.random() * 1);
  if(num > 0.5)
    return 255;
  return 0;
}

const addNoise = () => {
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");
  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  for(let i = 0; i < imgData.data.length; i += 20 ) {
    imgData.data[i + Math.floor(Math.random() * 2)] = pepperAndSalt();
    imgData.data[i + Math.floor(Math.random() * 2)] = pepperAndSalt();
    imgData.data[i + Math.floor(Math.random() * 2)] = pepperAndSalt();
  }

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
};

// Operações passadas em aula.

// Inverte cores.
const invertColors = () => {
  //let canvas1 = document.getElementById("canvas-pdi1");
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  //let context1 = canvas1.getContext("2d");
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  context2.drawImage(img2, 0, 0);
  context3.drawImage(img2, 0, 0);
  context4.drawImage(img2, 0, 0);

  let imgData2 = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  for (let i = 0; i < imgData2.data.length; i += 4) {
    imgData2.data[i] = 255 - imgData2.data[i];
    imgData2.data[i + 1] = 255 - imgData2.data[i + 1];
    imgData2.data[i + 2] = 255 - imgData2.data[i + 2];
    imgData2.data[i + 3] = 255;
  }

  context2.putImageData(imgData2, 0, 0);
  context3.putImageData(imgData2, 0, 0);
  context4.putImageData(imgData2, 0, 0);

  return "Sucesso";
};

// Converter para Cinza.
const convertGrey = () => {
  //let canvas1 = document.getElementById("canvas-pdi1");
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  //let context1 = canvas1.getContext("2d");
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let pixels = imgData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    let I = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    pixels[i] = I;
    pixels[i + 1] = I;
    pixels[i + 2] = I;
  }
  imgData.data = pixels;
  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  return "Sucesso";
};

const getRGBChannel = () => {
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let imgData2 = imgData, imgData3 = imgData, imgData4 = imgData;
  let pixels = imgData.data;

  // Red
  for(let i = 0; i < pixels.length; i+=4) {
    imgData2.data[i] = pixels[i];
    imgData2.data[i + 1] = pixels[i];
    imgData2.data[i + 2] = pixels[i];
  }

  // Green
  for(let i = 0; i < pixels.length; i+=4) {
    imgData3.data[i] = pixels[i + 1];
    imgData3.data[i + 1] = pixels[i + 1];
    imgData3.data[i + 2] = pixels[i + 1];
  }

  // Blue
  for(let i = 0; i < pixels.length; i+=4) {
    imgData4.data[i] = pixels[i + 2];
    imgData4.data[i + 1] = pixels[i + 2];
    imgData4.data[i + 2] = pixels[i + 2];
  }
  
  context2.putImageData(imgData2, 0, 0);
  context3.putImageData(imgData3, 0, 0);
  context4.putImageData(imgData4, 0, 0);
  
  return "Sucesso";
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

// Calculando o realce.


// Calculando o histograma.


// Filtro da média.
const filterByMedian = () => {
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  // Pegando a imagem da entrada.
  let img2 = document.getElementById("canvas-pdi1");

  context2.drawImage(img2, 0, 0);
  context3.drawImage(img2, 0, 0);
  context4.drawImage(img2, 0, 0);

  // Pegando o conteudo da imagem.

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let pixels = imgData.data; // Pegando os pixeis

  // Pegando os cantso da imagem.
  let edgeX = Math.floor(imgData.width);
  let edgeY = Math.floor(imgData.height);
  let f = 9;
  
  // Máscara.
  let m = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // Percorrendo os pixeis.
  for (let y = 1; y < edgeY; y++) {
    for (let x = 1; x < edgeX; x++) {
      let posAtual = y * imgData.width + x;
      switch (posAtual) {
        case (0)://canto superior esquerdo
          m[0] = pixels[posAtual];
          m[1] = pixels[posAtual];
          m[2] = pixels[posAtual + 1];
          m[3] = pixels[posAtual];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual + 1];
          m[6] = pixels[(y + 1) * edgeX + (x)];
          m[7] = pixels[(y + 1) * edgeX + (x)];
          m[8] = pixels[(y + 1) * edgeX + (x + 1)];
          break;
        case (edgeX - 1): //canto superior direito
          m[0] = pixels[posAtual - 1]
          m[1] = pixels[posAtual];
          m[2] = pixels[posAtual];
          m[3] = pixels[posAtual - 1];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual];
          m[6] = pixels[(y + 1) * edgeX + (x - 1)];
          m[7] = pixels[(y + 1) * edgeX + (x)];
          m[8] = pixels[(y + 1) * edgeX + (x)];
          break;
        case ((edgeY - 1) * edgeX)://canto inferior esquerdo
          m[0] = pixels[(y - 1) * edgeX + (x)]
          m[1] = pixels[(y - 1) * edgeX + (x)];
          m[2] = pixels[(y - 1) * edgeX + (x + 1)];
          m[3] = pixels[posAtual];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual + 1];
          m[6] = pixels[posAtual];
          m[7] = pixels[posAtual];
          m[8] = pixels[posAtual + 1];
          break;
        case (edgeY * edgeX - 1): //canto inferior direito
          m[0] = pixels[(y - 1) * edgeX + (x - 1)]
          m[1] = pixels[(y - 1) * edgeX + (x)];
          m[2] = pixels[(y - 1) * edgeX + (x)];
          m[3] = pixels[posAtual - 1];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual];
          m[6] = pixels[posAtual - 1];
          m[7] = pixels[posAtual];
          m[8] = pixels[posAtual];
          break;
        case (y * edgeX): //borda esquerda
          m[0] = pixels[(y - 1) * edgeX + (x)]
          m[1] = pixels[(y - 1) * edgeX + (x)];
          m[2] = pixels[(y - 1) * edgeX + (x + 1)];
          m[3] = pixels[posAtual];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual + 1];
          m[6] = pixels[(y + 1) * edgeX + (x)];
          m[7] = pixels[(y + 1) * edgeX + (x)];
          m[8] = pixels[(y + 1) * edgeX + (x + 1)];
          break;
        case ((y + 1) * edgeX - 1): //borda direita
          m[0] = pixels[(y - 1) * edgeX + (x - 1)]
          m[1] = pixels[(y - 1) * edgeX + (x)];
          m[2] = pixels[(y - 1) * edgeX + (x)];
          m[3] = pixels[posAtual - 1];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual];
          m[6] = pixels[(y + 1) * edgeX + (x - 1)];
          m[7] = pixels[(y + 1) * edgeX + (x)];
          m[8] = pixels[(y + 1) * edgeX + (x)];
          break;
        case edgeX: //borda cima
          m[0] = pixels[posAtual - 1]
          m[1] = pixels[posAtual];
          m[2] = pixels[posAtual + 1];
          m[3] = pixels[posAtual - 1];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual + 1];
          m[6] = pixels[(y + 1) * edgeX + (x - 1)];
          m[7] = pixels[(y + 1) * edgeX + (x)];
          m[8] = pixels[(y + 1) * edgeX + (x + 1)];
          break;
        case (edgeY - 1) * edgeX: //borda baixo
          m[0] = pixels[(y - 1) * edgeX + (x - 1)]
          m[1] = pixels[(y - 1) * edgeX + x];
          m[2] = pixels[(y - 1) * edgeX + (x + 1)];
          m[3] = pixels[posAtual - 1];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual + 1];
          m[6] = pixels[posAtual - 1];
          m[7] = pixels[posAtual];
          m[8] = pixels[posAtual + 1];
          break;
        default:
          m[0] = pixels[(y - 1) * edgeX + (x - 1)]
          m[1] = pixels[(y - 1) * edgeX + (x)];
          m[2] = pixels[(y - 1) * edgeX + (x + 1)];
          m[3] = pixels[posAtual - 1];
          m[4] = pixels[posAtual];
          m[5] = pixels[posAtual + 1];
          m[6] = pixels[(y + 1) * edgeX + (x - 1)];
          m[7] = pixels[(y + 1) * edgeX + (x)];
          m[8] = pixels[(y + 1) * edgeX + (x + 1)];
          break;
      }
      // Varredura dos vizinhos.
      let value = 0;
      for (let aux = 0; aux < 9; aux++)
        value += m[aux];
      pixels[posAtual + 0] = Math.round(value / f);
      pixels[posAtual + 1] = Math.round(value / f);
      pixels[posAtual + 2] = Math.round(value / f);
    }
  }
  imgData.data = pixels;
  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  return "Sucesso";
}

// Filtro da mediana.

// Operações passadas em aula.