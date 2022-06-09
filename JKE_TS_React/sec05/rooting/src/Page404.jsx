import { Link } from "react-router-dom";

const Page404 = () => {
  // [ return conponent ]
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default  Page404;