
import Navbar from './Navbar'
import CardPost from './CardPost'

export default function Home({posts , users}) {

  return (
    <div className='bg-slate-200'>
    <Navbar />
    <div className='mx-96'>
    {posts.map((post, index) => (
        <CardPost
          key={index}
          imageUrl={post.imageUrl}
          altText={post.altText}
          title={post.title}
          description={post.description}
          author={users[post.userID]}
        />
      ))}
    </div>
    </div>
  )
}
