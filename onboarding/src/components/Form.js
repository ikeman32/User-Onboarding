import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';

const UserDiv = styled.div`
display: flex;
flex-direction: column;
`;


const NewUser = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <UserDiv>
      <h1>New User</h1>
      <Form style={{fontSize: "1.8rem"}}>
        <Field type="text" name="name" placeholder="Name"  />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <br></br><br></br>
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <br></br><br></br>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <br></br><br></br>
        <label className='checkbox-container'>
            {' '}
            Terms of Service
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
        </label>
        <br></br><br></br>
        <button type="submit">Submit!</button>
      </Form>

      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </UserDiv>
  );
};

const FormikNewUser = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('A name is required'),
    email: Yup.string().required('Please enter and Email'),
    password: Yup.string().required('Enter a password'),
    terms: Yup.boolean().oneOf([true]).required('You must accept Terms of Service')
  }),

  handleSubmit(values, {setStatus}){
    axios 
      .post('https://reqres.in/api/users', values)
      .then(res =>{
        setStatus(res.data);
        console.log(res);
      })
      .catch(err=> console.log(err.response));
  }
})(NewUser);
console.log("This is the HOC", FormikNewUser);
export default FormikNewUser;
