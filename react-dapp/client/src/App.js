import React from 'react';
import './App.css';
import './Assets/styles.css';
import {Routes, Route} from 'react-router-dom';

import NotFound from './Pages/notFoundPage';
import HomePage from './Pages/homePage';
import AboutPage from './Pages/aboutPage';
import LoginPage from './Pages/loginPage';
import ContactPage from './Pages/contactPage';
import SignDocsPage from './Pages/signDocsPage';
import ServicesPage from './Pages/servicesPage';
import SignupPage from './Pages/signupPage';
import UserPage from './Pages/userPage';
import NotImplemented from './Pages/notImplementedPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/contact' element={<ContactPage/>}></Route>
        <Route path='/signDocs' element={<SignDocsPage/>}></Route>
        <Route path='/services' element={<ServicesPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/homeuser' element={<UserPage/>}></Route>
        <Route path='/settings' element={<NotImplemented/>}></Route>
        <Route path='/mycontracts' element={<NotImplemented/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
