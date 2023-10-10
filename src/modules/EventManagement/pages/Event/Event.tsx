import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const Event = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Events</title>
        <meta name='description' content='This is event management page of the project' />
      </Helmet>
      <div>Event</div>
    </Fragment>
  )
}

export default Event
