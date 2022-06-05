import React from 'react';
import './css/App.css';
import './css/styles.css';
import {Routes, Route} from 'react-router-dom';

import NotFound from './Pages/notFoundPage';
import HomePage from './Pages/homePage';
import AboutPage from './Pages/aboutPage';
import LoginPage from './Pages/loginPage';
import ServicesPage from './Pages/servicesPage';
import SignupPage from './Pages/signupPage';
import UserPage from './Pages/userPage';
import UserSettings from './Pages/userSettings';
import UserHistory from './Pages/userHistory';
import ValidationPage from './Pages/validationPage';
import CompanyPage from './Pages/companyPage';
import CompanyContracts from './Pages/companyContracts';
import CompanySettings from './Pages/companySettings';
import LoginCompany from './Pages/loginCompanyPage';
import SignUpCompany from './Pages/signupCompanyContract';

import { PrivateRoute } from './Components/privateRoot';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/services' element={<ServicesPage/>}></Route>

        <Route path='/validation' element={<ValidationPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/loginCompany' element={<LoginCompany/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/signupCompany' element={<SignUpCompany/>}></Route>


        <Route path='/homeUser' element={<PrivateRoute><UserPage/></PrivateRoute>}></Route>
        <Route path='/userSettings' element={<PrivateRoute><UserSettings/></PrivateRoute>}></Route>
        <Route path='/userHistory' element={<PrivateRoute><UserHistory/></PrivateRoute>}></Route>

        <Route path='/homeCompany' element={<PrivateRoute><CompanyPage/></PrivateRoute>}></Route>
        <Route path='/companySettings' element={<PrivateRoute><CompanySettings/></PrivateRoute>}></Route>
        <Route path='/companyContracts' element={<PrivateRoute><CompanyContracts/></PrivateRoute>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
