import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { TextField } from "@mui/material";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  console.log(items);

  async function getItems() {
    try {
      const items = await fetch(
        "http://localhost:1337/api/items?populate=*",
        {
          method: "GET",
          headers: { 'Content-Type': 'application/json', },
        }
      ).then(response => response.json())
      return items;

    } catch (error) {
      console.log(error)
    }
  }

  async function renderItems() {
    try {
      const items = await getItems();
      dispatch(setItems(items.data));
      // console.log(items, "items");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    renderItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const searchItems = items.filter(
    (item) => item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box width="80%" margin="80px auto">
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin='20px auto'
      width='50%'
      >
        <TextField id="outlined-basic" label="Search all products" variant="outlined" onChange={event => { setSearchTerm(event.target.value) }}  fullWidth='true' />
      </Box>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {searchItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
