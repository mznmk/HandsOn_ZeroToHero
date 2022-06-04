let myBirthTime = new Date(1977, 4, 18, 0, 0);
function updateParagraph() {
	let now = new Date();
	let seconds = (now.getTime() - myBirthTime.getTime()) / 1000;
	document.getElementById("birth-time").innerText = `${seconds} secs passed from birth time !"`
}

setInterval(updateParagraph, 50);