import React from 'react'
import SignInForm from './components/SignInForm';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Prediction from './components/Prediction';

function App() {
  const router = createBrowserRouter([
    {path:"/auth",element:<><SignInForm/></>},
    {path:"/main",element:<><Prediction/></>}
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
      
    </div>
  );
}

export default App
