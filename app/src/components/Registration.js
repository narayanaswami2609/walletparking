import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";

import axios from "axios";
import { errorMessage, isEmail, isEmpty, isLength, isMatch, successMessage } from "./validations";
import { Link, useNavigate } from "react-router-dom";
const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  phoneNumber: 0,
  email:"",
  password:"",
  confirmPassword: "",
  err: '',
  success: ''
};

const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const navigate = useNavigate()
  const {name, password, err, success, confirmPassword, age, email } = formValues;

  const handleInputChange = (e) => {
    const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value, err: '', success: '' })
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isEmpty(name) || isEmpty(password) || isEmpty(email) || isEmpty(age))
      return setFormValues({ ...formValues, err: "name, password, email, age, mobile number required.", success: '' })

    if (!isEmail(email))
        return setFormValues({ ...formValues, err: "Invalid email address.", success: '' })

    if (isLength(password))
        return setFormValues({ ...formValues, err: "Password must be at least 6 characters.", success: '' })

    if (!isMatch(password, confirmPassword))
        return setFormValues({ ...formValues, err: "Password did not match.", success: '' })

    try {
      const res = await axios.post("/user/register", formValues)
      setFormValues({ ...formValues, err: "", success: res.data.msg })

      setTimeout(() => {
        navigate('/login')
      }, 5000);
      console.log(formValues);
    } catch (err) {
        err.response.data.msg &&
            setFormValues({ ...formValues, err: err.response.data.msg, success: '' })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {err && errorMessage(err)}
      {success && successMessage(success)}
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            last name="name"
            first label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email-input"
            last name="email"
            first label="email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="name-input"
            last name="password"
            first label="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="name-input"
            last name="confirmPassword"
            first label="confirm password"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="text"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="os"
              value={formValues.os}
              onChange={handleInputChange}
            >
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
        <Grid item>
          <TextField
            id="age-input"
            name="phoneNumber"
            label="phoneNumber"
            type="text"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
          
        </Grid>
        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
        <Grid item>
          <Link to='/Login'  variant="body2">
            already have an account
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
export default Form;