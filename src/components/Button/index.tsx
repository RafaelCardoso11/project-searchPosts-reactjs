import { ButtonType } from './types';
import React from 'react';

import './styles.scss';

export const Button = (props: ButtonType): JSX.Element => {
  return (
    <button className="button" onClick={props.event} disabled={props.disabled}>
      {props.text}
    </button>
  );
};
