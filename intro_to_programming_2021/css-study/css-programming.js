let header = document.getElementById('header');
// header.style.transform = 'rotateX(60deg)'
let deg = 0;
function rotateHeader() {
	deg += 5;
	deg %= 360;
	if ((90 < deg) && (deg < 270)) {
		header.className = 'back';
	} else {
		header.className = 'face';
	}
	header.style.transform = `rotateX(${deg}deg)`
}
setInterval(rotateHeader, 20);