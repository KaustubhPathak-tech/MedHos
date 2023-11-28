import axios from "axios";
import "./News.css";
import React, { useEffect, useState } from "react";
const News = () => {
  const [news, setnews] = useState([]);
  const getnews = async () => {
    const res = await axios.get("http://localhost:7000/news");
    console.log(res);
    setnews(res?.data?.value);
  };
  useEffect(() => {
    getnews();
  }, []);

  return (
    <div className="marginTops">
      {news && (
        <>
          <div>
            <h4 id="news_heading">HeadLines</h4>
          </div>

          {news
            .filter(
              (item) =>
                item.content !== "[Removed]" &&
                item.content !== null &&
                item.image
            )
            .map((item) => {
              return (
                <div id="news_content">
                  <div id="news_img">
                    <img
                      src={item?.image?.thumbnail?.contentUrl}
                      alt="news_img"
                      id="news_img1"
                    />
                  </div>
                  <div id="news_conts">
                    {" "}
                    <a href={`${item.url}`} id="newslink" target="_blank">
                      {" "}
                      <h5>{item.name}</h5>
                    </a>
                    <p style={{ opacity: "0.6", fontSize: "14px" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default News;
