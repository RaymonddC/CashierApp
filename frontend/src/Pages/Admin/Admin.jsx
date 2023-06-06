import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { getDataProduct } from "../../Features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/Card/Card";

// icon
import AddIcon from "@mui/icons-material/Add";

// paginate
import * as React from "react";
import Pagination from "@mui/material/Pagination";

// modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Form } from "../../Components/Form/Form";

export default function Admin() {
  const dispatch = useDispatch();
  const { dataProduct } = useSelector((state) => state.product);

  // paginate
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getDataProduct());
  }, []);

  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <div className="w-full p-9">
        <div className="flex justify-end">
          {/* <button className="p-2 bg-[#FF2351] text-white font-bold rounded-lg flex items-center mb-2 gap-1 text-[14px]">
            <AddIcon />
            ADD PRODUCT
          </button> */}
          <Button
            className="p-2 !bg-[#FF2351] !text-white !font-bold !rounded-lg flex items-center mb-2 gap-1 text-[14px]"
            onClick={handleOpen}
          >
            <AddIcon />
            ADD PRODUCT
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}
              <Form />
            </Box>
          </Modal>
        </div>

        <Card data={dataProduct} />

        <div className="flex justify-center">
          <Pagination count={10} page={page} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
