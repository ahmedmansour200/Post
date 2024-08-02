import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,  Routes } from 'react-router-dom'
import Home from './componantes/Home'
import Login from './componantes/Login'
import AddPost from './componantes/AddPost'
import Regaster from './componantes/Regaster'
import EditPost from './componantes/EditPost'
import { ToastContainer } from 'react-toastify'



function App() {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [auth , setAuth] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
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
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUsers(usersMap);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  function logOut(){
    setAuth(false);
  }
  console.log(users);
  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    setEditingPostId(null);
  };
  console.log(editingPostId);
  return (
    <>
  <ToastContainer />
  <Routes>
  <Route path="/" element={<Home logOut={logOut} setPost={setEditingPostId}
   posts={posts} users={users} auth={auth} />}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path='/regaster' element={<Regaster/>}/>
    <Route path='/edit' element={<EditPost 
     postId={editingPostId} onUpdate={handleUpdatePost}/>}/>
    <Route path="/addpost" element={<AddPost 
    onAdd={handleAddPost} />}></Route>
  </Routes>
    </>
      )
}

export default App
