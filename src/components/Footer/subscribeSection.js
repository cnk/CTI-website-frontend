import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import axios from 'axios';

const SubscribeSection = ({ size }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const submitEmail = (event) => {
    event.preventDefault();
    /* TODO: This needs to be passed via build arguments */
    axios
      .post('https://test-civictechindexadmin.herokuapp.com/api/subscribe/', {
        email_address: inputValue,
        notification_type: 'string',
      })
      .then((response) => {
        setMessage('success');
      })
      .catch((error) => {
        if (error.response.data.email_address) {
          setMessage('error');
        } else {
          setMessage('duplicate');
        }
      });
  };

  const messageSwitch = (param) => {
    switch (param) {
    case 'duplicate':
      return (
        <Typography variant='body2' className={classes.errorMessage}>
          That email address has already been registered with us.
        </Typography>
      );
    case 'error':
      return (
        <Typography variant='body2' className={classes.errorMessage}>
          The email address you have submitted was invalid.
          <br />
          Please check the format and resubmit.
        </Typography>
      );
    case 'success':
      return (
        <Typography variant='h5' color='textSecondary' className={classes.successMessage}>
          Thanks for subscribing!
          <br />
          We will be in touch soon.
        </Typography>
      );
    default:
      return null;
    }
  };

  return (
    message === 'success' ? (
      <Grid item xs={12}>
        {messageSwitch(message)}
      </Grid>
    ) : (
      <>
        <Grid item sm={12} md={size === 'lg' ? 12 : 5}>
          <Typography variant='body2' color='textSecondary' className={classes.subHeader}>Newsletter</Typography>
          <Typography variant='body1' color='textSecondary'>
            To receive updates about new projects and trending topics on the index, subscribe here.
          </Typography>
        </Grid>
        <br />
        <Grid item sm={12} md={size === 'lg' ? 12 : 5}>
          <form onSubmit={submitEmail}>
            <Typography variant='body2' color='textSecondary' className={classes.subHeader}>E-mail</Typography>
            <Box className={size !== 'lg' && classes.subSection}>
              <TextField
                className={classes.textField}
                onInput={(e) => setInputValue(e.target.value)}
                placeholder='John.doe@domain.com'
                variant='outlined'
              />
              <Button color='primary' onClick={submitEmail}>Submit</Button>
            </Box>
          </form>
          {messageSwitch(message)}
        </Grid>
      </>
    )
  );
};

export default SubscribeSection;
