import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from '../Helpers/Helper';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

//   const [enteredName, setEnteredUsername] = useState("");
//   const [enteredUserAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge= ageInputRef.current.value
    // validation
    if (enteredName.trim() === 0 || enteredUserAge.trim() === 0) {
      /// return stops from following code execusion
      setError({
        title: 'Invalid input',
        message:"Please enter a valid name and age (non-empty values)"
      })
      return;
    }
    // plus enforces conversion from string to a number
    if (+enteredUserAge < 1) {
    setError({
        title: "Invalid age",
        message: "Please enter valid age"
    })
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    // setEnteredUsername("");
    // setEnteredAge("");

    // since using Refs doing different valu reset. Manually manipulating DOM. Ususally bad thing to do, but in this case it's ok
    // or go back to useState

    //Refs are better if you trying to read value without using much later
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

//   const usernameChangeHandler = (event) => {
//     setEnteredUsername(event.target.value);
//   };

//   const ageChangeHandler = (event) => {
//     setEnteredAge(event.target.value);
//   };

  const errorHandler = () =>{
    setError(null);
}

  return (
    // <React.Fragment>
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredName}
            // onChange={usernameChangeHandler}
            // connecting ref to element
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredUserAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    {/* </React.Fragment> */}
    </Wrapper>
  );
};

export default AddUser;
