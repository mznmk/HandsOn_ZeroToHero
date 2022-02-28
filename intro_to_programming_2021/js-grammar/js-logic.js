let age = 65;
let isMember = true;
let result = null;
if (age >= 60 && isMember) {
	result = "eligible for member discount";
} else {
	result = "not eligible for member discount";
}
document.write(result)