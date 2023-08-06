import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import swal from 'sweetalert';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { update ,dataLogin } from './LoginSlice';
import { loginUser } from './FnLogin';

function Login() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(1);
  const dispatch = useAppDispatch()
  const tmpData = useAppSelector(dataLogin)
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await loginUser({
      username,
      password
    });

    if ('tokenAuthen' in response) {
       localStorage.setItem('authtoken', response.tokenAuthen);
       localStorage.setItem('authid', response.payload.id);
       dispatch(update({id:response.payload.id,Authtoken:response.tokenAuthen,login:1}))
  
    } else {
      swal("Failed", response.message, "error");
    }
  };

  useEffect(()=> {

    if(tmpData['Authtoken']){
      window.location.replace('/');
    } else {
      setIsLoading(0);
    }
  });

  return (
    <Container className="login-box" style={{ display:  isLoading ? 'none': '' }}>
        <h1> Login </h1>
        <Form  onSubmit={handleSubmit}>
            <Row className="mb-12">
                
                <Form.Group as={Col} md="12">
            
                <Form.Control
                    id="username"
                    name="username"
                    required
                    type="text"
                    placeholder="Username"
                    onChange={e => setUserName(e.target.value)}
                />
            
                </Form.Group>
                <Form.Group as={Col} md="12">
            
                <Form.Control
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                />
                
                </Form.Group>
            
            </Row>
            <div className="login-box-submit">
                <Button type="submit">Sign In </Button>
                
            </div>
            <div className="login-box-register">
            <a href="/register">create a new account !</a>
            </div>
        </Form>
    </Container>
  );
}

export default Login;