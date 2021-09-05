import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";
import { inputPropsMock } from "./mock";

const props = inputPropsMock;
describe("<Input />", () => {
  it("should have a value of searchValue", () => {
    render(<Input {...props} />);
    const input: any = screen.getByPlaceholderText(props.placeHolder);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(props.value);
  });
  it("should call handleChange function on each pressed", () => {
    render(<Input {...props} />);

    const input: any = screen.getByPlaceholderText(props.placeHolder);
    const value = props.value;

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(props.event).toHaveBeenCalledTimes(value.length);
    expect(input).toHaveAttribute("type", props.type);
  });
  it("should match snapshot", () => {
    const { container } = render(<Input {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
