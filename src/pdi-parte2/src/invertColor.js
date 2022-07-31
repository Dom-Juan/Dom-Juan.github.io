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