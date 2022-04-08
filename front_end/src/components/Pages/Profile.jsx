import ProfileBottom from "components/Organisms/ProfileBottom";
import ProfileTop from "components/Organisms/ProfileTop";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import axios from "axios";
import { loginStore } from "Store/loginStore";
import { useParams } from "react-router-dom";
export default function Profile() {
  const token = loginStore().jwtToken;
  const { userid } = useParams();
  const [contents, setContents] = useState([]);
  const [userData, setUserData] = useState({});
  const [follow, setFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const handleFollowClick = () => {
    axios
      .post(
        `/api/follow`,
        { id: userid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (follow) {
          setFollowerCount((state) => state - 1);
        } else {
          setFollowerCount((state) => state + 1);
        }
        setFollow((state) => !state);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`/api/stars/all/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContents(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`/api/user/profile/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.usersDto);
        setFollow(res.data.follow);
        setFollowerCount(res.data.userFollowerCount);
        setFollowingCount(res.data.userFollowingCount);
      })
      .catch((error) => console.log(error));

    return () => {
      setUserData({});
      setFollow(false);
      setFollowerCount(0);
      setFollowingCount(0);
    };
  }, [userid]);

  return (
    <div className={styles.profilecontainer}>
      <ProfileTop
        contents={contents}
        userid={userid}
        userData={userData}
        follow={follow}
        followerCount={followerCount}
        followingCount={followingCount}
        handleFollowClick={handleFollowClick}
      />
      <ProfileBottom contents={contents} follow={follow} />
    </div>
  );
}
