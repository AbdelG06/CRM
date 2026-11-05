import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the CRM interface", () => {
  render(<App />);
  expect(screen.getByText("Mon CRM")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Nom complet")).toBeInTheDocument();
  expect(screen.getByText("Ajouter un client")).toBeInTheDocument();
});
