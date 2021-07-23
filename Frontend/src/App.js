import './App.css';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Kibana from './components/Kibana';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/kibana" component={Kibana} />
      </div>
    </BrowserRouter>
  );
}

export default App;

/*
kibana.GridRocket.ml -> ngnix -> add an extra header with auth cookie -> Send it to the link

Server {
  $add_header authorization: basic base64(cookie)
  $proxy_pass https://i-o-optimized-deployment-f3036f.kb.us-west1.gcp.cloud.es.io:9243/app/home
}

*/