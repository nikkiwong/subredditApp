import React from 'react';
import "../App.css";

const Posts = ({ posts }) => {
  return (
    <ul className='list-group mb-4'>
        {posts.map(post => {
          //date is stored as Epoch time, so convert it here to human readable format
            let createDate = new Date(post.data.created*1000).toLocaleString();
            return (
            <a href={post.data.url} key={post.data.id}>
                <li  className="list-group-item">
                    {post.data.title}
                    <span className="dateStyle">Created on: {createDate}</span>
                </li>
            </a>
        )})}
    </ul>
  );
};

export default Posts;
