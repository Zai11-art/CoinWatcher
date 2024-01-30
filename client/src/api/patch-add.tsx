import axios from "axios";

export const addToWatchList = async (
  coin: object,
  userId: string | undefined | null,
  token: string | undefined | null
) => {
  const res = await axios.post(`http://localhost:3001/users/${userId}`, coin, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const removetoWatchList = async (
  coinId: string | undefined | null,
  userId: string | undefined | null,
  token: string | undefined | null
) => {
  const response = await axios.delete(
    `http://localhost:3001/users/${userId}/${coinId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
