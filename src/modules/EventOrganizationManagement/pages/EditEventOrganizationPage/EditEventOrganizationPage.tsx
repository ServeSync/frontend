/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import EditEventOrganizationForm from '../../components/EditEventOrganizationForm'
import {
  DeleteEventOrganizationCommandHandler,
  EditEventOrganizationCommandHandler,
  GetEventOrganizationByIdQuery
} from 'src/modules/EventManagement/services'
import useQueryEventConfig from 'src/modules/EventManagement/hooks/useQueryEventConfig'
import { FormEventOrganizationSchema, FormEventOrganizationType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { handleError } from 'src/modules/Share/utils'
import { toast } from 'react-toastify'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import Swal from 'sweetalert2'

const EditEventOrganizationPage = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
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
        <title>Edit Event Organization</title>
        <meta name='description' content='This is edit event organization of the project'></meta>
      </Helmet>
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
      </div>
    </Fragment>
  )
}

export default EditEventOrganizationPage
