import React from 'react';
import Admin from './admin';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './views/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
