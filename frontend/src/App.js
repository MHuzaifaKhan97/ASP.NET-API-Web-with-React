import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { LoginProvider } from './components/LoginContext';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path='/' component={SignUp} />
            <Route path='/home' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='*' component={() => <h1>404 Not Found</h1>} />
          </Switch>
        </Router>
      </LoginProvider>
    </div>
  );
}
export default App;
