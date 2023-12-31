/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem, TextField } from '@mui/material'
import classNames from 'classnames'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { RegisteredStudentsTableHeader } from 'src/modules/EventManagement/constants'
import useQueryEventConfig from 'src/modules/EventManagement/hooks/useQueryEventConfig'
import { RegisteredStudentType } from 'src/modules/EventManagement/interfaces'
import { GetRegisteredStudentsQuery, RejectRegistrationCommandHandler } from 'src/modules/EventManagement/services'
import { ApproveRegistrationCommandHandler } from 'src/modules/EventManagement/services/Student/approveRegistration.command-handler'
import {
  FormFilterEventRegisterListSchema,
  FormFilterEventRegisterListType,
  FormRejectRegistrationEventType,
  FormRejectRegistrationSchema
} from 'src/modules/EventManagement/utils'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import Pagination from 'src/modules/Share/components/Pagination'
import Restricted from 'src/modules/Share/components/Restricted'
import { StatusToMessage } from 'src/modules/Share/constants'
import path from 'src/modules/Share/constants/path'
import { formatDateTime, handleError } from 'src/modules/Share/utils'
import Swal from 'sweetalert2'

const EventRegisterList = () => {
  const [page, setPage] = useState<number>(1)

  const [isOpenModalRegisterEvent, setIsOpenModalRegisterEvent] = useState(false)

  const FilterEventRegisterListForm = useForm<FormFilterEventRegisterListType>({
    resolver: yupResolver(FormFilterEventRegisterListSchema)
  })

  const handleCloseModalRegisterEvent = () => {
    setIsOpenModalRegisterEvent(false)
  }

  const handleOpenModalRegisterEvent = (registration: RegisteredStudentType) => {
    setRegistration(registration)
    setIsOpenModalRegisterEvent(true)
  }

  const queryEventConfig = useQueryEventConfig()

  const getRegisteredStudentsQuery = new GetRegisteredStudentsQuery(
    queryEventConfig.id as string,
    page,
    FilterEventRegisterListForm.watch('status') || ''
  )

  const registeredStudents = getRegisteredStudentsQuery.fetch()

  const [registration, setRegistration] = useState<RegisteredStudentType>()

  const approveRegistrationCommandHandler = new ApproveRegistrationCommandHandler()

  const handleApproveRegistration = (id: string, eventRegisterId: string) => {
    Swal.fire({
      title: 'Xác nhận duyệt ?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        approveRegistrationCommandHandler.handle(
          { id: id, eventRegisterId: eventRegisterId },
          () => {
            Swal.fire('Đã duyệt!', 'Duyệt sinh viên thành công', 'success')
            handleCloseModalRegisterEvent()
          },
          (error: any) => {
            handleError(error)
          }
        )
      }
    })
  }

  const { handleSubmit, control, setError } = useForm<FormRejectRegistrationEventType>({
    resolver: yupResolver(FormRejectRegistrationSchema)
  })

  const rejectRegistrationCommandHandler = new RejectRegistrationCommandHandler()

  const handleRejectRegistration = (id: string, eventRegisterId: string) =>
    handleSubmit((data) => {
      Swal.fire({
        title: 'Xác nhận từ chối ?',
        text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#26C6DA',
        cancelButtonColor: '#dc2626',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          const body = {
            id: id,
            eventRegisterId: eventRegisterId,
            data
          }
          rejectRegistrationCommandHandler.handle(
            body,
            () => {
              toast.success('Từ chối vai trò thành công !')
              handleCloseModalRegisterEvent()
            },
            (error: any) => {
              handleError<FormRejectRegistrationEventType>(error, setError)
            }
          )
        }
      })
    })

  const fetchRegisteredStudents = async () => {
    try {
      const status = FilterEventRegisterListForm.watch('status') || ''
      await getRegisteredStudentsQuery.fetchDataWithStatus(queryEventConfig.id as string, page, status)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmitFormFilter = FilterEventRegisterListForm.handleSubmit(() => {
    fetchRegisteredStudents()
  })
  return (
    <div>
      <div className='w-full mb-5 flex justify-end'>
        <form onSubmit={handleSubmitFormFilter}>
          <div className='flex items-center '>
            <Controller
              name='status'
              control={FilterEventRegisterListForm.control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} id='status' select label='Trạng thái' variant='outlined' className=' w-[200px]'>
                  <MenuItem value=''>Tất cả</MenuItem>
                  <MenuItem value='Pending'>Đang kiểm duyệt</MenuItem>
                  <MenuItem value='Approved'>Đã duyệt</MenuItem>
                  <MenuItem value='Rejected'>Đã từ chối</MenuItem>
                </TextField>
              )}
            />
          </div>
        </form>
      </div>
      <div>
        {registeredStudents && registeredStudents.total > 0 ? (
          <div>
            <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
              <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                <tr className='text-[14px] text-gray-600'>
                  {RegisteredStudentsTableHeader.map((item) => (
                    <th className='px-2 py-2 font-semibold' key={item.id}>
                      <span>{item.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registeredStudents.data.map((registration, index) => (
                  <tr
                    key={registration.id}
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                    onClick={() => {
                      handleOpenModalRegisterEvent(registration)
                    }}
                  >
                    <th className='px-2 py-4 font-medium'>{index + 1}</th>
                    <th className='px-2 py-4 font-medium flex flex-row items-center gap-3'>
                      <img src={registration.imageUrl} alt='' className='rounded-full object-cover w-[50px] h-[50px]' />
                      <div className='flex flex-col'>
                        <span className='font-semibold'>{registration.name}</span>
                        <span className='text-gray-400 text-[12px]'>{registration.code}</span>
                      </div>
                    </th>
                    <th className='px-2 py-4 font-medium'>{registration.email}</th>
                    <th className='px-2 py-4 font-medium'>{registration.homeRoomName}</th>
                    <th className='px-2 py-4 font-medium'>{registration.role}</th>
                    <th className='px-2 py-4 font-medium'>{StatusToMessage(registration.status)}</th>
                    <th className='px-2 py-4 font-medium w-[15%]'>{formatDateTime(registration.registeredAt)}</th>
                  </tr>
                ))}
              </tbody>
            </table>
            <ModalCustom isOpenModal={isOpenModalRegisterEvent} handleClose={handleCloseModalRegisterEvent}>
              {registration !== undefined && (
                <div className='bg-white p-10 rounded-xl w-[760px]'>
                  <form
                    className='flex flex-col gap-4'
                    onSubmit={handleRejectRegistration(registration.studentId, registration.id)}
                  >
                    <div className='flex justify-between '>
                      <h2 className='font-semibold text-[24px]'>Đơn đề nghị tham gia sự kiện</h2>
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
                    <div className='flex justify-between items-center'>
                      <h3 className='font-medium text-[20px]'>Thông tin chung</h3>
                      <span
                        className={classNames('px-4 py-1 rounded-full', {
                          'bg-[#b3a3fa]/90 text-[#6c4df6]': registration.status === 'Pending',
                          'bg-[#fab3a3]/90 text-[#f64d4d]': registration.status === 'Rejected',
                          'bg-[#eaffe6]/90 text-[#44e751]': registration.status === 'Approved'
                        })}
                      >
                        {StatusToMessage(registration.status)}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={registration.imageUrl}
                          alt=''
                          className='rounded-full object-cover w-[50px] h-[50px]'
                        />
                        <div className='flex flex-col'>
                          <span className='font-semibold text-[16px]'>{registration.name}</span>
                          <span className='text-gray-400 text-[14px]'>{registration.code}</span>
                        </div>
                      </div>
                      <div className='flex gap-6 text-[16px]'>
                        <div className='flex items-center gap-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 text-[#26C6DA] '
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                            />
                          </svg>
                          <span>{registration.role}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 text-[#26da2f]'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <span>{formatDateTime(registration.registeredAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                      <label htmlFor='description'>Lời giới thiệu</label>
                      <TextField
                        id='description'
                        placeholder='Kinh nghiệm...'
                        className='w-full bg-gray-100'
                        multiline
                        rows={4}
                        value={registration.description}
                        disabled
                      />
                    </div>
                    {registration.status !== 'Approved' && (
                      <div className='flex flex-col gap-4'>
                        <Controller
                          name='rejectReason'
                          control={control}
                          render={({ field: { onChange }, fieldState: { error } }) => (
                            <div className='flex flex-col gap-2'>
                              <label htmlFor='description'>Lí do từ chối</label>
                              <TextField
                                id='rejectReason'
                                placeholder='Lí do từ chối'
                                className='w-full bg-gray-100'
                                onChange={onChange}
                                multiline
                                rows={4}
                                value={registration.rejectReason}
                                disabled={registration.status === 'Rejected'}
                              />
                              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                                {error?.message}
                              </span>
                            </div>
                          )}
                        />
                      </div>
                    )}
                    {registration.status === 'Pending' && (
                      <div className='flex gap-6 justify-end'>
                        <Restricted to='ServeSync.Permissions.Events.RejectRegistration'>
                          <Button
                            type='submit'
                            classNameButton='bg-[#dd5353] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[108px]'
                            isLoading={rejectRegistrationCommandHandler.isLoading()}
                          >
                            Từ chối
                          </Button>
                        </Restricted>
                        <Restricted to='ServeSync.Permissions.Events.ApproveRegistration'>
                          <Button
                            type='button'
                            classNameButton='bg-[#26C6DA] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[100px]'
                            onClick={() => handleApproveRegistration(registration.studentId, registration.id)}
                            isLoading={approveRegistrationCommandHandler.isLoading()}
                          >
                            Duyệt
                          </Button>
                        </Restricted>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </ModalCustom>
            <Pagination
              queryConfig={{ page: page }}
              pageSize={registeredStudents.totalPages}
              pathname={path.event}
              className='flex justify-end'
              setPage={setPage}
            />
          </div>
        ) : (
          <div className='flex flex-col items-center mt-3 text-[#A0A2A4]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-12'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
              />
            </svg>
            <span className='text-[14px] font-normal'>Hiện chưa có sinh viên nào đăng ký</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventRegisterList
