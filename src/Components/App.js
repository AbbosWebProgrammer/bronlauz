import React, {Component} from 'react';
import CountryHouse from "./CountryHouse";
import Wishlists from "./Wishlists";
import MyOrders from "./MyOrders";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";

import { YMInitializer } from 'react-yandex-metrika';
import ReactGA from 'react-ga';
import { Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter} from "react-router-dom";
const TRACKING_ID = "G-9896QMSVKN";
ReactGA.initialize(TRACKING_ID);


class App extends Component {
  render() {
    return (
      <div>
            <BrowserRouter>
              <Routes>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="countryhouse/:id" element={<CountryHouse/>}/>
                <Route exact path="myorders" element={<MyOrders/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="wishlists" element={<Wishlists/>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
    

  
       <YMInitializer  accounts={[90594448]} options={{webvisor: true}} version="2"/>

      </div>
    );
  }

}

export default App;


