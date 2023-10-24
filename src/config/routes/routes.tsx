import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Create, Editor, Home } from '../../pages';
import { Navbar } from '../../components/';


const AppLayout = () => {
  return (
    <div className="h-screen w-screen mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      // {
      //   path: '/',
      //   element: <Home />,
      // },
      {
        path: '/',
        element: <Editor />
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/editor',
        element: <Editor />
      }
    ],
  },
]);
