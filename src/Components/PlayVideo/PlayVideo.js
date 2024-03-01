import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
// import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data";
import { value_convert } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";





function PlayVideo() {
    //useState
  const [apiData, setApiData] = useState("");
  const [channelData, setChannelData] = useState("")
  const [commentData, setCommentData] = useState([])

  const {videoId} = useParams()

  useEffect(() => {
      //Fetch Data
  const fetchVideoData = async () => {
    const videoData_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoData_url)
      .then((response) => response.json())
      .then((data) => setApiData(data.items[0]));
    //data.item[0] well store teh items[] on api response in which all the fields are present
  };
    fetchVideoData();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);




  useEffect( ()=>{
    const fetchChannelData = async ()=>{
      //channelId is present in video api of youtube just like channelTitle
       const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet?.channelId}&key=${API_KEY}`
       await fetch(channelData_url).then((response)=>response.json()).then((data)=>setChannelData(data?.items))
  }
    fetchChannelData();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[channelData]);





  useEffect(()=>{
  //fetching comment data
  const fetchCommentData = async()=>{
    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentData_url).then((response)=>response.json()).then((data)=>setCommentData(data.items))
  } 
    fetchCommentData();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commentData])




  return (
    <>
      <div className="paly_video">

       { <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`} frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
        ></iframe>}

        <h3>{apiData?apiData.snippet.title : "Title here"}</h3>

        <div className="play_video_info">
          <p>{value_convert(apiData?apiData.statistics.viewCount:"350")} views &bull; {moment(apiData?apiData.snippet.publishedAt:"").fromNow()} </p>
          <div>
            <span>
              <img src={like} alt="icon" />
              {value_convert(apiData?apiData.statistics.likeCount:"689")}
            </span>
            <span>
              <img src={dislike} alt="icon" />
            </span>
            <span>
              <img src={share} alt="icon" />
              share
            </span>
            <span>
              <img src={save} alt="icon" />
              save
            </span>
          </div>
          <hr />
        </div>
        <div className="publisher">
          <img src={!channelData || !channelData.snippet?"":channelData.snippet.thumbnails.default.url} alt="person" />

          <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{value_convert(channelData?channelData.statistics?.subscriberCount:"100k")} Subscriber</span>
          </div>
          <button>Subscribe</button>
        </div>

        <div className="video_description">
          <p>{apiData?apiData.snippet.description.slice(0 , 150):"description here"}</p>
          <hr />
          <h4>{value_convert(apiData?apiData.statistics.commentCount:"246")} comments</h4>

          {commentData.map((item,index)=>{

           return(
            <div key={index} className="comments">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName}
              </h3>
              <p>
               {item.snippet.topLevelComment.snippet.textDisplay}
              </p>
              <div className="comment_action">
                <img src={like} alt="like" />
                <span>{value_convert(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
           )

          })}
            
        </div>
      </div>
    </>
  );
}

export default PlayVideo;
