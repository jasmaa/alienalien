
// Init alien
let alienImg = new Image(50, 50);
alienImg.src = browser.runtime.getURL("images/alien.gif");

let x = 0;
let y = 0;
let deltaX = 1;
let deltaY = 1;

alienImg.style.display = '';
alienImg.style.position = 'absolute';
alienImg.style["z-index"] = 99999;


document.body.appendChild(alienImg);

setInterval(()=>{
	x += deltaX;
	y += deltaY;

	if(x >= document.body.clientWidth || x <= 0){
		deltaX *= -1;
	}
	if(y >= document.body.clientHeight || y <= 0){
		deltaY *= -1;
	}
	
	// Update alien position
	alienImg.style.top = y+"px";
	alienImg.style.left = x+"px";
}, 20);