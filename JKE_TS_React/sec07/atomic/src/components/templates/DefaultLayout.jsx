import Header from "../atoms/layout/Header";
import Footer from "../atoms/layout/Footer"

const DefaultLayout = (props) => {
  // [ props ]
  const { children } = props;

  // [ return component ]
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;