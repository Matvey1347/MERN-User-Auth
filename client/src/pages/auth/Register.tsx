import { useState } from "react";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Global/Button";
import { UserFileds } from "../../interfaces/Auth";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";

const RegisterPage = () => {
  const [values, setValues] = useState<UserFileds>({
    name: "",
    email: "",
    password: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { registerMutation } = useAuthContext();
  const { mutate, isPending: isLoading } = registerMutation;

  const handleSubmit = async () => {
    setIsSubmitted(true);
    mutate(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mt-10">Register</h1>
      <InputField
        label="Name"
        name="name"
        value={values.name}
        onChange={(value) => {
          setValues({ ...values, name: value })
        }}
        isShowError={isSubmitted}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
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

      <Button
        text="Register User"
        type="submit"
        isLoading={isLoading}
      />
      <Link
        to="/auth/login"
        className="text-blue-500 mt-2 block text-center"
      >
        Login
      </Link>
    </Form>
  )
}
export default RegisterPage;