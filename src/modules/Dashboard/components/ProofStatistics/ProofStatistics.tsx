import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const ProofStatistics = () => {
  const data = {
    labels: ['Đã từ chối', 'Đã duyệt', 'Đang duyệt'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-6 w-[45%]'>
      <div className='mb-4'>
        <h1 className='font-bold text-[18px]'>Minh chứng</h1>
        <h2 className='text-[13px] text-gray-400'>Thống kê minh chứng theo trạng thái</h2>
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
