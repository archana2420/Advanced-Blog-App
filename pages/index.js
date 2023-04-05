import Home from "@/components/Home"
import Pagination from "@/components/Pagination"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"


function HomePage({posts})
{
    
    const [currentPage,setCurrentPage] = useState(1)
    const pageSize = 2

    const onPageChange = (page)=>{
        setCurrentPage(page)
    }
    const startIndex = (currentPage- 1) * pageSize;
    const slicedPosts = posts.slice(startIndex,startIndex+pageSize)
   
    return <div className="wrapper">
        <div className="content">
        <h1>List of Blogs</h1>
       
        {
            slicedPosts.map((post)=>{
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
       <Pagination 
            items = {posts.length}
            currentPage = {currentPage}
            pageSize = {pageSize}
            onPageChange = {onPageChange}
       ></Pagination>
        </div>
        
        
        </div>
}

export default HomePage

export async function getServerSideProps(context)
{
  
    const response = await fetch('http://localhost:4000/posts')
    const data = await response.json()

    return {
        props:{
            posts:data,
        }
    }
}