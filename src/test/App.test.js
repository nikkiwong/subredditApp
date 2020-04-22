import React from 'react';
import App from '../App';
import { mount } from 'enzyme';
import GetSubreddit from '../components/GetSubreddits';
import Pagination from '../components/Pagination';
import Posts from "../components/Posts";

describe('App Component', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(<App />)
  })
  test('render GetSubreddit Component', () => {
    expect(wrapper.containsMatchingElement(<GetSubreddit />)).toEqual(true);
  });

  test('render Pots Component', () => {
    expect(wrapper.containsMatchingElement(<Posts />)).toEqual(true);
  });

  test('render Pagination Component', () => {
    expect(wrapper.containsMatchingElement(<Pagination />)).toEqual(true);
  });

  test('get page number from Pagination Component and send correct data to Posts Component', () => {
    const postsPerPage = 10; 
    const indexOfLastPost = wrapper.state("currentPage") * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = wrapper.state("subredditData").slice(indexOfFirstPost, indexOfLastPost);

    wrapper.instance().paginate("5");
    wrapper.update(); 
    let posts = wrapper.find(Posts);
    expect(posts.props().posts).toEqual(currentPosts); 
  });

  test('when a new search is made', () => {
    const event = { preventDefault: () => {}, target: { value: "reactjs" }  };
    wrapper.setState({ currentPage: 3 });
    const didSubmit = wrapper.find("GetSubreddits").instance().handleSubmit(event)
    didSubmit.then(()=>{
      wrapper.update();
      expect(wrapper.state("currentPage")).toBe(1);
    });
  });

  test('when api call has been unsuccesful', () => {
    const event = { preventDefault: () => {}, target: { value: "kolklk" }  };
    wrapper.setState({ apiSuccessful: true });
    const didSubmit = wrapper.find("GetSubreddits").instance().handleSubmit(event)
    didSubmit.then(()=>{
      wrapper.update();
      expect(wrapper.state("apiSuccessful")).toBe(false);
      expect(wrapper.find("#invalidSubreddit").text()).toBe("Invalid subreddit. Please try another subreddit. :) ");
    });
  });

  test('when api call has been succesful but no results', () => {
    const event = { preventDefault: () => {}, target: { value: "rear" }  };
    wrapper.setState({ apiSuccessful: false });
    const didSubmit = wrapper.find("GetSubreddits").instance().handleSubmit(event)
    didSubmit.then(()=>{
      wrapper.update();
      expect(wrapper.state("apiSuccessful")).toBe(true);
      expect(wrapper.state("subredditData")).toBe([]);
      expect(wrapper.find("#noresults").text()).toBe("No posts were found with this subreddit. Please try another subreddit. :) ");
    });
  });
})
