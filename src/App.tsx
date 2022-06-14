import React, { Fragment } from 'react';
import classes from './App.module.css';

import Header from './components/Layout/Header'
import Navbar from './components/Layout/Navbar';
import Filters from './components/Layout/Filters';
import ShopItems from './components/Shop/ShopItems';

function App() {
  return (
    <div className={classes[`main`]}>
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
