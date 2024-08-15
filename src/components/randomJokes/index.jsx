import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useFetch from "../../hooks/useFetch.js";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IoBookmarkOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { IoShareOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import "./style.scss";

const RandomJokes = () => {
  const [quotes, setQuotes] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [bookmark, setBookmarks] = useState(0);

  const { resData } = useFetch(
    "https://api.freeapi.app/api/v1/public/randomusers/user/random"
  );

  const {
    resData: data,
    loading,
    error,
  } = useFetch("https://api.freeapi.app/api/v1/public/randomjokes/joke/random");

  const getRandomTimestamp = () => {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    const timestamp = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const optionsDate = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedTime = timestamp.toLocaleTimeString("en-US", optionsTime);
    const formattedDate = timestamp
      .toLocaleDateString("en-US", optionsDate)
      .replace(",", "");

    const formattedDateTime = `${formattedTime} - ${formattedDate}`;

    return formattedDateTime;
  };

  const getRandomViews = () => Math.floor(Math.random() * 10000);
  const getRandomLikes = () => Math.floor(Math.random() * 1000);
  const getRandomRetweets = () => Math.floor(Math.random() * 500);
  const getRandomQuotes = () => Math.floor(Math.random() * 750);
  const getRandomBookmarks = () => Math.floor(Math.random() * 1500);

  useEffect(() => {
    setTimestamp(getRandomTimestamp());
    setViews(getRandomViews());
    setLikes(getRandomLikes());
    setRetweets(getRandomRetweets());
    setQuotes(getRandomQuotes());
    setBookmarks(getRandomBookmarks());
  }, []);

    if (!data) return null;
    if (error) {
      return <p>Error: {error}</p>;
    }

    if (loading) {
      return <p>Loading...</p>;
    }

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <div className="top-icons">
          <FaArrowLeft />
          <div className="post">POST</div>
        </div>
        <div className="profile">
          <img
            src={resData?.data?.picture?.large}
            alt="Profile Picture"
            className="profile-img"
          />
          <div className="tweet-author">
            <span className="name">
              {resData?.data?.name?.first} {resData?.data?.name?.last}
              <span className="verified">
                <MdVerified />
              </span>
            </span>
            <span className="handle">
              @{resData?.data?.name?.first.toLowerCase()}
              {resData?.data?.name?.last.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="tweet-content">
        <p>{data?.data?.content}</p>
        <div className="timestamp">
          {timestamp} <span className="views"> {views} M</span> views
        </div>
      </div>
      <div className="tweet-footer">
        <div className="tweet-stats">
          <span>
            <HiOutlineChatBubbleLeft /> {quotes}K
          </span>
          <span>
            <FaRetweet />
            {retweets}K
          </span>
          <span>
            <FcLike className="gray-icon" /> {likes}K
          </span>
          <span>
            <IoBookmarkOutline /> {bookmark}K
          </span>
          <span>
            <IoShareOutline />
          </span>
        </div>
      </div>
      <footer>
        <p className="copyright">&copy;chai aur code</p>
      </footer>
    </div>
  );
};

export default RandomJokes;
