import {Box, Heading, useColorModeValue} from "@chakra-ui/react";
import Section from "./section";

const Result = ({children, display, months}) => (
        <Box
            p={5}
            borderRadius={20}
            bg={useColorModeValue("whiteAlpha.600", "whiteAlpha.200")}
            display={display}
            w="full"
            justifyContent="center"
            alignItems="center"
            mt={10}
            flexDirection="column"
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