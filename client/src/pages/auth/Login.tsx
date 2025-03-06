import { useState } from "react";
import { UserLoginFileds } from "../../interfaces/Auth";
import { useAuthContext } from "../../context/AuthContext";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Global/Button";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";

const LoginPage = () => {

  const [values, setValues] = useState<UserLoginFileds>({
    email: "",
    password: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { loginMutation } = useAuthContext();
  const { mutate, isPending: isLoading } = loginMutation;

  const handleSubmit = async () => {
    setIsSubmitted(true);
    mutate(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mt-10">Login</h1>
      <InputField
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={(value) => {
          setValues({ ...values, email: value })
        }}
        isShowError={isSubmitted}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={(value) => {
          setValues({ ...values, password: value })
        }}
        isShowError={isSubmitted}
      />

      <Link
        to="/auth/forgot-password"
        className="text-blue-500 mt-[-10px] mb-3 block text-left"
      >
        Forgot password?
      </Link>

      <Button
        text="Login"
        onClick={handleSubmit}
        isLoading={isLoading}
      />
      <Link
        to="/auth/register"
        className="text-blue-500 mt-2 block text-center"
      >
        Register
      </Link>
    </Form>
  )
}

export default LoginPage;