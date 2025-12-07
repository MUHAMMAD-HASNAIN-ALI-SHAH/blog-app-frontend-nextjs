import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import useAuthStore from "../store/auth";
import { useRouter } from "next/navigation";

const Signup = () => {
  const { authLoader, register } = useAuthStore();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors = {
      username:
        username.length < 3 || username.length > 50
          ? "Username must be between 3 and 50 characters"
          : "",
      email: /^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid email",
      password:
        password.length < 6 ? "Password must be at least 6 characters" : "",
      confirmPassword:
        confirmPassword !== password ? "Passwords do not match" : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await register({ username, email, password });
    if (result === 1) router.push("/signin");
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto p-4 flex justify-center items-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold pb-2">Signup to create an account</h1>
        <p>Please enter your details</p>

        <TextInput
          mt="sm"
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          error={errors.username}
        />

        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={errors.email}
        />

        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={errors.password}
        />

        <PasswordInput
          mt="sm"
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          error={errors.confirmPassword}
        />

        <div className="flex justify-between items-center mt-3">
          <p className="pt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signin")}
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
    </div>
  );
};

export default Signup;
