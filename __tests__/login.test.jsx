import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../app/login/page";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ message: "Logged in successfully", token: "fake-token" }),
    })
  );
  window.localStorage.clear();
});

describe("Login component", () => {
  it("should render login page title", () => {
    render(
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
    expect(screen.getByRole("heading", { name: /TrustExplorer/i })).toBeInTheDocument();
  });

  it("should call login api and show success toast", async () => {
    render(
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123456");
    await userEvent.click(loginButton);

    await waitFor(() => {
      const toast = screen.getByRole("alert");
      expect(toast).toHaveTextContent(/Logged in successfully/i);
    });
  });
});
