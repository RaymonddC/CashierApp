import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal(props) {
  const [open, setOpen] = useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
    // props.setOpen(false);
  }, [props.open]);

  return (
    <div>
      <Button onClick={handleOpen} className="flex gap-3 justify-center align-middle " sx={{ color: '#000000' }}>
        {props.icon}
        {props.button}
      </Button>
      <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <p className="flex justify-center text-[25px] py-[1em] font-bold">{props.button}</p>
          {props.formBox}
        </Box>
      </Modal>
    </div>
  );
}
