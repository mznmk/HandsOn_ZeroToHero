import { Link, useHistory } from "react-router-dom";

const Page1 = () => {
  const arr = [...Array(100).keys()]

  const history = useHistory();

  // [ event ]
  const onClickDetailA = () => {
    history.push("/page1/detailA");
  };

  // [ return component ]
  return (
    <>
      <div>
        <h1>Page1</h1>
        <Link to={{ pathname: "/page1/detailA", state: arr }}>
          Page1DetailA
        </Link><br />
        <Link to="/page1/detailB">Page1DetailB</Link><br />
        <button onClick={onClickDetailA}>DetailA</button>
      </div>
    </>
  );
};

export default Page1;