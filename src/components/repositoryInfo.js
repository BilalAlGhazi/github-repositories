import React, { Fragment } from "react";
import { connect } from "react-redux";
import { selectRepository } from "../actions/repoActions";
import Contributors from "./contributors";

class RepositoryInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectionPending: false
    }
  }
  componentDidMount = () => {
    // if the page was refreshed, this will be called before the list of repositories is ready
    // We need to select after the results are ready.
    if (this.props.repositories.length > 0){
      this.props.selectRepository(this.props.match.params.repositoryName);
    } else {
      this.setState({selectionPending: true});
    }
  }
  componentDidUpdate = (prevProps) => {
    // if the repositories are loaded and there is selection pending, execute the selection
    if (this.state.selectionPending && (this.props.repositories.length > 0)){
      this.setState({selectionPending: false});
      this.props.selectRepository(this.props.match.params.repositoryName);
    }
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
        {this.props.hasErrors && <div class="alert alert-danger" role="alert">
          An error has occurred, please refresh the page.
        </div>}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">{ this.props.selectedRepository.name }</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button 
                onClick={() => this.openProjectPage(this.props.selectedRepository.html_url)}
                className="btn btn-sm btn-outline-secondary"
              >Show on GitHub</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
						<div className="panel panel-teal panel-widget border-right">
							<div className="row no-padding"><em className="fa fa-xl fa-code color-blue"></em>
								<div className="large">{this.props.selectedRepository.language}</div>
								<div className="text-muted">Language</div>
							</div>
						</div>
					</div>
          <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
						<div className="panel panel-teal panel-widget border-right">
							<div className="row no-padding"><em className="fa fa-xl fa-eye color-blue"></em>
								<div className="large">{this.props.selectedRepository.watchers_count}</div>
								<div className="text-muted">Watchers</div>
							</div>
						</div>
					</div>
          <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
						<div className="panel panel-teal panel-widget border-right">
							<div className="row no-padding"><em className="fa fa-xl fa-exclamation-triangle color-blue"></em>
								<div className="large">{this.props.selectedRepository.open_issues}</div>
								<div className="text-muted">Issues</div>
							</div>
						</div>
					</div>
          <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
						<div className="panel panel-widget border-right">
							<div className="row no-padding"><em className="fa fa-xl fa-code-branch color-blue"></em>
								<div className="large">{this.props.selectedRepository.forks_count}</div>
								<div className="text-muted">Forks</div>
							</div>
						</div>
					</div>
        </div>
        {this.props.selectedRepository.description}
        <Contributors name={this.props.selectedRepository.name} />
      </Fragment>
    );
  }
  renderDefaultPage = () => {
    return(
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Select a repository</h1>
        
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
    selectedRepository: state.repositories.selectedRepository,
    hasErrors: state.contributors.hasErrors || state.repositories.hasErrors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRepository: (repositoryName) => dispatch(selectRepository(repositoryName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryInfo);