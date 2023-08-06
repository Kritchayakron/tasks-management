import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { update ,dataLogin }  from '../../login/LoginSlice';
import { FnLogut } from '../../login/FnLogut';

function Header() {
  const dispatch = useAppDispatch()
  const tmpData = useAppSelector(dataLogin)


  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(update({id:'',Authtoken:'',logout:1}))
    window.location.replace('/login');
  };


  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Task Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Button variant="danger" onClick={handleLogout}> Logout  </Button>
          </Navbar.Text>

        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Header;