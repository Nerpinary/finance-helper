import {Container, Input, Select} from "@chakra-ui/react";
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
                <Input id={id} value={value} onChange={onChange} mr={2} mt={2} w="80%" type={type} placeholder={placeholder} />
                <Select mt={2} w="20%" type="select">
                    <option>RUB</option>
                    <option>USD</option>
                    <option>EUR</option>
                </Select>
            </Container>
        </Container>
);

export default RowWithCheckboxInput;