import { Fragment } from "react";
import { setLogout } from "../state";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../state";
import { toast } from "react-toastify";

function classNames(
  ...classes: Array<string | boolean | undefined | null>
): string {
  return classes.filter((className) => !!className).join(" ");
}

interface UserDropdownType {
  userName: string | undefined;
  imagePath: string | undefined;
  userId: string | undefined;
}

const UserDropdown: React.FC<UserDropdownType> = ({
  userName,
  imagePath,
  userId,
}) => {
  const mode = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Menu as="div" className="">
      <div>
        <Menu.Button
          className={`flex items-center  transition-all duration-200 ${
            mode === "light"
              ? "hover:bg-blue-200 border-cyan-500"
              : "hover:bg-slate-800 border-cyan-300"
          } border-[1px]  rounded-full`}
        >
          <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full">
            <img
              className="h-full w-full object-cover rounded-full"
              src={`${imagePath}`}
              alt="user"
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-50 mr-6 mt-2 w-[8rem] origin-top-left rounded-md ${
            mode === "light"
              ? "bg-slate-200 text-slate-900"
              : "bg-[#051925] text-[#ced7e0]"
          }  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate(`/profile/${userId}`)}
                    className={classNames(
                      active
                        ? "transition-all  ease-in-out hover:bg-[#054569]"
                        : "",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm"
                    )}
                  >
                    Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate(`/profile/${userId}/watchlist`)}
                    className={classNames(
                      active
                        ? "transition-all  ease-in-out hover:bg-[#054569]"
                        : "",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm"
                    )}
                  >
                    Dashboard
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      dispatch(setLogout());
                      toast.success("Logged out.");
                      setTimeout(() => {
                        navigate("/home");
                      }, 2000);
                    }}
                    type="submit"
                    className={classNames(
                      active
                        ? "transition-all  ease-in-out hover:bg-[#054569]"
                        : "",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
