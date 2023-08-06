import { useState,useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { update ,dataLogin } from '../login/LoginSlice';
import { Filter ,updatePosition,tasktAsync,dataTasks } from './taskSlice';
import "../../App.css"
import { BsFillPlusSquareFill,BsFillPencilFill,BsFillTrash3Fill} from "react-icons/bs";
import { domainBackend } from '../../app/config';
import { deleteTask } from './FnDelTask';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function Content() {
   const tmpData = useAppSelector(dataLogin)
   const dispatch = useAppDispatch()
   const tmpTask = useAppSelector(dataTasks)
   const [status, setStatus] = useState(1);
   const url = domainBackend+'task/data/';
   useEffect(()=>{
    dispatch(tasktAsync(tmpData['Authtoken']));
   },[]);

   const FilterStatus =  (e) => {
    e.preventDefault();
    setStatus(e.target.value)
    dispatch(Filter({status:e.target.value,Authtoken:tmpData['Authtoken']}));
    
  };
  // Function to update list on drop
   const handleDrop = async (droppedItem) => {
    
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    let updatedList = [...tmpTask.data];
    
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    
    dispatch(updatePosition({data:updatedList,Authtoken:tmpData['Authtoken']}));
    dispatch(tasktAsync(tmpData['Authtoken']));
    
  };
  return (
        <>
            <Container>
              <div className="box-new-task">
             
                <Row>
                  <Col xs={6} style={{ textAlign : 'left' }}>
                    <div className="box-filter">
                    <span className="filter-text"> Filter : </span>
                    <span className="filter-status"> 
                      <Form.Select onChange={FilterStatus} value={status}>
                        <option value="1" >completed </option>
                        <option value="0">incomplete </option>
                      </Form.Select>
                    </span>
                     </div>
                  </Col>
                  <Col xs={6}> <a href="/task/create"><BsFillPlusSquareFill /> </a></Col>
                </Row>
               
              </div>
              
              <Row className="task-title">
                  <Col md={1} xs={1}>#</Col>
                  <Col md={4} xs={4}>Title</Col>
                  <Col md={2} xs={4}>Status</Col>
                  <Col md={2} xs={2} className="d-none d-lg-block">Due Date</Col>
                  <Col md={3} xs={3}></Col>
              </Row>
              <div className="task-details">

              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <div
                      className="list-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {tmpTask.data.map((item, index) => (
                        <Draggable key={item._id} draggableId={item._id} index={index}>
                          {(provided) => (
                            <div
                              className="item-container"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <Row key={item._id} className="task-list">
                                <Col md={1} xs={1}>{(index+1)} </Col>
                                <Col md={4} xs={4}>{item.title} </Col>
                                <Col md={2} xs={4}>{item.status == 0 ? 'incomplete' : 'completed'}</Col>
                                <Col md={2} xs={2} className="d-none d-lg-block">{item.duedate.substring(0,10)}</Col>
                                <Col md={3} xs={3} style={{ textAlign:'right' }}>
                                  <Link to={`/task/edit/${item._id}`} style={{ paddingLeft : '15px', paddingRight: '15px' }}>
                                    <BsFillPencilFill />
                                  </Link> 
                                  <BsFillTrash3Fill style={{ color:'#dc3545' }} onClick={deleteTask(item._id,tmpData['Authtoken'] )}/>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              </div>
              
            </Container>
        </>
  );
}

export default Content;