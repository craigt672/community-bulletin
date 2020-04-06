import React from 'react';
import styles from './PostItem.module.scss';

function PostItem({ post, upvote, downvote }: any) {
  return (
    <div className={styles.container}>
      <h4>{post.title}</h4>
      <div className={styles.cardContainer}>
        <div className={styles.voteAction}>
          <div className={styles.arrowUp} onClick={() => upvote(post._id)}></div>
          <h4>{post.votes}</h4>
          <div className={styles.arrowDown} onClick={() => downvote(post._id)}></div>
        </div>
        <div className={styles.content}>
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
