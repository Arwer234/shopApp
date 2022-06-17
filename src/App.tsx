import React, { Fragment } from 'react';
import classes from './App.module.css';
import { useSelector } from 'react-redux';

import Header from './components/Layout/Header'
import Navbar from './components/Layout/Navbar';
import Filters from './components/Layout/Filters';
import ShopItems from './components/Shop/ShopItems';
import Modal from './components/UI/Modal';

import { RootState } from './store/index';

function App() {
  const isModalShown = useSelector((state:RootState) => state.ui.isModalShown)

  return (
    <div className={classes[`main`]}>
      {isModalShown && <Modal/>}
      <Header/>
      <Navbar/>
      <main className={classes[`shop-content`]}>
        <Filters/>
        <ShopItems/>
      </main>
      <footer className={classes[`footer`]}>
        <p>© 2022 Jakub Filipowski</p>
        <p>Test data</p>
      </footer>
    </div>
  );
}

export default App;
