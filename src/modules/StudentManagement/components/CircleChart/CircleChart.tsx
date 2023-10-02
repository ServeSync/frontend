import { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// import { EducationProgramType } from '../../interfaces/education_program.type'
ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  requiredActivityScore: number
}
const CircleChart = ({ requiredActivityScore }: Props) => {
  const chartData = {
    datasets: [
      {
        data: [45, requiredActivityScore - 45],
        backgroundColor: ['red', 'rgba(228,228,228,1)'],
        borderColor: ['red', 'rgba(228,228,228,1)'],
        borderWidth: 1
      }
    ]
  }

  return (
    <Fragment>
      <div className='col-span-1'>
        <Doughnut data={chartData} />
      </div>
      <div className='col-span-3 flex flex-col pl-6 text-[13px]'>
        <div className='flex justify-between'>
          Hệ đào tạo
          <div className='w-[70px]'>
            <span className='mr-2'>:</span>Cử nhân
          </div>
        </div>
        <div className=' flex justify-between'>
          Số điểm yêu cầu
          <div className='w-[70px]'>
            <span className='mr-2'>:</span>
            {requiredActivityScore}
          </div>
        </div>
        <div className=' flex justify-between'>
          Số điểm đã tích lũy
          <div className='w-[70px]'>
            <span className='mr-2'>:</span>
            {chartData.datasets[0].data[0]}
          </div>
        </div>
        <div className=' flex justify-between'>
          Số hoạt động đã tham gia
          <div className='w-[70px]'>
            <span className='mr-2'>:</span>123
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CircleChart
