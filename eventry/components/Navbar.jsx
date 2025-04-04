import Image from 'next/image'
import Link from 'next/link'
import SingInOut from './auth/SingInOut'


const Navbar = () => {
  return (
    <nav className=''>
    <div className="container flex items-center justify-between py-4">
      <div className="nav-brand">
        <Link href="/">
          <Image 
            src="/logo.svg" 
            alt="Eventry" 
            className="h-[45px]" 
            width={135} 
            height={135} 
          />
        </Link>
      </div>

      <ul className="flex gap-4 text-[#9C9C9C]">
        <li><SingInOut /></li>
        <li>About</li>
        <li>Contact Us</li>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar