import {Box, Image} from "@chakra-ui/react";


const Dollar = () => {

    return (
        <Box
            className="dollar"
            m="auto"
            mb={['-40px', '-140px', '-240px']}
            mt="20px"
            w={[280, 480, 640]}
            h={[200, 400, 580]}
            position="relative"
        >
            <Image w="full" src="/images/dollar.webp" alt="dollar" />
        </Box>
    );
};

export default Dollar;