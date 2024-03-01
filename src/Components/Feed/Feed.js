import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import {value_convert} from '../../data'
import moment from "moment";

function Feed({ category }) {
  const [data, setData] = useState([]);
  //to store data from url

  const fetchData = async () => {
    const videoList_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_Url)
      .then((response) => response.json())
      .then((data) => setData(data.items));//there is a items[] in api response in which all the fields i.e thumbnail,title etc are present came into this data in data.items
    //when video came it convert to json and then in data the came data is stored in data.items.
  };

  useEffect(() => {
    fetchData();
       
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); //when category is clicked it will be called get data from url and store it in data.

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <img src={item.snippet.thumbnails.medium.url} alt="Thumbnail" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_convert(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;
