import {Container, Input, useColorModeValue} from "@chakra-ui/react";
import {Title} from "./titles";

const RowWithoutSelect = ({id, value, onChange, type, placeholder, text}) => (
    <Container
        w="full"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        p={2}
        justifyContent="space-between"
        flexDirection="row"
        textAlign="center"
    >
        <Title>{text}</Title>
        <Input textAlign='center' bg={useColorModeValue('#f3f9f699', '#f3f9f622')} id={id} value={value} onChange={onChange} mr={2} mt={2} w="100%" type={type} placeholder={placeholder} />
    </Container>
)

export default RowWithoutSelect