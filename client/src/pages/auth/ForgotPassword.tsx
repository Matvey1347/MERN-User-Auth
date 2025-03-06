import { useState } from "react";
import Form from "../../components/Form/Form";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Global/Button";
import { useAuthContext } from "../../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPasswordMutation } = useAuthContext();
  const { mutate: forgotPassword, isPending: isLoading } = forgotPasswordMutation;

  const handleSubmit = () => {
    setIsSubmitted(true);
    forgotPassword({ email });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Forgot Your Password?</h1>
      <p className="text-sm text-gray-500 mb-4 max-w-[300px] m-auto">Enter your email address and we will send you instructions to reset your password.</p>
      <InputField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        isShowError={isSubmitted}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        text="Continue"
      />
    </Form>
  )
}
export default ForgotPassword;
