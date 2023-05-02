import Link from 'next/link'

function Navbar({check}) {
  return (
    <nav className='flex justify-between py-3 px-1 sm:px-14  items-center'>
    <Link className='relative' href="/">
      <span className='titlecolor font-bold text-2xl sm:text-3xl sm:ml-0 ml-5'>Linked</span> <img className='w-6 sm:w-7 inline absolute logoimg' src="/linkedin.png" alt="" />
    </Link>
    {check==="home" &&
    <ul className='flex gap-1 sm:gap-8'>
      <li><Link href="/signup" className='customround px-6 py-3 rounded-3xl'>Join now</Link></li>
      <li><Link href="/signin" className='roundeffect text-base'>Sign in</Link></li>
    </ul>}
  </nav>
  )
}

export default Navbar