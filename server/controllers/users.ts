import User from "../models/User.js";

import { Request, Response } from "express";

interface ControllerProps {
  req: Request;
  res: Response;
}

interface UserFriendsProps {
  _id: string;
  userName: string;
  bio: string;
  picturePath: string;
}

interface UserFriendsCompleteProps {
  _id: string;
  userName: string;
  bio: string;
  picturePath: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
}

interface UserFollowProps {
  _id: string;
  userName: string;
  bio: string;
  picturePath: string;
}

interface UserProps {
  _id: string;
  userName: string;
  bio: string;
  picturePath: string;
  friends: string[];
  followers: string[];
}

/* READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: UserProps | null | undefined = await User.findById(id);

    // any flag
    const friends: UserProps[] | null | undefined | any[] = await Promise.all(
      (user?.friends || []).map((id) => User.findById(id))
    );

    const formattedFriends = friends?.map(
      ({ _id, userName, bio, picturePath }) => {
        return { _id, userName, bio, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: UserProps | null | undefined = await User.findById(id);

    // any flag
    const followers: UserFollowProps[] | null | undefined | any[] =
      await Promise.all((user?.followers || []).map((id) => User.findById(id)));

    const formattedFollowers = followers?.map(
      ({ _id, userName, bio, picturePath }) => {
        return { _id, userName, bio, picturePath };
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user?.friends.includes(friendId)) {
      user.friends = user?.friends.filter((id: string) => id !== friendId);
      if (friend) {
        friend.friends = friend.friends?.filter((id: string) => id !== id);
      }
    } else {
      user?.friends.push(friendId);
      friend?.friends.push(id);
    }
    await user?.save();
    await friend?.save();

    // any flag
    const friends: UserFriendsCompleteProps[] | any[] = await Promise.all(
      (user?.friends || []).map((id: string) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update following

export const addFollowing = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    console.log(user);
    console.log("------------");
    console.log(friend);

    if (user?.friends.includes(friendId)) {
      user.friends = user?.friends.filter((id: string) => id !== friendId);
      if (friend) {
        friend.followers = friend?.followers?.filter((id: string) => id !== id);
      }
    } else {
      user?.friends.push(friendId);
      friend?.followers.push(id);
    }
    await user?.save();
    await friend?.save();

    // any flag
    const friends: UserFriendsProps[] | null | any[] = await Promise.all(
      (user?.friends || []).map((id: string) => User.findById(id))
    );
    const formattedFriends = friends?.map(
      ({ _id, userName, bio, picturePath }) => {
        return { _id, userName, bio, picturePath };
      }
    );

    console.log("------friend after follow event------");
    console.log(user);
    console.log(friend);

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addToWatchList = async (req: Request, res: Response) => {
  try {
    const { id: coinId, name: coinName } = req.body;

    console.log(coinId, coinName);
    const { id } = req.params;
    const user = await User.findById(id);

    // Check if the coin already exists in the watchlist
    const existingCoin = user?.coinWatchList.find(
      (coin: { coinId: string }) => coin.coinId === coinId
    );

    if (existingCoin) {
      return res
        .status(409)
        .json({ message: "Coin already exists in watchlist" });
    }

    // Add the coin to the watchlist
    user?.coinWatchList.push({ coinId, coinName });

    // Save the updated user object
    await user?.save();

    res.status(200).json(user?.coinWatchList);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const removeToWatchList = async (req: Request, res: Response) => {
  try {
    const { id, coinId } = req.params;
    const user = await User.findById(id);

    const coinIndex: number | undefined = user?.coinWatchList.findIndex(
      (coin: { coinId: string }) => coin.coinId === coinId
    );
    console.log(coinIndex);

    if (coinIndex === -1) {
      return res.status(404).json({ message: "Coin not found in watchlist" });
    }

    // Remove the coin from the watchlist
    user?.coinWatchList.splice(coinIndex ? coinIndex : 0, 1);

    // Save the updated user object
    await user?.save();

    res.status(200).json(user?.coinWatchList);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserWatchList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user?.coinWatchList);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
