import React from 'react'

export default function CardPost({ imageUrl, altText, title, description, author }) {
  return (
<div className="card flex flex-col md:flex-row bg-base-100 shadow-xl my-5 max-w-full md:w-[600px]">
  <figure className="w-full md:w-[200px] max-h-[400px]">
    <img src={imageUrl} alt={altText} className="object-cover w-full h-full" />
  </figure>
  <div className="card-body flex flex-col justify-between p-4 w-[400px] ">
    <h2 className="card-title text-lg md:text-xl">{title}</h2>
    <p className="card-actions my-2 w-full whitespace-nowrap overflow-hidden text-wrap">{description}</p>
    <p className="card-normal mb-4">{author}</p>
  </div>
</div>
  )
}
