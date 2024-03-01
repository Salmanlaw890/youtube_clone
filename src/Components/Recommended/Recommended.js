import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY } from "../../data";
import { value_convert } from "../../data";
import { Link } from "react-router-dom";



function Recommended({ categoryId  }) {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const videoRelated_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(videoRelated_url)
      .then((response) => response.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className="recommended">
      {apiData.map((item) => {
        return (
            
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side_video_list">
            <img src={item.snippet.thumbnails.medium.url} alt="Thumbnail" />
            <div className="video_info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_convert(item.statistics.viewCount)} views</p>
            </div>
          </Link>
          
        );
      })}
    </div>
  );
}

export default Recommended;
