import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import SideBar from "./components/sideBar";
import Home from "./components/home";
import RepositoryInfo from "./components/repositoryInfo";
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="row justify-content-start">
          <div class="col-md-3 no-float navbar"><SideBar /></div>
          <div class="col-md-9 no-float">
            <Switch>
              <Route exact
                path="/" key="home"
                component={Home}/>
              <Route exact
                path="/repo/:repositoryName" key="repoInfo"
                component={RepositoryInfo}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
