import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import SideBar from "./components/sideBar";
import Home from "./components/home";
import RepositoryInfo from "./components/repositoryInfo";
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Repositories by facebook</a>
        </nav>

        <div class="container-fluid">
        <div class="row">
          <nav class="col-md-3 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <SideBar />
            </div>
          </nav>
          <main role="main" class="col-md-8 ml-sm-auto col-lg-9 pt-3 px-4">
          <Switch>
              <Route exact
                path="/" key="home"
                component={Home}/>
              <Route exact
                path="/repo/:repositoryName" key="repoInfo"
                component={RepositoryInfo}/>
            </Switch>
          </main>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default App;



{/* <Fragment>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">facebook Repositories on GitHub</a>
        </nav>
        <div class="container">
          <div class="row justify-content-start">
            <div class="col-md-3">Hello</div>
            <div class="col-md-9 nofloat">
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
      </Fragment> */}