import { Helmet } from 'react-helmet-async'
import CreateStudentForm from '../../components/CreateStudentForm'
import { Fragment } from 'react'
import InputFile from 'src/modules/Share/components/InputFile'

const CreateStudent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Create Account</title>
        <meta name='description' content='This is create account page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pb-[36px]'>
          <h2 className='text-[24px] text-gray-700 font-bold'>Thêm sinh viên</h2>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center px-10'>
              <InputFile />
              <span className='text-[14px] text-gray-500'></span>
            </div>
          </div>
          <div className='col-span-2'>
            <form>
              <CreateStudentForm />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateStudent
