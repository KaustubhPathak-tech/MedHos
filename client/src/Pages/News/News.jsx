import axios from "axios";
import "./News.css";
import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setnews] = useState([]);
  const getnews = async () => {
    const res = await axios.get(
      "http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=b129ed1287b04f1aa49c5e04f967d6c4"
    );
    setnews(res?.data?.articles);
  };
  console.log(news);
  useEffect(() => {
    getnews();
  }, [getnews]);

  return (
    <div className="marginTops">
      {news &&
        news
          .filter((item) => item.content !== "[Removed]"&&item.content !== null&&item.urlToImage!==null)
          .map((item) => {
            return (
              <div id="news_content">
                <div id="news_img">
                  <img
                    src={item.urlToImage}
                    alt="news_img"
                    id="news_img1"
                  />
                </div>
                <div id="news_conts">
                  {" "}
                  <a href={`${item.url}`}> <h5>{item.title}</h5></a>
                 
                  <p>{item.description}</p>
                </div>
                
              </div>
            );
          })}
    </div>
  );
};

export default News;
