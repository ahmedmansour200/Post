import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,  Routes } from 'react-router-dom'
import Home from './componantes/Home'
import Login from './componantes/Signup'
import AddPost from './componantes/AddPost'



function App() {

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

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  return (
    <>
  <Routes>
  <Route path="/" element={<Home
   posts={posts} users={users} />}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/addpost" element={<AddPost 
    onAdd={handleAddPost} />}></Route>
  </Routes>
    </>
      )
}

export default App
