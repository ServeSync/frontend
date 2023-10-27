import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const EventDetail = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Event Detail</title>
        <meta name='description' content='This is event detail page of the project' />
      </Helmet>
    </Fragment>
  )
}

export default EventDetail
