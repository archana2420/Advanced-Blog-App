function PostPage({post})
{
    return <div>
        
        <h1>PostPage</h1>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <hr></hr>
        {
            post.comments.map((eachComment)=>{
                return (
                    <div key={eachComment.id}>
                        <h5>{eachComment.user.username}</h5>
                        <p>{eachComment.body}</p>
                    </div>
                )
            })
        }
        </div>
}

export default PostPage

export async function getServerSideProps(context)
{
    const { params  } = context
    const response = await fetch(`http://localhost:4000/posts/${params.postpageid}`)
    const data = await response.json()

    return {
        props:{
            post:data,
        }
    }
}