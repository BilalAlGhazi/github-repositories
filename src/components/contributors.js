import React, { Fragment } from "react";
import { connect } from "react-redux";
import { loadMoreContributors } from "../actions/repoActions";

class Contributors extends React.Component {
  renderContributors = () => {
    return this.props.contributors.map((item, key) => {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 contributor-card">
          <div className="card" key={key}>
            <img className="card-img-top" src={item.avatar_url} alt={item.login} />
            <div className="card-body">
              <h5 className="card-title">{item.login}</h5>
              <button 
                  onClick={() => window.location.assign(item.html_url)}
                  className="btn btn-sm btn-outline-secondary"
                >Show on GitHub</button>
              </div>
          </div>
        </div>
      )
    });
  }
  loadMore = () => {
    this.props.loadMoreContributors(this.props.nextPageUrl);
  }
  render(){
    return (
      <Fragment>
        <h3 className="border-bottom">Contributors</h3>
        <div className="row">
          {this.renderContributors()}
        </div>
        { this.props.hasMoreResults && <button type="button" onClick={() => this.loadMore()} className="btn btn-secondary">Load more</button>}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Plan list with respective family members
    contributors : state.contributors.contributorsList,
    hasMoreResults: state.contributors.hasMoreResults,
    nextPageUrl: state.contributors.nextPageUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreContributors: (nextPageUrl) => dispatch(loadMoreContributors(nextPageUrl))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contributors);