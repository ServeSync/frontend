import classNames from 'classnames'
import { Fragment } from 'react'
import { EducationProgramType } from '../../interfaces/education_program.type'
import { FacultyType } from '../../interfaces/faculty.type'
import { HomeRoomType } from '../../interfaces/home_room.type'

interface Props {
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
}

const CreateStudentForm = ({ educationPrograms, faculties, homeRooms }: Props) => {
  return (
    <Fragment>
      <div className='grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] font-semibold text-gray-600'>
        <div className='col-span-1 flex flex-col'>
          <label htmlFor='studentId' className='mb-2'>
            Mã số sinh viên
          </label>
          <input
            type='text'
            id='studentId'
            className={classNames('border-[1px] border-red-600 rounded-md py-2 px-4 outline-[#26C6DA]')}
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>Mã số sinh viên không hợp lệ</span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='fullname' className='mb-2'>
            Họ tên
          </label>
          <input
            type='text'
            id='fullname'
            className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='gender' className='mb-2'>
            Giới tính
          </label>
          <select id='gender' className='border-[1px] border-gray-200 px-2 py-2 rounded-md'>
            <option value='0'>Chọn giới tính</option>
            <option value='male'>Nam</option>
            <option value='female'>Nữ</option>
          </select>
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='email' className='mb-2'>
            Email
          </label>
          <input
            type='text'
            id='email'
            className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='place_of_birth' className='mb-2'>
            Quê quán
          </label>
          <input
            type='text'
            id='place_of_birth'
            className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='phone' className='mb-2'>
            Số điện thoại
          </label>
          <input
            type='text'
            id='phone'
            className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='date_of_birth' className='mb-2'>
            Ngày sinh
          </label>
          <input
            type='text'
            id='date_of_birth'
            placeholder='Chọn ngày sinh'
            className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] font-normal'
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='cic' className='mb-2'>
            Căn cước công dân
          </label>
          <input type='text' id='cic' className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]' />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='address' className='mb-2'>
            Địa chỉ cư trú
          </label>
          <input
            type='text'
            id='address'
            className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
          />
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='faculty' className='mb-2'>
            Khoa
          </label>
          <select id='faculty' className='border-[1px] border-gray-200 px-2 py-2 rounded-md'>
            <option value='0'>Chọn khoa</option>
            {faculties &&
              faculties.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='class' className='mb-2'>
            Lớp
          </label>
          <select id='class' className='border-[1px] border-gray-200 px-2 py-2 rounded-md'>
            <option value='0'>Chọn lớp sinh hoạt</option>
            {homeRooms &&
              homeRooms.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='education_program' className='mb-2'>
            Hệ đào tạo
          </label>
          <select id='education_program' className='border-[1px] border-gray-200 px-2 py-2 rounded-md'>
            <option value='0'>Chọn hệ đào tạo</option>
            {educationPrograms &&
              educationPrograms.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'></span>
        </div>
      </div>
      <div className='flex justify-end gap-6'>
        <button type='button' className='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold mt-6'>
          Hủy
        </button>
        <button type='submit' className='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6'>
          Tạo
        </button>
      </div>
    </Fragment>
  )
}

export default CreateStudentForm
