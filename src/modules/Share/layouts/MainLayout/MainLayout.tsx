import Header from '../../components/Header'
import SideBar from '../../components/SideBar'

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className='flex bg-gray-50 relative'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='p-6 pb-24'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
