import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import { logo } from 'src/modules/Share/assets/image'

const FooterHomePage = () => {
  return (
    <footer className='grid lg:grid-cols-4 max-lg:grid-cols-2 text-[#010103] w-[80%] h-auto justify-center items-center text-left py-8 md:gap-y-20 lg:gap-20 md:gap-x-40 max-md:gap-x-24 max-md:gap-y-10 mx-auto '>
      <ul className='list-none lg:space-y-10 md:space-y-6 max-md:space-y-2'>
        <li className='flex items-center gap-4'>
          <img src={logo} alt='logo-img' className='w-10 h-10' />
          <span className='font-semibold lg:text-[36px] md:text-[28px] max-md:text-[20px] font-Pacifico text-[#26C6DA]'>
            ServeSync
          </span>
        </li>
        <li className='text-[#8C8B92] lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal lg:leading-9 md:leading-7 break-words '>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC.
        </li>
        <li className='flex items-center lg:gap-8 md:gap-5 max-md:gap-2 left-0'>
          <BsFacebook className='text-[#3B5998] md:text-[30px] max-md:text-[16px] cursor-pointer' />
          <BsTwitter className='text-[#6441A5] md:text-[30px] max-md:text-[16px] cursor-pointer' />
          <BsInstagram className='text-[#E1306C] md:text-[30px] max-md:text-[16px] cursor-pointer' />
        </li>
      </ul>
      <ul className='flex-col items-start max-lg:justify-center lg:justify-start lg:mt-10 flex list-none lg:space-y-10 md:space-y-6 max-md:space-y-2 h-full '>
        <li className='lg:text-[16px] md:text-[14px] max-md:text-[12px] font-medium'>Company</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>About</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>Career</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>Mobile</li>
      </ul>
      <ul className='flex-col items-start max-lg:justify-center lg:justify-start lg:mt-10 flex list-none lg:space-y-10 md:space-y-6 max-md:space-y-2 h-full '>
        <li className='lg:text-[16px] md:text-[14px] max-md:text-[12px] font-medium'>Contact</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>Why ServeSync?</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>Partner with us</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>FAQs</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>Blog</li>
      </ul>
      <ul className='flex-col items-start max-lg:justify-center lg:justify-start lg:mt-10 flex list-none lg:space-y-10 md:space-y-6 max-md:space-y-2 h-full'>
        <li className='lg:text-[16px] md:text-[14px] max-md:text-[12px] font-medium'>Meet Us</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>+00 92 1234 56789</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>info@travlog.com</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>205. R Street, New York</li>
        <li className='lg:text-[14px] md:text-[12px] max-md:text-[10px] font-normal'>BD23200</li>
      </ul>
    </footer>
  )
}

export default FooterHomePage
