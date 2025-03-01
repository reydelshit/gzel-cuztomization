import { useNavigate } from 'react-router-dom';

import Tshirt1 from '@/assets/t1f.png';
import Tshirt2 from '@/assets/t2f.png';
import Tshirt3 from '@/assets/t3f.png';

const TShirtSelection: React.FC = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleTShirtClick = (tshirt: string) => {
    if (userRole === 'client') {
      navigate(`/client/create-design?tshirt=${encodeURIComponent(tshirt)}`);
    } else {
      navigate(`/create-design?tshirt=${encodeURIComponent(tshirt)}`);
    }
  };

  return (
    <div className="flex gap-4 h-[40%] justify-center">
      <img
        src={Tshirt1}
        alt="tshirt1"
        className="w-[20%] object-contain cursor-pointer"
        onClick={() => handleTShirtClick(Tshirt1)}
      />
      <img
        src={Tshirt2}
        alt="tshirt2"
        className="w-[20%] object-contain cursor-pointer"
        onClick={() => handleTShirtClick(Tshirt2)}
      />
      <img
        src={Tshirt3}
        alt="tshirt3"
        className="w-[20%] object-contain cursor-pointer"
        onClick={() => handleTShirtClick(Tshirt3)}
      />
    </div>
  );
};

export default TShirtSelection;
