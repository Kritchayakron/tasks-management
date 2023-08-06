import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import swal from 'sweetalert';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { update ,dataLogin } from '../login/LoginSlice';
import { loginUser } from '../login/FnLogin';
import { RegisterAccount } from './FnRegister';
function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(1);
  const tmpData = useAppSelector(dataLogin);
 
  const dispatch = useAppDispatch()
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await RegisterAccount({
      username,
      password
    });

    if(response.status == 1) {
       
        const responseLogin = await loginUser({
            username,
            password
          });
         
          if ('tokenAuthen' in responseLogin) {
           
            localStorage.setItem('authtoken', responseLogin.tokenAuthen);
            localStorage.setItem('authid', responseLogin.payload.id);
            dispatch(update({id:responseLogin.payload.id,Authtoken:responseLogin.tokenAuthen,login:1}))
           
          } else {
            swal("Failed", response.message, "error");
          }
    } else {
      
        let Err = [];
        if (typeof response.errors != 'undefined') {
            if( response.errors.username.message){
              Err.push(response.errors.username.message)
            }
    
            if( response.errors.password.message){
              Err.push(response.errors.password.message)
            }
        } else {
          if(response.message){
            Err.push(response.message)
          }
        }
        swal("Failed", Err.join("\n"), "error");
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
        <h1> Register </h1>
        <Form onSubmit={handleSubmit}>
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
                <Button type="submit">Sign Up </Button>
                
            </div>
        </Form>
    </Container>
  );
}

export default Register;