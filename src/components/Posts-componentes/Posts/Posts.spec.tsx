import { render, screen } from "@testing-library/react";
import { Posts } from ".";
import { postsPropsMock } from "./mock";

const props = postsPropsMock;

describe("<Posts />", () => {
  it("should render posts", () => {
    render(<Posts posts={props} />);
    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole("img", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByAltText("title 3")).toHaveAttribute(
      "src",
      "img/img3.png"
    );
  });
  it("should match snapshot", () => {
    const { container } = render(<Posts posts={props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
