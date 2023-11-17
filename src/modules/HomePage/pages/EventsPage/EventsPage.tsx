import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { GetAllEventsQuery } from 'src/modules/EventManagement/services'
import ListEventCard from '../../components/ListEvent'
import { homePage_01, homePage_03 } from 'src/modules/Share/assets/image'

const EventsPage = () => {
  const getAllEventQuery = new GetAllEventsQuery()
  const events = getAllEventQuery.fetch()
  const pageSize = getAllEventQuery.getTotalPages()

  return (
    <Fragment>
      <Helmet>
        <title>Events</title>
        <meta name='description' content='This is events page of the project' />
      </Helmet>
      <div>
        <ListEventCard events={events} pageSize={pageSize} />
        <div className='flex flex-col justify-center items-center py-8 px-4 m-auto mt-20 max-w-screen-xl w-full'>
          <div className='w-full h-full lg:px-40 py-12 inline-flex justify-center items-center relative'>
            <span className='text-center text-[44px] font-normal leading-[52px] break-words'>
              Tham gia cùng chúng mình để cùng tay tạo nên các khoảnh khắc đáng nhớ nhé!
            </span>
            <div className='absolute w-[30%] h-[30%] bg-[#26C6DA]/80 shadow-xl blur-[150px] top-20'></div>
          </div>
          <div className='mx-auto px-5 py-2 lg:pt-24 w-full'>
            <div className='-m-1 flex flex-wrap md:-m-2'>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_03}
                  />
                </div>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_03}
                  />
                </div>
                <div className='w-full p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_03}
                  />
                </div>
              </div>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-full p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_01}
                  />
                </div>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_01}
                  />
                </div>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_01}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EventsPage
