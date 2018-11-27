import React, { Fragment } from "react";
import { connect } from "react-redux";
import { loadMoreContributors } from "../actions/repoActions";

class Contributors extends React.Component {
  renderContributors = () => {
    return this.props.contributors.map((item, key) => {
      return (
        <div class="card" key={key}>
          <img class="card-img-top" src={item.avatar_url} alt={item.login} />
          <div class="card-body">
            <h5 class="card-title">{item.login}</h5>
            <button 
                onClick={() => window.location.assign(item.html_url)}
                class="btn btn-sm btn-outline-secondary"
              >Show on GitHub</button>
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
        <h3 class="border-bottom">Contributors</h3>
        <div class="card-columns">
          {this.renderContributors()}
        </div>
        { this.props.hasMoreResults && <button type="button" onClick={() => this.loadMore()} class="btn btn-secondary">Load more</button>}
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