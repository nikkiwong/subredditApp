import React from "react";
import logo from "./media/wpe_social.png";
import "./App.css";
import GetSubreddits from "./components/GetSubreddits";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditData: [],
      currentPage: 1,
      apiSuccessful: null
    };
    this.setSubredditData = this.setSubredditData.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  setSubredditData(data, isSuccessful, reset) {
    //gets data, api return data status as well as the current page number after reset.
    this.setState({
      subredditData: data,
      apiSuccessful: isSuccessful,
      currentPage: reset
    });
  }

  paginate(pageNumber) {
    //sets the selected page number
    this.setState({
      currentPage: pageNumber
    });
  }

  render() {
    // Get posts from the selected page
    let subredditData = this.state.subredditData;
    const postsPerPage = 10;
    const indexOfLastPost = this.state.currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = subredditData.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <GetSubreddits subredditData={this.setSubredditData} />
        {this.state.apiSuccessful && this.state.subredditData.length===0 ? (
          <p id="noresults">
            No posts were found with this subreddit. Please try another
            subreddit. :)
          </p>
        ) : (this.state.apiSuccessful!=null && this.state.apiSuccessful===false) ? (
          <p id="invalidSubreddit">
            Invalid subreddit. Please try another subreddit. :)
          </p>
        ) : (
          ""
        )}
        <div className="container mt-5">
          <ul className="list-group mb-4">
            <Posts posts={currentPosts} />
          </ul>
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={subredditData.length}
          paginate={this.paginate}
        />
        <footer>&copy; Nikki Wong 2020</footer>
      </div>
    );
  }
}

export default App;
