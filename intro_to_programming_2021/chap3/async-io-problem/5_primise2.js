'use strict'

new Promise((resolve) => {
  const nowDate = new Date();
  resolve(nowDate);
}).then((v1) => {
  new Promise((resolve) => {
    const monthAndDate = {
      month: v1.getMonth(),
      date: v1.getDate()
    };
    resolve(monthAndDate);
  }).then((v2) => {
    new Promise((resolve) => {
      const text = `today: ${v2.month + 1}/${v2.date}`;
      resolve(text);
    }).then((v3) => {
      console.log(v3);
    });
  });
});