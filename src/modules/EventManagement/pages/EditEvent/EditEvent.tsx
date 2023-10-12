import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const EditEvent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Edit Event</title>
        <meta name='description' content='This is edit event page of the project' />
      </Helmet>
      <div>Edit Event</div>
    </Fragment>
  )
}

export default EditEvent
