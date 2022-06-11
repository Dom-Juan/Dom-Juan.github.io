let pi = 3.142857;

const dtcTransform = (imgData) => {
  console.log("\t >Entrou");
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let pixels = imgData.data;
  let ci = 0, cj = 0, dctData = new Array(), dtc1, sum;
  let m = imgData.height;
  let n = imgData.width;
  //let m = 8;
  //let n = 8;
  console.log("m: ",m," n: " ,n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(i==0) ci = 1 / Math.sqrt(m);
      else ci = Math.sqrt(2) / Math.sqrt(m);
      
      if(j == 0) cj = 1 / Math.sqrt(n);
      else cj = Math.sqrt(2) / Math.sqrt(n);
      
      sum = 0;
      for(let k=0; k<m; k++){
          for(let l=0; l<n; l++){
            let index = k*n+l;
            let dct1 = pixels[index] * 
            Math.cos((2*k+1)*i*pi/(2*m)) * 
            Math.cos((2*l+1)*j*pi/(2*n));
            sum = sum + dct1;
          }
        }
      //console.log("===========================");
      let pixel = (ci * cj * sum);
      //console.log(ci, cj, pixel);
      dctData.push(pixel, pixel, pixel, 255); // pixels.push(pixel, pixel, pixel, 1);
    }
  }
  console.log(dctData);
  
  let newImageData = new Uint8ClampedArray(dctData);
  
  return newImageData;
};

$("#btn-transform-cos").on("click", () => {
  console.log("** Limiarização **");
  $("#threshold-result").empty();
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  let result = dtcTransform(imgData);

  imgData.data.set(result);
  console.log(imgData);

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
});