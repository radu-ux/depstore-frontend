import Modal from "antd/lib/modal/Modal";
import { useSelector } from "react-redux";

import { deleteProductModalVisibility, deleteProductLoading } from "../../application/selectors/selectors";

const DeleteProductsModal = ({handleDeleteOk, handleDeleteCancel}) => { 
    const modalVisibility = useSelector(deleteProductModalVisibility)
    const loadingState = useSelector(deleteProductLoading)

    return (
        <Modal title="DELETE PRODUCTS"
               onOk={handleDeleteOk}
               onCancel={handleDeleteCancel}
               visible={modalVisibility}
               okText="Delete"
               confirmLoading={loadingState}
        >
            Are you sure you want to delete selected products?
        </Modal>
    )
}

export default DeleteProductsModal