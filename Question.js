// import React from 'react'
// import "./Question.css"
// import { useEffect, useState } from 'react';
// import { db } from './Firebase_Config';
// import {collection, getDocs, addDoc } from "firebase/firestore"
// import {storage} from "./Firebase_Config"
// import {ref, uploadBytes} from "firebase/storage"
// import {v4} from 'uuid'


// function Question() {
//     const [imageUpload, setImageUpload]= useState(null)
//     const uploadImage=() =>{
//         if(imageUpload==null) return;
//         const ImageRef = ref(storage, `images/${imageUpload.name + v4() }`)
//         uploadBytes(ImageRef, imageUpload).then (()=> {
//             alert("image uploaded")
//         })
//     }

//     const [newTitle, setnewTitle]= useState("")
//     const [newAbstract, setNewAbs]= useState("")
//     const [Art_text, setArt_Text] = useState("")
//     const [setTags, setNewTags]= useState("")
//   const [users, setUsers] = useState([])
//   const usersCollectionRef = collection(db, "Article")
//   const createUser = async () => {
//     await addDoc(usersCollectionRef, {Title: newTitle, Abstract:newAbstract, ArticleText: Art_text, Tags: setTags })
// }
//     useEffect(()=>{
//     const getUsers = async () => {
//       const data = await getDocs(usersCollectionRef);
//       setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
//     }
//     getUsers()
//   }, [])
//   return (
//     <div className="Container">
//     <h2 className='heading'> What Do You Like To Share</h2>
//     <form className='form' method='dialog' >
//     <div className="title">
//         Title <input className='input' type="text"  placeholder='Enter a descriptive title' onChange={(event)=>{
//             setnewTitle(event.target.value)
//         }}
//         />
//     </div>
//     <div>
//       Add an Image: <input type="file" onChange={(event)=>{
//         setImageUpload(event.target.files[0])
//       }}/>
//     </div>
//     <div>
//         <button onClick={uploadImage}>Add Image</button>
//     </div>
//     <div className="abst">
//         Abstract
//         <input className='abst_input' type="" onChange={(event)=>{
//           setNewAbs(event.target.value)
//         }}/>
//     </div>
//     <div className="art">
//         Article Text
//         <input className='art_input' type="" onChange={(event)=>{
//           setArt_Text(event.target.value)
//         }}/>
//     </div>
//     <div className="tags">
//         Tags
//         <input className='tags_input' type="" placeholder='Please add upto 3 tags to describe your article' onChange={(event)=>{
//           setNewTags(event.target.value)
//         }}/>
//     </div>
//     <div>
//       <button onClick={createUser}  className='btn_1'>Post</button>
//     </div>
//     </form>
//     </div>
//   )
// }

// export default Question;



import React, { useEffect, useState } from 'react';
import { db, storage } from './Firebase_Config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './Question.css';

function Question() {
  const [imageUpload, setImageUpload] = useState(null);
  const [newTitle, setnewTitle] = useState('');
  const [newAbstract, setNewAbs] = useState('');
  const [Art_text, setArt_Text] = useState('');
  const [setTags, setNewTags] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'Article');

  const uploadImage = () => {
    if (imageUpload == null) return;

    const ImageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(ImageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const imageUrl = downloadURL;

        const articleData = {
          Title: newTitle,
          Abstract: newAbstract,
          ArticleText: Art_text,
          Tags: setTags,
          ImageUrl: imageUrl,
        };

        addDoc(usersCollectionRef, articleData)
          .then(() => {
            alert('Article and image uploaded successfully');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
    });
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Title: newTitle,
      Abstract: newAbstract,
      ArticleText: Art_text,
      Tags: setTags,
      
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="Container">
      <h2 className="heading">What Do You Like To Share</h2>
      <form className="form" method="dialog">
        <div className="title">
          Title
          <input
            className="input"
            type="text"
            placeholder="Enter a descriptive title"
            onChange={(event) => {
              setnewTitle(event.target.value);
            }}
          />
        </div>
        <div>
          Add an Image:{' '}
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>
        <div>
          <button onClick={uploadImage}>Add Image</button>
        </div>
        <div className="abst">
          Abstract
          <input
            className="abst_input"
            type="text"
            onChange={(event) => {
              setNewAbs(event.target.value);
            }}
          />
        </div>
        <div className="art">
          Article Text
          <input
            className="art_input"
            type="text"
            onChange={(event) => {
              setArt_Text(event.target.value);
            }}
          />
        </div>
        <div className="tags">
          Tags
          <input
            className="tags_input"
            type="text"
            placeholder="Please add up to 3 tags to describe your article"
            onChange={(event) => {
              setNewTags(event.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={createUser} className="btn_1">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
export default Question;