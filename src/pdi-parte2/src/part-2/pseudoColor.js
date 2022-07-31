let colors = [
  { r: 0, g: 0, b: 0 },     //PRETO
  { r: 255, g: 0, b: 255 }, //MAGENTA
  { r: 0, g: 0, b: 255 },   //AZUL
  { r: 0, g: 255, b: 255 }, //CIANO
  { r: 0, g: 255, b: 0 },   //VERDE
  { r: 255, g: 255, b: 0 }, //AMARELO
  { r: 255, g: 0, b: 0 },   //VERMELHO
];

const createImageDataPseudoColor = (imgData, hueVector, clampedArray) => {

  for (let x = 0; x < canvas1.width * canvas1.height; x++) {
    let index = Math.round(
      ((hueVector.length - 1) * imgData.data[x * 4]) / 255
    );

    let r = hueVector[index].r;
    let g = hueVector[index].g;
    let b = hueVector[index].b;

      clampedArray.push(r, g, b, 255);
  }

  let colorData = context1.createImageData(canvas1.width, canvas1.height);

  colorData.data.set(new Uint8ClampedArray(clampedArray));

  return colorData;
}

const getColoredImg = (imgData) => {
  let clampedArray = [];
  let hueVector = [];
  
  for(let i = 0; i < colors.length - 1; i++) {
    let actualColor = colors[i];
    let nextColor = colors[i + 1];
    for(let j = 0; j < 256; j++) {
      let r, g, b;
      if (actualColor.r < nextColor.r) {
        r = actualColor.r + j;
      } else if (actualColor.r == nextColor.r) {
        r = actualColor.r;
      } else {
        r = actualColor.r - j;
      }
      if (actualColor.g < nextColor.g) {
        g = actualColor.g + j;
      } else if (actualColor.g == nextColor.g) {
        g = actualColor.g;
      } else {
        g = actualColor.g - j;
      }

      if (actualColor.b < nextColor.b) {
        b = actualColor.b + j;
      } else if (actualColor.b == nextColor.b) {
        b = actualColor.b;
      } else {
        b = actualColor.b - j;
      }

      hueVector.push({r: r, g: g, b: b});
    }
  }

  console.log(hueVector);

  for (let x = 0; x < imgWidth * imgHeight; x++) {
    let index = Math.round(
      ((hueVector.length - 1) * imgData.data[x * 4]) / 255
    );
    
    if(hueVector[index] !== undefined) { 
      let r = hueVector[index].r;
      let g = hueVector[index].g;
      let b = hueVector[index].b;

      clampedArray.push(r, g, b, 255);
    }
  }

  let colorData = context1.createImageData(imgWidth, imgHeight);

  colorData.data.set(new Uint8ClampedArray(clampedArray));

  return colorData;

  //return createImageDataPseudoColor(imgData, hueVector, clampedArray);
};

// Filtro do máximo.
$("#btn-pseudo-colors").on("click", () => {
  console.log("** Pseudocores **");
  
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

  let result = getColoredImg(imgData);
  
  imgData = result;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  console.log("Sucesso");
});


  
