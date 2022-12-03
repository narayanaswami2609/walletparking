import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { errorMessage, successMessage } from './validations';
import { LOGIN } from '../constants';
import { dispatchLogin } from '../actions/authAction';

const theme = createTheme();

export default function SignIn() {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    err:'',
    success:''
  })
  const navigate = useNavigate()

  const { email, password, err, success } = values;

  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value, err: '', success: '' })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const res = await axios.get('/user/login', {
        params:{
          email, password
        } 
      }) 
      setValues({ ...values, err: "", success: res?.data?.msg })
      dispatch(dispatchLogin())
      window.sessionStorage.setItem('token', res.data.token)
      if (res) {
        setTimeout(() => {
          navigate('/home')
        }, 2000);
      }
    } catch (err) {
        err.response?.data?.msg &&
            setValues({ ...values, err: err.response?.data?.msg, success: '' })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <form> */}
      <Container component="main" maxWidth="xs">
        {err && errorMessage(err) }
        {success && successMessage(success) }
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
            />    
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
                <Grid item>
                  <Link to='/Registration'  variant="body2">
                    "Don't have an account? Sign Up"
                  </Link>
                </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
      {/* </form> */}
    </ThemeProvider>
  );
}  