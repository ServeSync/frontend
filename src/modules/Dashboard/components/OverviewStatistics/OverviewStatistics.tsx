import { TotalStatisticsType } from '../../interfaces'

interface Props {
  totalStatistics: TotalStatisticsType
}

const OverviewStatistics = ({ totalStatistics }: Props) => {
  return (
    <div className='flex justify-between p-6 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mx-[5%]'>
      <div className='flex gap-3 px-4'>
        <div className='bg-[#ffdfc9] p-3 text-[#ff6a00] rounded-lg flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            data-slot='icon'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
            />
          </svg>
        </div>
        <div className='flex flex-col justify-between'>
          <span className='text-gray-400 text-[16px]'>Sự kiện</span>
          <span className='text-[18px] font-semibold'>{totalStatistics?.totalEvents}</span>
        </div>
      </div>
      <div className='border-r-[0.5px] h-[50px] border-gray-200'></div>
      <div className='flex gap-3 px-4'>
        <div className='bg-[#c5f8ff] p-3 text-[#26C6DA] rounded-lg flex items-center'>
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-[#26C6DA]' viewBox='0 0 256 256'>
            <path
              fill='currentColor'
              d='m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.89 47.89 0 0 1 176 120Zm-48-32.43L57.3 64L128 40.43L198.7 64Z'
            />
          </svg>
        </div>
        <div className='flex flex-col justify-between'>
          <span className='text-gray-400 text-[16px]'>Sinh viên</span>
          <span className='text-[18px] font-semibold'>{totalStatistics?.totalStudents}</span>
        </div>
      </div>
      <div className='border-r-[0.5px] h-[50px] border-gray-200'></div>
      <div className='flex gap-3 px-4'>
        <div className='bg-[#d1ffdf] p-3 text-[#26da5c] rounded-lg flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            data-slot='icon'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
            />
          </svg>
        </div>
        <div className='flex flex-col justify-between'>
          <span className='text-gray-400 text-[16px]'>Tổ chức</span>
          <span className='text-[18px] font-semibold'>{totalStatistics?.totalOrganizations}</span>
        </div>
      </div>
      <div className='border-r-[0.5px] h-[50px] border-gray-200'></div>
      <div className='flex gap-3 px-4'>
        <div className='bg-[#ffc0bd] p-3 text-[#da2f26] rounded-lg flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            data-slot='icon'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
            />
          </svg>
        </div>
        <div className='flex flex-col justify-between'>
          <span className='text-gray-400 text-[16px]'>Minh chứng</span>
          <span className='text-[18px] font-semibold'>{totalStatistics?.totalProof}</span>
        </div>
      </div>
    </div>
  )
}

export default OverviewStatistics
