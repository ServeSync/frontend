import Container from '../../components/Container'
import Footer from '../../components/Footer'
import LandingPageHeader from '../../components/LandingPageHeader'

const LandingpageLayout = () => {
  return (
    <div>
      <div className='w-[500px] h-[500px] opacity-50 bg-cyan-300 rounded-full blur-[200px] absolute top-[-100px] left-[-100px]' />
      <LandingPageHeader />
      <Container />
      <Footer />
    </div>
  )
}

export default LandingpageLayout
