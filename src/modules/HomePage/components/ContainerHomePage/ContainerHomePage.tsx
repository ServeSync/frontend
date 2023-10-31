import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { EventsListType } from 'src/modules/EventManagement/interfaces'
import ContainerEvent from '../EventContainer'

interface Props {
  eventsDone: EventsListType
  eventsHappening: EventsListType
  eventsUpcoming: EventsListType
}

const ContainerHomePage = ({ eventsDone, eventsHappening, eventsUpcoming }: Props) => {
  return (
    <div className='flex flex-col mb-[200px] overflow-hidden'>
      <div className='flex max-lg:flex-col gap-10 justify-between items-center max-w-screen-xl w-full py-8 px-4 m-auto'>
        <div className='flex flex-col gap-11 lg:max-w-[50%] max-lg:items-center '>
          <h1 className='w-full text-black text-[69px] font-normal leading-[82px] break-words'>
            <span>Tham gia</span>
            <span className='text-[#26C6DA]'> hoạt động cộng đồng </span>
            <span>cùng mình nhé!</span>
          </h1>
          <p className='text-[#19182580] text-[18px] font-normal leading-7 break-words'>
            Chúng tôi mở đường cho bạn tìm đến các hoạt động phù hợp với bản thân.
          </p>
          <div className='flex flex-col gap-4'>
            <Link
              to={path.login}
              className='px-8 py-4 bg-[#26c6da] justify-center items-start inline-flex gap-2 rounded-[100px] text-[#eeeeee] text-[16px] w-[150px]'
            >
              Bắt đầu
            </Link>
          </div>
        </div>
        <div>
          <img
            src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699833600&Signature=H2VfA70IdCIy1BGzWgbA1ChJFKq4UYFWEqza2nEGH6DQgyFy5qFoAuIcuW8hkcqWNthududDsoknnqa7VDmn~Dx9VJhipd~7~Q4yKdh1q65g2BKtaFHv0wXTMtwtO7hn~B2KM8qop2byNOknDdzAhXFb6n1FPb7s2sxE6w0-acQUKScP6aPouIH7FoTW3lJVNfgthm03H82MqQJl2Jui4GKd-raIHJwa0QyF2eo8EbkoZk0qejsyl5qh5T3f3O1-sxxBuHmP4R2-fjEDB-KgZBYPuTkiGmoo-Ar9-hJOpJdpLFBB10tqn4D1ifw78fac-j0PdzM0WbxUCnVEKR9Bpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-[30px]'
          />
        </div>
      </div>
      <div className='flex justify-between max-lg:flex-col items-center gap-20 max-w-screen-xl w-full py-8 px-4 m-auto'>
        <div className='lg:max-w-[50%] relative'>
          <img
            src='https://s3-alpha-sig.figma.com/img/009c/540d/95f73101eb52a8e05f8d6932d3340bcb?Expires=1699833600&Signature=c3ABQR5mj7dcsbT7IO3jrm3bh-E4bydBApVXPrAv36yv63ZUr99dlPslYJA1UXpeqKnSphPFj3xzC8Qusy5VyFLwHRWlybr2zPvsegfzqvB2eaMgqfG5YC5SUBO1AbMbxfRo9RIgpw6h5GdIEXozv4uXYQw-C2~XhOcxSaHLCoBzxKbidjL7d3tG~KLySeBeg72sSbDsOIifeyB6JpH1tAfKFU6OJPs4QxVE8SarEoIsphJZGA90o0pTl2QHYIhlBlwlZ6sXI4vnlm7~1QkE8G0NhOTUhnpi-M3ZgXYSrMBnOBA9E3Y0x5Ux-HCEpUfqRbaUEBOcSEw2LVnduXFPDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-[30px] z-20 relative'
          />
          <div className='absolute w-[110%] h-[80%] bg-[#26C6DA]/80 top-[200px] left-[-100px] z-10 rounded-r-full'></div>
        </div>
        <div className='relative flex flex-col gap-5 mt-20'>
          <h2 className='text-[#F85E9F] text-[24px] font-normal uppercase leading-7 break-words'>Điểm tích lũy</h2>
          <h3 className='text-[40px] font-normal leading-11'>Chúng tôi giúp bạn tìm đến các hoạt động phù hợp</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 gap-10'>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <span className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>500+</span>
              <span className='text-[#191825] text-[18px] font-normal leading-7 '>Sự kiện đã tổ chức</span>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <span className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>100</span>
              <span className='text-[#191825] text-[18px] font-normal leading-7 '>Nhà tổ chức sự kiện</span>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <span className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>700+</span>
              <span className='text-[#191825] text-[18px] font-normal leading-7 '>Sinh viên tham gia</span>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <span className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>2k+</span>
              <span className='text-[#191825] text-[18px] font-normal leading-7 '>Đánh giá tích cực</span>
            </div>
          </div>
          <div className='absolute w-[30%] h-[30%] bg-[#26C6DA]/80 shadow-xl blur-[150px] top-[-100px] right-[50px] max-lg:right-0'></div>
        </div>
      </div>
      <div className='flex max-lg:flex-col gap-10 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-40'>
        <div className='flex flex-col gap-8 max-lg:items-center relative'>
          <div className='flex flex-col'>
            <h2 className='text-[#F85E9F] text-[44px] font-normal uppercase leading-[52px] break-words tracking-[8px]'>
              Tham gia sự kiện
            </h2>
            <h3 className='text-[30px] font-normal leading-9 mt-4'>Quy trình tham gia sự kiện</h3>
            <h4 className='text-[18px] font-normal leading-7 break-words text-[#19182580] mt-8'>
              Quy trình tham gia sự kiện đơn giản, đảm bảo bạn là yếu tố cần thiết cho sự kiện.
            </h4>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-8'>
              <div className='bg-[#FF5722] rounded-3xl p-6 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </div>
              <span className='text-[23px] font-normal leading-7 break-words'>Chọn sự kiện phù hợp với bạn</span>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#FACD49] rounded-3xl p-6 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
              </div>
              <span className='text-[23px] font-normal leading-7 break-words'>
                Gửi lời ngỏ ý tham gia của bạn đến ban tổ chức
              </span>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#F85E9F] rounded-3xl p-6 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
                  />
                </svg>
              </div>
              <span className='text-[23px] font-normal leading-7 break-words'>Nhận lời mời tham gia sự kiện </span>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#F85E9F] rounded-3xl p-6 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
                  />
                </svg>
              </div>
              <span className='text-[23px] font-normal leading-7 break-words'>Tham gia và tích lũy điểm</span>
            </div>
          </div>
        </div>
        <div className='max-w-[45%]'>
          <div className='relative'>
            <img
              src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
              alt=''
              className='rounded-full'
            />
            <div className='absolute top-[300px] left-60 bg-white rounded-full max-md:top-[150px] max-md:left-20'>
              <img
                src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt=''
                className='rounded-full p-4'
              />
            </div>
          </div>
        </div>
      </div>
      <ContainerEvent heading='Sự kiện sắp diễn ra' title='Sự kiện sắp tổ chức tới đây' event={eventsUpcoming} />
      <ContainerEvent heading='Sự kiện đang diễn ra' title='Sự kiện đang được tổ chức' event={eventsHappening} />
      <ContainerEvent heading='Sự kiện đã kết thúc' title='Sự kiện đã hoàn thành' event={eventsDone} />
      <div className='flex flex-col justify-center items-center py-8 px-4 m-auto max-w-screen-xl mt-20'>
        <div className='w-full h-full lg:px-40 py-12 inline-flex justify-center items-center relative'>
          <span className='text-center text-[44px] font-normal leading-[52px] break-words'>
            Tham gia cùng chúng mình để cùng tay tạo nên các khoảnh khắc đáng nhớ nhé!
          </span>
          <div className='absolute w-[30%] h-[30%] bg-[#26C6DA]/80 shadow-xl blur-[150px] top-20'></div>
        </div>
        <div className=' mx-auto px-5 py-2 lg:px-32 lg:pt-24'>
          <div className='-m-1 flex flex-wrap md:-m-2'>
            <div className='flex w-1/2 flex-wrap'>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-full p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
            </div>
            <div className='flex w-1/2 flex-wrap'>
              <div className='w-full p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerHomePage
