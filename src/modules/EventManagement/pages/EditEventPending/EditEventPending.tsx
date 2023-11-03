/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Tab, Tabs } from '@mui/material'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from 'src/modules/Share/components/Button'
import useQueryRequestEventConfig from '../../hooks/useQueryRequestEventConfig'
import { ApproveRequestEvent, GetEventPendingQuery } from '../../services'
import EventPendingInfoPage from '../EventPending/EventPendingInfoPage'
import EventPendingOrganizationPage from '../EventPending/EventPendingOrganizationPage'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

const EditEventPending = () => {
  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }
  const navigate = useNavigate()

  const queryEventPendingConfig = useQueryRequestEventConfig()

  const getEventPendingQuery = new GetEventPendingQuery(queryEventPendingConfig.id as string)

  const eventPending = getEventPendingQuery.fetch()

  const approveRequestEvent = new ApproveRequestEvent()

  const handleApproveRequestEvent = (event: React.SyntheticEvent) => {
    event.preventDefault()
    approveRequestEvent.handle(
      queryEventPendingConfig.id as string,
      () => {
        navigate(path.event_pending)
        toast.success('Chấp thuận thành công')
      },
      (error: any) => {
        handleError(error)
      }
    )
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
          <Box className='mt-6'>
            <EventPendingInfoPage eventPending={eventPending} page={page} index={0} />
            <EventPendingOrganizationPage eventPending={eventPending} page={page} index={1} />
          </Box>
        </Box>
        <div className='col-span-12 flex justify-end gap-x-6 mt-4'>
          <Button
            type='submit'
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold '
            onClick={handleApproveRequestEvent}
          >
            Chấp thuận
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default EditEventPending
