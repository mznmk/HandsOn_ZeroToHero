import { useParams, useLocation } from "react-router-dom";

const UrlParameter = () => {
  // [ param ]
  const { id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

   // [ return component ]
  return (
    <>
      <div>
        <h1>UrlParameter</h1>
        <p>param: {id}</p>
        <p>query: {query.get("name")}</p>
        <p>query: {query.get("age")}</p>
      </div>
    </>
  );
};

export default UrlParameter;