
import { authLogout } from '@store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import getWishlist from '@store/wishList/actions/getWishlist';
import { useEffect } from 'react';
import {Container, Nav, Navbar, Badge, NavDropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


import LeftBarIcons from './leftBar'
import style from './style.module.css';

const { headerContainer, headerLogo, leftBar } = style;


const Header = () => {

  const dispatch = useAppDispatch()
  const {accessToken, user} = useAppSelector(state => state.authRegisterSlice)

  useEffect(() => {
    dispatch(getWishlist("productIds"))
  }, [dispatch, accessToken])


  const onSubmit = () => {
    dispatch(authLogout())
  }

    return (<header>
        <div className={headerContainer}>
        <h1 className={headerLogo}>
            <span>E</span><Badge bg="info">Com</Badge>
            </h1>
            <div className={leftBar}>
             <LeftBarIcons />
            </div></div>
            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" role="">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/categories">Categorie</Nav.Link>
                <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
              </Nav>
              <Nav>
                {
                  !accessToken ? <><Nav.Link as={NavLink} to="/login">SignIn</Nav.Link>
                  <Nav.Link as={NavLink} to="/register">SignUp</Nav.Link></> :   <NavDropdown title={`Welcome: ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/profile" end>Profile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/profile/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="/" as={NavLink} onClick={onSubmit}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
                }
                
              
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>)
        
}

export default Header