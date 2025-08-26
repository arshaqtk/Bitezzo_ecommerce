import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

function AddProduct() {
  
  const navigate=useNavigate()
  const { addProduct } = useContext(ProductContext);


  const [formData, setFormData] = useState({});



 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData)
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
   addProduct(formData )
   }
    
  const onCancel=()=>{
    const res=confirm("Are You Sure Want To Cancel..!")
    if(res){
        navigate("/admin/products")
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-[#0B192C]  p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-violet-400">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-white/80">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white/80">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-white/80">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-white/80">Quantity </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-white/80">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-md border text-white/80"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white/80">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500  text-white bg-[#0B192C]"
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
