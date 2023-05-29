import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

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
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserList();
  }, []);

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
