import React,{ useContext } from 'react';
import Stack from '@mui/material/Stack';
//import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { pageContext } from '../../provider/pageControls.provider';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
 // const [open, setOpen] = React.useState(false);
    const { agreement,setAgreementStatus } = useContext(pageContext);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAgreementStatus(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={agreement} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Let's agree to disagree!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
