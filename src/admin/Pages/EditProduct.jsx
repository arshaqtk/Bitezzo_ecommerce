import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { ProductContext } from "../../context/ProductContext";

function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()

  const { editProduct } = useContext(ProductContext);



  const fetchData = async () => {
    try{
      const response = await Axios_instance.get(`/products/${id}`)
    const productData = Array.isArray(response.data) ? response.data[0] : response.data;

    setProduct(productData)
    setFormData({
      name: productData?.name || "",
      description: productData?.description || "",
      price: productData?.price || "",
      image: productData?.image || "",
      category: productData?.category || "",
      quantity: productData?.quantity || "",


    });
   
    }catch (error) {
      console.error("Error fetching product:", error);
    }

    
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  editProduct(id,formData)
  };

  const onCancel = () => {
    const res = confirm("Are You Sure Want To Cancel..!")
    if (res) {
      navigate("/admin/products")
    }
  }


  return (
    <div className="max-w-lg mx-auto bg-[#0B192C] p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-violet-400">Update Product</h2>

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
              className="mt-2 w-24 h-24 object-cover rounded-md border"
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
            className="mt-1 text-white/80 w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-[#0B192C]"
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

export default EditProduct
