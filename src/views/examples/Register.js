import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import React, { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
    // agreeToPolicy: false,
  });

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    // const value = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valider les données du formulaire ici
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Les mots de passe ne correspondent pas.");
    //   return;
    // }

    const emailError = document.querySelector(".email_error");
    const passwordError = document.querySelector(".password_error");
    const firstNameError = document.querySelector(".firstName_error");
    const lastNameError = document.querySelector(".lastName_error");
    const passwordConfirmError = document.querySelector(
      ".confirm_password_error"
    );
    passwordConfirmError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    firstNameError.innerHTML = "";
    lastNameError.innerHTML = "";

    if (formData.password !== formData.confirmPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        // url: `${process.env.REACT_APP_API_URL}api/membre/signup`,
        url : "http://localhost:5000/api/user/register",
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
            firstNameError.innerHTML = res.data.errors.firstName
            lastNameError.innerHTML = res.data.errors.lastName
          } else {
            // alert("Vous recevrez un email pour la validation de votre compte");
            navigate("/auth/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Envoyer les données au backend ici
    console.log(formData);
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  
                </InputGroup>
                <div className="firstName_error"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  
                </InputGroup>
                <div className="lastName_error"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="new-email"
                  />
                </InputGroup>
                <div className="email_error"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
                <div className="password_error"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
                <div className="confirm_password_error"></div>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      name="agreeToPolicy"
                      checked={formData.agreeToPolicy}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-left" xs="6">
            <Link to="/auth/login" className="text-light">
              <small>connexion</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
