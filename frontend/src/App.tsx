import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import SearchResults from './components/SearchResults';
import SearchDetails from './components/SearchDetails';
import Main_page from './ui-pages/Main_page';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Main_page />
      ),
    },
    {
      path: '/search',
      element:(
        <>
          <Searchbar/>
          <SearchResults/>
        </>
      )
    },
    {
      path: '/movie/:id',
      element: <SearchDetails />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
