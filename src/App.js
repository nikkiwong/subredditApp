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
      apiSuccessful: true
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
        {this.state.apiSuccessful ? (
          ""
        ) : (
          <p id="noresults">
            No posts were found with this subreddit. Please try another
            subreddit. :){" "}
          </p>
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
      </div>
    );
  }
}

export default App;
