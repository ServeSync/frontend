import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import OverviewStatistics from '../../components/OverviewStatistics'
import StudentStatistics from '../../components/StudentStatistics'
import EventStatistics from '../../components/EventStatistics'
import ProofStatistics from '../../components/ProofStatistics'
import { GetAllAttendanceStudentsOfStatisticQuery, GetAllRegisteredStudentsOfStatisticQuery } from '../../services'

const Dashboard = () => {
  const getAllRegisteredStudentsOfStatisticQuery = new GetAllRegisteredStudentsOfStatisticQuery()
  const registeredStudentsOfStatistic = getAllRegisteredStudentsOfStatisticQuery.fetch()

  const getAllAttendanceStudentsOfStatisticQuery = new GetAllAttendanceStudentsOfStatisticQuery()
  const attendanceStudentsOfStatistic = getAllAttendanceStudentsOfStatisticQuery.fetch()

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
        />
        <div className='flex gap-12 mx-[5%] justify-center'>
          <EventStatistics />
          <ProofStatistics />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
