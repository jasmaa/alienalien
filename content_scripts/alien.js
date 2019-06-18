
/**
* Animatable alien
*/
class Alien {
	
	constructor(x, y, theta){
		this.x = x;
		this.y = y;
		this.deltaX = Math.cos(theta);
		this.deltaY = Math.sin(theta);
		this.alienImg = new Image(50, 50);
		
		// Check whether Chrome or Firefox
		const agent = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime) ? chrome : browser;
		this.alienImg.src = agent.runtime.getURL("images/alien.gif");
		
		this.alienImg.style.display = '';
		this.alienImg.style.top = y+"px";
		this.alienImg.style.left = x+"px";
		this.alienImg.style.position = 'absolute';
		this.alienImg.style["z-index"] = 99999;
		
		document.body.appendChild(this.alienImg);
	}
	
	update(){
		this.x += this.deltaX;
		this.y += this.deltaY;

		if(this.x >= document.body.clientWidth - 50 || this.x <= 0){
			this.deltaX *= -1;
		}
		if(this.y >= document.body.clientHeight - 50 || this.y <= 0){
			this.deltaY *= -1;
		}
		
		// Update alien position
		this.alienImg.style.top = this.y+"px";
		this.alienImg.style.left = this.x+"px";
	}
}

const n = 3;
let aliens = [];
for(let i = 0; i < n; i++){
	aliens.push(new Alien(
		(document.body.clientWidth - 50) * Math.random(),
		(document.body.clientHeight - 50) * Math.random(),
		2*Math.PI * Math.random()
	));
}
	
setInterval(()=>{
	for(let alien of aliens){
		alien.update();
	}
}, 10);