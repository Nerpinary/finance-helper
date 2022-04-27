import {Box, Heading} from "@chakra-ui/react";

const Result = ({children, display}) => (
        <Box
            display={display}
            w="full"
            justifyContent="center"
            alignItems="center"
            mt={10}
            flexDirection="column"
        >
            <Box>
            <p>You will be able to accumulate this amount in</p>
            </Box>
            <Heading display="inline" as="h3" align="center">
                {children}
            </Heading>
            <p>months</p>
        </Box>
);

export default Result;