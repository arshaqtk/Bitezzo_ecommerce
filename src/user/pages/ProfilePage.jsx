import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [editPassword, setEditPassword] = useState(false);
  const [image, setImage] = useState(user.image);
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
      setFormData("");
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

  const handleInputImage = () => {
    // You can add logic here to handle image input
  };

  return (
    <>
      {editPassword ? (
        // User Edit Password Section
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
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
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all duration-200"
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
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all duration-200"
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
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all duration-200"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // User Profile Section
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
            <img
              onClick={handleInputImage}
              src={user.image}
              alt="Profile"
              className="w-28 h-28 mx-auto rounded-full border-4 border-gray-900 shadow-md object-cover transition-transform transform hover:scale-105 cursor-pointer"
            />
            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              {user.username}
            </h3>
            <p className="text-gray-600 text-base mt-2">{user.email}</p>
            <button
              className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
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