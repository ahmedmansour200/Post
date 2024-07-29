import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CardPost from './CardPost'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Fetch all posts
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    // Fetch all users
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        const usersMap = data.reduce((acc, user) => {
          acc[user.id] = user.userName;
          return acc;
        }, {});
        setUsers(usersMap);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  return (
    <div className='bg-slate-200'>
    <Navbar />
    <div className='mx-96'>
    {posts.map((post, index) => (
        <CardPost
          key={index}
          imageUrl={post.imageUrl}
          altText={post.altText}
          title={post.title}
          description={post.description}
          author={users[post.userID]}
        />
      ))}
    </div>
    </div>
  )
}
