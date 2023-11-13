/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { Fragment, useState } from 'react'
import { RegisterRoleTableHeader, StatusToMessage, TimeInfoTableHeader } from 'src/modules/EventManagement/constants'
import { EventDetailType, RegisteredEventType } from 'src/modules/EventManagement/interfaces'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import { formatDateTime, handleError } from 'src/modules/Share/utils'
import Parser from 'html-react-parser'
import { Controller, useForm } from 'react-hook-form'
import { FormEventType, FormRegisterEventSchema, FormRegisterEventType } from 'src/modules/EventManagement/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterEventCommandHandler } from 'src/modules/EventManagement/services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

interface Props {
  event: EventDetailType
  mapImageURL: string | null
  isOpenModalTableRegisterEvent: boolean
  handleCloseModalTableRegisterEvent: () => void
  isOpenModalRegistrationInfos: boolean
  handleCloseModalRegistrationInfos: () => void
  isOpenModalAttendanceInfos: boolean
  handleCloseModalAttendanceInfos: () => void
  isOpenMapImage: boolean
  handleCloseModalMap: () => void
}

const EventDetailModal = ({
  event,
  mapImageURL,
  isOpenModalTableRegisterEvent,
  handleCloseModalTableRegisterEvent,
  isOpenMapImage,
  handleCloseModalMap,
  isOpenModalRegistrationInfos,
  handleCloseModalRegistrationInfos,
  isOpenModalAttendanceInfos,
  handleCloseModalAttendanceInfos
}: Props) => {
  const [roleId, setRoleId] = useState<string>()
  const [isOpenModalRegisterEvent, setIsOpenModalRegisterEvent] = useState(false)

  const navigate = useNavigate()

  const handleCloseModalRegisterEvent = () => {
    setIsOpenModalRegisterEvent(false)
  }

  const handleOpenModalRegisterEvent = (id: string) => {
    setRoleId(id)
    setIsOpenModalRegisterEvent(true)
  }

  const { handleSubmit, control, setError } = useForm<FormRegisterEventType>({
    resolver: yupResolver(FormRegisterEventSchema)
  })

  const registerEventCommandHandler = new RegisterEventCommandHandler()

  const handleRegister = handleSubmit((data) => {
    const body = {
      ...data,
      eventRoleId: roleId
    } as RegisteredEventType
    registerEventCommandHandler.handle(
      body,
      () => {
        toast.success('Đăng kí sự kiện thành công !')
        navigate({
          pathname: path.list_events
        })
      },
      (error: any) => {
        handleError<FormEventType>(error, setError)
      }
    )
  })

  return (
    <Fragment>
      <ModalCustom isOpenModal={isOpenModalRegisterEvent} handleClose={handleCloseModalRegisterEvent}>
        <div className='bg-white p-10 rounded-xl w-[480px]'>
          <form onSubmit={handleRegister}>
            <div className='flex justify-between mb-8'>
              <h2 className='font-semibold text-[18px]'>Đăng kí tham gia hoạt động</h2>
              <Button classNameButton='' onClick={handleCloseModalRegisterEvent}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </Button>
            </div>
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <div>
                  <TextField
                    id='description'
                    label='Tự giới thiệu'
                    placeholder='Kinh nghiệm...'
                    className='w-full bg-white'
                    onChange={onChange}
                    multiline
                    rows={3}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              )}
            />
            <div className='flex mt-4 justify-end gap-4'>
              <Button
                type='submit'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold'
              >
                Đăng kí
              </Button>
            </div>
          </form>
        </div>
      </ModalCustom>
      <ModalCustom isOpenModal={isOpenModalTableRegisterEvent} handleClose={handleCloseModalTableRegisterEvent}>
        <div className='bg-white p-10 rounded-xl w-[1000px]'>
          <form>
            <div className='flex justify-between mb-8'>
              <h2 className='font-semibold text-[18px]'>Đăng kí tham gia sự kiện</h2>
              <Button classNameButton='' onClick={handleCloseModalTableRegisterEvent}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </Button>
            </div>
            <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
              <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                <tr className='text-[14px] text-gray-600'>
                  {RegisterRoleTableHeader.map((item) => (
                    <th key={item.id} className='px-2 py-2 font-semibold'>
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {event.roles.map((role) => (
                  <tr
                    key={role.id}
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                  >
                    <th className='px-2 py-4 font-medium'>{role.name}</th>
                    <th className='px-2 py-4 font-medium'>{Parser(role.description)}</th>
                    <th className='px-2 py-4 font-medium'>{role.quantity}</th>
                    <th className='px-2 py-4 font-medium'>{role.registered}</th>
                    <th className='px-2 py-4 font-medium'>{role.score}</th>
                    <th className='px-2 py-4 font-medium'>
                      <input
                        type='checkbox'
                        defaultChecked={role.isNeedApprove === 'true'}
                        disabled
                        readOnly
                        className='ml-12'
                      />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Button
                        type='button'
                        classNameButton='bg-[#26C6DA] py-1 px-4 rounded-full text-[14px] text-white font-semibold'
                        onClick={() => handleOpenModalRegisterEvent(role?.id as string)}
                      >
                        Đăng kí
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </ModalCustom>
      <ModalCustom isOpenModal={isOpenModalRegistrationInfos} handleClose={handleCloseModalRegistrationInfos}>
        <div className='bg-white p-10 rounded-xl w-[800px]'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[24px] font-semibold'>Khung giờ đăng ký</h2>
            <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalRegistrationInfos}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </Button>
          </div>
          <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
            <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
              <tr className='text-[14px] text-gray-600'>
                {TimeInfoTableHeader.map((item) => (
                  <th key={item.id} className='px-2 py-2 font-semibold'>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {event.registrationInfos.map((registrationInfo) => (
                <tr
                  key={registrationInfo.id}
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                >
                  <th className='px-2 py-4 font-medium'>{formatDateTime(registrationInfo.startAt)}</th>
                  <th className='px-2 py-4 font-medium'>{formatDateTime(registrationInfo.endAt)}</th>
                  <th className='px-2 py-4 font-medium'>{StatusToMessage(registrationInfo.status)}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalCustom>
      <ModalCustom isOpenModal={isOpenModalAttendanceInfos} handleClose={handleCloseModalAttendanceInfos}>
        <div className='bg-white p-10 rounded-xl w-[800px]'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[24px] font-semibold'>Khung giờ điểm danh</h2>
            <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalAttendanceInfos}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 '
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </Button>
          </div>
          <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
            <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
              <tr className='text-[14px] text-gray-600'>
                {TimeInfoTableHeader.map((item) => (
                  <th key={item.id} className='px-2 py-2 font-semibold'>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {event.attendanceInfos.map((attendanceInfo) => (
                <tr
                  key={attendanceInfo.id}
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                >
                  <th className='px-2 py-4 font-medium'>{formatDateTime(attendanceInfo.startAt)}</th>
                  <th className='px-2 py-4 font-medium'>{formatDateTime(attendanceInfo.endAt)}</th>
                  <th className='px-2 py-4 font-medium'>{StatusToMessage(attendanceInfo.status)}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalCustom>
      <ModalCustom isOpenModal={isOpenMapImage} handleClose={handleCloseModalMap}>
        <div className='col-span-1 flex justify-center outline-none'>
          {mapImageURL && <img src={mapImageURL} alt='Static Map' className='rounded-lg h-[500px] outline-none' />}
        </div>
      </ModalCustom>
    </Fragment>
  )
}

export default EventDetailModal
