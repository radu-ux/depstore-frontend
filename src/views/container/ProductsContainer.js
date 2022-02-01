import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { fetchProducts, addProduct, showAddProductModal, hideAddProductModal, showDeleteProductModal, hideDeleteProductModal, deleteProduct } from "../../application/action_creators/products_action_creators";
import { productsSelector } from "../../application/selectors/selectors";
import Products from "../presentation/Products";
import LoadingSpinner from "../common/LoadingSpinner";

const ProductsContainer = () => {
  const addProductFormRef = useRef()
  const products = useSelector(productsSelector)
  const [selectedProducts, setSelectedProducts] = useState([])
  const dispatch = useDispatch()

  const handleAddProducts = () => { 
    dispatch(showAddProductModal())
  }

  const handleAddCancel = () => {
    addProductFormRef.current.resetFields()
    dispatch(hideAddProductModal())
  }

  const handleAddOk = () => {
    addProductFormRef.current.submit()
  }

  const handleAddProductFormSuccess = values => { 
    console.log('Success:', values)
    const on_sale = values.productOnSale === "onSale" ? true : false
    dispatch(addProduct({
      name: values.productName,
      description: values.productDescription || "",
      price: parseFloat(values.productPrice),
      quantity: values.productQuantity,
      on_sale: on_sale
    }))
  }

  const handleAddProductFormFailed = errorInfo => { 
    console.log('Failed:', errorInfo)
  }

  const handleDeleteProducts = () => { 
    if(selectedProducts.length > 0) { 
      dispatch(showDeleteProductModal())  
    } else { 
      message.warning("Please chose item to delete", 3)
    }
  }

  const handleDeleteOk = () => {
    selectedProducts.forEach(product => {
      dispatch(deleteProduct(product))
    })
    setSelectedProducts([])
  }

  const handleDeleteCancel = () => {
    dispatch(hideDeleteProductModal()) 
    console.log("Delete CANCEL")
  }

  useEffect(() => { 
    dispatch(fetchProducts())
  }, [fetchProducts])

  return (
    <div>
      {
        products.loading ? 
          <LoadingSpinner /> 
            : 
          <Products addProductFormRef={addProductFormRef}
                    handleAddProducts={handleAddProducts}
                    handleAddCancel={handleAddCancel}
                    handleAddOk={handleAddOk}
                    handleAddProductFormSuccess={handleAddProductFormSuccess}
                    handleAddProductFormFailed={handleAddProductFormFailed}
                    setSelectedProducts={setSelectedProducts}
                    handleDeleteProducts={handleDeleteProducts}
                    handleDeleteOk={handleDeleteOk}
                    handleDeleteCancel={handleDeleteCancel}
          />
      }
    </div>
  );
}

export default ProductsContainer;
