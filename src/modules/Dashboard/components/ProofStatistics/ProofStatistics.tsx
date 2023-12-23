import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { StatisticType } from '../../interfaces'
import { Autocomplete, TextField } from '@mui/material'
import { StatisticOptions } from '../../constants'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  proofsOfStatistic: StatisticType[]
  typeProofsOfStatistic: string | undefined
  setTypeProofsOfStatistic: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ProofStatistics = ({ proofsOfStatistic, typeProofsOfStatistic, setTypeProofsOfStatistic }: Props) => {
  const data = {
    labels: proofsOfStatistic && proofsOfStatistic.map((item) => item.status),
    datasets: [
      {
        data: proofsOfStatistic && proofsOfStatistic.map((item) => item.count),
        backgroundColor: ['#f90339', '#189ef8', '#ddb143'],
        borderColor: ['#f90339', '#189ef8', '#ddb143'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-6 w-[45%]'>
      <div className='flex items-center justify-between mb-4'>
        <div className='mb-4'>
          <h1 className='font-bold text-[18px]'>Minh chứng</h1>
          <h2 className='text-[13px] text-gray-400'>Thống kê minh chứng theo trạng thái</h2>
        </div>
        <div className='w-[160px] text-gray-600'>
          <Autocomplete
            disablePortal
            id='gender'
            options={StatisticOptions}
            value={StatisticOptions.find((option) => option.id === typeProofsOfStatistic) || null}
            getOptionLabel={(option) => option.name}
            noOptionsText='Không có lựa chọn'
            renderInput={(params) => <TextField {...params} label='Chọn loại' />}
            onChange={(_, option) => {
              if (option && option.id !== undefined) {
                setTypeProofsOfStatistic(option.id as string)
              }
            }}
          />
        </div>
      </div>
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
    </div>
  )
}

export default ProofStatistics
