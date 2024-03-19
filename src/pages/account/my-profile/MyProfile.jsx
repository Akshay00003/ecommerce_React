import { useEffect, useState } from "react";
import Sidebar from "../../../shared/sidebar/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, serProfile] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get("http://localhost:5555/profile/" + id);

      serProfile(response.data);

      console.log(response.data);
    };
    fetchProfile();
  }, [id]);
  const handleChange = (e) => {
    const { value, name } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };
  console.log("usestate res is", profile);
  const handleCreate = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    axios
      .post("http://localhost:5555/profile/create", {
        ...inputValue,
        userId: id,
      })
      .then((res) => console.log(res.data));
    // navigate(`/my-profile/${id}`)
    window.location.reload();
  };
  return (
    <div className="mx-auto">
      <div className="flex">
        <div className="w-1/4">
          <Sidebar id={id} />
        </div>
        <div className="w-3/4 py-6 bg-gray-200">
          {profile.length > 0 ? (
            profile.map(({ name, email, mobileNo, _id }) => (
              <form key={_id} className="w-full h-full bg-white flex flex-col">
                <div className="flex flex-col gap-12 p-6">
                  <div className="flex gap-6 items-center">
                    <p className="text-xl font-semibold">Personal Info</p>
                    <p className="text-blue-500 font-medium">Edit</p>
                  </div>
                  <input
                    className="w-1/4 h-12 border-2"
                    type="text"
                    onChange={handleChange}
                    value={name}
                    name="name"
                    id="name"
                  />
                </div>
                <div className="flex flex-col gap-12 p-6">
                  <div className="flex gap-6 items-center">
                    <p className="text-xl font-semibold">Email Address</p>
                    <p className="text-blue-500 font-medium">Edit</p>
                  </div>
                  <input
                    className="w-1/4 h-12 border-2"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex flex-col gap-12 p-6">
                  <div className="flex gap-6 items-center">
                    <p className="text-xl font-semibold">Mobile Number</p>
                    <p className="text-blue-500 font-medium">Edit</p>
                  </div>
                  <input
                    className="w-1/4 h-12 border-2"
                    type="text"
                    onChange={handleChange}
                    value={mobileNo}
                    name="mobileNo"
                    id="mobile"
                  />
                </div>
              </form>
            ))
          ) : (
            <form
              onSubmit={handleCreate}
              className="w-full h-full bg-white flex flex-col"
            >
              <div className="flex flex-col gap-12 p-6">
                <div className="flex gap-6 items-center">
                  <p className="text-xl font-semibold">Personal Info</p>
                  <p className="text-blue-500 font-medium">Edit</p>
                </div>
                <input
                  className="w-1/4 h-12 border-2"
                  type="text"
                  onChange={handleChange}
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col gap-12 p-6">
                <div className="flex gap-6 items-center">
                  <p className="text-xl font-semibold">Email Address</p>
                  <p className="text-blue-500 font-medium">Edit</p>
                </div>
                <input
                  className="w-1/4 h-12 border-2"
                  type="email"
                  onChange={handleChange}
                  name="email"
                  id="email"
                />
              </div>
              <div className="flex flex-col gap-12 p-6">
                <div className="flex gap-6 items-center">
                  <p className="text-xl font-semibold">Mobile Number</p>
                  <p className="text-blue-500 font-medium">Edit</p>
                </div>
                <input
                  className="w-1/4 h-12 border-2"
                  type="number"
                  onChange={handleChange}
                  name="mobileNo"
                  id="mobileNo"
                />
              </div>
              <div className="flex flex-col p-6">
                <div className="flex items-center">
                  <button
                    className="w-1/4 h-12 bg-orange-500 mt-10 rounded-lg text-white font-bold text-lg"
                    type="submit"
                  >
                    Create Profile
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
