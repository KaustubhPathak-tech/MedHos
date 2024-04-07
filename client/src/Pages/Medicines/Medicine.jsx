import { Button } from "@mui/material";
import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addtoCart } from "../../actions/cart";
import { getMedicines } from "../../actions/medicines";
const Medicine = () => {
  const { medicineid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const medicines = useSelector((state) => state.medicineReducer);
  const medicine = medicines?.data?.data?.filter(
    (item) => item._id === medicineid
  );

  if (!medicine || medicine.length === 0) {
    return <div>No data available for this medicine</div>;
  }
  const handleAddtoCart = (e) => {
    e.preventDefault();
    dispatch(addtoCart({ medicineId: medicine[0]?._id }, navigate));
  };
  
  return (
    <div className="marginTops">
      <div className="row" id="meddetail">
        <div className="col-md-4 meddetail1" id="card1">
          <div className="card" id="imgCard">
            <div className="card-image">
              <img src={`${medicine[0]?.imgurl}`} id="medImgs" />
            </div>
          </div>
        </div>
        <div className="col-md-6 meddetail1" id="card2">
          <div
            className="card"
            style={{ minHeight: "348px" }}
            id="medicineCard"
          >
            <div className="card-content">
              <p>{medicine[0]?.name}</p>
              <br />
              <div id="mdes">
                {" "}
                <p>{medicine[0]?.description}</p>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div className="col-md-2 meddetail1" id="">
          <div className="card">
            <div className="card-image">
              <span className="card-title">
                {" "}
                Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹ {medicine[0]?.price}
              </span>
            </div>
            <br />
            <div className="card-content">
              <Button
                variant="contained"
                color="success"
                onClick={handleAddtoCart}
              >
                Add to Cart
              </Button>
            </div>
            <div className="card-action">
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
