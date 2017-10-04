import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/Home/home';
import About from '../../components/About/about';
import ContactUs from '../../components/ContactUs/contactus';
import Header from '../../components/Header/header';
import { home, about, contactUs } from '../../constants/pathnames';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={home} component={Home} />
        <Route exact path={about} component={About} />
        <Route exact path={contactUs} component={ContactUs} />
        <Redirect to={home} />
      </Switch>
    </div>
  );
}

export default App;
