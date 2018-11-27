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
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Repositories by facebook</a>
        </nav>

        <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 d-none d-md-block bg-light sidebar">
            <SideBar />
          </nav>
          <main role="main" className="col-md-8 ml-sm-auto col-lg-9 pt-3 px-4">
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
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">facebook Repositories on GitHub</a>
        </nav>
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-md-3">Hello</div>
            <div className="col-md-9 nofloat">
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