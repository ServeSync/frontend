import { Fragment } from 'react'

interface Props {
  studentId: string
  handleDeleteStudent: (id: string) => void
}
const EditStudentForm = ({ handleDeleteStudent, studentId }: Props) => {
  console.log(studentId)
  return (
    <Fragment>
      <div className='grid grid-cols-9 gap-x-10 gap-y-2'>
        <div className='col-span-3 flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='studentId' className='mb-2'>
              Mã số sinh viên
            </label>
            <input
              defaultValue='102200181'
              type='text'
              id='studentId'
              className='border-[1px] rounded-md py-2 px-4 outline-[#26C6DA]'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='fullname' className='mb-2'>
              Họ tên
            </label>
            <input
              defaultValue='Nguyễn Hùng Ngọc'
              type='text'
              id='fullname'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-2'>
              Email
            </label>
            <input
              defaultValue='ngocnguyen752002@gmail.com'
              type='email'
              id='email'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] '
            />
          </div>
        </div>
        <div className='col-span-2 flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='gender' className='mb-2'>
              Giới tính
            </label>
            <select defaultValue='male' id='gender' className='border-[1px] border-gray-200 px-4 py-2 rounded-md'>
              <option value='male'>Nam</option>
              <option value='female'>Nữ</option>
              <option value='other'>Khác</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='place_of_birth' className='mb-2'>
              Quê quán
            </label>
            <input
              defaultValue='Quảng Bình'
              type='text'
              id='place_of_birth'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone' className='mb-2'>
              Số điện thoại
            </label>
            <input
              defaultValue='0898625801'
              type='text'
              id='phone'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
            />
          </div>
        </div>
        <div className='col-span-2 flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='date_of_birth' className='mb-2'>
              Ngày sinh
            </label>
            <input
              defaultValue='2002-07-05'
              type='text'
              id='date_of_birth'
              placeholder='Chọn ngày sinh'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] font-normal'
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='education_program' className='mb-2'>
              Hệ đào tạo
            </label>
            <select
              defaultValue={1}
              id='education_program'
              className='border-[1px] border-gray-200 px-2 py-2 rounded-md'
            >
              <option value='1'>Cử nhân</option>
              <option value='2'>Kĩ sư</option>
              <option value='3'>Thạc sĩ</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='class' className='mb-2'>
              Lớp sinh hoạt
            </label>
            <select defaultValue={4} id='class' className='border-[1px] border-gray-200 px-2 py-2 rounded-md'>
              <option value='1'>20TCLC_DT1</option>
              <option value='2'>20TCLC_DT2</option>
              <option value='3'>20TCLC_DT3</option>
              <option value='4'>20TCLC_DT4</option>
            </select>
          </div>
        </div>
        <div className='col-span-2 flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='cic' className='mb-2'>
              Căn cước công dân
            </label>
            <input
              defaultValue='044202002790'
              type='text'
              id='cic'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='faculty' className='mb-2'>
              Khoa
            </label>
            <select defaultValue={1} id='faculty' className='border-[1px] border-gray-200 px-2 py-2 rounded-md'>
              <option value='1'>Công nghệ thông tin</option>
              <option value='2'>Điện</option>
              <option value='3'>Kiến trúc</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='address' className='mb-2'>
              Địa chỉ cư trú
            </label>
            <input
              defaultValue='Âu Cơ'
              type='text'
              id='address'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
            />
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-6'>
        <button
          type='button'
          onClick={() => handleDeleteStudent(studentId)}
          className='bg-red-500 py-2 px-4 rounded-lg text-[16px] text-white font-semibold mt-6'
        >
          Xóa
        </button>
        <button type='submit' className='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6'>
          Lưu
        </button>
      </div>
    </Fragment>
  )
}

export default EditStudentForm
