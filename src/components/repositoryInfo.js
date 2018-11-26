import React, { Fragment } from "react";
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
  openProjectPage = (pageUrl) => {
    window.location.assign(pageUrl);
  }
  renderRepositoryDetails = () => {
    return(
      <Fragment>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 class="h2">{ this.props.selectedRepository.name }</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button 
                onClick={() => this.openProjectPage(this.props.selectedRepository.html_url)}
                class="btn btn-sm btn-outline-secondary"
              >Show on GitHub</button>
            </div>
          </div>
        </div>
        {this.props.selectedRepository.description}
        <div class="row">
          <div class="col-2 col-sm">
            <span class="badge badge-secondary">
              <i class="fas fa-code"></i>
              Language: {this.props.selectedRepository.language}
            </span>
          </div>
          <div class="col-2 col-sm">
            <span class="badge badge-secondary">
              <i class="far fa-eye watchers-icon"></i>
              Watchers: {this.props.selectedRepository.watchers_count}
            </span>
          </div>
          <div class="col-2 col-sm">
            <span class="badge badge-secondary">
              <i class="fas fa-exclamation-triangle"></i>
              Open Issues: {this.props.selectedRepository.open_issues}
            </span>
          </div>
          <div class="col-2 col-sm">
            <span class="badge badge-secondary">
              <i class="fas fa-code-branch"></i>
              Forks: {this.props.selectedRepository.forks_count}
            </span>
          </div>
        </div>
        
        <h3 class="border-bottom">Contributors</h3>

      </Fragment>
    );
  }
  renderDefaultPage = () => {
    return(
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2">Select a repository</h1>
        
      </div>
    );
  }
  render(){
    if (this.props.selectedRepository){
      return this.renderRepositoryDetails();
    } else {
      return this.renderDefaultPage();
    }
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