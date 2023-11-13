/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CreateEventOrganizationForm from '../../components/CreateEventOrganizationForm'
import { FormEventOrganizationSchema, FormEventOrganizationType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CreateEventOrganizationCommandHandler } from 'src/modules/EventManagement/services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'

const CreateEventOrganizationPage = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const navigate = useNavigate()

  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormEventOrganizationType>({
    resolver: yupResolver(FormEventOrganizationSchema)
  })

  const createEventOrganizationCommandHandler = new CreateEventOrganizationCommandHandler()

  const handleCreateEventOrganization = handleSubmit(async (data) => {
    createEventOrganizationCommandHandler.handle(
      {
        ...data
      },
      file as File,
      () => {
        toast.success('Thêm nhà tổ chức thành công !')
        navigate({
          pathname: path.event_organization
        })
      },
      (error: any) => {
        handleError<FormEventOrganizationType>(error, setError)
      }
    )
  })

  const handleCancel = () => {
    navigate({
      pathname: path.event_organization
    })
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Create Organiztion</title>
        <meta name='description' content='This is create student page of the project' />
      </Helmet>
      <form onSubmit={handleCreateEventOrganization}>
        <CreateEventOrganizationForm
          register={register}
          control={control}
          onChange={handleChangeFile}
          onCancel={handleCancel}
          isLoading={createEventOrganizationCommandHandler.isLoading()}
          previewImage={previewImage}
          errors={errors}
        />
      </form>
    </Fragment>
  )
}

export default CreateEventOrganizationPage
