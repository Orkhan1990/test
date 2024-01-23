import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Contact = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await fetch(
          `http://localhost:3007/api/v1/user/${data.userRef}`
        );
        const resData = await result.json();
        setUserData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [data.userRef]);
  console.log(userData);
  return (
    <>
      {userData && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{userData.username}</span>{" "}
            for <span className="font-semibold">{data.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            onChange={onChange}
            value={message}
            placeholder="Enter your message here..."
            className="w-full border rounded-lg p-3"
          />
          <Link
            to={`mailto:${userData.email}?subject=Regarding ${data.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

Contact.propTypes = {
  data: PropTypes.object,
};
export default Contact;
