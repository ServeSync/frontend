import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const CreateEvent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Create Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
      <div>Create Event</div>
    </Fragment>
  )
}

export default CreateEvent
