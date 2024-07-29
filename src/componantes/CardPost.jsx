import React from 'react'

export default function CardPost({ imageUrl, altText, title, description, author }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl my-5">
  <figure>
    <img
      src={imageUrl}  alt={altText} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title} </h2>
    <p className='card-actions'>{description}</p>
      <p className='card-normal'>{author}</p>
  </div>
</div>
  )
}
