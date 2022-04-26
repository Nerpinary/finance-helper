import {
    Container,
    Box,
    Heading,
    Image,
    useColorModeValue,
    Button
} from "@chakra-ui/react";
import NextLink from "next/link";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import Layout from "../components/layouts/article";
import {ChevronRightIcon} from "@chakra-ui/icons";

const Page = () => {
    return (
        <Layout>
            <Container>
                <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
                    Hello!
                </Box>

            </Container>
        </Layout>
    )
}

export default Page