import { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import { useAuthContext } from "../../context/AuthContext";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Global/Button";

interface UserResetPasswordFileds {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

const ResetPassword = () => {
  const { resetPasswordMutation } = useAuthContext();
  const { mutate, isPending: isLoading } = resetPasswordMutation;

  const [values, setValues] = useState<UserResetPasswordFileds>({
    newPassword: "",
    confirmNewPassword: "",
    token: ""
  });

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const handleSubmit = () => {
    mutate(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mt-10">Reset Password</h1>
      <InputField
        label="New Password"
        name="newPassword"
        type="password"
        value={values.newPassword}
        onChange={(value) => {
          setValues({ ...values, newPassword: value })
        }}
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmNewPassword}
        onChange={(value) => {
          setValues({ ...values, confirmNewPassword: value })
        }}
      />
      <Button
        text="Reset Password"
        type="submit"
        isLoading={isLoading}
      />
    </Form>
  )
}
export default ResetPassword;