import {Box, Heading} from "@chakra-ui/react";

const Noman = ({display}) => (
    <Box
        display={display}
        w="full"
        justifyContent="center"
        alignItems="center"
        mt={8}
        flexDirection="column"
    >
        <Heading display="inline" as="h3" align="center">
            No&sbquo; man&sbquo; You don&apos;t want that
        </Heading>
    </Box>
)

export default Noman