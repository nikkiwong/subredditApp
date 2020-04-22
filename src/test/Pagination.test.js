import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../components/Pagination';


describe('Pagination Component', ()=>{
    let wrapper;
    let postsPerPage = 10;
    let totalPosts = 30;
    let paginate = jest.fn()

    beforeEach(()=>{
      wrapper = mount(<Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate}/>)
    })
    test('render a nav element for displaying page numbers"', () => {
      expect(wrapper.find("nav").length).toEqual(1);
    });
  })
  