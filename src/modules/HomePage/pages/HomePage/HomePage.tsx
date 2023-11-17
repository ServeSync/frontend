import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import ContainerHomePage from '../../components/ContainerHomePage'

const HomePage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>ServeSync</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div>
        <div className='w-[30%] h-[30%] bg-[#26C6DA]/80 shadow-xl blur-[150px] absolute top-[50px] left-[-100px]'></div>
        <ContainerHomePage />
      </div>
    </Fragment>
  )
}

export default HomePage
