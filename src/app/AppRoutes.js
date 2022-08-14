import React, { Component,Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Profile = lazy(() => import('./profile/Profile'));

const Rates = lazy(() => import('./rates/Rates'))
const RatesForm = lazy(() => import('./rates/RatesForm'));

const Assets = lazy(() => import('./assets/Assets'))
const AssetForm = lazy(() => import('./assets/AssetForm'))

const Agents = lazy(() => import('./agents/Agents'));
const AgentForm = lazy(() => import('./agents/AgentForm'));

const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));
const ResetPassword = lazy(() => import('./user-pages/ResetPassword'))

const Reviews = lazy(() => import('./customer-reviews/reviews'));

const Request = lazy(() => import('./delivery-requests/request'));
const RequestForm = lazy(() => import('./delivery-requests/RequestForm'));

const Payment = lazy(() => import('./payments/Payment'));

const Progress = lazy(() => import('./progress/Progress'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/rates" component={Rates} />
          <PrivateRoute exact path="/create-rate" component={RatesForm} />
          <PrivateRoute exact path="/agents" component={Agents} />
          <PrivateRoute exact path="/create-agent" component={AgentForm} />
          <PrivateRoute exact path="/assets" component={Assets} />
          <PrivateRoute exact path="/add-assets" component={AssetForm} />
          <PrivateRoute exact path="/customer-reviews" component={Reviews} />
          <PrivateRoute exact path="/requests" component={Request} />
          <PrivateRoute exact path="/request-details/:id" component={RequestForm} />
          <PrivateRoute exact path="/payments" component={Payment} />
          <PrivateRoute exact path="/progress" component={Progress} />
          
          <PublicRoute exact path="/login" component={Login} restricted={true} />
          <PublicRoute exact path="/register" component={Register} restricted={true} />
          <PublicRoute exact path="/reset-password" component={ResetPassword} restricted={true} />
          
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;

// This file helps you with linking menu with the right page 