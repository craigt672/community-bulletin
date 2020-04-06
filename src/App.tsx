import React from 'react';

import './App.css';

import PostItem from './components/PostItem/PostItem';

import { usePosts } from './api';

function App() {
  const postsData = usePosts();
  console.log(postsData);

  const upvote = (id: string) => {
    postsData.updateVote(id, 'upvote')
  }

  const downvote = (id: string) => {
    postsData.updateVote(id, 'downvote')
  }

  return (
    <div>
      <header className="header">
        <h1>Community Bulletin Board</h1>
      </header>
      <div className="container">
        {postsData.posts.map(post => (
          <PostItem 
            key={post._id}
            post={post}
            upvote={upvote}
            downvote={downvote}
          />
        ))}
        <form action="">
          <input type="text"/>
          <textarea></textarea>
        </form>
      </div>
    </div>
  );
}

export default App;
