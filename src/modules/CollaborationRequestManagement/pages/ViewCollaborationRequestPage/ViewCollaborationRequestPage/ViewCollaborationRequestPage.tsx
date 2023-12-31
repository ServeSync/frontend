/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Tab, Tabs } from '@mui/material'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from 'src/modules/Share/components/Button'
import useQueryRequestEventConfig from '../../../hooks/useQueryRequestEventConfig'
import { ApproveRequestEvent, GetCollaborationRequestByIdQuery, RejectRequestEvent } from '../../../services'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import Restricted from 'src/modules/Share/components/Restricted'
import Swal from 'sweetalert2'
import CollaborationRequestInformationPage from '../CollaborationRequestInformationPage'
import CollaborationRequestOrganizationPage from '../CollaborationRequestOrganizationPage'

const ViewCollaborationRequestPage = () => {
  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const navigate = useNavigate()

  const queryEventPendingConfig = useQueryRequestEventConfig()

  const getCollaborationRequestByIdQuery = new GetCollaborationRequestByIdQuery(queryEventPendingConfig.id as string)
  const collaborationRequest = getCollaborationRequestByIdQuery.fetch()

  const approveRequestEvent = new ApproveRequestEvent()

  const rejectRequestEvent = new RejectRequestEvent()

  const handleApproveRequestEvent = () => {
    Swal.fire({
      title: 'Xác nhận đồng ý tổ chức sự kiện?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        approveRequestEvent.handle(
          queryEventPendingConfig.id as string,
          () => {
            navigate(path.collaboration_request)
            toast.success('Chấp thuận thành công')
          },
          (error: any) => {
            handleError(error)
          }
        )
      }
    })
  }

  const handleRejectRequestEvent = () => {
    Swal.fire({
      title: 'Từ chối lời đề nghị tổ chức sự kiện?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        rejectRequestEvent.handle(
          queryEventPendingConfig.id as string,
          () => {
            navigate(path.collaboration_request)
            toast.success('Đã từ chối')
          },
          (error: any) => {
            handleError(error)
          }
        )
      }
    })
  }
  return (
    <Fragment>
      <Helmet>
        <title>Edit Event Pending</title>
        <meta name='description' content='This is edit event page of the project' />
      </Helmet>
      <div className='w-full'>
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
              <Tab label='Thông tin sự kiện' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
              <Tab label='Ban tổ chức sự kiện' id='tab-2' aria-controls='simple-tabpanel-2' />
            </Tabs>
          </Box>
          <Box className='mt-6 z-10'>
            <CollaborationRequestInformationPage collaborationRequest={collaborationRequest} page={page} index={0} />
            <CollaborationRequestOrganizationPage collaborationRequest={collaborationRequest} page={page} index={1} />
          </Box>
        </Box>
      </div>
      {collaborationRequest && collaborationRequest.status === 'Pending' && (
        <div className='flex justify-end gap-x-6 fixed bottom-0 right-0 p-5 bg-slate-100 w-full z-20'>
          <Restricted to={'ServeSync.Permissions.EventCollaborationRequests.Reject'}>
            <Button
              type='button'
              classNameButton='bg-[#FF5252] py-2 px-4 rounded-lg text-[14px] text-white font-semibold z-50'
              onClick={handleRejectRequestEvent}
            >
              Từ chối
            </Button>
          </Restricted>
          <Restricted to={'ServeSync.Permissions.EventCollaborationRequests.Approve'}>
            <Button
              type='button'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold z-50'
              onClick={handleApproveRequestEvent}
            >
              Chấp thuận
            </Button>
          </Restricted>
        </div>
      )}
    </Fragment>
  )
}

export default ViewCollaborationRequestPage
