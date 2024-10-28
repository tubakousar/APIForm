import { Form, Input ,Button} from 'antd';
import React, { useEffect, useState } from 'react';

import {getuserdata} from "../reduxtoolkit/GetSlice";
import  {postuserdata}  from '../reduxtoolkit/PostSlice';
import { updateuserdata } from '../reduxtoolkit/UpdateSlice';
import { deleteuserdata } from '../reduxtoolkit/DeleteSlice';

// import "./login.css"
import { useDispatch ,useSelector} from 'react-redux';


function Login() {

   const[username,setUserName] =  useState("");
   const[email,setEmail] =  useState("");
   const[password,setPassword] =  useState("");
   // put => states for editing user
   const [editid , setEditid] = useState(null)
   const[editusername,setEditUserName] =  useState("");
   const[editemail,setEditEmail] =  useState("");
   const[editpassword,setEditPassword] =  useState("");

   
   const [form] = Form.useForm();
const dispatch = useDispatch()

const users  = useSelector( (state)=>state.get.users);

useEffect( ()=>{
  // getuserdata()
  

   dispatch(getuserdata())
  //   dispatch(getuserdata())... isko men islye use kya hy jb db.json men already data hy wo load ho browser pe mount ho

} ,[dispatch])

   const submithandle = ()=>{


    const newuser =  {username , email ,password}

       // Dispatch action to post login data
       dispatch(postuserdata(newuser))
         .then( ()=>{
         form.resetFields();
         setUserName('');
         setEmail('');
         setPassword('');
         dispatch(getuserdata());

      })
   
   }

   const removehandle = (id)=>{
    
    dispatch(deleteuserdata(id)).then(() => {
      dispatch(getuserdata());
   });
    

   }

// function on put means edit data based on id
const StartEditing = (user)=>{
   setEditid(user.id);
   setEditUserName(user.username);
   setEditEmail(user.email);
   setEditPassword(user.password);


}

const handleEditFormSubmit =()=>{
   const update = {username:editusername , email:editemail , password:editpassword };
   dispatch(updateuserdata({id:editid,update})).then( ()=>{
      setEditid(null);
      setEditUserName('');
      setEditEmail('');
      setEditPassword('');
      dispatch(getuserdata());

   })

}
   


  return (
    <div>
      <Form form = {form} className='form' onFinish={submithandle}>
        <Form.Item label ='UserName' name='username'>

            <Input type='text' name='username' value={username} onChange={(e)=>setUserName(e.target.value)} placeholder='Enter name' required/>       
         </Form.Item>

         <Form.Item label ='Email' name='email'>
            <Input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder='Enter email' required/>       
         </Form.Item>

         <Form.Item label ='Password' name='password'>
            <Input.Password name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter password' required/>       
         </Form.Item>
         <Button  className='btn' type='primary' htmlType ='submit'>Submit</Button>
      </Form>

      <h4>Users List</h4>

      {users.map( (list)=>(
        <div key={list.id}>
            <p>{list.username}</p>
            <p>{list.email}</p>
            <p>{list.password}</p>
            <button type='button' onClick={()=>removehandle(list.id)}>remove</button>
            <button type='button' onClick={()=>StartEditing(list)} >Edit </button>
            

        </div>
      ))}
      
      {editid && (
         
         <Form onFinish={handleEditFormSubmit}>
            <Form.Item label='UserName' name="editusername">
               <Input value={editusername} onChange={(e)=>setEditUserName(e.target.value)} placeholder='User Name' required/>

            </Form.Item>

            <Form.Item label='Email' name="editemail">
               <Input value={editemail} onChange={(e)=>setEditEmail(e.target.value)} placeholder='Email' required/>

            </Form.Item>

            <Form.Item label='Password' name="editpassword">
               <Input.Password value={editpassword} onChange={(e)=>setEditPassword(e.target.value)} placeholder='password' required/>

            </Form.Item>
            <button type='submit'>Update user</button>
         </Form>
         
      )}
      
    </div>
  );
}

export default Login;
