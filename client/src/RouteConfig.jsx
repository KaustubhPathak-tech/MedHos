import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";



import LandingPage from './Pages/Lading Page/LandingPage';
import UserLogin from './Pages/User/UserLogin/UserLogin';
import UserDash from './Pages/User/UserDash/UserDash';



const RouteConfig = () => {
  return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path='/user/login' element={<UserLogin />} />
                    <Route path='/user/dash' element={<UserDash />}/>
                </Routes>

        </BrowserRouter>
    )
}

export default RouteConfig
