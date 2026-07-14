import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); 
  const [edited, setEdited] = useState(null)

  function fetchPosts() {
   try {
     axios.get("https://jsonplaceholder.typicode.com/posts").then((raw) => {
      setAllPosts(raw.data);
    });
   } catch (error) {
      console.log(error)
   }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault()
try {
  if(edited){
    axios.patch("https://jsonplaceholder.typicode.com/posts/"+edited,{
      title,
      body:desc
    })
    .then((raw)=>{
      console.log(raw.data)
    })
  }else{
  axios.post("https://jsonplaceholder.typicode.com/posts",{
      title:title,
      body:desc
    }).then((raw)=>{
      console.log(raw.data)
      fetchPosts()
      setTitle("")
      setDesc("")
    })
  }
} catch (error) {
    console.log(error)
}

  }

  const handleDelete=(postId)=>{
  try {
      axios.delete("https://jsonplaceholder.typicode.com/posts/"+postId)
    .then((raw)=>{
      console.log(raw.data)
      fetchPosts()
    })
  } catch (error) {
    console.log(error)
  }
  }

  const handleEdit=(post)=>{
      setEdited(post.id)
      setTitle(post.title)
      setDesc(post.body)
  }

  const perticularPost=(postId)=>{
    try {
      axios.get("https://jsonplaceholder.typicode.com/posts/"+postId)
    .then((raw)=>{
      console.log(raw.data)
    })
    } catch (error) {
        console.log(error)
    }
  }

 


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        className="text-xl px-4 border rounded-xl mr-7 ml-15"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="enter title"
          name="title"
        />
        <input
        className="text-xl px-4 border rounded-xl mr-7"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder="enter title"
          name="title"
        />

        <button className="text-2xl cursor-pointer bg-green-600 p-2 rounded-xl">
          {edited ? "Update" : "Create"}
        </button>

      </form>

      {allPosts.map((post) => {
        return (
          <div onClick={()=>{
            perticularPost(post.id)
          }} key={post.id} className="p-5">
            <div className="bg-gray-600 relative w-full h-63 rounded-xl p-4">
              <h1 className="text-3xl">{post.title}</h1>
              <h2 className="text-xl">{post.body}</h2>
              <div className="flex gap-5 absolute bottom-10">
                <button 
                onClick={()=>{
                  handleEdit(post)
                }}
                className="text-2xl bg-green-700 p-3 rounded-2xl">Update</button>
                <button onClick={()=>{
                  handleDelete(post.id)
                }} className="text-2xl bg-red-700 p-3 rounded-2xl">Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
