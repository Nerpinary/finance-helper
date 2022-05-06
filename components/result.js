import {Box, Heading, useColorModeValue} from "@chakra-ui/react";

const Result = ({resultCredit, text, creditText, children}) => (
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
            <p>{text}</p>
            </Box>
            <Heading display="inline" as="h3" align="center">
                {children}
            </Heading>
            {!! resultCredit &&
                <Box>
                    <p>{creditText}</p>
                    <Heading display="inline" as="h3" align="center">
                        {resultCredit}
                    </Heading>
                </Box>
            }
        </Box>
);

export default Result;