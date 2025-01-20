import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Pagination from "../Components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""]
};

function Products ({
  isAuth
}) {
  useEffect(() => {
      getProduct();
  }, [isAuth]);

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const getProduct = async (page = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      alert('取得產品失敗');
    }
  };

  const [modalMode, setModalMode] = useState('');
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

  const openModal = (mode, product) => {
    setModalMode(mode);
    switch (mode) {
      case 'create':
        setTempProduct(defaultModalState);
        break;
      
      case 'edit':
        setTempProduct(product);
        break;
    
      default:
        break;
    }
    setIsProductModalOpen(true);
  };

  const delopenModal = (product) => {
    setTempProduct(product)
    setIsDelProductModalOpen(true);
  };
  
  return(<>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between">
            <h2>產品列表</h2>
            <button onClick={() => openModal('create')} type="button" className="btn btn-primary">建立新的產品</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col">查看細節</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.title}</th>
                <td>{product.origin_price}</td>
                <td>{product.price}</td>
                <td
                  style={{
                    color: product.is_enabled ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}>
                  {product.is_enabled ? '啟用' : '未啟用'}
                </td>
                <td>
                  <div className="btn-group">
                    <button onClick={() => openModal('edit', product)}  type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                    <button onClick={() => delopenModal(product)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分頁 */}
      <Pagination
        getProduct={getProduct}
        pagination={pagination} />

    </div>
    
    {/* Modal */}
    <ProductModal
      tempProduct={tempProduct}
      getProduct={getProduct}
      modalMode={modalMode}
      isOpen={isProductModalOpen}
      setIsOpen={setIsProductModalOpen} />

    {/* 刪除 Modal */}
    <DelProductModal
      tempProduct={tempProduct}
      getProduct={getProduct}
      isDelOpen={isDelProductModalOpen}
      setIsDelOpen={setIsDelProductModalOpen} />
    
  </>
  )
}
export default Products;