const CheckEmail = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <img src="/icons/email-success.svg" alt="check email" className="w-[100px] h-auto mb-4" />
      <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Check Your Email</h1>
      <p className="text-sm text-gray-500 mb-4 m-auto">We've sent a password reset link to your email.</p>
    </div>
  )
}
export default CheckEmail;
