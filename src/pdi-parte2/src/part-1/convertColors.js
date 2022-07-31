const RGB_MAX = 255; // máximo que pode se representar no RBG.
const HUE_MAX = 239; // máximo que pode se representar no HUE.
const SV_MAX = 240;  // máximo que pode se representar no SV.

const hue2rgb = (p, q, t) => {
  if(t < 0) t += 1;
  if(t > 1) t -= 1;
  if(t < 1/6) return p + (q - p) * 6 * t;
  if(t < 1/2) return q;
  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}
const hslToRGB = (h, s, l) => {
  if(h>239 || s>240 || l>240){
    $("#result").empty();
    $("#result").append("Utilize valores até no máximo 240!!");
    return;
  }
  h /= 240, s /= 240, l /= 240
  let r, g, b;
  if(s == 0) r = g = b = l; //escala de cinza
  else{
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255)};
}

const rbgToHSL = (red, green, blue) => {
	red = (red == RGB_MAX) ? 1 : (red / parseFloat(RGB_MAX));
	green = (green == RGB_MAX) ? 1 : (green / parseFloat(RGB_MAX));
	blue = (blue == RGB_MAX) ? 1 : (blue / parseFloat(RGB_MAX));

	console.log("Entrou rbg para hsl");
	console.log("Red: "+red);
	console.log("Green: "+green);
	console.log("Blue: "+blue);
	
	let max = Math.max(red, green, blue), min = Math.min(red, green, blue);
	let hue, sat, lum;

	lum = (max + min) / 2.0;

	if(max == min) {
		console.log("--Caso max igual a min--");
		hue = sat = 0;
	} else {
		console.log("--Caso onde min e max n é igual--");
		let diference = max - min;
		console.log("Delta: "+diference);
		sat = lum > 0.5 ? (diference / (2 - max - min)) : (diference / (max + min));
		//sat = lum < .0 ? (diference / (max + min)) : (diference / (2.0 - ( max + min)));
		console.log("Max:"+max);
		if(max == red) {
			hue = ((green - blue) / diference) + (green < blue ? 6.0 : 0.0);
		} else if(max == green) {
			hue = ((blue - red) / diference) + 2.0;
		} else {
			hue = ((red - green) / diference) + 4.0;
		}

		hue = hue / 6.0;
		console.log("Hue: "+hue);
	}
	
	return {h: Math.round(hue * HUE_MAX), s: Math.round(sat * SV_MAX), l: Math.round(lum * SV_MAX)};
}

// Evento para acionar a function e converter hsl para rgb.
$("#hsl-rgb").on("click", () => {
  $("#result").empty();
	let h = $("#hue").val();
	let s = $("#sat").val();
	let l = $("#lum").val();

	let obj = hslToRGB(h, s, l);

	console.log("r: "+obj.r+" g: "+obj.g+" b:"+obj.b);

  $("#red").val(obj.r);
  $("#green").val(obj.g);
	$("#blue").val(obj.b);

  $("#result").append("Convertido com sucesso!!");
});

// Evento para acionar a function e converter rbg para hsl.
$("#rbg-hsl").on("click", () => {
  $("#result").empty();
	let r = $("#red").val();
	let g = $("#green").val();
	let b = $("#blue").val();

	let obj = rbgToHSL(r, g, b);
	console.log("h: "+obj.h+" s: "+obj.s+" l:"+obj.l);

  $("#hue").val(obj.h);
  $("#sat").val(obj.s);
  $("#lum").val(obj.l);

  $("#result").append("Convertido com sucesso!!");
});