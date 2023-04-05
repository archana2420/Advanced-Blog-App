import PostPageComponent from "@/components/PostPageComponent"
import { useRouter } from "next/router"


function PostPage({post})
{

    return <div className="wrapper">
        
        <PostPageComponent post={post} ></PostPageComponent>
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