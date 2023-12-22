import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { StatisticType } from '../../interfaces'
import { Autocomplete, TextField } from '@mui/material'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { StatisticOptions } from '../../constants'
import useQueryStatisticConfig from '../../hooks/useQueryStatisticConfig'
import { useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  registeredStudentsOfStatistic: StatisticType[]
  attendanceStudentsOfStatistic: StatisticType[]
}

const StudentStatistics = ({ registeredStudentsOfStatistic, attendanceStudentsOfStatistic }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Sinh viên đăng kí / tham gia sự kiện',
        font: {
          size: 20
        }
      }
    }
  }

  const chart = {
    labels: registeredStudentsOfStatistic && registeredStudentsOfStatistic.map((item) => item.name),
    datasets: [
      {
        label: 'Sinh viên đăng kí',
        data: registeredStudentsOfStatistic && registeredStudentsOfStatistic.map((item) => item.value),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4
      },
      {
        label: 'Sinh viên tham gia',
        data: attendanceStudentsOfStatistic && attendanceStudentsOfStatistic.map((item) => item.value),
        fill: true,
        backgroundColor: 'rgba(192, 28, 28, 0.2)',
        borderColor: 'rgba(192, 28, 28, 1)',
        tension: 0.4
      }
    ]
  }

  const navigate = useNavigate()

  const queryStatisticConfig = useQueryStatisticConfig()
  const [type, setType] = useState<string>(queryStatisticConfig && (queryStatisticConfig.Type as string))

  return (
    <div className='flex justify-center'>
      <div className='w-[80%] relative'>
        <Line options={options} data={chart} />
        <div className='w-[140px] text-gray-600 absolute top-[16px] right-[32px]'>
          <Autocomplete
            disablePortal
            id='gender'
            options={StatisticOptions}
            value={StatisticOptions.find((option) => option.id === type) || null}
            getOptionLabel={(option) => option.name}
            noOptionsText='Không có lựa chọn'
            renderInput={(params) => <TextField {...params} label='Chọn loại' />}
            onChange={(_, option) => {
              if (option && option.id !== undefined) {
                setType(option.id as string)
                navigate({
                  pathname: path.dashboard,
                  search: createSearchParams({
                    Type: option.id as string
                  }).toString()
                })
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentStatistics
