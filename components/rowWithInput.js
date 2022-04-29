import {Container, Input, Select, useColorModeValue} from "@chakra-ui/react";
import {Title} from "./titles";

const RowWithCheckboxInput = ({id, idSelect, display, value, onChange, onChangeSelect, text, type, placeholder}) => (
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
                <Select id={idSelect} onChange={onChangeSelect} bg={useColorModeValue('#f3f9f699', '#f3f9f622')} variant="outline" md="xs" mt={2} w="40%" type="select">
                    <option value="RUB" defaultChecked>RUB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </Select>
            </Container>
        </Container>
);

export default RowWithCheckboxInput;