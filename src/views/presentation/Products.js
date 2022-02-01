import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button, Empty } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import AddProductModal from "../common/AddProductModal";
import ProductsTable from "../common/ProductsTable";
import { productsSelector } from "../../application/selectors/selectors";
import AddProductBtn from "../common/AddProductBtn";
import DeleteProductsModal from "../common/DeleteProductsModal";

const ProductsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2em;
    justify-content: center;
    margin: 0 5rem;
`

const ProductsTableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const EmptyProductsCollectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const ProductsTableActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1em;
`

const Products = ({addProductFormRef, handleAddProducts, 
                   handleAddCancel, handleAddOk, 
                   handleAddProductFormSuccess, handleAddProductFormFailed, 
                   setSelectedProducts, handleDeleteProducts,
                   handleDeleteOk, handleDeleteCancel}) => { 
    const products = useSelector(productsSelector)
    
    const renderNoProductsCase = () => {
        return (
            <EmptyProductsCollectionWrapper>
                {renderEmptyCollectionBadge()}
                {renderAddProductModal()}
                <AddProductBtn onClick={handleAddProducts} />
            </EmptyProductsCollectionWrapper>
        )
    }

    const renderProductsCase = () => {  
        return (
            <ProductsWrapper>
                <ProductsTableWrapper>
                    {renderProductsTable()}
                    {renderProductsTableActions()}
                </ProductsTableWrapper>
                {renderAddProductModal()}
                {renderDeleteProductsModal()}
            </ProductsWrapper>
        )
    }

    const renderProductsTable = () => { 
        return (
            <ProductsTable setSelectedProducts={setSelectedProducts}/>
        )
    }

    const renderProductsTableActions = () => { 
        return (
            <ProductsTableActionsWrapper>
                <AddProductBtn onClick={handleAddProducts} />
                <Button type="primary" 
                        icon={<DeleteOutlined />} 
                        onClick={handleDeleteProducts}
                        danger
                >
                    Delete Product(s)
                </Button>
                <Button type="primary" 
                        icon={<EditOutlined />} 
                >
                    Edit Product
                </Button>
            </ProductsTableActionsWrapper>
        )
    }

    const renderAddProductModal = () => {
        return (
            <AddProductModal addProductFormRef={addProductFormRef}                            
                             handleAddCancel={handleAddCancel}
                             handleAddOk={handleAddOk}
                             handleAddProductFormSuccess={handleAddProductFormSuccess}
                             handleAddProductFormFailed={handleAddProductFormFailed}
                /> 
        )
    }

    const renderDeleteProductsModal = () => { 
        return (
            <DeleteProductsModal handleDeleteOk={handleDeleteOk}
                                 handleDeleteCancel={handleDeleteCancel}
            />
        )
    }

    const renderEmptyCollectionBadge = () => { 
        return (
            <Empty imageStyle={{
                        height: 150,
                    }}
                    description="No products available" />
        )
    }

    return (
        products.productsArray.length === 0 ? renderNoProductsCase() : renderProductsCase()    
    )
}

export default Products