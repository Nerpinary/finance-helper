import {Container, Heading, useColorModeValue} from "@chakra-ui/react";

const ChillCounter = ({children}) => {
    return (
        <Container
            display='flex'
            flexDirection='row'
            justifyContent='center'
            bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
            p={2}
            borderRadius={8}
        >
            <Heading as='h2' fontSize={50} mr={2}>
            {children}
            </Heading>
            <p>руб.</p>
        </Container>
    )
}

export default ChillCounter