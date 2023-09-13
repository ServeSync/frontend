import { Fragment } from 'react'
import ForgetPasswordForm from '../../components/ForgetPasswordForm'
import { Helmet } from 'react-helmet-async'

const ForgetPassword = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Forget Password</title>
        <meta name='description' content='This is forget password page of the project' />
      </Helmet>
      <ForgetPasswordForm />
    </Fragment>
  )
}

export default ForgetPassword
