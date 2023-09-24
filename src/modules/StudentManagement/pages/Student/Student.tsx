import { Fragment } from 'react'
import StudentTable from '../../components/StudentTable'
import { Helmet } from 'react-helmet-async'
import path from 'src/modules/Share/constants/path'
import { Link } from 'react-router-dom'
import InputSearch from 'src/modules/Share/components/InputSearch'
import Pagination from 'src/modules/Share/components/Pagination/Pagination'

const Student = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Students</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pt-[16px] pb-[40px] rou'>
          <form>
            <InputSearch
              classNameInput={
                'bg-white border-[1px] border-gray-200 rounded h-[40px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm'
              }
            />
          </form>
          <div className='flex gap-4'>
            <button
              type='button'
              className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                />
              </svg>
              <span>Lọc</span>
            </button>
            <button
              type='button'
              className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                />
              </svg>
              <span>Xuất file</span>
            </button>
            <Link
              to={path.create_student}
              className='flex items-center text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              Thêm sinh viên
            </Link>
          </div>
        </div>
        <StudentTable />
        <div className='flex justify-end'>
          <Pagination pageSize={5} />
        </div>
      </div>
    </Fragment>
  )
}

export default Student
