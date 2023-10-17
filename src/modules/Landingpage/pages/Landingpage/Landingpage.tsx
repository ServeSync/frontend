import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import LandingPageHeader from '../../components/LandingPageHeader'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import { GetAllEventsQuery } from 'src/modules/EventManagement/services'

const Landingpage = () => {
  const getAllEventsQuery = new GetAllEventsQuery()
  const events = getAllEventsQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>ServeSync</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div className=''>
        <LandingPageHeader />
        <Container events={events} />
        <Footer />
      </div>
    </Fragment>
  )
}

export default Landingpage
