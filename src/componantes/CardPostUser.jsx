import React from 'react'
import EditIcon from './icon/EditIcon'
import DeleteIcon from './icon/DeleteIcon'

export default function CardPost({ imageUrl, altText, title, description, author }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl my-5  max-w-[600px]">
  <figure className='max-h-[400px] max-w-[200px]'>
    <img
      src={imageUrl}  alt={altText} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title} </h2>
    <p className='card-actions'>{description}</p>
      <p className='card-normal'>{author}</p>
   <div className='flex justify-end'>
    <DeleteIcon/>
    <EditIcon />
  </div>
  </div>
</div>
  )
}
