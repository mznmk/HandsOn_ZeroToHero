import { Link } from "react-router-dom";

const Page2 = () => {
  // [ return component ]
  return (
    <>
      <div>
        <h1>Page2</h1>
        <Link to="/page2/999">UrlParameter</Link><br />
        <Link to="/page2/999?name=hoge">QueryParameter</Link><br />
        <Link to="/page2/999?name=huga&age=42">QueryParameter</Link>
      </div>
    </>
  );
};

export default Page2;