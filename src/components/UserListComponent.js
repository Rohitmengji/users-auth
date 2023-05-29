import React, { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { RotateLoader } from "react-spinners";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/users",
            {
              headers: {
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setUsers(response.data.data.users);
          } else {
            throw new Error("Failed to fetch user list");
          }
        } else {
          throw new Error("User not logged in");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserList();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (isLoading) {
    return (
      <div className='loading-spinner'>
        <RotateLoader
          css={override}
          color={"#000"}
          loading={isLoading}
          size={150}
        />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>User List</h2>

      <table className='table border'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
