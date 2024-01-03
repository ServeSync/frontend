import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import OverviewStatistics from '../../components/OverviewStatistics'
import StudentStatistics from '../../components/StudentStatistics'
import EventStatistics from '../../components/EventStatistics'
import ProofStatistics from '../../components/ProofStatistics'
import {
  GetAllAttendanceStudentsOfStatisticQuery,
  GetAllProofsOfStatisticQuery,
  GetAllRegisteredStudentsOfStatisticQuery
} from '../../services'
import { GetAllEventsOfStatisticQuery } from '../../services/Statistic/getAllEventsOfStatistic.query'
import { GetTotalStatisticsQuery } from '../../services/Statistic'
import { StatisticConfig } from '../../interfaces'

const Dashboard = () => {
  const getTotalStatisticsQuery = new GetTotalStatisticsQuery()
  const totalStatistics = getTotalStatisticsQuery.fetch()

  const [typeStudentsOfStatistic, setTypeStudentsOfStatistic] = useState<string>('Date')

  const getAllRegisteredStudentsOfStatisticQuery = new GetAllRegisteredStudentsOfStatisticQuery(typeStudentsOfStatistic)
  const registeredStudentsOfStatistic = getAllRegisteredStudentsOfStatisticQuery.fetch()

  const getAllAttendanceStudentsOfStatisticQuery = new GetAllAttendanceStudentsOfStatisticQuery(typeStudentsOfStatistic)
  const attendanceStudentsOfStatistic = getAllAttendanceStudentsOfStatisticQuery.fetch()

  const [eventsOfStatisticConfig, setEventsOfStatisticConfig] = useState<StatisticConfig>({ Type: 'Today' })

  const getAllEventsOfStatisticQuery = new GetAllEventsOfStatisticQuery(eventsOfStatisticConfig)
  const eventsOfStatistic = getAllEventsOfStatisticQuery.fetch()

  const [proofsOfStatisticConfig, setProofsOfStatisticConfig] = useState<StatisticConfig>({ Type: 'Today' })

  const getAllProofsOfStatisticQuery = new GetAllProofsOfStatisticQuery(proofsOfStatisticConfig)
  const proofsOfStatistic = getAllProofsOfStatisticQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='This is Dashboard page of the project' />
      </Helmet>
      <div className='flex flex-col gap-12'>
        <OverviewStatistics totalStatistics={totalStatistics} />
        <StudentStatistics
          registeredStudentsOfStatistic={registeredStudentsOfStatistic}
          attendanceStudentsOfStatistic={attendanceStudentsOfStatistic}
          typeStudentsOfStatistic={typeStudentsOfStatistic}
          setTypeStudentsOfStatistic={setTypeStudentsOfStatistic}
        />
        <div className='flex gap-12 w-[90%] mx-auto justify-between'>
          <EventStatistics
            eventsOfStatistic={eventsOfStatistic && eventsOfStatistic?.data}
            eventsOfStatisticConfig={eventsOfStatisticConfig}
            setEventsOfStatisticConfig={setEventsOfStatisticConfig}
          />
          <ProofStatistics
            proofsOfStatistic={proofsOfStatistic && proofsOfStatistic?.data}
            proofsOfStatisticConfig={proofsOfStatisticConfig}
            setProofsOfStatisticConfig={setProofsOfStatisticConfig}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
