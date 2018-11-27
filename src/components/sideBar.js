import React from "react";
import { connect } from "react-redux";
import { getRepositoryList } from "../actions/repoActions";
import RepositoryListItem from "./repositoryListItem";

class SideBar extends React.Component {
  componentDidMount = () => {
    this.props.getRepositoryList();
  }
  renderRepositories = (repositories) => {
    return repositories.map((item, key) => {
      return (
        <RepositoryListItem 
          name={item.name} 
          watchers_count={item.watchers_count} 
          id={item.id}
        />
      );
    });
  }
  render(){
    return (
      <ul className="nav flex-column">
        { this.renderRepositories(this.props.repositories) }
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Plan list with respective family members
    repositories : state.repositories.repositoriesList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRepositoryList: () => dispatch(getRepositoryList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);