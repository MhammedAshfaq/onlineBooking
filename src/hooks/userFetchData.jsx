/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/authContext";
import { BASE_URL } from "../config";
import { errorToast } from "../utils/toastSetting";

const userFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //User Token
  const { token } = useContext(authContext);

  const { dispatch } = useContext(authContext);

  // User Data Fetching
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("---res", res);
        // setTimeout(() => {
        setLoading(false);
        setData(res.data.data);
        setError(null);
        // }, 1000);
      } catch (error) {
        console.log("GET USER PROFILE ERROR:- ", error);
        setError(error.response.data.error);
        setLoading(false);
        // errorToast(error.response.data.error);
        if (
          error.response.data.error === "Authorization header is missing" ||
          error.response.data.error === "Invalid token format" ||
          error.response.data.error === "Invalid Token" ||
          error.response.data.error === "Token expired, Please login again"
        ) {
          errorToast(error.response.data.error);
          dispatch({ type: "LOGOUT" });
        }
      }
    };
    fetchUserDetails();
  }, [url]);

  return { data, error, loading };
};

export default userFetchData;
