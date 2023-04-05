import { useRouter } from "next/router";
import { useState } from "react";



function EditPage({post})
{
    const router = useRouter()
    const [title,setTitle] = useState(post.title)
    const [content,setContent] = useState(post.body)

    async function sendEditedData(){
        const data = {
           "title":title,
           "body":content,
           "userId":post.userId,
           "comments":post.comments
            
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
            router.back()
            
           
        }
        catch(error)
        {
            console.error("Error:", error);
        }
    }

    function handleEdit(e)
    {
        e.preventDefault()
        sendEditedData()
    }
    return (
        <div className="wrapper">
        <div className="content">
            <div className="edit-page">
                <h1>Edit Blog</h1>
                <form onSubmit={handleEdit}>
                    <div className="form-inputs">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e)=>{
                        setTitle(e.currentTarget.value)
                    }} size="90" ></input>
                    </div>
                    <div className="form-inputs">
                    <label>Content:</label>
                    <textarea type="text" value={content} rows="8" cols="90" onChange={(e)=>{
                        setContent(e.currentTarget.value)
                    }}></textarea>
                    </div>
                    
                    
                    <div className="flex-display">
                    <input type="submit" className="button" value=" Save "></input>

                    </div>
                   
                </form>
                
            </div>
          
        </div>
        </div>
        
      );
}

export default EditPage

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