import TypeWriter from "./TypeWriter"

const Quote = () => {

  return (
    <div className='bg-slate-300 flex justify-center flex-col h-screen'>
        <div className='flex flex-col items-center justify-center'>
            <div className='text-center max-w-2xl text-3xl font-bold font-mono'>
                <TypeWriter/>
            </div>
        </div>
    </div>
  )
}

export default Quote