import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Package, AlertTriangle } from "lucide-react";

const ProductTable = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleDeleteProduct = async (productId) => {
    deleteProduct(productId);
  };

  // 🟣 Counts
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.quantity === 0).length;

  return (
  <div className="p-6 bg-[#0B192C] rounded-xl shadow-md border  space-y-6">
  {/* Header with stats + Add Button */}
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-bold text-violet-200">Product List</h2>
    <button
      onClick={() => navigate("/admin/add-product")}
      className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white font-medium rounded-lg shadow-sm transition"
    >
      + Add Product
    </button>
  </div>

  {/* Stats Row */}
  <div className="flex gap-6">
    <div className="flex items-center gap-3 bg-[#13223C] px-4 py-3 rounded-lg border border-violet-200">
      <Package className="text-violet-300 h-6 w-6" />
      <span className="text-violet-200 font-medium">
        Total Products: {totalProducts}
      </span>
    </div>
    <div className="flex items-center gap-3 bg-[#241C1C] px-4 py-3 rounded-lg border border-red-800">
      <AlertTriangle className="text-red-300 h-6 w-6" />
      <span className="text-red-300 font-medium">
        Out of Stock: {outOfStock}
      </span>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto rounded-lg border border-violet-200">
    <table className="w-full border-collapse">
      <thead className="bg-[#13223C]">
        <tr>
          {["ID", "Image", "Name", "Description", "Category", "Price", "Quantity", "Action"].map(
            (heading) => (
              <th
                key={heading}
                className="px-6 py-3 text-left text-gray-300 font-medium"
              >
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="border-b border-violet-900 hover:bg-[#101B2E] transition"
          >
            <td className="px-6 py-3 text-gray-400">{product.id}</td>
            <td className="px-6 py-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-md border border-violet-800"
              />
            </td>
            <td className="px-6 py-3 font-medium text-violet-200">
              {product.name}
            </td>
            <td className="px-6 py-3 text-gray-400">{product.description}</td>
            <td className="px-6 py-3 text-gray-400">{product.category}</td>
            <td className="px-6 py-3 font-semibold text-violet-200">
              ₹{product.price}
            </td>
            <td className="px-6 py-3">
              {product.quantity === 0 ? (
                <span className=" py-1 text-sm font-medium text-red-500 rounded-full">
                  Out Of Stock
                </span>
              ) : (
                <span className="px-3 py-1 text-sm font-medium text-gray-200 border border-violet-700 rounded-full">
                  {product.quantity}
                </span>
              )}
            </td>

            <td className="px-6 py-3 text-center">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-product/${product.id}`)
                  }
                  className="px-3 py-1 border border-violet-600 text-violet-200 rounded-md font-medium hover:bg-violet-700 hover:text-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="px-3 py-1 border border-red-600 text-red-300 rounded-md font-medium hover:bg-red-700 hover:text-white transition"
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
