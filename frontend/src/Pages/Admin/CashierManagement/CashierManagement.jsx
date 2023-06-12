import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../Components/Sidebar/Sidebar';
import KeepMountedModal from '../../../Components/Modal/KeepMountedModal';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getCashiersAsync } from '../../../Features/User/UserSlice';
import { CashierForm } from '../../../Components/Cashier/CashierForm';
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const CashierManagement = () => {
  const cashiers = useSelector((state) => state.user.cashierList);
  let dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'Role', headerName: 'Roles', width: 130, valueFormatter: ({ value }) => value.type },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setSelected(params.row);
                setOpenAdd(true);
              }}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              onClick={() => {
                console.log('halo');
                dispatch(deleteUser({ id: params.row.id }));
                // setOpenAdd(true);
              }}
            >
              <DeleteOutlineOutlinedIcon className=" text-red-900 z-50" />
            </Button>
          </>
        );
      },
    },
    //   {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    //   },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //   },
  ];

  useEffect(() => {
    dispatch(getCashiersAsync());
    console.log(columns);
  }, []);
  return (
    <div className="flex ">
      <Sidebar />
      <div className="content px-[30px] w-full  scrollbar-hide  md:scrollbar-default">
        <div className="py-[50px]">test</div>
        <div className="header flex justify-between w-full">
          <p className="font-bold py-[10px] text-[50px]">Cashier List</p>
          <button onClick={() => (openAdd ? '' : setOpenAdd(!openAdd))} className="bg-[#FFCA40]  rounded-xl py-[5px] px-[30px]  my-[20px]">
            <KeepMountedModal icon={<AddIcon />} button={<span>Add Cashier</span>} open={openAdd} setOpen={setOpenAdd} formBox={<CashierForm handleClose={() => setOpenAdd(false)} cashier={selected} />} />
          </button>
        </div>
        {console.log(cashiers, 'cashier bro =>>>>>>>>>')}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={cashiers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};
