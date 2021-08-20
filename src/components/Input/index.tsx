import "./styles.scss";
import { InputType } from "./types";

export const Input = (input: InputType) => {
  return (
    <input
      type={input.type}
      className="input"
      placeholder={input.placeHolder}
      value={input.value}
      onChange={input.event}
    />
  );
};
