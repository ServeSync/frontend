import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import RequestCreteEvent from 'src/modules/EventManagement/pages/RequestCreateEvent'
import RequestEventOrganizer from 'src/modules/EventManagement/pages/RequestEventOrganizer'
import Input from 'src/modules/Share/components/Input'
import { FormRequestEventSchema, FormRequestEventType } from '../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputImage from 'src/modules/Share/components/InputImage'

const RequestEventPage = () => {
  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormRequestEventType>({
    resolver: yupResolver(FormRequestEventSchema)
  })

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data)
  })
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }
  return (
    <Fragment>
      <Helmet>
        <title>Request Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
      <form onSubmit={handleSubmitForm}>
        <div className='bg-[#1C2A3A] h-[200px]'>
          <div className='flex justify-between items-center max-w-[800px] mx-auto h-full'>
            <div className='flex flex-col mt-20 mx-6'>
              <Input
                register={register}
                id='name'
                name='name'
                placeholder='Tên sự kiện'
                className='col-span-1 flex flex-col'
                classNameInput='text-white text-[24px] placeholder:text-white bg-[#1C2A3A] outline-none'
                error={errors.name?.message}
              />
              <Input
                register={register}
                id='introduction'
                name='introduction'
                placeholder='Giới thiệu sự kiện'
                className='col-span-1 flex flex-col'
                classNameInput='text-white/70 text-[13px] placeholder:text-white/70 bg-[#1C2A3A] outline-none'
                error={errors.introduction?.message}
              />
            </div>
            <div className='flex items-center mt-20'>
              <div className='mx-6 h-[80px] w-[80px]'>
                <InputImage register={register} onChange={handleChangeFile} previewImage={previewImage} />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.imageUrl?.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-[800px] mx-auto pb-4'>
          <Box>
            <Box>
              <Tabs
                value={page}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  '& div': { width: '100%', margin: '0 -5px' },
                  '& button': {
                    color: '#2f2f2f',
                    textTransform: 'capitalize',
                    fontSize: '17px',
                    margin: '0 10px',
                    fontFamily: 'Open Sans',
                    letterSpacing: '0'
                  },
                  '& button:active, button.Mui-selected,': {
                    color: '#26c6da'
                  },
                  '.MuiTabs-indicator': { backgroundColor: '#26c6da' }
                }}
              >
                <Tab label='Tạo sự kiện' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
                <Tab label='Ban tổ chức sự kiện' id='tab-2' aria-controls='simple-tabpanel-3' />
              </Tabs>
            </Box>
            <Box className='mt-6'>
              <RequestCreteEvent
                reset={reset}
                setValue={setValue}
                register={register}
                control={control}
                errors={errors}
                page={page}
                index={0}
              />
              <RequestEventOrganizer register={register} control={control} errors={errors} page={page} index={1} />
            </Box>
          </Box>
        </div>
        
      </form>
    </Fragment>
  )
}

export default RequestEventPage
