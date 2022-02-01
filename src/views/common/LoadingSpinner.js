import { Spin } from "antd"
import styled from "styled-components"

const LoadinSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const LoadingSpinner = () => {
    return (
        <LoadinSpinnerContainer>
            <Spin tip="Loading" size="large"/>
        </LoadinSpinnerContainer>
    )
}

export default LoadingSpinner