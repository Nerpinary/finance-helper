import {Box, Heading} from "@chakra-ui/react";

const But = ({children, display}) => (
    <Box
        display={display}
        w="full"
        justifyContent="center"
        alignItems="center"
        mt={2}
        flexDirection="column"
    >
        <Heading display="inline" as="h3" align="center">
            BUT
        </Heading>
        <Box>
            <p>If you save 10% of your salary, you will save faster, in just</p>
        </Box>
        <Heading display="inline" as="h3" align="center">
            {children}
        </Heading>
        <p>months</p>
    </Box>
)

export default But