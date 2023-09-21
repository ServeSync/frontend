import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='This is home page of the project' />
      </Helmet>
      <div className=''>Home</div>
    </Fragment>
  )
}

export default Home
