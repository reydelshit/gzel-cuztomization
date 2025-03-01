import App from '@/App';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRoot = () => {
  const navigate = useNavigate();
  const isLoginMallengke = localStorage.getItem('isLoginMallengke') === 'true';
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!isLoginMallengke || userRole !== 'admin') {
      navigate('/login');
    }
  }, [isLoginMallengke, userRole, navigate]);

  return isLoginMallengke && userRole === 'admin' ? <App /> : null;
};

export default AdminRoot;
