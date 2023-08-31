import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='Đây là trang đăng nhập của dự án Shopee Clone' />
      </Helmet>
      <div>Home</div>
    </Fragment>
  )
}

export default Home
