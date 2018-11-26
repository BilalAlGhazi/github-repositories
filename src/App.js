import React, { Component } from 'react';
import SideBar from "./components/sideBar";
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-3 no-float navbar"><SideBar /></div>
          <div class="col-md-9 no-float">Content</div>
        </div>
      </div>
    );
  }
}

export default App;
