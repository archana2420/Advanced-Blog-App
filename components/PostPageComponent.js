import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Pagination from "./Pagination"



function PostPageComponent({post})
{
    const router = useRouter()

    const [commentUser,setCommentUser] = useState('')
    const [commentContent,setCommentContent] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const pageSize = 2
    
    let regex = /^[a-zA-Z]+[0-9a-zA-Z !\.'?",]*$/
    
    
    
    const sendData = async()=>
    {
        const totalComments = post.comments.length
        console.log(totalComments)
        const data = {
            ...post,
            comments :[...post.comments,
                {
                "id":totalComments+1,
                'body':commentContent,
                'postId': post.id,
                'user':{
                    "username":commentUser
                }  
            }]
            
        }
        try {
            const response = await fetch(
                `http://localhost:4000/posts/${post.id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                }
            )
            const result = await response.json()
            console.log("Sucess",result)
            router.reload()
            
           
        }
        catch(error)
        {
            console.error("Error:", error);
        }
       
    }
    
    const handleForm = (e)=>
    {
        e.preventDefault()
        if(regex.test(commentUser.trim()) && regex.test(commentContent.trim())  )
        {
            sendData()
        }
        else{
            alert('Check username and comment')
            
        }
       
        
        
        
        
    }
     async function handleDelete()
    {
        try{
            await fetch(`http://localhost:4000/posts/${post.id}`,{method:"DELETE"}).then(()=>{
                console.log("Deleted successfully")
            })
            router.back()
            

        }
        catch(error)
        {
            console.error("Error",error)
        }
    }

    function onPageChange(page)
    {
        setCurrentPage(page)
    }
    
    const startIndex = (currentPage-1)*pageSize
    const slicedComments = post.comments.slice(startIndex,startIndex+pageSize)

    
    return (
        
        <div className="content-individual">
        <div className="btn-section">

        <button className="button"  >
            <Link href={`/${post.id}/edit-page`}>
            Edit
            </Link>
        </button>
        
        <button className="button" onClick={handleDelete}>Delete</button>
        
        </div>
       
        <div className="post-page">
        
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <hr></hr>
        <p>Comments:</p>
        {
            slicedComments.map((eachComment)=>{
                return (
                    <div key={eachComment.id} className="comments">
                        <h5 >{eachComment.user.username}</h5>
                        <p >{eachComment.body}</p>
                    </div>
                )
            })
        }
        <Pagination
            items={post.comments.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
        >

        </Pagination>
        <hr></hr>
        <div className="comment-form">
        <form onSubmit={handleForm}>
            <div>
            <label >Username: </label>
            <input type="text" placeholder="Enter Username" name="commentUser" onChange={(e)=>{
                setCommentUser(e.currentTarget.value)
            }} required></input>
            </div>
            <div className="comment-form-textarea">
            <label >Comment: </label>
            <textarea placeholder="Enter Comment" name="commentContent" onChange={(e)=>{
                setCommentContent(e.currentTarget.value)
            }} rows="3" cols="20" required></textarea>
            </div>
            <div>
                <div className="flex-display">
                <input type="submit" className="button"></input>

                </div>

            </div>
        </form>
        </div>
        
        </div>
        
        
        </div>
       
        
    
    )
}

export default PostPageComponent