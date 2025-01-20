import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import Pagination from "../Components/Pagination";
import ProductModal from "../components/ProductModal";

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

  const delproductModalRef = useRef(null);
  const [modalMode, setModalMode] = useState('');
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    // new Modal(productModalRef.current, {
    //   backdrop: false
    // });

    new Modal(delproductModalRef.current, {
      backdrop: false
    });
  }, []);

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
    // const modalInstance = Modal.getInstance(productModalRef.current);
    // modalInstance.show();
    setIsProductModalOpen(true);
  };

  // const closeModal = () => {
  //   const modalInstance = Modal.getInstance(productModalRef.current);
  //   modalInstance.hide();
  // };

  const delopenModal = (product) => {
    setTempProduct(product)
    const modalInstance = Modal.getInstance(delproductModalRef.current);
    modalInstance.show();
  };

  const delcloseModal = () => {
    const modalInstance = Modal.getInstance(delproductModalRef.current);
    modalInstance.hide();
  };

  const delProduct = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`);
      getProduct();
      delcloseModal();
    } catch (error) {
      alert('刪除產品失敗');
    }
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
    <div
      ref={delproductModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              onClick={delcloseModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除 
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              onClick={delcloseModal}
              type="button"
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              onClick={delProduct}
              type="button" className="btn btn-danger">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
export default Products;