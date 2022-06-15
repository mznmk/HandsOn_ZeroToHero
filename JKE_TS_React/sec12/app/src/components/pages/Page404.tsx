import { FC, memo } from "react";
import { Link } from "react-router-dom";

const Page404: FC = memo(() => {
  // [ return component ]
  return (
    <>
      <div>
        <p>404ページ</p>
        <Link to="/">Login</Link>
      </div>
    </>
  );
});

export default Page404;