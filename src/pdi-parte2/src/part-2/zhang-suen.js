const rgbToHex = (r, g, b) => {
  const red = r.toString(16).length == 1 ? "0" + r.toString(16) : r.toString(16)
  const green = g.toString(16).length == 1 ? "0" + g.toString(16) : g.toString(16)
  const blue = b.toString(16).length == 1 ? "0" + b.toString(16) : b.toString(16)

  return "#" + red + green + blue
}

const zhangSuen = (imgData) => {
  let canvas2 = document.getElementById("canvas-pdi2");
  let context2 = canvas2.getContext("2d");

  let length = imgWidth * imgHeight;
  let pixelsArray = [];

  let p1, p2, p3, p4, p5, p6, p7, p8, p9, zn, b;

  const pixels = new Uint32Array(imgData.data.buffer);

  for (let i = 0; i < pixels.length; i++) {
    let r = pixels[i] & 0xFF;
    let g = (pixels[i] >> 8) & 0xFF;
    let b = (pixels[i] >> 16) & 0xFF;
    pixelsArray[i] = parseInt(0.299 * r + 0.587 * g + 0.114 * b);
  }
  let id;
  for (let x = 0; x < 50; x++) {
    for (let n = 0; n < 2; n++) {
      id = [];
      for (let i = 0; i < length;) {
        p1 = pixelsArray[i] > 200 ? 1 : 0;
        p2 = pixelsArray[i - imgWidth] > 200 ? 1 : 0;
        p3 = pixelsArray[i - imgWidth + 1] > 200 ? 1 : 0;
        p8 = pixelsArray[i - 1] > 200 ? 1 : 0;
        p9 = pixelsArray[i - imgWidth - 1] > 200 ? 1 : 0;
        p4 = pixelsArray[i + 1] > 200 ? 1 : 0;
        p7 = pixelsArray[i + imgWidth - 1] > 200 ? 1 : 0;
        p6 = pixelsArray[i + imgWidth] > 200 ? 1 : 0;
        p5 = pixelsArray[i + imgWidth + 1] > 200 ? 1 : 0;

        zn = 0;
        b = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
        if (p2 < p3) { zn++; }
        if (p3 < p4) { zn++; }
        if (p4 < p5) { zn++; }
        if (p5 < p6) { zn++; }
        if (p6 < p7) { zn++; }
        if (p7 < p8) { zn++; }
        if (p8 < p9) { zn++; }
        if (p9 < p2) { zn++; }
        if (b >= 2 && b <= 6 && zn == 1 && p2 * p4 * p6 == 0 && p4 * p6 * p8 == 0 && n == 0) { id.push(i); }
        if (b >= 2 && b <= 6 && zn == 1 && p2 * p4 * p8 == 0 && p2 * p6 * p8 == 0 && n == 1) { id.push(i); }

        i++;
      }
      for (i = 0; i < id.length; i++)
        pixelsArray[id[i]] = 0;
    }
  }

  for (let i = 0; i < pixels.length; i++) {
    context2.fillStyle = rgbToHex(pixelsArray[i], pixelsArray[i], pixelsArray[i]);
    context2.fillRect(i % imgWidth, parseInt(i / imgWidth), 1, 1);
  }
}

$("#btn-zhang-suen").on("click", () => {
  console.log("** Zhang Suen **");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  zhangSuen(imgData);

  console.log("Sucesso!");
});

$("#btn-zhang-suen-comp").on("click", () => {
  console.log("** Zhang Suen **");
  $("#zhang-result").empty();

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  zhangSuen(imgData);
  dilatation(imgData,  "canvas3");
  erosion(imgData,  "canvas4");
  $("#zhang-result").append("Operação feita com sucesso!!");
  console.log("Sucesso!");
});