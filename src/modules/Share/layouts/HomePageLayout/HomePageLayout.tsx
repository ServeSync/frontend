interface Props {
  children?: React.ReactNode
}

const HomePageLayout = ({ children }: Props) => {
  return (
    <div>
      <div className='w-[30%] h-[30%] bg-[#26C6DA]/80 shadow-xl blur-[150px] absolute top-[50px] left-[-100px]'></div>
      {children}
    </div>
  )
}

export default HomePageLayout
