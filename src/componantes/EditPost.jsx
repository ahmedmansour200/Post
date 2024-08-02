import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Bounce, toast } from 'react-toastify';

export default function EditPost({ postId,  onUpdate }) {
  const notify = () => {
    toast.success('Ok Edit Post'
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
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the current post data
    fetch(`http://localhost:3000/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
        setUserID(data.userID);

      })
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, description , imageUrl , userID};
    notify();
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
      });

      if (response.ok) {
        const updatedPostData = await response.json();
        onUpdate(updatedPostData);
        navigate('/')
      } else {
        console.error('Error updating post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

return (

<form onSubmit={handleSubmit} class="max-w-sm mx-auto mt-40">
  <div class="mb-5">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
  </div>
  <div class="mb-5">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='body' required />
  </div>
  <div class="mb-5">
    <label for="imagedUrl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imag URL</label>
    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} id="imagedUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

  )
}
