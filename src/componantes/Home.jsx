
import Navbar from './Navbar'
import CardPost from './CardPostUser'
import PlusIcone from './icon/PlusIcone'

export default function Home({posts , users}) {

  return (
    <div className='bg-slate-200'>
    <Navbar />
    <div className='mx-96 relative'>
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
    <div>
    <button className="btn btn-square fixed  bottom-4 right-4">
  <PlusIcone/>
</button>
    </div>
    </div>
  )
}
