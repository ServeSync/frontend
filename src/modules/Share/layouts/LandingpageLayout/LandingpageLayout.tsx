interface Props {
  children?: React.ReactNode
}
const LandingPageLayout = ({ children }: Props) => {
  return (
    <div>
      <div className='w-[500px] h-[500px] opacity-50 bg-cyan-300 rounded-full blur-[200px] absolute top-[-100px] left-[-100px]' />
      {children}
    </div>
  )
}

export default LandingPageLayout
