import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Img from "../../assets/preview.png";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://60f2479f6d44f300177885e6.mockapi.io/users?id=${id}`)
      .then((res) => {
        res.data.map((item) => {
          setDetails(item);
        });
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const url = String(window.location.href);
  const size = "2.5rem";
  const title = "This is Facebook Share Title";

  return (
    <>
      <div>
        <div className="container">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="userDetails">
              <img src={Img} alt="image" />
              <h2>Details User:</h2>
              <h3>Name: {details.first_name + " " + details.last_name}</h3>
              <h3>Type: {details.user_type}</h3>
              {details.division && <h3>Division: {details.division}</h3>}
              {details.district && <h3>District: {details.district}</h3>}
            </div>
          )}
          <div className="social-share">
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon size={size} />
            </WhatsappShareButton>

            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon size={size} />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
