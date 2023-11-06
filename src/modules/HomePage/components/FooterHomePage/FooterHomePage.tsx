import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import { logo } from 'src/modules/Share/assets/image'

const FooterHomePage = () => {
  return (
    <footer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-[#010103] w-[90%] h-auto justify-center items-center text-left py-8 px-4 gap-[100px] mx-auto '>
      <ul className='list-none space-y-10'>
        <li className='flex items-center gap-4 font-normal text-[16px] leading-10 break-words font-serif'>
          <img src={logo} alt='logo-img' className='w-10 h-10' />
          ServeSync
        </li>
        <li className='text-[#8C8B92] text-[14px] font-normal leading-9 break-words'>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC.
        </li>
        <li className='flex justify-center items-center gap-8 left-0'>
          <BsFacebook className='text-[#3B5998] text-[30px] cursor-pointer' />
          <BsTwitter className='text-[#6441A5] text-[30px] cursor-pointer' />
          <BsInstagram className='text-[#E1306C] text-[30px] cursor-pointer' />
        </li>
      </ul>
      <ul className='list-none space-y-10 h-full'>
        <li className='text-[16px] font-medium'>Company</li>
        <li className='text-[14px] font-normal'>About</li>
        <li className='text-[14px] font-normal'>Career</li>
        <li className='text-[14px] font-normal'>Mobile</li>
      </ul>
      <ul className='list-none space-y-10 h-full'>
        <li className='text-[16px] font-medium'>Contact</li>
        <li className='text-[14px] font-normal'>Why ServeSync?</li>
        <li className='text-[14px] font-normal'>Partner with us</li>
        <li className='text-[14px] font-normal'>FAQs</li>
        <li className='text-[14px] font-normal'>Blog</li>
      </ul>
      <ul className='list-none space-y-10 h-full'>
        <li className='text-[16px] font-medium'>Meet Us</li>
        <li className='text-[14px] font-normal'>+00 92 1234 56789</li>
        <li className='text-[14px] font-normal'>info@travlog.com</li>
        <li className='text-[14px] font-normal'>205. R Street, New York</li>
        <li className='text-[14px] font-normal'>BD23200</li>
      </ul>
    </footer>
  )
}

export default FooterHomePage
