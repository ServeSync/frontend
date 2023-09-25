import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import EditStudentForm from '../../components/EditStudentForm'
import InputFile from 'src/modules/Share/components/InputFile'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import EventsOfStudentTable from '../../components/EventsOfStudentTable'
ChartJS.register(ArcElement, Tooltip, Legend)

const EditStudent = () => {
  const data = {
    labels: ['Tích lũy'],
    datasets: [
      {
        data: [45, 100],
        backgroundColor: ['red', 'rgba(228,228,228,1)'],
        borderColor: ['red', 'rgba(228,228,228,1)'],
        borderWidth: 1
      }
    ]
  }

  return (
    <Fragment>
      <Helmet>
        <title>Edit Students</title>
        <meta name='description' content='This is edit student page of the project' />
      </Helmet>
      <div className=''>
        <div className='flex items-center'>
          <Link to={path.student} className='px-2 py-3 hover:mr-2 transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </Link>
          <span className='font-semibold text-[20px]'>Thông tin sinh viên</span>
        </div>
        <div className='grid grid-cols-6 gap-6 pb-4 border-b-2'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center '>
              <InputFile />
            </div>
          </div>
          <div className='col-span-5 '>
            <form action=''>
              <EditStudentForm />
            </form>
          </div>
        </div>
        <div className='grid grid-cols-5 pt-6'>
          <div className='border-r-2 px-4 col-span-2'>
            <div className=''>
              <h1 className='font-semibold'>Kết quả tham gia hoạt động phục vụ cộng đồng</h1>
              <h4 className='font-thin text-[14px]'>
                Tổng kết kết quả tham gia hoạt động phục vụ cộng đồng của sinh viên
              </h4>
            </div>
            <div className='grid grid-cols-3 mt-4 '>
              <div className='col-span-1'>
                <Doughnut data={data} />
              </div>
              <div className='col-span-2 flex flex-col pl-6 text-[16px]'>
                <div className=' flex justify-between'>
                  Hệ đào tạo
                  <div className='w-[80px]'>
                    <span className='mr-2'>:</span>Cử nhân
                  </div>
                </div>
                <div className=' flex justify-between'>
                  Số điểm tích lũy yêu cầu
                  <div className='w-[80px]'>
                    <span className='mr-2'>:</span>
                    {data.datasets[0].data[1]}
                  </div>
                </div>
                <div className=' flex justify-between'>
                  Số điểm đã tích lũy
                  <div className='w-[80px]'>
                    <span className='mr-2'>:</span>
                    {data.datasets[0].data[0]}
                  </div>
                </div>
                <div className=' flex justify-between'>
                  Số hoạt động đã tham gia
                  <div className='w-[80px]'>
                    <span className='mr-2'>:</span>123
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='px-6 font-semibold col-span-3'>
            <div className='mb-4'>
              <div className='flex justify-between items-center'>
                <h1 className='font-semibold'>Kết quả tham gia hoạt động phục vụ cộng đồng</h1>
                <button>Xem tất cả</button>
              </div>
              <h4 className='font-thin text-[14px]'>
                Danh sách hoạt động phục vụ cộng đồng sinh viên đã tham gia gần đây.
              </h4>
            </div>
            <EventsOfStudentTable />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditStudent
