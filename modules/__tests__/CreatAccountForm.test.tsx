import {
  render,
  screen,
  cleanup,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import CreateAccountForm from "../CreateAccountForm";
import userEvent from "@testing-library/user-event";
import { useToast } from "@/hooks/use-toast";

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("Create User Account", () => {
  const mockToast = jest.fn();
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
    render(<CreateAccountForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders form fields correctly", () => {
    const firstName = screen.getByTestId("first-name");
    const lastName = screen.getByTestId("last-name");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const confirmPassword = screen.getByTestId("confirm-password");

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
  });

  it("shows validation error when fields are empty", async () => {
    const submitButton = screen.getByRole("button", {
      name: /Create your account/i,
    });
    userEvent.click(submitButton);

    const passwordErrorMessage = await screen.findAllByText(
      /Password must be at least 8 characters long/i
    );

    // Check if validation error messages are displayed
    expect(await screen.findByText(/Invalid/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Last Name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Invalid email address/i)
    ).toBeInTheDocument();
    expect(passwordErrorMessage[0]).toBeInTheDocument();
  });

  it("show error when passwords do not match", async () => {
    const password = screen.getByTestId("password");
    const confirmPassword = screen.getByTestId("confirm-password");
    await userEvent.type(password, "password123");
    await userEvent.type(confirmPassword, "password124");

    // Expect the "Passwords don't match" error message
    expect(
      await screen.findByText(/Passwords don't match/i)
    ).toBeInTheDocument();
  });

  it("show success toast on valid submission", async () => {
    // Mock successful API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    const firstName = screen.getByTestId("first-name");
    const lastName = screen.getByTestId("last-name");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const confirmPassword = screen.getByTestId("confirm-password");

    await userEvent.type(firstName, "John");
    await userEvent.type(lastName, "doe");
    await userEvent.type(email, "john@example.com");
    await userEvent.type(password, "password123");
    await userEvent.type(confirmPassword, "password123");

    await userEvent.click(
      screen.getByRole("button", { name: /Create your account/i })
    );

    // Wait for the toast message to be displayed
    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Success",
          description: "Account has been successfully created",
        })
      )
    );
  });
});
