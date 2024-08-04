import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast} from 'react-toastify';
export default function AddPost({ onAdd , userID}) {

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const notify = () => {
    toast.success('Add Post'
      , {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newPost = { imageUrl, title, description , userID};
    notify();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        navigate('/')
        const createdPost = await response.json();
        onAdd(createdPost);
        setImageUrl('');
        setTitle('');
        setDescription('');
      } else {
        console.error('Error creating post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
    <div className=" bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
  <h1 className="text-2xl font-bold mb-4">Add Post</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label for="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please enter title" required />
      </div>
      <div className="mb-4">
        <label for="description" className="block text-sm text-gray-700 font-bold mb-2 ">Body</label>
        <textarea  rows={5} value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Pleas enter body' required />
      </div>
      <div className="mb-4">
        <label for="imagedUrl" className="block text-gray-700 text-sm font-bold mb-2">Imag URL</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} id="imagedUrl" placeholder='Please enter url image' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="flex items-center justify-between">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </div>
    </form>
    </div>
    </div>
  )
}
