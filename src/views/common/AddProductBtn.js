import { Button } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"

const AddProductBtn = ({onClick}) =>  { 
    return (
        <Button type="primary" 
                    icon={<PlusCircleOutlined />}
                    onClick={onClick}
            >
                ADD PRODUCT
        </Button>
    )
}

export default AddProductBtn