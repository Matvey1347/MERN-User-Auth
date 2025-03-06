interface FormProps {
  children: React.ReactNode,
  onSubmit: () => void,
  className?: string,
}

const Form = ({ children, onSubmit, className }: FormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  return (
    <form
      className={(className ? className : '') + " container max-w-[500px] m-auto"}
      onKeyDown={handleKeyDown}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  )
}
export default Form;