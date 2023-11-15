interface Props {
  children?: React.ReactNode
}

const HomePageLayout = ({ children }: Props) => {
  return (
    <div>
      <div className='w-[30%] h-[60%] bg-[#26C6DA]/80 shadow-2xl rounded-full blur-[200px] absolute top-[50px] left-[-100px]'></div>
      {children}
    </div>
  )
}

export default HomePageLayout
