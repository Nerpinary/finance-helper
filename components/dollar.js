import {Box, Image, Spinner} from "@chakra-ui/react";


const Dollar = () => {

    return (
        <Box
            className="dollar"
            m="auto"
            at={['-20px', '-60px', '-120px']}
            mb={['-40px', '-140px', '-240px']}
            mt="20px"
            w={[280, 480, 640]}
            h={[200, 400, 580]}
            position="relative"
        >
            <Image w="full" src="/images/dollar.png" alt="dollar" />
        </Box>
    );
};

export default Dollar;