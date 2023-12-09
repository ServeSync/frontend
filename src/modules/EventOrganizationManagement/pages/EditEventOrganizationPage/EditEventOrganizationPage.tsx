/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import EditEventOrganizationForm from '../../components/EditEventOrganizationForm'
import useQueryEventConfig from 'src/modules/EventManagement/hooks/useQueryEventConfig'
import { FormEventOrganizationSchema, FormEventOrganizationType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { handleError } from 'src/modules/Share/utils'
import { toast } from 'react-toastify'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import Swal from 'sweetalert2'
import {
  DeleteEventOrganizationCommandHandler,
  EditEventOrganizationCommandHandler,
  GetEventOrganizationByIdQuery
} from '../../services'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import EventOrganizationContactTable from '../../components/EventOrganizationContactTable'
import CreateEventOrganizationContactPage from '../CreateEventOrganizationContactPage'
import Restricted from 'src/modules/Share/components/Restricted'

const EditEventOrganizationPage = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleOpenModalChange = () => {
    setIsOpenModal(true)
  }

  const handleCloseModalChange = () => {
    setIsOpenModal(false)
  }
  const navigate = useNavigate()

  const location = useLocation()

  const prevEventOrganizationConfig = location.state

  const queryEventOrganizationConfig = useQueryEventConfig()

  const getEventOrganizationByIdQuery = new GetEventOrganizationByIdQuery(queryEventOrganizationConfig.id as string)
  const eventOrganization = getEventOrganizationByIdQuery.fetch()

  const { register, control, setValue, handleSubmit, setError } = useForm<FormEventOrganizationType>({
    resolver: yupResolver(FormEventOrganizationSchema)
  })

  const editEventOrganizationCommandHandler = new EditEventOrganizationCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    editEventOrganizationCommandHandler.handle(
      {
        id: queryEventOrganizationConfig.id as string,
        data: data
      },
      file as File,
      () => {
        navigate(path.event_organization)
        toast.success('Cập nhật thông tin nhà tổ chức thành công!')
      },
      (error: any) => {
        handleError<FormEventOrganizationType>(error, setError)
      }
    )
  })

  const deleteEventOrganizationCommandHandler = new DeleteEventOrganizationCommandHandler()

  const handleDeleteEventOrganization = (id: string) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEventOrganizationCommandHandler.handle(
          id,
          () => {
            Swal.fire('Đã xóa!', 'Nhà tổ chức đã được xóa thành công', 'success')
            navigate({
              pathname: path.event_organization,
              search: createSearchParams(prevEventOrganizationConfig).toString()
            })
          },
          (error: any) => {
            handleError<FormEventOrganizationType>(error, setError)
          }
        )
      }
    })
  }

  const handleCancel = () => {
    navigate({
      pathname: path.event_organization,
      search: createSearchParams(prevEventOrganizationConfig).toString()
    })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Edit Organization</title>
        <meta name='description' content='This is edit event organization of the project'></meta>
      </Helmet>
      {eventOrganization && (
        <div>
          <form onSubmit={handleSubmitForm}>
            <EditEventOrganizationForm
              register={register}
              setValue={setValue}
              control={control}
              eventOrganization={eventOrganization}
              previewImage={previewImage}
              onChange={handleChangeFile}
              isLoadingEdit={editEventOrganizationCommandHandler.isLoading()}
              onCancel={handleCancel}
              handleDeleteEventOrganization={handleDeleteEventOrganization}
            />
          </form>
          <div className='mt-4 mb-2 flex justify-between'>
            <h3 className='text-[16px] font-semibold'>Danh sách thành viên</h3>
            <Restricted to='ServeSync.Permissions.EventOrganizations.AddContact'>
              {eventOrganization.status == 'Active' && (
                <Button
                  onClick={handleOpenModalChange}
                  classNameButton='text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
                >
                  Mời thành viên gia nhập
                </Button>
              )}
              <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModalChange}>
                <CreateEventOrganizationContactPage
                  eventOrganization={eventOrganization}
                  handleClose={handleCloseModalChange}
                />
              </ModalCustom>
            </Restricted>
          </div>
          {eventOrganization.contacts.length == 0 ? (
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
              <span className='text-[14px] font-normal'>Hiện tổ chức chưa có thành viên nào</span>
            </div>
          ) : (
            <EventOrganizationContactTable eventOrganization={eventOrganization} />
          )}
        </div>
      )}
    </Fragment>
  )
}

export default EditEventOrganizationPage
