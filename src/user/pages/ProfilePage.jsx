import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Nav from "../components/NavBar/Nav";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [editPassword, setEditPassword] = useState(false);
  const [image, setImage] = useState(user.image)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Password and confirm password are not the same");
        return;
      }


      if (formData.newPassword.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }


      const response = await Axios_instance.get(`/users?id=${user.id}`);
      const userData = response.data[0];

      if (userData.password !== formData.currentPassword) {
        toast.error("Current password is wrong");
        return;
      }

      await Axios_instance.patch(`/users/${user.id}`, {
        password: formData.newPassword,
      });
      toast.success("Password updated");
      setEditPassword(false);
      setFormData("")
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};



const onCancel = () => {
  const res = confirm("Are you sure you want to cancel?");
  if (res) {
    setEditPassword(false);
  }
};

const handleInputImage=()=>{

}



return (
  <>
    
    {editPassword ? (
       //User__EditPassword_____Section
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Change Password
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your account password
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                required
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

           
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                required
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

           
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : 
    //UserProfile_____Section
    (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center mt-25">
          <img
          onClick={handleInputImage}
            src={user.image}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
          />

          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {user.username}
          </h3>

          <p className="text-gray-500 text-sm mt-1">{user.email}</p>

          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
            onClick={() => setEditPassword(true)}
          >
            Update Password
          </button>
        </div>
      </div>
    )}
  </>
);
}

export default ProfilePage;
