import { useNavigate } from 'react-router';

const Header = ({
  title,
  showBack,
}: {
  title?: string;
  showBack?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <header className='sticky top-0 z-10 bg-white shadow-sm h-14 flex items-center px-4'>
      {showBack && (
        <button onClick={() => navigate(-1)} className='mr-2 text-2xl'>
          ←
        </button>
      )}
      <h1 className='text-lg font-bold flex-1 text-center'>{title}</h1>
      {/*  아이콘 등 추가 가능 */}
    </header>
  );
};

export default Header;
