import {Container} from "@chakra-ui/react";
import {Heading, Text} from "@chakra-ui/react";

const Currency = ({symbol, children}) => (
    <Container border="2px solid">
        <Heading as='h2' fontSize={50}>{symbol}</Heading>
        <Text fontSize={20}>{children} руб.</Text>
    </Container>
)

export default Currency;