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
      <div>
        Repository Information
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRepository: (repositoryName) => dispatch(selectRepository(repositoryName))
  };
}

export default connect(null, mapDispatchToProps)(RepositoryInfo);