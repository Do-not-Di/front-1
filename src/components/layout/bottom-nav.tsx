import { NavLink } from 'react-router';

const BottomNav = () => (
  <nav className='sticky bottom-0 bg-white border-t h-14 flex justify-around items-center'>
    <NavLink to='/' className='flex flex-col items-center text-gray-500'>
      <span className='text-2xl'>🔎</span>
      {/* <span className='text-xs'>Search</span> */}
    </NavLink>
    <NavLink
      to='/favorites'
      className='flex flex-col items-center text-gray-500'
    >
      <span className='text-2xl'>🩶</span>
      {/* <span className='text-xs'>Favorites</span> */}
    </NavLink>
    <NavLink to='/profile' className='flex flex-col items-center text-gray-500'>
      <span className='text-2xl'>👩🏻‍💻</span>
      {/* <span className='text-xs'>Profile</span> */}
    </NavLink>
  </nav>
);

export default BottomNav;
