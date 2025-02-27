import App from '@/App';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminRoot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoginMallengke = localStorage.getItem('isLoginMallengke');
  // const isLoginMallengke = true;

  useEffect(() => {
    if (!isLoginMallengke) {
      navigate('/login');
    }
  }, [isLoginMallengke, navigate]);

  return <App />;
};

export default AdminRoot;
