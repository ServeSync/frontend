import { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Skeleton from 'react-loading-skeleton'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { EducationProgramType } from '../../interfaces'
ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  programScoreOfStudent: Pick<EducationProgramType, 'requiredActivityScore'>['requiredActivityScore']
  programNameOfStudent: Pick<EducationProgramType, 'name'>['name']
  isLoading: boolean
}

const CircleChart = ({ programScoreOfStudent, programNameOfStudent, isLoading }: Props) => {
  const chartData = {
    datasets: [
      {
        data: [45, programScoreOfStudent - 45],
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
          <div className='w-full flex justify-between'>
            <span>Hệ đào tạo</span>
            <span>:</span>
          </div>
          <div className='w-[100px] h-[10px] ml-2'>{isLoading ? <Skeleton /> : programNameOfStudent}</div>
        </div>
        <div className='flex justify-between'>
          <div className='w-full flex justify-between'>
            <span>Số điểm yêu cầu</span>
            <span>:</span>
          </div>
          <div className='w-[100px] h-[10px] ml-2'>{isLoading ? <Skeleton /> : programScoreOfStudent}</div>
        </div>
        <div className='flex justify-between'>
          <div className='w-full flex justify-between'>
            <span>Số điểm đã tích lũy</span>
            <span>:</span>
          </div>
          <div className='w-[100px] h-[10px] ml-2'>{isLoading ? <Skeleton /> : chartData.datasets[0].data[0]}</div>
        </div>
        <div className='flex justify-between'>
          <div className='w-full flex justify-between'>
            <span>Số hoạt động đã tham gia</span>
            <span>:</span>
          </div>
          <div className='w-[100px] h-[10px] ml-2'>10</div>
        </div>
      </div>
    </Fragment>
  )
}
export default CircleChart
