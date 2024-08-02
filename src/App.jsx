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
  const [usersName, setUsersName] = useState({});
  const [users, setUsers] = useState({});
  const [auth , setAuth] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [logUserID , setLogUserID] = useState('');

  function setUser(id){
    setLogUserID(id);
  }
  useEffect(() => {

    let id = window.sessionStorage.getItem('userID');
    setLogUserID(id);
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
        setUsersName(usersMap);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  function logOut(){
    window.sessionStorage.removeItem('userID')
    location.reload();
  }
  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    setEditingPostId(null);
  };
  return (
    <>
  <ToastContainer />
  <Routes>
  <Route path="/" element={<Home  setUser={setUser} logOut={logOut} setPost={setEditingPostId}
   posts={posts} users={usersName} auth={auth} logUserID={logUserID}/>}></Route>
    <Route path="/login" element={<Login setUser={setUser} users={users}/>}></Route>
    <Route path='/register' element={<Regaster setUser={setUser}/>}/>
    <Route path='/edit' element={<EditPost 
     postId={editingPostId} onUpdate={handleUpdatePost}/>}/>
    <Route path="/addpost" element={<AddPost logUserID={logUserID}
    onAdd={handleAddPost} />}></Route>
  </Routes>
    </>
      )
}

export default App
