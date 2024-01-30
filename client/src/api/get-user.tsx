import axios from "axios";

export const getUser = async (
  userId: string | null | undefined,
  token: string | null
) => {
  const res = await axios.get(`http://localhost:3001/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getWatchList = async (
  userId: string | null | undefined,
  token: string | null
) => {
  const res = await axios.get(`http://localhost:3001/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
