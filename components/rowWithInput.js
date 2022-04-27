import {Container, Input, Select, useColorModeValue} from "@chakra-ui/react";
import {Title} from "./titles";

const RowWithCheckboxInput = ({id, display, value, onChange, text, type, placeholder}) => (
        <Container
            w="full"
            display={display}
            flexWrap="wrap"
            alignItems="center"
            p={2}
            justifyContent="space-between"
            flexDirection="row"
            textAlign="center"
        >
            <Title align="center" pl={2} w="50%">{text}</Title>
            <Container
                w="full"
                display="flex"
                flexDirection="row"
            >
                <Input bg={useColorModeValue('#f3f9f699', '#f3f9f622')} id={id} value={value} onChange={onChange} mr={2} mt={2} w="60%" type={type} placeholder={placeholder} />
                <Select bg={useColorModeValue('#f3f9f699', '#f3f9f622')} variant="outline" md="xs" mt={2} w="40%" type="select">
                    <option>RUB</option>
                    <option>USD</option>
                    <option>EUR</option>
                </Select>
            </Container>
        </Container>
);

export default RowWithCheckboxInput;