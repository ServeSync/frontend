/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { Fragment, useState } from 'react'
import { RegisterRoleTableHeader, StatusEventToMessage } from 'src/modules/EventManagement/constants'
import { EventDetailType, RegisteredEventType } from 'src/modules/EventManagement/interfaces'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import { handleError } from 'src/modules/Share/utils'
import Parser from 'html-react-parser'
import { Controller, useForm } from 'react-hook-form'
import { FormEventType, FormRegisterEventSchema, FormRegisterEventType } from 'src/modules/EventManagement/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterEventCommandHandler } from 'src/modules/EventManagement/services'
import { toast } from 'react-toastify'

interface Props {
  event: EventDetailType
  isOpenModalTableRegisterEvent: boolean
  handleCloseModalTableRegisterEvent: () => void
}

const RegisterEventModal = ({ event, isOpenModalTableRegisterEvent, handleCloseModalTableRegisterEvent }: Props) => {
  const [roleId, setRoleId] = useState<string>()
  const [isOpenModalRegisterEvent, setIsOpenModalRegisterEvent] = useState<boolean>(false)

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
        handleCloseModalRegisterEvent()
        handleCloseModalTableRegisterEvent()
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
          <form onSubmit={handleRegister} className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h2 className='font-semibold text-[18px]'>Đơn đề nghị tham gia sự kiện</h2>
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
                <div className='flex flex-col gap-2'>
                  <label htmlFor='description'>Lời giới thiệu</label>
                  <TextField
                    id='description'
                    placeholder='Kinh nghiệm...'
                    className='w-full bg-white'
                    onChange={onChange}
                    multiline
                    rows={4}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              )}
            />
            <div className='flex justify-end'>
              <Button
                type='submit'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-xl text-[14px] text-white font-semibold w-[114px]'
                isLoading={registerEventCommandHandler.isLoading()}
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
              <Button type='button' onClick={handleCloseModalTableRegisterEvent}>
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
                {event &&
                  event.roles.map((role) => (
                    <tr
                      key={role.id}
                      className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                    >
                      <th className='px-2 py-4 font-medium w-[120px]'>{role.name}</th>
                      <th className='px-2 py-4 font-medium overflow-hidden'>
                        <span className='line-clamp-1'>{Parser(role.description)}</span>
                      </th>
                      <th className='px-2 py-4 font-medium text-center w-[76px]'>{role.quantity}</th>
                      <th className='px-2 py-4 font-medium text-center w-[50px]'>{role.score}</th>
                      <th className='px-2 py-4 font-medium text-center w-[96px]'>{role.registered}</th>
                      <th className='px-2 py-4 font-medium text-center w-[80px]'>{role.approvedRegistered}</th>
                      <th className='px-2 py-4 font-medium w-[116px]'>
                        <input
                          type='checkbox'
                          defaultChecked={role.isNeedApprove}
                          disabled
                          readOnly
                          className='ml-10'
                        />
                      </th>
                      <th className='px-2 py-4 font-medium w-[140px]'>
                        {(role.approvedRegistered as number) < Number(role?.quantity) &&
                        (!role.isRegistered as boolean) ? (
                          <Button
                            type='button'
                            classNameButton='bg-[#26C6DA] py-1 px-4 rounded-full text-[14px] text-white font-semibold'
                            onClick={() => handleOpenModalRegisterEvent(role?.id as string)}
                          >
                            Đăng kí
                          </Button>
                        ) : (
                          StatusEventToMessage(role.status)
                        )}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </form>
        </div>
      </ModalCustom>
    </Fragment>
  )
}

export default RegisterEventModal
