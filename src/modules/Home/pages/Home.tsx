import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from 'src/modules/Share/components/Header'
import SideBar from 'src/modules/Share/components/SideBar'

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='This is home page of the project' />
      </Helmet>
      <div className='flex h-screen bg-gray-50 overflow-hidden'>
        <SideBar />
        <div className='flex flex-col flex-1 w-full'>
          <Header />
        </div>
      </div>
    </Fragment>
  )
}

export default Home
