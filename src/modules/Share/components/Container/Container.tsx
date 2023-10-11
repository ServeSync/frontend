/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import {} from '@material-tailwind/react'
import CardEvent from '../CardEvent'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

SwiperCore.use([Navigation, Pagination])
const Container = () => {
  // const [slider1Position, setSlider1Position] = useState(0)
  // const [slider2Position, setSlider2Position] = useState(0)
  // const [numberOfItems] = useState(3)

  // const handleSlide1 = (direction: string) => {
  //   if (direction === 'left') {
  //     if (slider1Position > 0) {
  //       setSlider1Position(slider1Position - 1)
  //     }
  //   } else if (direction === 'right') {
  //     if (slider1Position < numberOfItems) {
  //       setSlider1Position(slider1Position + 1)
  //     }
  //   }
  // }
  // const handleSlide2 = (direction: string) => {
  //   if (direction === 'left') {
  //     if (slider2Position > 0) {
  //       setSlider2Position(slider2Position - 1)
  //     }
  //   } else if (direction === 'right') {
  //     if (slider2Position < numberOfItems) {
  //       setSlider2Position(slider2Position + 1)
  //     }
  //   }
  // }

  return (
    <div className='flex flex-col mb-[200px] '>
      <div className='flex max-lg:flex-col gap-10 justify-between items-center max-w-screen-xl w-full py-8 px-4 m-auto '>
        <div className='flex flex-col gap-11 lg:max-w-[50%] max-lg:items-center '>
          <div className='w-full text-black text-[69px] font-normal leading-[82px] break-words'>
            Tham gia <span className='text-[#26C6DA]'> hoạt động cộng đồng</span> cùng mình nhé!
          </div>
          <div className='text-[#19182580] text-[18px] font-normal leading-7 break-words'>
            Chúng tôi mở đường cho bạn tìm đến các hoạt động phù hợp với bản thân.
          </div>
          <Link
            to={path.login}
            className='px-8 py-4 bg-[#26c6da] justify-center items-start inline-flex gap-2 rounded-[100px] text-[#eeeeee] text-[16px] w-[150px]'
          >
            Bắt đầu
          </Link>
        </div>
        <div className=''>
          <img
            src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1697414400&Signature=BdPiGe9KFXWyHLx3~XA0fjWfyRAwxGvsW2y9NUA4NgMp4HZmHZI4S-9WvVoAJ~cZXYeOMGyLdMzwHrk~Z9F48sI4VgH0QEt2PaL00FktBoUDpTS8joVzxBUNhsuEmlXxDeXmXafyM~k79InzLnJ~BxZ7vNWBalgnN428z~pUXjjjA~tnegNAqXeSz4pxSQi2XxkGVQUj-tcnsjyORmZJpWGZL6OlLzuP4wYqOUbEdrrL9PMJ7ZGxUIKq-BM3GRcb8A3QZ7k3X1cBkxfYYn1tfOEYUFR32-qIS6ev~jJz9io2zVcZijbfL-OrX17UzXUpdL7orZlAdu8JEOOAAWD6cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-[30px]'
          />
        </div>
      </div>
      <div className='flex justify-between max-lg:flex-col items-center gap-20 max-w-screen-xl w-full py-8 px-4 m-auto'>
        <div className='lg:max-w-[50%] relative'>
          <img
            src='https://s3-alpha-sig.figma.com/img/009c/540d/95f73101eb52a8e05f8d6932d3340bcb?Expires=1697414400&Signature=EUG61WI8gxYLFoZClmJJm9ZdNneKhScOk~2ekCwkIrQ9WlFapJpwaKBVW6OKR4bD4MZyt9CJywU5X3iIOtWicC~5~ox0AHpfYM91dVnkVOymW9Srgf44BgLxTqwnPZgW0lKyp3ULTTlFT8NzyOWW4DP4gFR-11qtX~i-TLDNlVVyZXJ2u-8cu-8A4MTWT2ESwR6k1pYVYiO5U5xBlPuiQVfDcaIrw2QY7vSpAfilHiztCWEQeWC8f4Nt4F~tgGlJ8NFxwqsG44dIyct9x6mugGJjP-qccuH-psZMjSIauFg86vdBeoHB~enR~4b1msru~ktzFNheJIG87tpDXDn8AA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-[30px] z-20 relative'
          />
          <div className='absolute w-[110%] h-[80%] bg-[#26C6DA] top-[200px] left-[-100px] z-10 rounded-r-full'></div>
        </div>
        <div className='relative flex flex-col gap-5 mt-20'>
          <div className='text-[#F85E9F] text-[23px] font-normal uppercase leading-7 break-words'>Điểm tích lũy</div>
          <div className='text-[44px] font-normal leading-10 '>Chúng tôi giúp bạn tìm đến các hoạt động phù hợp</div>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 gap-10'>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>500+</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Sự kiện đã tổ chức</div>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>100</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Nhà tổ chức sự kiện</div>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>700+</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Sinh viên tham gia</div>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>2k+</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Đánh giá tích cực</div>
            </div>
          </div>
          <div className='absolute w-[50%] h-[50%] bg-[#26C6DA] shadow-xl blur-[200px] top-[-100px] right-[0px] max-lg:right-0'></div>
        </div>
      </div>
      <div className='flex max-lg:flex-col gap-28 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-40'>
        <div className='flex flex-col gap-11  max-lg:items-center relative'>
          <div className='flex flex-col'>
            <div className='text-[#F85E9F] text-[44px] font-normal uppercase leading-[52px] break-words tracking-[8px]'>
              Tham gia sự kiện
            </div>
            <div className='text-[30px] font-normal leading-9 mt-4'>Quy trình tham gia sự kiện</div>
            <div className='text-[18px] font-normal leading-7 break-words text-[#19182580] mt-8'>
              Quy trình tham gia sự kiện đơn giản, đảm bảo bạn là yếu tố cần thiết cho sự kiện.
            </div>
          </div>
          <div className='flex flex-col gap-16'>
            <div className='flex items-center gap-8'>
              <div className='bg-[#FF5722] rounded-3xl p-8 text-white'>
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
              <div className='text-[23px] font-normal leading-7 break-words'>Chọn sự kiện phù hợp với bạn</div>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#FACD49] rounded-3xl p-8 text-white'>
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
              <div className='text-[23px] font-normal leading-7 break-words'>
                Gửi lời ngỏ ý tham gia của bạn đến ban tổ chức
              </div>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#F85E9F] rounded-3xl p-8 text-white'>
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
              <div className='text-[23px] font-normal leading-7 break-words'>Nhận lời mời tham gia sự kiện </div>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#F85E9F] rounded-3xl p-8 text-white'>
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
              <div className='text-[23px] font-normal leading-7 break-words'>Tham gia và tích lũy điểm</div>
            </div>
          </div>
          <div className='w-[50%] h-[50%] bg-[#26C6DA] shadow-xl blur-[200px] absolute top-[-100px] left-[-250px]'></div>
        </div>
        <div className='max-w-[45%]'>
          <div className='relative'>
            <img
              src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1697414400&Signature=qt8dHK7aK1OQM4ORhBOREGbPV5RfXyXbvzZsjePrvDwvtPWaI2qbnq-etD~ryA5hBiZ02k7ZPfnsdWBBhuJZCigvZ~5W1luQpHuXbsbWkoRLB04QG4pbOMTNtlDsfcfZv-xa6~3R014o0bDLh7V3OFt-htIuFSomx4Imor1OY2aKjMWDh2JMawrlNzIKLeE22fLnIZ7rfjCdwO5l6XGNwAJuEP0tp9wCFROenbnQ7PP2zA~v2hbhp6kKvP0nLOBspVb2J7c6wVWT4jFPelnt~HinclvkD-cDG3Hik9mmWMnuxR0ycOLYt7oA0Jhqc~WQVjyGgigtO5vJlYBEqoEnyQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
              alt=''
              className='rounded-full '
            />
            <div className='absolute top-[300px] left-60 bg-white rounded-full max-md:top-[150px] max-md:left-20'>
              <img
                src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1697414400&Signature=BdPiGe9KFXWyHLx3~XA0fjWfyRAwxGvsW2y9NUA4NgMp4HZmHZI4S-9WvVoAJ~cZXYeOMGyLdMzwHrk~Z9F48sI4VgH0QEt2PaL00FktBoUDpTS8joVzxBUNhsuEmlXxDeXmXafyM~k79InzLnJ~BxZ7vNWBalgnN428z~pUXjjjA~tnegNAqXeSz4pxSQi2XxkGVQUj-tcnsjyORmZJpWGZL6OlLzuP4wYqOUbEdrrL9PMJ7ZGxUIKq-BM3GRcb8A3QZ7k3X1cBkxfYYn1tfOEYUFR32-qIS6ev~jJz9io2zVcZijbfL-OrX17UzXUpdL7orZlAdu8JEOOAAWD6cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt=''
                className='rounded-full p-4'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-10 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-10 relative'>
        <div className='flex flex-col gap-4'>
          <div className='text-[#F85E9F] uppercase text-[44px] font-normal tracking-[8px] break-words'>
            Sự kiện thành công
          </div>
          <div className='font-normal text-[30px] leading-9 break-words'>Sự kiện được đánh giá cao nhất</div>
        </div>
        <div className='overflow-hidden py-10 w-full '>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className=' px-6 !overflow-visible flex'
          >
            <SwiperSlide>
              <CardEvent
                rating={4.8}
                imgUrl='https://tphcm.cdnchinhphu.vn/Uploads/images/2017/Novaland.jpg'
                isEnded={true}
                location='Huế'
                member={100}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/09/2023 - 23/09/2023'
                title='Mùa hè xanh'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.8}
                imgUrl='https://s3-alpha-sig.figma.com/img/cd40/7e6c/67698080a1183f1ff5c123cde51bbe35?Expires=1697414400&Signature=AK1AIUHadA~92nFgfXckdtE5NTex1GtuBDcjWZMK348QnWEpNfSRmCtaon0lGSoNIwRI-4gmQYHt-EBe3cDW4Z5JelaXkEc3C57kPe4p7~qYoHdL47rsJtJen0h9eR5jxd18mHC9w5jEGW1IVYqK7eWufvZ6znmaWZ~LltE9j3y~Lcj5cY2v40QJjzsdT4WYNQeeIbokLnxdU34JdT8zbjgIvQq2fc3npHI5MsAYY9GNHW6WGg8Elxn-DQw1o5vzkxl34ktxSwzhrWbfJ0Yia4C3lcD1CPrm37b6sFLm2blUsi5FzyM93MDMG-32hGGnZbL-4xSzBu5m78vriof00Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                isEnded={true}
                location='Huế'
                member={100}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/09/2023 - 23/09/2023'
                title='Gặp em trên bản'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.8}
                imgUrl='https://tphcm.cdnchinhphu.vn/Uploads/images/2017/Novaland.jpg'
                isEnded={true}
                location='Huế'
                member={100}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/09/2023 - 23/09/2023'
                title='Mùa hè xanh'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={3.2}
                imgUrl='https://img.dantocmiennui.vn/t620/uploaded/usizh/2022_03_28/sl1.jpg'
                isEnded={true}
                location='Đà Nẵng'
                member={200}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/10/2023 - 23/10/2023'
                title='Hỗ trợ trẻ em '
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.2}
                imgUrl='https://nld.mediacdn.vn/291774122806476800/2022/2/10/hud-16444803531531434048709.jpg'
                isEnded={true}
                location='Đà Nẵng'
                member={200}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/10/2023 - 23/10/2023'
                title='Làm sạch bãi biển'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.2}
                imgUrl='https://nld.mediacdn.vn/291774122806476800/2022/2/10/hud-16444803531531434048709.jpg'
                isEnded={true}
                location='Đà Nẵng'
                member={200}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/10/2023 - 23/10/2023'
                title='Làm sạch bãi biển'
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='w-[40%] h-[40%] bg-[#26C6DA]/50 shadow-xl blur-[300px] absolute top-40 left-[-100px]'></div>
      </div>
      <div className='flex flex-col gap-10 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-10 relative'>
        <div className='flex flex-col gap-4'>
          <div className='text-[#F85E9F] uppercase text-[44px] font-normal tracking-[8px] break-words'>
            Sự kiện gần đây
          </div>
          <div className='font-normal text-[30px] leading-9 break-words'>Sự kiện diễn ra gần đây</div>
        </div>
        <div className='overflow-hidden py-10 w-full '>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className=' px-6 !overflow-visible flex'
          >
            <SwiperSlide>
              <CardEvent
                rating={4.8}
                imgUrl='https://tphcm.cdnchinhphu.vn/Uploads/images/2017/Novaland.jpg'
                isEnded={true}
                location='Huế'
                member={100}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/09/2023 - 23/09/2023'
                title='Mùa hè xanh'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.8}
                imgUrl='https://s3-alpha-sig.figma.com/img/cd40/7e6c/67698080a1183f1ff5c123cde51bbe35?Expires=1697414400&Signature=AK1AIUHadA~92nFgfXckdtE5NTex1GtuBDcjWZMK348QnWEpNfSRmCtaon0lGSoNIwRI-4gmQYHt-EBe3cDW4Z5JelaXkEc3C57kPe4p7~qYoHdL47rsJtJen0h9eR5jxd18mHC9w5jEGW1IVYqK7eWufvZ6znmaWZ~LltE9j3y~Lcj5cY2v40QJjzsdT4WYNQeeIbokLnxdU34JdT8zbjgIvQq2fc3npHI5MsAYY9GNHW6WGg8Elxn-DQw1o5vzkxl34ktxSwzhrWbfJ0Yia4C3lcD1CPrm37b6sFLm2blUsi5FzyM93MDMG-32hGGnZbL-4xSzBu5m78vriof00Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                isEnded={true}
                location='Huế'
                member={100}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/09/2023 - 23/09/2023'
                title='Gặp em trên bản'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.8}
                imgUrl='https://tphcm.cdnchinhphu.vn/Uploads/images/2017/Novaland.jpg'
                isEnded={true}
                location='Huế'
                member={100}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/09/2023 - 23/09/2023'
                title='Mùa hè xanh'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={3.2}
                imgUrl='https://img.dantocmiennui.vn/t620/uploaded/usizh/2022_03_28/sl1.jpg'
                isEnded={true}
                location='Đà Nẵng'
                member={200}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/10/2023 - 23/10/2023'
                title='Hỗ trợ trẻ em '
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.2}
                imgUrl='https://nld.mediacdn.vn/291774122806476800/2022/2/10/hud-16444803531531434048709.jpg'
                isEnded={true}
                location='Đà Nẵng'
                member={200}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/10/2023 - 23/10/2023'
                title='Làm sạch bãi biển'
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEvent
                rating={4.2}
                imgUrl='https://nld.mediacdn.vn/291774122806476800/2022/2/10/hud-16444803531531434048709.jpg'
                isEnded={true}
                location='Đà Nẵng'
                member={200}
                organizational='Đại học bách khoa Đà Nẵng'
                time='22/10/2023 - 23/10/2023'
                title='Làm sạch bãi biển'
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='w-[40%] h-[40%] bg-[#26C6DA]/50 shadow-xl blur-[300px] absolute top-40 left-[-100px]'></div>
      </div>
      <div className='flex flex-col justify-center items-center py-8 px-4 m-auto max-w-screen-xl mt-20'>
        <div className='w-full h-full lg:px-40 py-12 inline-flex justify-center items-center relative'>
          <div className='text-center text-[44px] font-normal leading-[52px] break-words'>
            Tham gia cùng chúng mình để cùng tay tạo nên các khoảnh khắc đáng nhớ nhé!
          </div>
          <div className='w-[50%] h-[50%] bg-[#26C6DA]/80 shadow-xl blur-[150px] absolute top-20'></div>
        </div>
        <div className=' mx-auto px-5 py-2 lg:px-32 lg:pt-24'>
          <div className='-m-1 flex flex-wrap md:-m-2'>
            <div className='flex w-1/2 flex-wrap'>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1697414400&Signature=qt8dHK7aK1OQM4ORhBOREGbPV5RfXyXbvzZsjePrvDwvtPWaI2qbnq-etD~ryA5hBiZ02k7ZPfnsdWBBhuJZCigvZ~5W1luQpHuXbsbWkoRLB04QG4pbOMTNtlDsfcfZv-xa6~3R014o0bDLh7V3OFt-htIuFSomx4Imor1OY2aKjMWDh2JMawrlNzIKLeE22fLnIZ7rfjCdwO5l6XGNwAJuEP0tp9wCFROenbnQ7PP2zA~v2hbhp6kKvP0nLOBspVb2J7c6wVWT4jFPelnt~HinclvkD-cDG3Hik9mmWMnuxR0ycOLYt7oA0Jhqc~WQVjyGgigtO5vJlYBEqoEnyQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1697414400&Signature=qt8dHK7aK1OQM4ORhBOREGbPV5RfXyXbvzZsjePrvDwvtPWaI2qbnq-etD~ryA5hBiZ02k7ZPfnsdWBBhuJZCigvZ~5W1luQpHuXbsbWkoRLB04QG4pbOMTNtlDsfcfZv-xa6~3R014o0bDLh7V3OFt-htIuFSomx4Imor1OY2aKjMWDh2JMawrlNzIKLeE22fLnIZ7rfjCdwO5l6XGNwAJuEP0tp9wCFROenbnQ7PP2zA~v2hbhp6kKvP0nLOBspVb2J7c6wVWT4jFPelnt~HinclvkD-cDG3Hik9mmWMnuxR0ycOLYt7oA0Jhqc~WQVjyGgigtO5vJlYBEqoEnyQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-full p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1697414400&Signature=BdPiGe9KFXWyHLx3~XA0fjWfyRAwxGvsW2y9NUA4NgMp4HZmHZI4S-9WvVoAJ~cZXYeOMGyLdMzwHrk~Z9F48sI4VgH0QEt2PaL00FktBoUDpTS8joVzxBUNhsuEmlXxDeXmXafyM~k79InzLnJ~BxZ7vNWBalgnN428z~pUXjjjA~tnegNAqXeSz4pxSQi2XxkGVQUj-tcnsjyORmZJpWGZL6OlLzuP4wYqOUbEdrrL9PMJ7ZGxUIKq-BM3GRcb8A3QZ7k3X1cBkxfYYn1tfOEYUFR32-qIS6ev~jJz9io2zVcZijbfL-OrX17UzXUpdL7orZlAdu8JEOOAAWD6cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
            </div>
            <div className='flex w-1/2 flex-wrap'>
              <div className='w-full p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1697414400&Signature=qt8dHK7aK1OQM4ORhBOREGbPV5RfXyXbvzZsjePrvDwvtPWaI2qbnq-etD~ryA5hBiZ02k7ZPfnsdWBBhuJZCigvZ~5W1luQpHuXbsbWkoRLB04QG4pbOMTNtlDsfcfZv-xa6~3R014o0bDLh7V3OFt-htIuFSomx4Imor1OY2aKjMWDh2JMawrlNzIKLeE22fLnIZ7rfjCdwO5l6XGNwAJuEP0tp9wCFROenbnQ7PP2zA~v2hbhp6kKvP0nLOBspVb2J7c6wVWT4jFPelnt~HinclvkD-cDG3Hik9mmWMnuxR0ycOLYt7oA0Jhqc~WQVjyGgigtO5vJlYBEqoEnyQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1697414400&Signature=BdPiGe9KFXWyHLx3~XA0fjWfyRAwxGvsW2y9NUA4NgMp4HZmHZI4S-9WvVoAJ~cZXYeOMGyLdMzwHrk~Z9F48sI4VgH0QEt2PaL00FktBoUDpTS8joVzxBUNhsuEmlXxDeXmXafyM~k79InzLnJ~BxZ7vNWBalgnN428z~pUXjjjA~tnegNAqXeSz4pxSQi2XxkGVQUj-tcnsjyORmZJpWGZL6OlLzuP4wYqOUbEdrrL9PMJ7ZGxUIKq-BM3GRcb8A3QZ7k3X1cBkxfYYn1tfOEYUFR32-qIS6ev~jJz9io2zVcZijbfL-OrX17UzXUpdL7orZlAdu8JEOOAAWD6cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1697414400&Signature=BdPiGe9KFXWyHLx3~XA0fjWfyRAwxGvsW2y9NUA4NgMp4HZmHZI4S-9WvVoAJ~cZXYeOMGyLdMzwHrk~Z9F48sI4VgH0QEt2PaL00FktBoUDpTS8joVzxBUNhsuEmlXxDeXmXafyM~k79InzLnJ~BxZ7vNWBalgnN428z~pUXjjjA~tnegNAqXeSz4pxSQi2XxkGVQUj-tcnsjyORmZJpWGZL6OlLzuP4wYqOUbEdrrL9PMJ7ZGxUIKq-BM3GRcb8A3QZ7k3X1cBkxfYYn1tfOEYUFR32-qIS6ev~jJz9io2zVcZijbfL-OrX17UzXUpdL7orZlAdu8JEOOAAWD6cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container
