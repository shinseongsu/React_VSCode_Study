import React from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';
import HistorySample from './HistorySample';

const App = () => {

  const activeStyle = {
    background: 'black',
    color: 'white'
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/velopert" active>
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/gildong">
            gildong
          </NavLink>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path={['/about', '/info']} component={About} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/history" component={HistorySample} />
        <Route
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
