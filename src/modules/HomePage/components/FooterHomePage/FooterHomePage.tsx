import { logo } from 'src/modules/Share/assets/image'

const FooterHomePage = () => {
  return (
    <footer className=' text-[#cfcfff] bg-[#e1f9ff] h-auto flex flex-col text-center overflow-hidden mx-auto xl:px-36 lg:px-20 md:px-14 max-md:px-5 py-8 '>
      <div className='flex justify-between pb-6 items-center border-b-2 border-[#26C6DA] mb-5'>
        <div className='flex items-center gap-4'>
          <img src={logo} alt='logo-img' className='lg:w-10 lg:h-10 md:w-8 md:h-8 max-md:w-6 max-md:h-6' />
          <span className='font-normal lg:text-[24px] md:text-[20px] max-md:text-[16px] font-Pacifico text-[#195E8E]'>
            ServeSync
          </span>
        </div>
        <div className='flex max-md:flex-col md:justify-between md:items-center items-start gap-6 max-md:gap-2'>
          <div className='flex justify-center items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 md:w-5 md:h-5 max-md:w-4 max-md:h-4 text-red-600'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
              />
            </svg>
            <span className='lg:text-[14px] md:text-[12px] max-md:text-[6px] font-light text-[#52606D] px-1'>
              54 Nguyễn Lương Bằng, TP Đà Nẵng
            </span>
          </div>
          <div className='flex justify-center items-center '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 md:w-5 md:h-5 max-md:w-4 max-md:h-4 text-blue-300'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
              />
            </svg>
            <span className='lg:text-[14px] md:text-[12px] max-md:text-[6px] font-light text-[#52606D] px-1'>
              servesync@gmail.com
            </span>
          </div>
        </div>
      </div>
      <span className='lg:text-[14px] md:text-[12px] max-md:text-[6px] text-[#195E8E]'>
        © 2023 ServeSync. All Rights Reserved
      </span>
    </footer>
  )
}

export default FooterHomePage
