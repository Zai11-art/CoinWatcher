import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";

import { setPosts } from "../../../state";
import { RootState } from "../../../state";

const MyPostWidget = ({ picturePath }: { picturePath: string }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState("");
  const token = useSelector((state: RootState) => state.token);
  const mode = useSelector((state: RootState) => state.mode);
  const userState = useSelector((state: RootState) => state.user);
  const _id = userState?._id ?? "";

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image["name"]);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    console.log(posts);
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");

    response &&
      toast.success("Posted successfully", {
        theme: `${mode === "light" ? "light" : "colored"}`,
      });
  };

  return (
    <div
      className={`mb-8 h-[200px] w-full rounded-lg ${
        mode === "light"
          ? "bg-slate-200 text-blue-900 shadow-xl"
          : "bg-[#062c43] text-white"
      }  p-6`}
    >
      <div className="flex justify-between">
        <div className="h-12 w-12">
          <img
            src={`${picturePath}`}
            alt=""
            className="h-12 w-12 rounded-full"
          />
        </div>
        <input
          onChange={(e) => setPost(e.target.value)}
          value={post}
          type="text"
          className={`mx-3 w-[90%] rounded-2xl ${
            mode === "light"
              ? "bg-slate-300/50 text-blue-900"
              : "bg-[#030c11] text-white"
          }`}
          placeholder="Tweet it anon..."
        />
      </div>

      {/* break */}
      <div
        className={`my-6 h-[0.1px] w-full ${
          mode === "light" ? "bg-blue-400" : "bg-blue-300"
        } `}
      />
      <div className="items-around flex flex-row justify-between">
        
        <Dropzone
          acceptedFiles=".png,.gif,.jpeg,.jpg"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          {...({ acceptedFiles: "" } as any)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className={`mr-6 flex flex-row items-center rounded-lg border-[0.5px] border-dashed ${
                mode === "light" ? "border-blue-800" : "border-blue-200"
              }  px-5`}
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!image ? (
                  <div className="flex h-10 cursor-pointer items-center justify-center py-1 transition-all ease-in-out hover:scale-[1.01]">
                    <span className="text-md flex md:text-xl lg:text-xl xl:text-2xl">
                      <IoImageOutline />
                    </span>
                    <p className="xl:text-md ml-2 text-sm  md:text-lg lg:text-lg">
                      Add Image Here
                    </p>
                  </div>
                ) : (
                  <div className="ml-2 cursor-pointer  transition-all ease-in-out hover:scale-[1.04]">
                    {image.name.slice(0, 20) + "...." + "(click to change)"}
                  </div>
                )}
              </div>
              {image && (
                <div onClick={() => setImage(null)} className="flex">
                  <span className="mt-1 cursor-pointer text-4xl text-red-300 transition-all ease-in-out hover:scale-[1.1]">
                    <IoCloseOutline />
                  </span>
                </div>
              )}
            </div>
          )}
        </Dropzone>

        <button
          disabled={!post}
          onClick={() => {
            handlePost();
          }}
          className={`rounded-lg ${
            mode === "light"
              ? "newscard-filter-light text-glow border-[1px] border-blue-300 text-blue-900 hover:text-white"
              : "bg-blue-500 hover:bg-blue-200 hover:text-black "
          }  xl:text-md ml-2 px-6 text-sm  font-semibold transition-all ease-in-out
          md:text-lg lg:text-lg `}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default MyPostWidget;
