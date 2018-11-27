import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
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
          key={key}
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
    console.log("Has more: ", this.props.hasMoreResults);
    return (
      <div className="sidebar-sticky" ref={(ref) => this.scrollParentRef = ref} id="scrollDiv">
        <ul className="nav flex-column">
          <InfiniteScroll
            next={this.loadMore}
            hasMore={this.props.hasMoreResults}
            loader={<div>Loading ...</div>}
            useWindow={false}
            scrollableTarget="scrollDiv"
            dataLength={this.props.repositories.length}
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