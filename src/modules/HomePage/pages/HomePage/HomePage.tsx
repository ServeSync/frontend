import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { GetAllEventsByStatusQuery } from 'src/modules/EventManagement/services'
import HeaderHomePage from '../../components/HeaderHomePage'
import ContainerHomePage from '../../components/ContainerHomePage'
import FooterHomePage from '../../components/FooterHomePage'

const HomePage = () => {
  const getAllEventsDoneQuery = new GetAllEventsByStatusQuery('done')
  const eventsDone = getAllEventsDoneQuery.fetch()

  const getAllEventHappeningQuery = new GetAllEventsByStatusQuery('happening')
  const eventsHappening = getAllEventHappeningQuery.fetch()

  const getAllEventUpcomingQuery = new GetAllEventsByStatusQuery('upcoming')
  const eventsUpcoming = getAllEventUpcomingQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>ServeSync</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div>
        <HeaderHomePage />
        <ContainerHomePage eventsDone={eventsDone} eventsHappening={eventsHappening} eventsUpcoming={eventsUpcoming} />
        <FooterHomePage />
      </div>
    </Fragment>
  )
}

export default HomePage
