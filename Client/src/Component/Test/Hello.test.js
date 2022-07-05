import { render, screen, cleanup} from "@testing-library/react"
import Hello from "./Hello"
test("Sum test", () => {
  render(<Hello/>)
  // const sumElement = screen.getAllByTestId("sum")
  const sumElement = screen.getByTestId("sum")
  expect(sumElement).toBeInTheDocument();
  expect(sumElement).toHaveTextContent("Hello World");
  // expect(true).toBe(true);
});