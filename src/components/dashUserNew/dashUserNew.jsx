import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBooks, modifyPost, createCustomer, createUser, getAllUsers } from "../../redux/actions";

import defaultImage from '../../assets/bookDefault.png';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Pageview } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Google, LockClockOutlined, Send } from "@mui/icons-material";




export default function DashUserNew(){

//Global States
const dispatch = useDispatch();
const users = useSelector((state) => state.users);

useEffect(() => {
  dispatch(getAllUsers());
}, [dispatch]);


// Local States
const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);
const [errors, setError] = useState({});
const [input, setInputs] = useState({
  username: "",
  email: "",
  password: "",
  confirmation: "",
  role:"user",
});
if(open) console.log(input);


// Functions
function handleOpen(){
  setInputs({
    username: "",
    email: "",
    password: "",
    confirmation: "",
    role:"user",
  });
  setError({});
  setOpen(true);
};

function handleClose(){
  setInputs({
    username: "",
    email: "",
    password: "",
    confirmation: "",
    role:"user",
  });
  setError({});
  setOpen(false);
};

function handleOpen2(){
  setOpen2(true);
};

function handleClose2(){
  setOpen2(false);
};


function handleSubmit(e){
  e.preventDefault();
  if (!input.username || !input.email || !input.password) {
    alert("Cannot have empty elements!!");
  } else {
    dispatch(
      createCustomer({ username: input.username, email: input.email })
    );
    dispatch(
      createUser({
        username: input.username,
        password: input.password,
        email: input.email,
        role: input.role,
      })
    );
    setInputs({
      username: "",
      email: "",
      password: "",
      confirmation: "",
      role:"user",
    });
  }
  handleClose();
  handleOpen2();
};

function handleUser(e){
  setInputs({ ...input, [e.target.name]: e.target.value });
  setError(validate({ ...input, [e.target.name]: e.target.value }));
  console.log(input);
};

function validate(input){
  const errors = {};
  let RegEXP = /[`ª!@#$%^*-+\=\[\]{};"\\|,<>\/~]/;
  if (!input.username) {
    errors.username = "Username required";
  } else if (RegEXP.test(input.username)) {
    errors.username = "Special characters are not accepted";
  }
  if (!input.email) {
    errors.email = "E-mail required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
    errors.email = "Invalid e-mail address";
  } else if (
    users.find((e) => e.email.toLowerCase() === input.email.toLowerCase())
  ) {
    errors.email = "This mail is already registered";
  }
  if (!input.password) {
    errors.password = "Password required";
  } else if (input.password.length < 5){
    errors.password = "Password minimum 5 characters";
  }
  if (input.password !== input.confirmation) {
    errors.confirmation = "Passwords must match";
  }
  if (!input.role) {
    errors.role = "Select role";
  }
  return errors;
}




return(
<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="contained" endIcon={<AddCircleOutlineOutlinedIcon />}>New</Button>

  <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Grid
        container
        component="main"
        sx={{ height: "100vh", padding: 6 }}
        className="texts-login"
      >
        <Container component="main" maxWidth="md" sx={{ bgcolor: "#ebebeb", borderRadius: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" sx={{color: "#013a63", mb: 1}}>
              FlyBooks
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}>
              <LockClockOutlined />
            </Avatar>
            
            <Typography component="h1" variant="h5" sx={{ color: "#013a63" }}>
              New User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e)=> handleSubmit(e)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.username && <p className="danger-p">{errors.username}</p>}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.email && <p className="danger-p">{errors.email}</p>}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.password && <p className="danger-p">{errors.password}</p>}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmation"
                    label=" Repeat Password"
                    type="password"
                    id="confirmation"
                    autoComplete="new-password"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.confirmation && <p className="danger-p">{errors.confirmation}</p>}
              </Grid>
                <FormControl >
                  <FormLabel id="radio-group-label-1">Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="radio-group-label-1"
                    name="typebook"
                    onChange={e=>handleUser(e)}
                    value={input.role}
                  >
                    <FormControlLabel name="role" value="admin" control={<Radio />} label="Admin" />
                    <FormControlLabel name="role" value="user" control={<Radio />} label="User" />
                  </RadioGroup>
                </FormControl>
                {errors.role && <p className="danger-p">{errors.role}</p>}
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
                  endIcon={<Send />}
                >
                  Create
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Dialog>
    
    <Dialog open={open2} onClose={handleClose2} maxWidth="md">
      <Grid container component="main" sx={{ height: "100vh", padding: 6 }} className="texts-login">
        <Container component="main" maxWidth="md" sx={{ bgcolor: "#ebebeb", padding: 8, borderRadius: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" sx={{color: "#013a63", mb: 1}}>
              FlyBooks
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}>
            <Pageview />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{color: "#013a63", mb:6}}>
              ¡A link has been sent to your email to verify your account!
            </Typography>
            <Button
              onClick={handleClose2}
              variant="outlined"
              sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
            >
              Close
            </Button> 
          </Box>
        </Container>
      </Grid>
    </Dialog>
</React.Fragment>
)};
