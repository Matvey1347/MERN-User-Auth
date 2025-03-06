interface ButtonProps {
  text: string;
  onClick?: () => void;
  isLoading?: boolean
  type?: "button" | "submit" | "reset",
  className?: string
}

const Button = ({ text, onClick, isLoading, type = "button", className }: ButtonProps) => {
  return (
    <button
      className={(isLoading ? "cursor-progress " : "cursor-pointer ") + className + " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"}
      onClick={onClick || undefined}
      type={type}
    >
      {isLoading ? "Loading ..." : text}
    </button>
  )
}
export default Button;