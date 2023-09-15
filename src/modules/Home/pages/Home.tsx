import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='This is home page of the project' />
      </Helmet>
      <div className='h-[1000px]'>Home</div>
    </Fragment>
  )
}

export default Home
