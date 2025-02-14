import { FormEvent, useContext } from "react";
import { Col, Form, Row, Stack, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const { registerInfo, setRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
  return (<>
    <Form onSubmit={(e: FormEvent) => registerUser(e)}>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2 className="text-black">Register</h2>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, name: e.target.value })
              }}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }}
            />
            <Button variant="dark" type="submit">
              {isRegisterLoading ? "Your account creating..." : "Register"}
            </Button>
            {registerError ?
              <Alert variant="danger">
                <p className="mb-0 text-center">{registerError}</p>
              </Alert>
              : ""
            }
          </Stack>
        </Col>
      </Row>
    </Form>
  </>);
}

export default RegisterPage;