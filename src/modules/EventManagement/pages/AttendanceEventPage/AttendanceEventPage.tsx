/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import useGeoLocation from '../../hooks/useGeoLocation'
import useQueryEventQRConfig from '../../hooks/useQueryEventQRConfig'
import { AttendanceEventCommandHandler } from '../../services'
import { ErrorCodeToMessage } from 'src/modules/Share/constants'

const AttendanceEventPage = () => {
  const [isHandle, setIsHandle] = useState<{ state: boolean, data: string }>({ state: false, data: '' });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const location = useGeoLocation()
  const queryEventQRConfig = useQueryEventQRConfig()

  const isValidData = queryEventQRConfig.Code && queryEventQRConfig.EventId && !isSuccess;
  useEffect(() => {
    if (isValidData && !isHandle.state && location.loaded && location.error == 0) {
      const attendanceEventCommandHandler = new AttendanceEventCommandHandler();
  
      const body = {
        id: queryEventQRConfig.EventId as string,
        data: {
          code: queryEventQRConfig.Code as string,
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        },
      };
      
      attendanceEventCommandHandler.handle(
        body,
        () => {
          setIsSuccess(true);
        },
        (error: any) => {
          setIsHandle({state: true, data: error.code});
        }
      );
    }
  }, [queryEventQRConfig.Code, queryEventQRConfig.EventId, isSuccess, location.coordinates.lat, location.coordinates.lng]);

  useEffect(() => {
    handleAttendanceEvent()
  }, [])

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
          {
              !isHandle.state && !isSuccess && (location.error == 0) &&
              <div className='flex flex-col items-center'>
                <div className='flex space-x-2 justify-center items-center bg-white'>
                  <span className='sr-only'>Loading...</span>
                    <div className='h-5 w-5 bg-[#25C6DA] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                  <div className='h-5 w-5 bg-[#25C6DA] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                  <div className='h-5 w-5 bg-[#25C6DA] rounded-full animate-bounce'></div>
                </div>
                <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
                  Đang xử lý yêu cầu
                </h1>
              </div>
          }
          {
            isSuccess &&
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
              <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
                Điểm danh tham gia sự kiện thành công
              </h1>
              <p className='mt-2 text-[16px]'>
                Cảm ơn bạn đã dành thời gian với chúng tôi!
              </p>
            </div>
          }
          {
            !isSuccess && isHandle.state &&
            <div className='text-center'>
              <div className='inline-flex rounded-full bg-[#f6c5ce] p-4'>
                <div className='rounded-full bg-[#ff98aa] stroke-[#f6c5ce] p-4'>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 text-[#FF003F]/80 text-[16px] font-bold"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
              </div>
              <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
                {
                  !isValidData ? 'Yêu cầu điểm danh không hợp lệ' : ErrorCodeToMessage(isHandle.data).message
                }
              </h1>
            </div>
          }
          {
            (location.error != 0) &&
            <div className='text-center'>
              <div className='inline-flex rounded-full bg-[#f6c5ce] p-4'>
                <div className='rounded-full bg-[#ff98aa] stroke-[#f6c5ce] p-4'>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 text-[#FF003F]/80 text-[16px] font-bold"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
              </div>
              <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
                Vui lòng bật định vị để tiếp tục!
              </h1>
            </div>
          }
        </div>
    </div>
  )
}

export default AttendanceEventPage
