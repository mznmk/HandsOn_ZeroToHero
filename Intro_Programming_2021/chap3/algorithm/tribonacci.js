'use strict'

const memo = new Map();
memo.set(0, 0);
memo.set(1, 0);
memo.set(2, 1);
function tribonacci(n) {
	if (memo.has(n)) {
		return memo.get(n);
	}
	const ans = tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3);
	memo.set(n, ans);
	return ans;
}

const length = 40;
for (let i = 0; i <= length; i++) {
	console.log(tribonacci(i));
}