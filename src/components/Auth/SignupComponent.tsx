import { useForm } from "@mantine/form";
import { PasswordInput, TextInput } from "@mantine/core";
import useAuthStore from "../../store/auth";

const SignupComponent = ({
  close,
  setAuthModal,
}: {
  close: () => void;
  setAuthModal: (state: string) => void;
}) => {
  const { authLoader, register } = useAuthStore();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: (value) =>
        value.length < 3 || value.length > 50
          ? "Username must be between 3 and 50 characters"
          : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async () => {
    const values = form.values;
    await register(values); // Direct register
    close(); // Optionally close the modal on success
  };

  return (
    <form className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <h1 className="text-2xl font-bold pb-2">Signup to create an account</h1>
      <p className="">Please enter your details</p>

      <TextInput
        mt="sm"
        label="Username"
        name="username"
        placeholder="Username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />

      <TextInput
        mt="sm"
        label="Email"
        name="email"
        placeholder="Email"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="Password"
        type="password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <PasswordInput
        mt="sm"
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        key={form.key("confirmPassword")}
        {...form.getInputProps("confirmPassword")}
      />

      <div className="flex justify-between items-center mt-3">
        <p className="pt-3">
          Already have an account{" "}
          <button
            type="button"
            onClick={() => setAuthModal("signin")}
            className="text-blue-700"
          >
            Signin
          </button>
        </p>

        <button
          disabled={!!authLoader}
          className="btn btn-primary"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupComponent;
