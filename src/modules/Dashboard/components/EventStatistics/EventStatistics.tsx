import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { StatisticType } from '../../interfaces'
import { Autocomplete, TextField } from '@mui/material'
import { StatisticOptions } from '../../constants'
import { StatusToMessage } from 'src/modules/Share/constants'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  eventsOfStatistic: StatisticType[]
  typeEventsOfStatistic: string | undefined
  setTypeEventsOfStatistic: React.Dispatch<React.SetStateAction<string>>
}

const EventStatistics = ({ eventsOfStatistic, typeEventsOfStatistic, setTypeEventsOfStatistic }: Props) => {
  const isZeroValues = eventsOfStatistic && eventsOfStatistic.every((item) => item.count === 0)

  const data = {
    labels: eventsOfStatistic && eventsOfStatistic.map((item) => StatusToMessage(item.status)),
    datasets: [
      {
        data: eventsOfStatistic && eventsOfStatistic.map((item) => item.count),
        backgroundColor: ['#ff0037', '#29a9ff', '#fbc94c', '#a2ff56', '#eb56ff', '#fb8a00', '#00fbea'],
        borderColor: ['#ff0037', '#29a9ff', '#fbc94c', '#a2ff56', '#eb56ff', '#fb8a00', '#00fbea'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-6 w-[45%] bg-white'>
      <div className='flex items-center justify-between mb-4'>
        <div className='mb-4'>
          <h1 className='font-bold text-[18px]'>Sự kiện</h1>
          <h2 className='text-[13px] text-gray-400'>Thống kê sự kiện theo trạng thái</h2>
        </div>
        <div className='w-[160px] text-gray-600'>
          <Autocomplete
            disablePortal
            id='gender'
            options={StatisticOptions}
            value={StatisticOptions.find((option) => option.id === typeEventsOfStatistic) || null}
            getOptionLabel={(option) => option.name}
            noOptionsText='Không có lựa chọn'
            renderInput={(params) => <TextField {...params} label='Chọn loại' />}
            onChange={(_, option) => {
              if (option && option.id !== undefined) {
                setTypeEventsOfStatistic(option.id as string)
              }
            }}
          />
        </div>
      </div>
      {isZeroValues ? (
        <div className='flex flex-col justify-center items-center w-full'>
          <img
            src='http://res.cloudinary.com/dboijruhe/image/upload/v1704248704/Assets/618722f3-06d8-42a6-a1dd-982eefeaafcb-377151126_764025928879576_8805692657770243620_n_1.png'
            alt=''
            className='w-[280px]'
          />
          <span className='font-semibold'>Không có dữ liệu</span>
        </div>
      ) : (
        <Doughnut
          data={data}
          className='max-h-[280px]'
          options={{
            maintainAspectRatio: false,
            cutout: '80%',
            responsive: true,
            plugins: {
              legend: {
                position: 'left' as const
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default EventStatistics
