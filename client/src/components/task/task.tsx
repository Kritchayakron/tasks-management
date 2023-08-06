import { useState,useEffect } from 'react';
import axios from 'axios';
import Header from '../global/header/header';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import { createTask } from './FnCreateTask';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { dataLogin } from '../login/LoginSlice';
import { useParams } from 'react-router-dom';
import { domainBackend } from '../../app/config';
import { updateTask } from './FnUpdateTask';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Task() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(0);
  const [isUpdate, setIsUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(1);
  const tmpData = useAppSelector(dataLogin);
  const [duedate, setDueDate] = useState(new Date());
  if(id) {
    const url = domainBackend+'task/data/'+id;
    useEffect(()=>{
      setIsUpdate(1);
      axios.get(url,{
          headers: {
              'authtoken': tmpData['Authtoken'],
          }
      }).then(res=>{
          setTitle(res.data[0].title)
          setStatus(res.data[0].status)
          let currentDate = new Date(res.data[0].duedate); 
          setDueDate(currentDate)
        
      }).catch(function (error) {
        if(error.response.data.status == 500) {
          dispatch(update({id:null,Authtoken:null}))
          localStorage.setItem('authid',null);
          localStorage.setItem('authtoken', null);
          window.location.replace('/login');
        }
      })
    },[]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isUpdate) {
      const response = await updateTask({
        title,
        status,
        duedate
      },tmpData['Authtoken'],id);
      if(response.status == 1) {
        swal("Success", response.message, "success").then(function() {
          window.location.replace('/');
        });
      }
    } else {
      //console.log(dueDate);
      const response = await createTask({
        title,
        status,
        duedate
      },tmpData['Authtoken']);
      if(response.status == 1) {
        swal("Success", response.message, "success").then(function() {
          window.location.replace('/');
        });
      }
    }
  };

  useEffect(()=> {
   
    if(!tmpData['Authtoken']){
      window.location.replace('/login');
    } else {
      setIsLoading(0);
    }
  });

  return (
   <div style={{ display:  isLoading ? 'none': '' }}>
      <Header />
      <Container>
        <h1> Create Task</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
                    id="title"
                    name="Tile"
                    required
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Status </Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setStatus(e.target.value)} value={status == true ? 1 : 0}>
            <option>--- SELECT --- </option>
            <option value="1" >completed </option>
            <option value="0">incomplete </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label> Due Date </Form.Label>
          <div>
            <DatePicker className="form-control"  selected={duedate} onChange={(date) => setDueDate(date)} />
          </div>
        </Form.Group>  

        <Form.Group className="mb-3" >
            <Button type="submit">Save</Button>
        </Form.Group>
      </Form>
    </Container>
   </div>
  );
}

export default Task;