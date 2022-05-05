import {Box, Heading, useColorModeValue} from "@chakra-ui/react";

const Result = ({children, months}) => (
        <Box
            p={5}
            borderRadius={20}
            bg={useColorModeValue("whiteAlpha.600", "whiteAlpha.200")}
            w="full"
            justifyContent="center"
            alignItems="center"
            mt={10}
            flexDirection="column"
            textAlign='center'
        >
            <Box>
            <p>Вы накопите эту сумму за</p>
            </Box>
            <Heading display="inline" as="h3" align="center">
                {children}
            </Heading>
            <p>{months}</p>
        </Box>
);

export default Result;