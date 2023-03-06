import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogBox({open, setOpen, handleClose, componentLoad}) {
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{componentLoad.title}</DialogTitle>
        <DialogContent>
          {componentLoad.componentToLoad}
        </DialogContent>
      </Dialog>
    </div>
  );
}