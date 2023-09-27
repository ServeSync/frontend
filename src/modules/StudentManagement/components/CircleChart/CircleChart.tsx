import { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

import { chartData } from 'src/modules/Share/constants/chart_data'

const CircleChart = () => {
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
            {chartData.datasets[0].data[1]}
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
