import { useRouter } from "next/router"
import { useState } from "react"

function CreatePostPage()
{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const router = useRouter()

    let regex = /^[a-zA-Z]+[0-9a-zA-Z !\.'?",]*$/

    
    const sendData = async()=>
    {
        
        const data = {
            'title':title,
            'body':content,
            'comments':[]
        }
        try {
            const response = await fetch(
                'http://localhost:4000/posts',
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                }
            )
            const result = response.json()
            console.log("Sucess",result)
            router.back()
        }
        catch(error)
        {
            console.error("Error:", error);
        }
       
    }
    function handleForm(e)
    {
        e.preventDefault()
        if(regex.test(title.trim()) && regex.test(content.trim())  )
        {
            sendData()
        }
        else{
            alert('Check the title and content')
            
        }
        
        
       
    }
    return (
        <div className="wrapper">
            <div className="content">
                <div className="edit-page">
                <h1>CreatePostPage</h1>
        <form onSubmit={handleForm}>
            <div className="form-inputs">
            <label >Title:</label>
            <input type="text" placeholder="Enter Title" name="title" onChange={(e)=>{
                setTitle(e.currentTarget.value)
            }}size="90" required></input>
            </div>
            <div className="form-inputs">
            <label >Content:</label>
            <textarea placeholder="Enter Content" name="content" onChange={(e)=>{
                setContent(e.currentTarget.value)
            }} rows="8" cols="90" required></textarea>
            </div>
            {/* <div className="form-inputs">
                    <label for="img">Select image:</label>
                    <input type="file" id="img" name="img" accept="image/*"></input>
            </div> */}
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

export default CreatePostPage