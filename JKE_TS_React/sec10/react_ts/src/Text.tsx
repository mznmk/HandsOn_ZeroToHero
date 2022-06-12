import { FC } from "react";

type Props = {
  color: string;
  fontSize: string;
}

const Text: FC<Props> = (props) => {
  // [ props ]
  const { color, fontSize } = props;

  // [ return component ]
  return (
    <>
      <p style={{ color, fontSize }}>テキストです</p>
    </>
  );
};

export default Text;