export interface ButtonType {
  text: string;
  disabled: boolean;
  event: React.MouseEventHandler<HTMLButtonElement>;
}