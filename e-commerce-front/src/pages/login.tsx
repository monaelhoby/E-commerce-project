
import {Button, Form, Row, Col, Spinner, Alert} from 'react-bootstrap';

import {Heading} from '@components/common';
import {Input} from '@components/forms'
import userLogin from '@hooks/useLogin'


const Login = () => {

   const {register, handleSubmit,onSubmit, error, loading, errors , searchParams} = userLogin()


    return (
        <> < Heading title = "User Login" /> <Row>
            <Col
                md={{
                    span: 6,
                    offset: 3
                }}>
                    {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to view this content
            </Alert>
          )}

          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
                <Form onSubmit={handleSubmit(onSubmit)}>

          <Input label="Email address" name="email" error={errors.email?.message} register={register}/>
          <Input label="Password" name="password" type="password" error={errors.password?.message} register={register}/>
          {error && <p style={{color: 'red'}}>{error}</p>}
                    <Button
                        variant="info"
                        type="submit"
                        style={{
                            color: 'white'
                        }}>
                           {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                <span>Submit</span>
              )}
                    </Button>
                </Form>
            </Col>
        </Row>
    </>
    )
}

export default Login
