import styled from "styled-components";

const Footer = () => {
  // [ return component ]
  return (
    <>
      <SFooter>
        &copy; Black Company Co. Ltd.
      </SFooter>
    </>
  );
};

const SFooter = styled.header`
  background-color: #11999e;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default Footer;