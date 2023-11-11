const NotAllowed = () => {
  return (
    <div className='flex h-[80vh] w-full items-center justify-center'>
      <div className='text-center'>
        <div className='inline-flex rounded-full bg-[#fff3c6] p-4'>
          <div className='rounded-full bg-[#f0e697] stroke-[#ecb849] p-4'>
            <svg
              className='h-16 w-16 fill-[#ecb849]/80'
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>405 - Not Allowed</h1>
      </div>
    </div>
  )
}

export default NotAllowed
