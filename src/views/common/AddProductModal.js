import { Form, Modal, Input, InputNumber, Radio } from "antd"
import { useSelector } from "react-redux"
import styled from "styled-components";

import { addProductLoading, addProductModalVisibility } from "../../application/selectors/selectors"; 
import CustomAlert from "./CustomAlert";

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2em;
`

const AddProductModal = ({addProductFormRef, handleAddCancel, handleAddOk, handleAddProductFormSuccess, handleAddProductFormFailed}) => { 
    const modalVisibility = useSelector(addProductModalVisibility)
    const loadingState = useSelector(addProductLoading)

    const renderAddProductForm = () => { 
        return (
            <Form name="basic"
                  labelCol={{span: 4}}
                  wrapperCol={{ offset: 2}}
                  onFinish={handleAddProductFormSuccess}
                  onFinishFailed={handleAddProductFormFailed}
                  ref={addProductFormRef}
            >
                <Form.Item label="Name"
                           name="productName"
                           rules={[{required: true, message: "Please provide product name!"}]} 
                >
                    <Input placeholder="Add name of product"/>
                </Form.Item>

                <Form.Item label="Price"
                           name="productPrice"
                           rules={[{required: true, message: "Please proivde product price!"}]} 
                >
                    <InputNumber step={0.01} min={0.01} stringMode/>
                </Form.Item>

                <Form.Item label="Quantity"
                           name="productQuantity"
                           rules={[{required: true, message: "Please proivde product quantity!"}, {type: "number", min: 0, message: "Qunatity cannot be negative!"}]} 
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item label="On Sale?"
                           name="productOnSale"
                           rules={[{required: true, message:"Please choose sale option!"}]}
                >
                    <Radio.Group>
                        <Radio.Button value="onSale">On Sale</Radio.Button>
                        <Radio.Button value="notOnSale">Not On Sale</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Description"
                           name="productDescription" 
                >
                    <Input.TextArea placeholder="Add description of product"/>
                </Form.Item>
            </Form>
        )
    }

    return (
        <Modal title="ADD PRODUCT"
            visible={modalVisibility}
            width={700}
            onCancel={handleAddCancel}
            onOk={handleAddOk}
            okText="Create"
            confirmLoading={loadingState}
        >   
            <FormWrapper>
                <CustomAlert type="error"
                                message="Error"
                />
                {renderAddProductForm()}
            </FormWrapper>
        </Modal>
        
    )
}

export default AddProductModal