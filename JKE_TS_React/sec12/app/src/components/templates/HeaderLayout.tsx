import { FC, memo, ReactNode } from "react";
import Header from "../organizms/layout/Header";

type Props = {
  children: ReactNode;
};

const HeaderLayout: FC<Props> = memo((props) => {
  // [ props ]
  const { children } = props;

  // [ return component ]
  return (
    <>
      <Header />
      { children }
    </>
  );
});

export default HeaderLayout;