import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios_instance from "../../api/axiosConfig";

const ProductTable = () => {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();


  const handleDeleteProduct = async (productId) => {
    try {
      const response = confirm("Are you sure want to delete?");
      if (response) {
        await Axios_instance.delete(`products/${productId}`);
        toast.success("Product Deleted");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error Occurred");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-violet-200">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-violet-900">Product List</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-violet-50">
            <tr>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-violet-900 font-semibold">Quantity</th>
              <th className="px-6 py-3 text-center text-violet-900 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-violet-100 transition border-b border-violet-200"
              >
                <td className="px-6 py-3 text-violet-900">{product.id}</td>
                <td className="px-6 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-violet-300"
                  />
                </td>
                <td className="px-6 py-3 font-medium text-violet-900">{product.name}</td>
                <td className="px-6 py-3 text-gray-800">{product.description}</td>
                <td className="px-6 py-3 text-gray-800">{product.category}</td>
                <td className="px-6 py-3 font-semibold text-violet-900">₹{product.price}</td>
                <td className="px-6 py-3 text-gray-800">{product.quantity}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-between gap-4">
                    
                    <button
                      onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                      className="px-4 py-2 border border-violet-600 text-gray-800 rounded-lg font-semibold hover:bg-violet-50 transition shadow-sm"
                    >
                      Edit
                    </button>

                    
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-4 py-2 border border-red-500 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
