import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAsync } from '../../Features/Category/CategorySlice';
import { CardCategory } from './CardCategory';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export const FilterProduct = (props) => {
  const category = useSelector((state) => state.category.list);

  let dispatch = useDispatch();

  const [order, setOrder] = useState('');
  const [newOrdered, setNewOrdered] = useState('');
  const [newOrderedBy, setNewOrderedBy] = useState('');
  const [catId, setCatId] = useState(0);
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    // const newOr = event.target.value < 3;
    if (event.target.value == 0) {
      setNewOrdered('ASC');
      setNewOrderedBy('');
      setOrder(event.target.value);
      return;
    }
    setNewOrderedBy(event.target.value < 3 ? 'product_name' : 'price');

    setNewOrdered(event.target.value % 2 == 0 ? 'DESC' : 'ASC');
    setOrder(event.target.value);
  };

  useEffect(() => {
    console.log(catId, 'filterSet====>>>>>>>>>');
    props.setFilter({
      category_id: catId,
      ordered: newOrdered,
      orderedBy: newOrderedBy,
      search: search,
    });
    console.log(props.filter);
  }, [newOrdered, newOrderedBy, catId, search]);

  useEffect(() => {
    dispatch(getCategoriesAsync());
    console.log(props);
  }, []);

  return (
    <div className="">
      <div className="content flex h-[150px] gap-[30px] overflow-x-auto py-1">
        {category.map((value, idx) => {
          let bg = catId == value.id ? 'bg-[#FFCA40]' : '';
          return (
            <div className="box" onClick={() => setCatId(catId == value.id ? null : value.id)}>
              <CardCategory key={idx} category={value} class={`scale-100 w-[10em] ${bg}`} />
            </div>
          );
        })}
      </div>
      <div className="orderSearch flex mt-4 gap-5">
        <div className="search">
          <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="ordering  w-[20em]">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Order By</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={order} label="Order By" onChange={handleChange}>
                <MenuItem value={0}>any</MenuItem>
                <MenuItem value={1}>Product Name a to z</MenuItem>
                <MenuItem value={2}>Product Name z to a</MenuItem>
                <MenuItem value={3}>Price low to high</MenuItem>
                <MenuItem value={4}>Price high to low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
};
