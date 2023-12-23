import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import OverviewStatistics from '../../components/OverviewStatistics'
import StudentStatistics from '../../components/StudentStatistics'
import EventStatistics from '../../components/EventStatistics'
import ProofStatistics from '../../components/ProofStatistics'
import { GetAllAttendanceStudentsOfStatisticQuery, GetAllRegisteredStudentsOfStatisticQuery } from '../../services'
import { GetAllEventsOfStatisticQuery } from '../../services/Statistic/getAllEventsOfStatistic.query'

const Dashboard = () => {
  const [typeStudentsOfStatistic, setTypeStudentsOfStatistic] = useState<string>()

  const getAllRegisteredStudentsOfStatisticQuery = new GetAllRegisteredStudentsOfStatisticQuery(typeStudentsOfStatistic)
  const registeredStudentsOfStatistic = getAllRegisteredStudentsOfStatisticQuery.fetch()

  const getAllAttendanceStudentsOfStatisticQuery = new GetAllAttendanceStudentsOfStatisticQuery()
  const attendanceStudentsOfStatistic = getAllAttendanceStudentsOfStatisticQuery.fetch()

  const [typeEventsOfStatistic, setTypeEventsOfStatistic] = useState<string>()

  const getAllEventsOfStatisticQuery = new GetAllEventsOfStatisticQuery(typeEventsOfStatistic)
  const eventsOfStatistic = getAllEventsOfStatisticQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='This is Dashboard page of the project' />
      </Helmet>
      <div className='flex flex-col gap-12'>
        <OverviewStatistics />
        <StudentStatistics
          registeredStudentsOfStatistic={registeredStudentsOfStatistic}
          attendanceStudentsOfStatistic={attendanceStudentsOfStatistic}
          typeStudentsOfStatistic={typeStudentsOfStatistic}
          setTypeStudentsOfStatistic={setTypeStudentsOfStatistic}
        />
        <div className='flex gap-12 mx-[5%] justify-between'>
          <EventStatistics
            eventsOfStatistic={eventsOfStatistic && eventsOfStatistic.data}
            typeEventsOfStatistic={typeEventsOfStatistic}
            setTypeEventsOfStatistic={setTypeEventsOfStatistic}
          />
          <ProofStatistics />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
