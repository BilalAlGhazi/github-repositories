import React from "react";
import { connect } from "react-redux";
import { selectRepository } from "../actions/repoActions";

class RepositoryInfo extends React.Component {
  componentDidMount = () => {
    this.props.selectRepository(this.props.match.params.repositoryName);
  }
  componentDidUpdate = (prevProps) => {
    // Check if the route was changed
    if (this.props.match.params.repositoryName !== prevProps.match.params.repositoryName){
      this.props.selectRepository(this.props.match.params.repositoryName);
    }
  }
  render(){
    return(
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Share</button>
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Plan list with respective family members
    repositories : state.repositories.repositoriesList,
    selectedRepository: state.repositories.selectedRepository
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRepository: (repositoryName) => dispatch(selectRepository(repositoryName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryInfo);