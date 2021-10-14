import React,{ useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { UserContext } from '../../provider/user.provider';

export default function FormDialog() {
  //const [open, setOpen] = React.useState(false);

  const { userList, addPerson, updatePerson, isUpdate, updateID, openDialog, setDialogState,setUpdate,setUpdateIDToContext } = useContext(UserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const handelChange = event => {      
        if (event.target.id === 'name') {
            setName(event.target.value);
        } else if (event.target.id === 'email') {
            setEmail(event.target.value)
        }
    }

    const handelClick = event => {
        if(isUpdate === false) {
            addPerson({name, email});
        } else {
            updatePerson({name, email}, updateID)
        }
        setName('');
        setEmail('');
        handleClose();
    }  

    useEffect(() => {
        if (isUpdate === true) {
            const person = userList.filter(item => item.id === updateID)   
        
            if(person.length > 0) {
                setName(person[0].name);
                setEmail(person[0].email);
            }
        }
    },[updateID,isUpdate,userList])

  const handleClickOpen = () => {
    setDialogState(true);
  };

  const handleClose = () => {
    setDialogState(false);
    setName('');
    setEmail('');
    setUpdate(false);
    setUpdateIDToContext(0);
  };

  return (
    <div>
        <IconButton color='primary' onClick={handleClickOpen}>
                <AddIcon />
        </IconButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{isUpdate ? 'Update details':'Add new person'}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handelChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handelChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handelClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
