import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='This is Dashboard page of the project' />
      </Helmet>
      <div>Dashboard</div>
    </Fragment>
  )
}

export default Dashboard
