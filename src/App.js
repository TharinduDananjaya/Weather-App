import './App.css';
import Login from './Components/Login/Login';
import WeatherApp from './Components/WeatherApp/WeatherApp';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Protected from './utils/Protected';


function App() {

  const router = createBrowserRouter([
    {path:"/", element:<Protected component={WeatherApp}/>},
    {path:"/login", element:<Login/>}
    
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
