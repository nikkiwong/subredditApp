import React from "react";
import "../App.css";

class GetSubreddits extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "", loading: false, data: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.compareDate = this.compareDate.bind(this);
  }

  async handleSubmit(event) {
    //on submit, api is called using input value.
    event.preventDefault();
    let isSuccessful;
    let currentPage = 1;
    try {
      const url = "https://www.reddit.com/r/" + this.state.inputValue + ".json";
      this.setState({ loading: true });
      
      const res = await fetch(url);
      if (res.status >= 400) throw new Error("something went wrong");

      const data = await res.json();
      let sortedDataDesc = data.data.children.sort(this.compareDate);
      
      this.setState({ data: data, loading: false });
      isSuccessful = true;
      this.props.subredditData(sortedDataDesc, isSuccessful, currentPage);
    } 
    catch (err) {
      console.log(err)
      this.setState({ loading: false });
      isSuccessful = false;
      this.props.subredditData([], isSuccessful, currentPage);
    }
  }

  handleChange(event) {
    //when user inputs data into the input box
    if (event.target) {
      this.setState({ inputValue: event.target.value });
    }
  }

  compareDate(a, b) {
    let comparison = 0;
    if (a.data.created_utc > b.data.created_utc) {
      comparison = 1;
    } else if (a.data.created_utc < b.data.created_utc) {
      comparison = -1;
    }
    return comparison * -1;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-style">
          <h2 className="text-primary mb-3">Enter a subreddit, and submit:</h2>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <input id="submit-btn" type="submit"></input>
        </form>
        <p className="text-primary mb-3" id="loading">
          {this.state.loading ? "Loading..." : ""}
        </p>
      </div>
    );
  }
}

export default GetSubreddits;
