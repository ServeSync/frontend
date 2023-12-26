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
import { StudentsStatisticType } from '../../interfaces'
import { Autocomplete, TextField } from '@mui/material'
import { StudentStatisticOptions } from '../../constants'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  registeredStudentsOfStatistic: StudentsStatisticType[]
  attendanceStudentsOfStatistic: StudentsStatisticType[]
  typeStudentsOfStatistic: string | undefined
  setTypeStudentsOfStatistic: React.Dispatch<React.SetStateAction<string | undefined>>
}

const StudentStatistics = ({
  registeredStudentsOfStatistic,
  attendanceStudentsOfStatistic,
  typeStudentsOfStatistic,
  setTypeStudentsOfStatistic
}: Props) => {
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

  return (
    <div className='flex justify-center'>
      <div className='w-[90%] mx-auto relative'>
        <Line options={options} data={chart} />
        <div className='w-[140px] text-gray-600 absolute top-[16px] right-[32px]'>
          <Autocomplete
            disablePortal
            id='gender'
            options={StudentStatisticOptions}
            value={StudentStatisticOptions.find((option) => option.id === typeStudentsOfStatistic) || null}
            getOptionLabel={(option) => option.name}
            noOptionsText='Không có lựa chọn'
            renderInput={(params) => <TextField {...params} label='Chọn loại' />}
            onChange={(_, option) => {
              if (option && option.id !== undefined) {
                setTypeStudentsOfStatistic(option.id as string)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentStatistics
