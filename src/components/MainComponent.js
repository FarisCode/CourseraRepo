import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';

import Menu from './MenuComponent';
import { Dishes } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {
  state = {
    dishes: Dishes,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
  }

  render() {
    const HomePage = () => {
      return (
        <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path='/contactus' component={Contact} />} />
              <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
