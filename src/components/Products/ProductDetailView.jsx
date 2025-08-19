import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios_instance from "../../api/axiosConfig"
import Nav from "../NavBar/Nav"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"

function ProductDetailView() {
  let { id } = useParams()
  const [product, setProduct] = useState([])
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext)



  useEffect(() => {
    async function fetchData() {
      const { data } = await Axios_instance.get(`/products?id=${id}`)
      console.log(data)

      const filteredData = data.map(({ id, name, price, image, category, description }) => ({ id, name, price, image, description, category }))
      setProduct(filteredData)
    }
    fetchData()
  }, [])

  return (
    <><Nav />
      <div className="bg-[FAF6E9] min-h-screen py-10">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {product.map((product) => (
            <div
              key={product.id}
              className=" rounded-2xl shadow-xl flex flex-col md:flex-row gap-6 items-center p-4 md:p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl min-h-[300px]"
            >
              {/* Product Image */}
              <div className="flex-1 flex items-center justify-center min-h-[500px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full max-h-[400px] rounded-xl shadow-lg object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 text-gray-700 flex flex-col justify-center min-h-[250px]">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="mt-3 text-gray-700 text-base leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  ₹{product.price}
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  Category:{" "}
                  <span className="font-medium text-blue-400">
                    {product.category}
                  </span>
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  <button className="bg-[#FFD369] text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-[#e6be5c] transition cursor-pointer"
                    onClick={() =>
                      addToCart({
                        user_id: user.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }>
                    Add to Cart
                  </button>
                  <button
                    className="bg-gray-700 text-gray-200 px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 transition cursor-pointer"
                    onClick={() => navigate("/products")}
                  >
                    Back to Shop
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>

  );
}


export default ProductDetailView