'use strict'

const waitPromise = new Promise((resolve, reject) => {
	setTimeout(() => resolve(), 1000);
});

waitPromise.then(() => console.log('hoge'));
console.log('fuga');