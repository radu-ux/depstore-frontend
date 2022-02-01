import { useSelector } from "react-redux"
import { productsSelector } from "../../application/selectors/selectors"

import { Table } from "antd"

const ProductsTable = ({setSelectedProducts}) => {
    const products = useSelector(productsSelector)

    const dateToUTCString = dateAsString => {
        return new Date(dateAsString).toUTCString()
    }

    const columns = [
        {
            title: "Product Name" ,
            dataIndex: "name",
            key: "name"
        }, 
        {
            title: "Price (RON)" ,
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Quantity" ,
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "On Sale" ,
            dataIndex: "on_sale",
            key: "on_sale"
        },
        {
            title: "Created At" ,
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: "Updated At" ,
            dataIndex: "updated_at",
            key: "updated_at"
        },
    ]

    const dataSource = products.productsArray.map(
        product => ({
            ...product, 
            key: product.id, 
            on_sale: product.on_sale.toString(), 
            created_at: dateToUTCString(product.created_at), 
            updated_at: dateToUTCString(product.updated_at)
        })
    )

    const rowSelection = { 
        onChange: (selectedRowKeys, selectedRows) => { 
            if(selectedRows.length > 0) {
                console.log(selectedRowKeys, selectedRows)
                setSelectedProducts(selectedRows)
            } else { 
                setSelectedProducts([])
            }
        }
    }

    const renderProductsTable = () => { 
        return (
            <Table columns={columns} 
                   dataSource={dataSource} 
                   rowSelection={{
                        tyoe: "checkbox",
                        ...rowSelection
                    }}
            />
        )
    }

    return (
        renderProductsTable()
    )
}

export default ProductsTable