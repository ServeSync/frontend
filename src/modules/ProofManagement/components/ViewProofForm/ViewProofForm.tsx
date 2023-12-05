/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { ProofDetailType } from '../../interfaces'
import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from 'src/modules/Share/components/Button'

import { formatDateTimeVN } from 'src/modules/Share/utils'
import { FormRejectProofType } from '../../utils'

interface Props {
  proof: ProofDetailType
  control: Control<FormRejectProofType>
  handleApproveProof: () => void
  handleRejectProof: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  isLoadingReject: boolean
  isLoadingApprove: boolean
}

const ViewProofForm = ({
  proof,
  control,
  handleApproveProof,
  handleRejectProof,
  isLoadingReject,
  isLoadingApprove
}: Props) => {
  return (
    <Fragment>
      {proof && (
        <div className='w-full'>
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-3'>
              <h2 className='col-span-2 font-semibold'>Thông tin sự kiện</h2>
              <div className='col-span-2 mb-[18px]'>
                <TextField
                  id='eventName'
                  label='Tên sự kiện'
                  value={proof.eventName}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-2 mb-[18px]'>
                <TextField
                  id='address'
                  label='Địa điểm tổ chức'
                  value={proof.address}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-2 mb-[18px]'>
                <TextField
                  id='organizationName'
                  label='Tên nhà tổ chức'
                  value={proof.organizationName}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-1 mt-[-8px] mb-[18px]'>
                <TextField
                  id='organizationName'
                  label='Thời gian bắt đầu'
                  value={formatDateTimeVN(proof.startAt)}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-1 mt-[-8px] mb-[18px]'>
                <TextField
                  id='organizationName'
                  label='Thời gian kết thúc'
                  value={formatDateTimeVN(proof.endAt)}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-2 '>
                <TextField
                  id='activityName'
                  label='Tên hoạt động'
                  value={proof.activity.name}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <h2 className='col-span-2 font-semibold'>Thông tin tham gia sự kiện</h2>
              <div className='col-span-2 mb-[18px]'>
                <TextField
                  id=''
                  label='Thời gian điểm danh'
                  value={formatDateTimeVN(proof.attendanceAt)}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-1 mb-[18px]'>
                <TextField
                  id='role'
                  label='Vai trò tham gia'
                  value={proof.role}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-1 mb-[18px]'>
                <TextField
                  id='role'
                  label='Điểm '
                  value={proof.score}
                  className='w-full bg-white'
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-2 mb-[18px]'>
                <TextField
                  id='description'
                  label='Mô tả '
                  value={proof.description}
                  className='w-full bg-white'
                  multiline
                  rows={3}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className='col-span-2 mb-[18px]'>
                <img src={proof.imageUrl} alt='' className='object-cover rounded-2xl w-full h-full' />
              </div>
            </div>
            {proof.proofStatus !== 'Approved' && (
              <form onSubmit={handleRejectProof}>
                <Controller
                  name='rejectReason'
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className='col-span-2'>
                        <TextField
                          id='rejectReason'
                          label='Lý do từ chối'
                          value={proof.rejectReason}
                          placeholder='Nhập lý do'
                          className='w-full bg-white '
                          onChange={onChange}
                          multiline
                          rows={3}
                          InputProps={{
                            readOnly: proof.proofStatus === 'Reject'
                          }}
                        />
                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error?.message}
                        </span>
                      </div>
                    </LocalizationProvider>
                  )}
                />
                {proof.proofStatus === 'Pending' && (
                  <div className='flex gap-x-6  justify-end items-center'>
                    <Button
                      type='submit'
                      classNameButton='bg-[#FF5252] py-2 px-4 rounded-lg text-[14px] text-white font-semibold z-50 w-[108px]'
                      isLoading={isLoadingReject}
                    >
                      Từ chối
                    </Button>
                    <Button
                      type='button'
                      classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold z-50 w-[100px]'
                      onClick={handleApproveProof}
                      isLoading={isLoadingApprove}
                    >
                      Duyệt
                    </Button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ViewProofForm
