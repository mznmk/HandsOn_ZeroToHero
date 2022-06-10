import Header from "../atoms/layout/Header";

const HeaderOnly = (props) => {
  // [ props ]
  const { children } = props;

  // [ return component ]
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderOnly;