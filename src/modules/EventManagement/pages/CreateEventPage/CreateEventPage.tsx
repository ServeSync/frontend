import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import CreateEvent from '../CreateEvent'
import RegisterEvent from '../RegisterEvent'
import EventOrganizer from '../EventOrganizer'

const CreateEventPage = () => {
  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  return (
    <Fragment>
      <Helmet>
        <title>Create Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
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
            <Tab label='Thông tin đăng ký' id='tab-2' aria-controls='simple-tabpanel-2' />
            <Tab label='Ban tổ chức sự kiện' id='tab-3' aria-controls='simple-tabpanel-3' />
          </Tabs>
        </Box>
        <Box className='mt-6'>
          <CreateEvent page={page} index={0} />
          <RegisterEvent page={page} index={1} />
          <EventOrganizer page={page} index={2} />
        </Box>
      </Box>
    </Fragment>
  )
}

export default CreateEventPage
