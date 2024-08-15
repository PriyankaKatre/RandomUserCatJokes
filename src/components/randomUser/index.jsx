import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { MdCall } from "react-icons/md";
import useFetch from "../../hooks/useFetch.js";
import { countryToNationality } from "../../utils/countries.js";
import { formateDate } from "../../utils/dateFormat.js";
import codeImage from "../../assets/codeImage.svg";
import "./style.scss";

const Profile = () => {
  const navigate = useNavigate();

  const { resData, loading, error } = useFetch(
    "https://api.freeapi.app/api/v1/public/randomusers/user/random"
  );
  const handleBack = () => {
    navigate(-1);
  };

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+${cell}`;
  };

  const {
    name: { title, first, last } = {},
    location: {
      city,
      coordinates: { latitude, longitude } = {},
      timezone: { offset, description } = {},
    } = {},
    login: { username } = {},
    dob: { date } = {},
    registered: { date: registeredDate = ""} = {},
    phone,
    cell,
    picture: { large } = {},
    nat,
  } = resData?.data || {};

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wrapper">
        <div className="top-icons">
          <FaArrowLeft onClick={handleBack} />
          <div>Profile Overview</div>
          <IoMdRefresh onClick={() => window.location.reload()} />
        </div>

        <div className="profile">
          <img src={large} className="thumbnail" />
          <span className="initial">{title}</span>
          <h3 className="name">
            {first} {last}
          </h3>
          <p className="title">{username}</p>

          <div className="connect">
            <Link to="#" onClick={() => openGoogleMaps(latitude, longitude)}>
              <div className="location">
                <div className="location_icon">
                  <SlLocationPin />
                </div>
                <span>Location</span>
              </div>
            </Link>
            <div className="call" onClick={handleCall}>
              <div className="phone_icon">
                <MdCall />
              </div>
              <span>Call me</span>
            </div>
          </div>
        </div>

        <div className="user-info">
          <div className="info">
            <p>City</p>
            <span>{city}</span>
          </div>

          <div className="info">
            <p>Nationality</p>
            <div className="country-info">
              <img
                src={`https://flagcdn.com/w320/${nat.toLowerCase()}.png`}
                alt={`Flag of ${nat}`}
                className="flag"
              />
              <span>{countryToNationality[nat]}</span>
            </div>
          </div>
          <div className="info">
            <p>Date of Birth</p>
            <span>{formateDate(date)}</span>
          </div>
          <div className="info">
            <p>Phone no.</p>
            <span>{phone}</span>
          </div>
          <div className="info">
            <p>Time zone</p>
            <span>
              {offset} {description}
            </span>
          </div>
          <div className="info">
            <p>Registration Since</p>
            <span>{formateDate(registeredDate)}</span>
          </div>
        </div>
        <footer>
          <p className="copyright">&copy;chai aur code</p>
          <Link to="https://chaicode.com/" className="chaiCode" target="_blank">
            <img src={codeImage} />
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Profile;
