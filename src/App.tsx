import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route,Routes } from 'react-router';

import classes from './App.module.css';

import Header from './components/Layout/Header'
import Navbar from './components/Layout/Navbar';
import Modal from './components/UI/Modal';
import Login from './components/User/Login';

import { RootState } from './store/index';

import Landing from './pages/Landing';
import ProductDetails from './pages/ProductDetails';


import useFirebase from './hooks/useFirebase';



function App() {
  const isModalShown = useSelector((state:RootState) => state.ui.isModalShown)
  const {getData} = useFirebase()
  useEffect(()=>{
   // getData()
  },[])

  return (
      <div className={classes[`main`]}>
        {isModalShown && <Modal><Login/></Modal>}
        <Header/>
        <Navbar/>
        <Routes>
          <Route path = '/' element={<Landing/>}/>
          <Route path = '/product-details' element={<ProductDetails/>}/>
        </Routes>
        <footer className={classes[`footer`]}>
          <p>© 2022 Jakub Filipowski</p>
          <p>Test data</p>
        </footer>
      </div>
    
  );
}

export default App;
