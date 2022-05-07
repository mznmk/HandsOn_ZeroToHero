'use strict'

new Promise((resolve) => {
  const nowDate = new Date();
  resolve(nowDate);
})
  .then((v1) => {
    const monthAndDate = {
      month: v1.getMonth(),
      date: v1.getDate()
    };
    return new Promise((resolve) => {
      resolve(monthAndDate);
    });
  })
  .then((v2) => {
    const text = `today: ${v2.month + 1}/${v2.date}`;
    return new Promise((resolve) => {
      resolve(text);
    });
  })
  .then((v3) => {
      console.log(v3);
  });