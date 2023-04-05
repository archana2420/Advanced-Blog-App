import Home from "@/components/Home"
import Link from "next/link"


function HomePage({posts})
{
    
    

    
   
    return <div className="wrapper">
        <div className="content">
        <h1>List of Blogs</h1>
       
        {
            posts.map((post)=>{
                return <Home post={post}></Home>
            })
        }
        <div className="flex-display">
        <Link href="/create-post-page">
        <button className="button">
            Create Blog
        </button>
        </Link>
        </div>
        
        </div>
        
        
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