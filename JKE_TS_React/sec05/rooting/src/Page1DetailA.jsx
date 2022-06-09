import { useLocation, useHistory } from "react-router-dom";

const Page1DetailA = () => {
  // [ state ]
  const { state } = useLocation();
  console.log(state);

  const history = useHistory();

  // [ event ]
  const onClickBack = () => {
    history.goBack();
  };

  // [ return component ]
  return (
    <>
      <div>
        <h1>Page1DetailA</h1>
        <button onClick={onClickBack}>戻る</button>
      </div>
    </>  
  );
};

export default Page1DetailA;