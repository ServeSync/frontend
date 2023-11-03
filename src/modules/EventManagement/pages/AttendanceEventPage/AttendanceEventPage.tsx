/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { handleError } from 'src/modules/Share/utils'
import useGeoLocation from '../../hooks/useGeoLocation'
import useQueryEventQRConfig from '../../hooks/useQueryEventQRConfig'
import { AttendanceEventCommandHandler } from '../../services'
import Button from 'src/modules/Share/components/Button'

const AttendanceEventPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const location = useGeoLocation()
  const queryEventQRConfig = useQueryEventQRConfig()

  const attendanceEventCommandHandler = new AttendanceEventCommandHandler()

  const handleAttendanceEvent = () => {
    const body = {
      id: queryEventQRConfig.Code as string,
      data: {
        code: queryEventQRConfig.EventId as string,
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng
      }
    }
    attendanceEventCommandHandler.handle(
      body,
      () => {
        setIsSuccess(true)
      },
      (error: any) => {
        handleError(error)
      }
    )
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {!isSuccess && (
        <Button
          onClick={handleAttendanceEvent}
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#49ec90] px-4 py-2 rounded-lg cursor-pointer'
        >
          <span>Điểm danh</span>
        </Button>
      )}
      {isSuccess && (
        <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-[#c6ffe2] p-4'>
              <div className='rounded-full bg-[#97f0c3] stroke-[#49ec90] p-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-[#108e36]/80 text-[16px] font-bold'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              </div>
            </div>
            <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>Điểm danh thành công</h1>
            <p className='mt-5 text-slate-600 lg:text-lg'>
              Hãy tham gia hoạt đồng cộng đồng <br />
              cùng chúng tôi
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceEventPage
