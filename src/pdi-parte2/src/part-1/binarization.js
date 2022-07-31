// Binarização.
const binarization = () => {
  console.log("** Binarização de imagem **")
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let pixels = imgData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    // R
    if(pixels[i] < 128) { // se menor q limitar, preto, se não, branco.
      pixels[i] = 0;
    } else {
      pixels[i] = 255;
    }
    // G
    if(pixels[i + 1] < 128) { // se menor q limitar, preto, se não, branco.
      pixels[i + 1] = 0;
    } else {
      pixels[i + 1] = 255;
    }
    // B
    if(pixels[i + 2] < 128) { // se menor q limitar, preto, se não, branco.
      pixels[i + 2] = 0;
    } else {
      pixels[i + 2] = 255;
    }
  }
  imgData.data = pixels;
  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);

  return "Sucesso";
};