/* eslint react-hooks/exhaustive-deps: off */

import React, { useState, useEffect }  from 'react';
import ColorfulMessage      from './components/ColorfulMessage';

const App = () => {
  console.log("さいしょ");

  // [ react state ]
  const [num, setNum] = useState(0);
  const [faceShow, setFaceShow] = useState(true);

  // [ create event ]
  const onClickCountUp = () => {
    setNum(num + 1);
  };  
  const onClickFaceOnOff = () => {
    setFaceShow(!faceShow);
  };  

  // [ execute, when num state chenge ]
  useEffect(() => {
    if (num % 3 === 0) {
      faceShow || setFaceShow(true);
    } else {
      faceShow && setFaceShow(false);
    }
  }, [num]);

  // [ return ]
  return (
    <React.Fragment>
      <h1 style={{ color: 'red' }}>こんにちは！</h1>
      <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage>
      <ColorfulMessage color="pink">元気です</ColorfulMessage>
      <button onClick={onClickCountUp}>カウントアップ！</button>
      <br />
      <button onClick={onClickFaceOnOff}>on / off</button>
      <p>{num}</p>
      {faceShow && <p>(((((((((((っ･ω･)っ ﾌﾞｰﾝ))))))))))</p>}
    </React.Fragment>
  );
}

export default App;