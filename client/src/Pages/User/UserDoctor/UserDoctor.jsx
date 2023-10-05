import React, { useState, useEffect } from "react";
import { InputBase, Box, List, ListItem, styled, Button } from "@mui/material";
import "./UserDoctor.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const SearchContainer = styled(Box)`
  background: #fff;
  width: fit-content;
  border-radius: 0px;
  margin-left: 10px;
  display: inline-flex;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 10px;
  width: fit-content;
  font-size: unset;
`;
const SeachIconWrapper = styled(Box)`
  padding: 10px;
  display: flex;
`;

const ListWrapper = styled(List)`
  position: absolute;
  background: #ffffff;
  color: #000;
  margin-top: 36px;
`;

const UserDoctor = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(SearchDoctors())
  }, [dispatch]);

  const getText = (text) => {
    setText(text);
  };
  return (
    <div id="userDoctor">
      <h4>Find Doctor functionality will be implemented</h4>
      <div id="form">
        <SearchContainer>
          <InputSearchBase
            placeholder="Search Doctors by name, speciality, and more"
            onChange={(e) => getText(e.target.value)}
            value={text}
          />
          <SeachIconWrapper>
            <SearchIcon />
          </SeachIconWrapper>
          {/* {text && (
        <ListWrapper>
          {products
            .filter((product) =>
              product.title.longTitle
                .toLowerCase()
                .includes(text.toLocaleLowerCase())
            )
            .map((product) => (
              <ListItem>
                <Button
                  to={`/product/${product.id}`}
                  onClick={() => setText("")}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {product.title.longTitle}
                </Button>
              </ListItem>
            ))}
        </ListWrapper>
      )} */}
        </SearchContainer>
        <SearchContainer>
          <InputSearchBase
            placeholder="Search Doctors by name, speciality, and more"
            onChange={(e) => getText(e.target.value)}
            value={text}
          />
          <SeachIconWrapper>
            <SearchIcon />
          </SeachIconWrapper>
          {/* {text && (
        <ListWrapper>
          {products
            .filter((product) =>
              product.title.longTitle
                .toLowerCase()
                .includes(text.toLocaleLowerCase())
            )
            .map((product) => (
              <ListItem>
                <Button
                  to={`/product/${product.id}`}
                  onClick={() => setText("")}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {product.title.longTitle}
                </Button>
              </ListItem>
            ))}
        </ListWrapper>
      )} */}
        </SearchContainer>
      </div>
    </div>
  );
};

export default UserDoctor;
