import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, styled, Grid } from "@mui/material";
import { Button } from "antd";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { InputBase, List, ListItem } from "@mui/material";
import "./Medicines.css";

//filters
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.mode === "dark" ? "#fff" : "#1A2027",
}));
const SearchContainer = styled(Box)`
  background: #fff;
  width: 350px;
  border-radius: 0px;
  margin-left: 10px;
  display: inline-flex;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 10px;
  width: 350px;
  font-size: unset;
`;
const InputSearchBase2 = styled(InputBase)`
  padding-left: 10px;
  width: 600px;
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
const Component = styled(Box)`
  margin-top: 10px;
  background: #ffffff;
`;
const Deal = styled(Box)`
  padding: 15px 20px;
  display: flex;
`;
const Timer = styled(Box)`
  display: flex;
  margin-left: 10px;
  align-items: center;

  color: #7f7f7f;
`;

const DealText = styled(Typography)`

font-size:22px;
font-weight:600;
margin-right:25px;
line-height=32px;
`;
const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #28740;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
`;
const Image = styled("img")({
  width: "auto",
  height: 150,
});

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

const Medicines = () => {
  const medicines = useSelector((state) => state.medicineReducer);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [second, setSecond] = useState("");

  const [openList2, setOpenList2] = useState(false);
  const navigate = useNavigate();

  const title = "Available Medicines";
  const timer = false;
  const dispatch = useDispatch();
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const [switched, setSwitched] = useState(false);
  var fullrenderLength = 5;
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <Box variant="span">
        {hours} :{minutes} :{seconds} Left
      </Box>
    );
  };
  const handleRender = () => {
    setSwitched(!switched);
  };
  return (
    <div id="medicinePage">
      <div className="filters">
        <SearchContainer id="medicines">
          <InputSearchBase2
            placeholder="Search Medicines ... "
            onChange={(e) => setSecond(e.target.value)}
            value={second}
            onFocus={() => setOpenList2(true)}
            onAbort={() => setOpenList2(false)}
          />
          <SeachIconWrapper data-toggle="tooltip" title="Find Medicines">
            <SearchIcon />
          </SeachIconWrapper>
          
        </SearchContainer>
      </div>

      {switched ? (
        <>
          <Component>
            <div className="row" spacing={2} id="myMedRow">
              {medicines?.data?.data
                .filter((medicine) =>
                  medicine?.name.toLowerCase().includes(second.toLowerCase())
                )
                .map((medicine) => (
                  <div className="col-md-4" key={medicine._id}>
                    <Link
                      to={`/medicines/${medicine._id}`}
                      style={{ textDecoration: "none" }}
                      key={medicine._id} // Add a unique key here
                    >
                      <Box
                        textAlign="center"
                        style={{
                          padding: "25px 15px",
                          margin: "20px",
                        }}
                        id="medicineCard1"
                      >
                        <Image src={medicine.imgurl} alt="product" />
                        <Text style={{ fontWeight: 600, color: "#212121" }}>
                          {medicine.name}
                        </Text>
                        <Text style={{ color: "green" }}>
                          {medicine?.discount}
                        </Text>
                        <Text style={{ color: "#212121", opacity: ".6" }}>
                          {medicine?.description}
                        </Text>
                        <br />
                        <div className="row">
                          <div className="col-md-6">
                            <Text style={{ color: "green", fontSize: "18px" }}>
                              ₹ &nbsp; {medicine?.price}
                            </Text>
                          </div>
                          <div className="col-md-6">
                            {" "}
                            <Button>Buy</Button>
                          </div>
                        </div>
                      </Box>
                    </Link>
                  </div>
                ))}
            </div>
            <div id="seperator"></div>
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <ViewAllButton
                variant="contained"
                color="primary"
                onClick={handleRender}
                id="viewsbtn"
              >
                View Less
              </ViewAllButton>
            </Stack>
          </Component>
        </>
      ) : (
        <>
          <Component>
            <div className="row" id="myMedRow">
              {medicines?.data?.data
                .slice(0, fullrenderLength)
                .filter((medicine) =>
                  medicine?.name.toLowerCase().includes(second.toLowerCase())
                )
                .map((medicine) => (
                  <div className="col-md-4" key={medicine._id}>
                    <Link
                      to={`/medicines/${medicine._id}`}
                      style={{
                        textDecoration: "none",
                        display: "inline",
                        width: "30vw",
                      }}
                      key={medicine._id}
                    >
                      <Box
                        textAlign="center"
                        style={{
                          borderRadius: "5px",
                          padding: "25px 15px",
                          margin: "20px",
                          
                        }}
                        id="medicineCard1"
                      >
                        <Image src={medicine.imgurl} alt="product" />
                        <Text style={{ fontWeight: 600, color: "#212121" }}>
                          {medicine.name}
                        </Text>
                        <Text style={{ color: "green" }}>
                          {medicine?.discount}
                        </Text>
                        <Text style={{ color: "#212121", opacity: ".6" }}>
                          {medicine?.description}
                        </Text>
                        <br />
                        <div className="row">
                          <div className="col-md-6">
                            <Text style={{ color: "red", fontSize: "18px" }}>
                              ₹ &nbsp; {medicine?.price}
                            </Text>
                          </div>
                          <div className="col-md-6">
                            {" "}
                            <Button>Buy</Button>
                          </div>
                        </div>
                      </Box>
                    </Link>
                  </div>
                ))}
            </div>
            <div id="seperator"></div>
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <ViewAllButton
                variant="contained"
                color="primary"
                onClick={handleRender}
                id="viewsbtn"
              >
                View More
              </ViewAllButton>
            </Stack>
          </Component>
        </>
      )}
    </div>
  );
};

export default Medicines;
