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

const Dashboard = () => {
  const getTotalStatisticsQuery = new GetTotalStatisticsQuery()
  const totalStatistics = getTotalStatisticsQuery.fetch()

  const [typeStudentsOfStatistic, setTypeStudentsOfStatistic] = useState<string>()

  const getAllRegisteredStudentsOfStatisticQuery = new GetAllRegisteredStudentsOfStatisticQuery(typeStudentsOfStatistic)
  const registeredStudentsOfStatistic = getAllRegisteredStudentsOfStatisticQuery.fetch()

  const getAllAttendanceStudentsOfStatisticQuery = new GetAllAttendanceStudentsOfStatisticQuery(typeStudentsOfStatistic)
  const attendanceStudentsOfStatistic = getAllAttendanceStudentsOfStatisticQuery.fetch()

  const [typeEventsOfStatistic, setTypeEventsOfStatistic] = useState<string>()

  const getAllEventsOfStatisticQuery = new GetAllEventsOfStatisticQuery(typeEventsOfStatistic)
  const eventsOfStatistic = getAllEventsOfStatisticQuery.fetch()

  const [typeProofsOfStatistic, setTypeProofsOfStatistic] = useState<string>()

  const getAllProofsOfStatisticQuery = new GetAllProofsOfStatisticQuery(typeProofsOfStatistic)
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
            eventsOfStatistic={eventsOfStatistic && eventsOfStatistic.data}
            typeEventsOfStatistic={typeEventsOfStatistic}
            setTypeEventsOfStatistic={setTypeEventsOfStatistic}
          />
          <ProofStatistics
            proofsOfStatistic={proofsOfStatistic && proofsOfStatistic.data}
            typeProofsOfStatistic={typeProofsOfStatistic}
            setTypeProofsOfStatistic={setTypeProofsOfStatistic}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
