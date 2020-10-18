import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}
