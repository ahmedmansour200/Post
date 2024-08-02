
import Navbar from './Navbar'
import CardPostUser from './CardPostUser'
import CardPost from './CardPost'

import PlusIcone from './icon/PlusIcone'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'

export default function Home({ users, auth, logOut , setPost , setUser , logUserID}) {
  // const location = useLocation();
  // const { state } = location;
  const [posts, setPosts] = useState([]);
  // const [userID ,setUserID] = useState(state ? state.id : null);
  const notify = () => {
    toast.error('OK Delete post'
      , {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  useEffect(()=>{
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error('Error fetching posts:', error));

  },[])



  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        notify()
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  console.log(logUserID);
  
  return (
    <div className='bg-slate-200'>
      <Navbar logOut={logOut}  logUserID={logUserID }/>
      <div className='flex flex-col items-center relative'>
        {posts.map((post, index) => (       
        post.userID == logUserID ?
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
        ))}
      </div>
      { logUserID && auth ? <div>
        <Link to='/addpost' onClick={() => {
          setUser(userID)
          } } className="btn btn-square fixed  bottom-4 right-4">

          <PlusIcone />
        </Link>
      </div> : null}
    </div>
  )
}
