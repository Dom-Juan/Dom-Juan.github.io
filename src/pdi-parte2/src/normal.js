const normalize = (pixels) => {
  let normal = [];
  let max = Math.max(...pixels);
  let min = Math.min(...pixels);
  
  for(let i = 0; i < pixels.length; i++) {
    let px = ((pixels[i] - min)/(max - min))*255;
    normal.push(px);
  }

  return normal;
};