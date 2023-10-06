import React, { useState } from "react";
import "./Cart.css";
import {
  Box,
  Typography,
  styled,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";

import { decreaseQty, increaseQty, remove } from "../../actions/medicines";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.mode === "dark" ? "#fff" : "#1A2027",
  paddingRight: "45px",
  border: "1px solid #ded7d7",
  boxShadow: "4px 6px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)",
}));
const CartContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CartItems = styled(Box)`
  width: 70%;
  overflow-y: auto;
  max-height: calc(1000vh - 50px); /* Set a maximum height for scrolling */
`;

const CartSummary = styled(Box)`
  min-height: 200px;
  margin-top: 10%;
  overflow-y: auto;
  width: 30%;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Component = styled(Box)`
  margin-top: 10px;
  background: #ffffff;
`;
const actions = styled(ButtonGroup)`
  margin-top: 30px;
  display: flex;
  border: 1px solid #fc1303;
`;

const StyledButton = styled(Button)`
  font-size: 13px;
  font-weight: 800;
  &:hover {
    background-color: #ff8605;
    color: white;
  }
`;
const Image = styled("img")({
  width: "auto",
  height: 150,
});

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

const Cart = () => {
  var totalPrice = 0;
  var totalqty = 0;
  var subtotal = 0;
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  console.log(cartItems);
  const medicine = JSON.parse(localStorage.getItem("Medicines"));
  const user = useSelector((state) => state.authReducer);
  console.log(medicine);
  const dispatch = useDispatch();
  const cartItemsDisplay = cartItems.map((cartItem) => {
    const med = medicine?.data.find(
      (item) => item._id === cartItem?.medicineId
    );
    return med ? (
      <Component>
        <Box
          key={med._id}
          textAlign="center"
          sx={{
            padding: "25px 15px",
            margin: "20px",
          }}
          width="100%"
          borderRight="1px solid #e3cecc"
          boxShadow="0 6px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <script>
            {(subtotal =
              subtotal + Number(med.price) * Number(cartItem.qty)
              
            )}
            {(totalPrice = subtotal + totalPrice)}
            {(totalqty = totalqty + Number(cartItem.qty))}
          </script>
          <div className="row">
            <div className="col-md-4">
              <Image src={med.imgurl} alt="product" />
              <br />
              <br />
              <br />
              <actions style={{ paddingLeft: "20%" }}>
                <div id="qtyTracker">
                  <StyledButton
                    onClick={() => {
                      dispatch(
                        decreaseQty({
                          medicineId: med._id,
                          userId: user?.user?._id,
                        })
                      );
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }}
                    id="left"
                  >
                    -
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    style={{
                      borderRadius: "0%",
                      backgroundColor: "",
                      color: "white",
                    }}
                    id="qty"
                  >
                    {cartItem?.qty}
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      dispatch(
                        increaseQty({
                          medicineId: med._id,
                          userId: user?.user?._id,
                        })
                      );
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }}
                    id="right"
                  >
                    +
                  </StyledButton>
                </div>
              </actions>
            </div>
            <div className="col-md-8">
              <Text style={{ fontWeight: 600, color: "#212121" }}>
                {med.name}
              </Text>
              <br />
              <Text style={{ color: "#212121", opacity: ".6" }}>
                {med.description}
              </Text>
              <div id="remove">
                <div className="row">
                  <div className="col-md-6">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        dispatch(
                          remove({
                            medicineId: med._id,
                            userId: user?.user?._id,
                          })
                        );
                        setTimeout(() => {
                          window.location.reload();
                        }, 2000);
                      }}
                    >
                      Remove from cart
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button variant="contained" color="primary">
                      Price &nbsp;&nbsp;&nbsp;&nbsp; ₹ {subtotal}
                    </Button>
                  </div>
                  <script>{(subtotal=0)}</script>
                </div>
              </div>
            </div>
          </div>

          <br />
        </Box>
      </Component>
    ) : null;
  });

  return (
    <div style={{ marginTop: "5%" }}>
      {
        // Display a message if no items in cart
        cartItems?.length === 0 ? (
          <Typography variant="h6">No items in cart</Typography>
        ) : (
          <>
            <CartContent>
              <CartItems>
                <Stack spacing={2}>
                  <Item>{cartItemsDisplay}</Item>
                </Stack>
              </CartItems>
              <CartSummary>
                <Box sx={{ padding: "20px" }} id="totalPrice">
                  <ShoppingCartIcon />
                  <Typography variant="h6">Cart Summary</Typography>
                  <table id="myFav">
                    <tr>
                      <td id="myTable">Total Price</td>
                      <td id="myTable1">₹ {totalPrice}</td>
                    </tr>
                    <tr>
                      <td id="myTable">Total Quantity</td>
                      <td id="myTable1">{totalqty}</td>
                    </tr>
                  </table>

                  {/* Calculate and display the total price */}
                </Box>
                <Button variant="contained" color="primary">
                  Checkout
                </Button>
                <br />
                <br />
              </CartSummary>
            </CartContent>
          </>
        )
      }
    </div>
  );
};

export default Cart;
