import { useEffect, useState } from 'react';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { deleteDataProduct, getDataProduct, setDataProductById } from '../../Features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/Card/Card';

// icon
import AddIcon from '@mui/icons-material/Add';

// paginate
import { Pagination } from '@mui/material';
// Loader
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, useSearchParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { FilterProduct } from '../../Components/FilterProduct/FilterProduct';
// Modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form } from '../../Components/Form/Form';

export default function Admin() {
  const [pageParams, setPageParams] = useSearchParams();

  const dispatch = useDispatch();
  const { dataProduct, pageCount, isLoad } = useSelector((state) => state.product);

  // console.log(pageParams.get('page'));

  // paginate
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category_id: null,
    ordered: 'ASC',
    orderedBy: '',
    search: '',
  });

  const changeHandler = (event, value) => {
    setPageParams(`page=${value}`);
  };

  if (Number(pageParams.get('page')) > pageCount && pageCount !== 0) {
    setPageParams(`page=1`);
  }

  // modal
  const style = {
    borderRadius: 2,
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setDataProductById({}));
  };

  useEffect(() => {
    if (pageParams.get('page') === null) {
      setPageParams(`page=1`);
    }
    dispatch(getDataProduct(pageParams.get('page'), filter));
    setPage(Number(pageParams.get('page')));
    console.log('filterUpdate ==================');
  }, [pageParams, filter]);

  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <div className="w-full h-[100vh] p-9 flex flex-col justify-between">
        {isLoad ? (
          <div className="h-[100vh] flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <FilterProduct filter={filter} setFilter={setFilter} />
            <div className="flex justify-end">
              {/* <button className="p-2 bg-[#FF2351] text-white font-bold rounded-lg flex items-center mb-5 gap-1 text-[14px]">
                <AddIcon />
                ADD PRODUCT
              </button> */}
              <Button className="!bg-[#FF2351] !text-white !font-bold rounded-lg flex items-center gap-1 !text-[14px]" onClick={handleOpen}>
                <AddIcon />
                ADD PRODUCT
              </Button>
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Form handleClose={handleClose} currentPage={pageParams.get('page')} />
                </Box>
              </Modal>
            </div>
            <Card data={dataProduct} currentPage={pageParams.get('page')} handleOpen={handleOpen} />

            <div className="flex justify-center">
              <Pagination count={pageCount} page={page} onChange={changeHandler} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
