import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { 
  getRepositoryList,
  loadMoreRepositories
} from "../actions/repoActions";
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
  loadMore = () => {
    this.props.loadMoreRepositories(this.props.nextPageUrl);
  }
  render(){
    return (
      <div className="sidebar-sticky" ref={(ref) => this.scrollParentRef = ref}>
        <ul className="nav flex-column">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.props.hasMoreResults}
            loader={<div>Loading ...</div>}
            useWindow={false}
            getScrollParent={() => {return this.scrollParentRef}}
            threshold={5}
          >
            { this.renderRepositories(this.props.repositories) }
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Plan list with respective family members
    repositories : state.repositories.repositoriesList,
    hasMoreResults: state.repositories.hasMoreResults,
    nextPageUrl: state.repositories.nextPageUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRepositoryList: () => dispatch(getRepositoryList()),
    loadMoreRepositories: (nextPageUrl) => dispatch(loadMoreRepositories(nextPageUrl))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);