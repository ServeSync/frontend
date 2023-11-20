/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CreateEventOrganizationForm from '../../components/CreateEventOrganizationForm'
import { FormEventOrganizationSchema, FormEventOrganizationType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import { CreateEventOrganizationCommandHandler } from '../../services'

const CreateEventOrganizationPage = () => {
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

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }

  const createEventOrganizationCommandHandler = new CreateEventOrganizationCommandHandler()

  const handleCreateEventOrganization = handleSubmit(async (data) => {
    createEventOrganizationCommandHandler.handle(
      data,
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

  return (
    <Fragment>
      <Helmet>
        <title>Create Organization</title>
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
