
import {Button, Form, Row, Col, Spinner} from 'react-bootstrap';

import {Heading} from '@components/common';
import {Input} from '@components/forms'
import UseRegister from '@hooks/useRegister';

const Register = () => {
const {emailAvailabilityStatus, register,error, errors, loading, handleSubmit, onSubmit, emailOnBlurHandler} = UseRegister()
    return (
        <> < Heading title = "User Registeration" /> <Row> < Col md = {{
          span: 6,
          offset: 3
        }} > <Form onSubmit = {
            handleSubmit(onSubmit)
        } > <Input label = "First Name" name = "firstName" error = {
            errors.firstName
                ?.message
        }
        register = {
            register
        } /> <Input label = "Last Name" name = "lastName" 
        error = {
            errors.lastName?.message
        }
        register = {
            register
        } /> <Input label = "Email address" name = "email" 
        error={
          errors.email?.message
            ? errors.email?.message
            : emailAvailabilityStatus === "notAvailable"
            ? "This email is already in use."
            : emailAvailabilityStatus === "failed"
            ? "Error from the server."
            : ""
        } 
        formText={
          emailAvailabilityStatus === "checking"
            ? "We're currently checking the availability of this email address. Please wait a moment."
            : ""
        }
        success={
          emailAvailabilityStatus === "available"
            ? "This email is available for use."
            : ""
        }
        disabled={emailAvailabilityStatus === "checking" ? true : false}
        register = {
            register
        }
        onBlur = {
            emailOnBlurHandler
        } /> <Input label = "Password" name = "password" type = "password" error = {
            errors.password
                ?.message
        }
        register = {
            register
        } /> <Input label = "Confirm Password" name = "confirmPassword" type = "password" error = {
            errors.confirmPassword
                ?.message
        }
        register = {
            register
        } /> <Button variant = "info" type = "submit" style = {{
              color: 'white'
            }} >   {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                <span>Submit</span>
              )}</Button></Form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            </Col></Row></>
    )
}

export default Register
