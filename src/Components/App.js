import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import CountryHouse from "./CountryHouse";
import Wishlists from "./Wishlists";
import MyOrders from "./MyOrders";
import Login from "./Login";
import Home from "./Home";
import { YMInitializer } from 'react-yandex-metrika';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-9896QMSVKN";
ReactGA.initialize(TRACKING_ID);

class App extends Component {
  render() {
    return (
      <div>

      <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path={"/countryhouse/:id"}  exact component={CountryHouse}/>
                        <Route path={"/myorders"}  exact component={MyOrders}/>
                        <Route path="/login" exact component={Login} />
                        <Route path="/wishlists" exact component={Wishlists} />
                        
                    </Switch>
                    <ToastContainer/>
      </BrowserRouter>


      <YMInitializer  accounts={[90594448]} options={{webvisor: true}} version="2"/>

      </div>
    );
  }

}

export default App;
