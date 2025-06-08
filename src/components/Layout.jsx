// components/Layout.jsx
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
   <div className='lg:flex sm:grid bg-slate-900 w-full'>
      <SideBar />
      <div className="flex p-6 w-full min-h-screen">
        <Outlet /> {/* where Dashboard or Calendar will render */}
      </div>
    </div>
  );
};

export default Layout;