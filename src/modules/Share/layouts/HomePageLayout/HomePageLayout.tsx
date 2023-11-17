import FooterHomePage from 'src/modules/HomePage/components/FooterHomePage'
import HeaderHomePage from 'src/modules/HomePage/components/HeaderHomePage'

interface Props {
  children?: React.ReactNode
}

const HomePageLayout = ({ children }: Props) => {
  return (
    <div>
      <HeaderHomePage />
      {children}
      <FooterHomePage />
    </div>
  )
}

export default HomePageLayout
