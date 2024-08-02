
import Navbar from './Navbar'
import CardPostUser from './CardPostUser'
import CardPost from './CardPost'

import PlusIcone from './icon/PlusIcone'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home({ users, auth, logOut , setPost }) {
  const location = useLocation();
  const { state } = location;
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error('Error fetching posts:', error));

  },[state , auth])

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };


  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  console.log(users);
  return (
    <div className='bg-slate-200'>
      <Navbar logOut={logOut} state={state} />
      <div className='flex flex-col items-center relative'>
        {posts.map((post, index) => (
          state ? post.userID == state.id && auth ?
            <CardPostUser
              key={index}
              imageUrl={post.imageUrl}
              altText={post.altText}
              title={post.title}
              description={post.description}
              author={users[post.userID]}
              onDelete={() => handleDeletePost(post.id)}
              onEdit={() => setPost(post.id)}
            /> : <CardPost
              key={index}
              imageUrl={post.imageUrl}
              altText={post.altText}
              title={post.title}
              description={post.description}
              author={users[post.userID]}
            />
            : <CardPost
              key={index}
              imageUrl={post.imageUrl}
              altText={post.altText}
              title={post.title}
              description={post.description}
              author={users[post.userID]}
            />
        ))}
      </div>
      { state && auth ? <div>
        <Link to='/addpost' className="btn btn-square fixed  bottom-4 right-4">
          <PlusIcone />
        </Link>
      </div> : null}
    </div>
  )
}
