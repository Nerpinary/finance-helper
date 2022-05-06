import {Box, Heading} from "@chakra-ui/react";

const But = ({children}) => (
    <Box
        bg="orange"
        w="full"
        justifyContent="center"
        alignItems="center"
        textAlign='center'
        mt={2}
        flexDirection="column"
        borderRadius={14}
        bgColor='#319795'
        p={5}
    >
        <Heading display="inline" as="h3" align="center">
            НО
        </Heading>
        <Box>
            <p>Если вы будете откладывать 10% от своего дохода, вы накопите всего за</p>
        </Box>
        <Heading display="inline" as="h3" align="center">
            {children}
        </Heading>
    </Box>
)

export default But