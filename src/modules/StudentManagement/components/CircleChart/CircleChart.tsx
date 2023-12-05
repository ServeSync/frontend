/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Skeleton from 'react-loading-skeleton'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { StudentEducationProgramResultType } from '../../interfaces'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  educationProgramResult: StudentEducationProgramResultType
  isLoading: boolean
}

const CircleChart = ({ educationProgramResult, isLoading }: Props) => {
  educationProgramResult.eventScore = 12
  educationProgramResult.gainScore = 24
  const chartData = {
    datasets: [
      {
        data: [
          educationProgramResult?.eventScore,
          educationProgramResult?.proofScore,
          educationProgramResult?.requiredActivityScore >
          educationProgramResult?.eventScore + educationProgramResult?.proofScore
            ? educationProgramResult?.requiredActivityScore -
              (educationProgramResult?.eventScore + educationProgramResult?.proofScore)
            : 0
        ],
        backgroundColor: ['#296EF0', '#FFC107', '#EBEBEB'],
        borderColor: ['#296EF0', '#FFC107', '#EBEBEB'],
        borderWidth: 1
      }
    ]
  }

  const drawMiddleTextPlugin = {
    id: 'drawMiddleTextPlugin',
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx
      const xCoor = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2
      const yCoor = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2
      ctx.save()
      ctx.font = 'bolder 30px'
      ctx.fillStyle = '#296EF0'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        `${(educationProgramResult?.gainScore < educationProgramResult?.requiredActivityScore
          ? (educationProgramResult?.gainScore * 100) / educationProgramResult?.requiredActivityScore
          : 100
        ).toFixed(1)}%`,
        xCoor,
        yCoor
      )
      ctx.restore()
    }
  }

  return (
    <Fragment>
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-1'>
          {isLoading ? (
            <Skeleton className='h-[160px]' />
          ) : (
            <Doughnut
              data={chartData}
              className='h-[160px]'
              options={{
                maintainAspectRatio: false,
                cutout: '70%',
                responsive: true
              }}
              plugins={[drawMiddleTextPlugin]}
            />
          )}
        </div>
        <div className='col-span-3 flex flex-col text-[14px] mt-6'>
          <div className='flex leading-7'>
            <div className='flex justify-between w-[200px]'>
              <span>Hệ đào tạo</span>
              <span>:</span>
            </div>
            <b className='h-[20px] ml-2'>{isLoading ? <Skeleton /> : educationProgramResult.name}</b>
          </div>
          <div className='flex leading-7'>
            <div className='flex justify-between w-[200px]'>
              <span>Số điểm yêu cầu</span>
              <span>:</span>
            </div>
            <b className='h-[20px] ml-2'>{isLoading ? <Skeleton /> : educationProgramResult.requiredActivityScore}</b>
          </div>
          <div className='flex leading-7'>
            <div className='flex justify-between w-[200px]'>
              <span>Số hoạt động đã tham gia</span>
              <span>:</span>
            </div>
            <b className='h-[20px] ml-2'>{isLoading ? <Skeleton /> : educationProgramResult.numberOfEvents}</b>
          </div>
          <div className='flex leading-7'>
            <div className='flex justify-between w-[200px]'>
              <span>Số lượng minh chứng</span>
              <span>:</span>
            </div>
            <b className='h-[20px] ml-2'>
              {isLoading ? (
                <Skeleton />
              ) : (
                `${educationProgramResult.numberOfApprovedProofs} / ${educationProgramResult.numberOfProofs}`
              )}
            </b>
          </div>
          <div className='flex leading-7'>
            <div className='flex justify-between w-[200px]'>
              <span>Số điểm đã tích lũy</span>
              <span>:</span>
            </div>
            <b className='h-[20px] ml-2'>{isLoading ? <Skeleton /> : educationProgramResult.gainScore}</b>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default CircleChart
