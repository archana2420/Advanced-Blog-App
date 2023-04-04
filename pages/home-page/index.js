import Link from "next/link"


function HomePage({posts})
{
    return <div>
        <h1>List of Posts</h1>
        {
            posts.map((post)=>{
                return <div key={post.id}>
                    <Link href={`/home-page/${post.id}`}>
                    <h3>{post.id}</h3>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    </Link>
                    
                </div>
            })
        }
        </div>
}

export default HomePage

export async function getServerSideProps()
{
    const response = await fetch('http://localhost:4000/posts')
    const data = await response.json()

    return {
        props:{
            posts:data,
        }
    }
}