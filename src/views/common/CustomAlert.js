import { Alert } from "antd";
import { useSelector } from "react-redux";

import { productsError } from "../../application/selectors/selectors";

const CustomAlert = ({type, message}) => { 
    const error = useSelector(productsError)
    const displayOption = error === "" ? "none" : "flex"

    return (
        <Alert message={message} 
               type={type}
               description={error}
               showIcon
               closable
               style={{display: `${displayOption}`}}
        />
    )
}

export default CustomAlert