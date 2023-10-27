import React from 'react'
import "./Articles.css";
import { useEffect, useState } from 'react';
import { db } from './Firebase_Config';
import {collection, getDocs, addDoc } from "firebase/firestore"
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import SyntaxHighlighter from 'react-syntax-highlighter';



function Articles() {

  const[code,setCode] = useState("")
  const [newDate, setNewDate] = useState(0)

  const [newDesc, setNewDesc] = useState("")
  const [setTitle, setNewTitle] = useState("")
  const [setTag, setNewTag]= useState("")
  const [date, set_NEW_Date] = useState("");
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "question")
  const createUser = async () => {
    await addDoc(usersCollectionRef, {desc: newDesc, title:setTitle, tag: setTag, date: date, code: code })
}

  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, [])
  return (
    <div className="Container">
        <h2 className='heading'> What Do You Like To Share</h2>
        <form className='form'> 
            Title <input className='input' type="text" onChange={(event)=>{
              setNewTitle(event.target.value)
            }}/>
            <div>
              <label className="Code">Code</label>
              <textarea 
                name="code"
                className="input"
                id=""
                cols="30"
                rows="10"
                onChange={(event) => setCode(event.target.value)}
              />
              {/* <SyntaxHighlighter language="javascript" style={docco}>
                {code}
              </SyntaxHighlighter> */}
            </div>
        
        
            <div className='problem'>
             DESCRIBE YOUR PROBLEM:
            </div>
            {/* <textarea name="" id="text" cols="30" rows="10"></textarea> */}
            <input type="text" id='prob' onChange={(event)=> {
        setNewDesc(event.target.value); }} />
        </form>
        <div className="tags">
          Tags
        <input className='tags_input' type="" placeholder='Please add upto 3 tags to describe your article' onChange={(event)=>{
          setNewTag(event.target.value)
        }}/>
    </div>

    <div>
    <label>Date:</label>
          <input
            type="date"
            placeholder="Enter Date"
            onChange={(event) => {
              // Update the 'tag' state as the input changes.
              set_NEW_Date(event.target.value);
            }}
            />
    </div>
    
        <button onClick={createUser} className='btn ' >Post</button>
    </div>


  );
}

export default Articles




