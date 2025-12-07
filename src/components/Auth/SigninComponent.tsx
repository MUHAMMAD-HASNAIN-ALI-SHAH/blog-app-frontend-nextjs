import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import useAuthStore from "../../store/auth";

const SigninComponent = ({
  close,
  setAuthModal,
}: {
  close: () => void;
  setAuthModal: (state: string) => void;
}) => {
  const { signin, authLoader } = useAuthStore();
  const form = useForm({
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length === 0 ? "Please enter the password" : null,
    },
  });

  const handleSubmit = async () => {
    const values = form.values;
    const getResult = await signin(values);
    if (getResult === 1) {
      close();
    }
  };

  return (
    <form className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <h1 className="text-2xl font-bold pb-2">Signin to continue</h1>
      <p>Please enter your email and password</p>
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="Password"
        type="password"
        {...form.getInputProps("password")}
      />

      <div className="flex justify-between items-center mt-3">
        <p className="pt-3">
          No account?{" "}
          <button
            onClick={() => setAuthModal("signup")}
            className="text-blue-700"
          >
            Signup
          </button>
        </p>

        <button disabled={!!authLoader} className="btn btn-primary" type="submit">
          Signin
        </button>
      </div>
    </form>
  );
};

export default SigninComponent;
