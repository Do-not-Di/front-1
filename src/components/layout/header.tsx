import { useNavigate } from 'react-router';
import prevIcon from '@/assets/prev.svg';
const Header = ({
  title,
  showBack,
}: {
  title?: string;
  showBack?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <header className='sticky top-0 z-10 bg-white h-14 flex items-center px-5'>
      {showBack && (
        <button onClick={() => navigate(-1)} className='mr-2 text-2xl z-10'>
          <img src={prevIcon} alt='prev' width={28} height={28} />
        </button>
      )}
      <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold m-0'>
        {title}
      </h1>
    </header>
  );
};

export default Header;
