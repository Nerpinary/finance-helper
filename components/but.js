import {Box, Heading} from "@chakra-ui/react";

const But = ({children, display, months}) => (
    <Box
        display={display}
        w="full"
        justifyContent="center"
        alignItems="center"
        mt={2}
        flexDirection="column"
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
        <p>{months}</p>
    </Box>
)

export default But