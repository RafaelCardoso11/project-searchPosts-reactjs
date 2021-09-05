import { InputType } from "./types";
const fn = jest.fn();

export const inputPropsMock:InputType  = {
 placeHolder: 'place holder',
 type: 'text',
 value: 'value',
 event: fn
}
