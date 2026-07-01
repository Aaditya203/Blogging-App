
const LoaderAnim = () => {
  return (
    <div className="flex justify-center gap-1 px-4 py-2.5">
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 bg-white rounded-full animate-bounce" />
        </div>
  )
}
export const LoaderAnimWhite = () => {
  return (
    <div className="flex justify-center gap-1 px-4 py-2.5">
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 bg-black rounded-full animate-bounce" />
        </div>
  )
}

export default LoaderAnim