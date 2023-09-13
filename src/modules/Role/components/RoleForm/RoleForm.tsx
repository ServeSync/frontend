const RoleForm = () => {
  return (
    <div>
      <div className='flex flex-col gap-2 relative'>
        <input
          type='text'
          id='name'
          placeholder='Name'
          className='w-full border-[2px] border-[#26C6DA] rounded-md py-2 pl-10 pr-4 outline-none'
        />
        <div className='absolute left-[4px] top-[6px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
            />
          </svg>
        </div>
        <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-normal'></span>
      </div>
      <button type='submit' className='w-full py-2 bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-md text-white'>
        Add role
      </button>
    </div>
  )
}

export default RoleForm
