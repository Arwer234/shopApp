import React, { Fragment } from 'react';
import classes from './App.module.css';

import Header from './components/Header'
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import ShopItems from './components/ShopItems';

function App() {
  return (
    <Fragment>
      <Header/>
      <Navbar/>
      <main className={classes.main}>
        <Filters/>
        <ShopItems/>
      </main>
      <footer className={classes[`footer`]}>
        <p>© 2022 Jakub Filipowski</p>
        <p>Test data</p>
      </footer>
    </Fragment>
  );
}

export default App;
