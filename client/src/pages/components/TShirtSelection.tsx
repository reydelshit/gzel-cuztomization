import { useNavigate } from 'react-router-dom';

// import Tshirt1 from '@/assets/t1f.png';
// import Tshirt3 from '@/assets/t3f.png';

import Tshirt8 from '@/assets/t1f.png';
import Tshirt7 from '@/assets/t2f.png';
import Tshirt1 from '@/assets/tshirts/longsleevecolored.png';
import Tshirt2 from '@/assets/tshirts/longsleevewhite.png';
import Tshirt3 from '@/assets/tshirts/polobalolet.png';
import Tshirt4 from '@/assets/tshirts/poloblack.png';
import Tshirt5 from '@/assets/tshirts/polowhite.png';
import Tshirt6 from '@/assets/tshirts/tshirtwhite.png';

const allTshirts = [
  {
    id: 1,
    name: 'Tshirt 1',
    image: Tshirt1,
  },

  {
    id: 2,
    name: 'Tshirt 2',
    image: Tshirt2,
  },

  {
    id: 3,
    name: 'Tshirt 3',
    image: Tshirt3,
  },

  {
    id: 4,
    name: 'Tshirt 4',
    image: Tshirt4,
  },

  {
    id: 5,
    name: 'Tshirt 5',
    image: Tshirt5,
  },

  {
    id: 6,
    name: 'Tshirt 6',
    image: Tshirt6,
  },

  {
    id: 7,
    name: 'Tshirt 7',
    image: Tshirt7,
  },

  {
    id: 8,
    name: 'Tshirt 8',
    image: Tshirt8,
  },
];

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
    <div className="grid grid-cols-4 h-[80%] justify-center place-content-center place-items-center">
      {allTshirts &&
        allTshirts.map((tshirt) => (
          <img
            src={tshirt.image}
            alt={tshirt.name}
            className="w-[60%] object-contain cursor-pointer"
            onClick={() => handleTShirtClick(tshirt.image)}
          />
        ))}
    </div>
  );
};

export default TShirtSelection;
