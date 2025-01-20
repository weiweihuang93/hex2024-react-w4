import axios from "axios";
import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal ({
  getProduct,
  tempProduct,
  isDelOpen,
  setIsDelOpen
}) {
  const delproductModalRef = useRef(null);

  useEffect(() => {
    new Modal(delproductModalRef.current, {
      backdrop: false
    });
  }, []);

  useEffect(() => {
    if (isDelOpen) {
      const modalInstance = Modal.getInstance(delproductModalRef.current);
      modalInstance.show();
    }
  }, [isDelOpen]);

  const delcloseModal = () => {
    const modalInstance = Modal.getInstance(delproductModalRef.current);
    modalInstance.hide();
    setIsDelOpen(false);
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

  return (
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
  )
}
export default DelProductModal;