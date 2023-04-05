import Link from "next/link"



function Home({post})
{
    
    return (
        <div className="each-post" >
            
        <div key={post.id}>
                    <Link href={`/${post.id}`}>
        
                    <h2>{post.title}</h2>
                    <p className="post-content">{post.body}</p>
                    </Link>
                    
                </div>
            
        
        

        </div>
    )
}

export default Home