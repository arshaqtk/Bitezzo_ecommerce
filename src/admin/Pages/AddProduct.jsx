import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";

function AddProduct() {
  

  const [formData, setFormData] = useState({});
  const navigate=useNavigate()



 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData)
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
   try {
  const res = await Axios_instance.post("/products", formData);
  toast.success("Product added:", res.data.name);
  navigate("/admin/products")
} catch (error) {
  console.error("Error adding product:", error);
}
   }
    
  const onCancel=()=>{
    const res=confirm("Are You Sure Want To Cancel..!")
    if(res){
        navigate("/admin/products")
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="drinks">Drinks</option>
            <option value="snacks">Snacks</option>
            <option value="gravy">Gravy</option>
            <option value="fastfood">FastFood</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>

        {/* Buttons */}
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
  );
}

export default AddProduct
