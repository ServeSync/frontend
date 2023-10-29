import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import LandingPageHeader from '../../components/LandingPageHeader'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import { GetAllEventsByStatusQuery } from '../../../EventManagement/services/'

const Landingpage = () => {
  const getAllEventsDoneQuery = new GetAllEventsByStatusQuery('done')
  const getAllEventHappendingQuery = new GetAllEventsByStatusQuery('happening')
  const getAllEventUpcomingQuery = new GetAllEventsByStatusQuery('upcoming', 5)
  const eventsDone = getAllEventsDoneQuery.fetch()
  const eventsHappening = getAllEventHappendingQuery.fetch()
  const eventsUpcoming = getAllEventUpcomingQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>ServeSync</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div className=''>
        <LandingPageHeader />
        <Container eventsDone={eventsDone} eventsHappending={eventsHappening} eventsUpcoming={eventsUpcoming} />
        <Footer />
      </div>
    </Fragment>
  )
}

export default Landingpage
