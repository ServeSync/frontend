interface Props {
  children?: React.ReactNode
}

const AuthenticationLayout = ({ children }: Props) => {
  return <div className='flex justify-center items-center h-screen bg-login bg-contain bg-center'>{children}</div>
}

export default AuthenticationLayout
