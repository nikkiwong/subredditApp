import React from 'react';
import { mount } from 'enzyme';
import Posts from '../components/Posts';

describe('Posts Component', ()=>{
    let wrapper;
    let currentPosts = [{
          "data": {
            "title": "Beginner's Thread / Easy Questions (April 2020)",
            "id": "g44scy",
            "url": "https://youtu.be/mBU_qu9r1AQ",
            "created_utc": 1587288067.0,
          }
        },
        {
          "data": {
            "title": "I've recently finished my first react project, a MERN stack restaurant finder(using google map) and multi-user recipe sharing website \"clone\".",
            "id": "g3z0pk",
            "url": "https://www.reddit.com/r/reactjs/comments/g3z0pk/ive_recently_finished_my_first_react_project_a/",
      
            "created_utc": 1587259219.0,
          }
        },
        {
          "data": {
            "title": "Testing testing",
            "id": "g3z1pk",
            "url": "https://www.reddit.com/r/reactjs/comments/g3z0pk/ive_recently_finished_my_first_react_project_a/",
      
            "created_utc": 1537259219.0,
          }
        }
        ]
      
    beforeEach(()=>{
      wrapper = mount(<Posts posts={currentPosts}/>)
    })

    test('render links on subreddit titles', () => {
        expect(wrapper.find("a").length).toEqual(currentPosts.length);
    });

  })