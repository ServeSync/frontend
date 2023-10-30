import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { GetAllEventsByStatusQuery } from '../../../EventManagement/services'
import LandingPageHeader from '../../components/LandingPageHeader'
import Footer from '../../components/Footer'
import Container from '../../components/Container'

const LandingPage = () => {
  const getAllEventsDoneQuery = new GetAllEventsByStatusQuery('done')
  const getAllEventHappeningQuery = new GetAllEventsByStatusQuery('happening')
  const getAllEventUpcomingQuery = new GetAllEventsByStatusQuery('upcoming')

  const eventsDone = getAllEventsDoneQuery.fetch()
  const eventsHappening = getAllEventHappeningQuery.fetch()
  const eventsUpcoming = getAllEventUpcomingQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>ServeSync</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div className=''>
        <LandingPageHeader />
        <Container eventsDone={eventsDone} eventsHappening={eventsHappening} eventsUpcoming={eventsUpcoming} />
        <Footer />
      </div>
    </Fragment>
  )
}

export default LandingPage
