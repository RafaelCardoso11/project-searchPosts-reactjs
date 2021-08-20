
import { ButtonType } from "./types";

import "./styles.css";

export const Button = (props: ButtonType) => {
  return (
    <button className="button" onClick={props.event} disabled={props.disabled}>
      {props.text}
    </button>
  );
};
