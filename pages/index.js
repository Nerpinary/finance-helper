import {
    Container,
    Box,
    Heading,
    useColorModeValue,
    SimpleGrid
} from "@chakra-ui/react";
import Section from "../components/section";
import Layout from "../components/layouts/article";
import {OptionGridItem} from "../components/grid-item";
import thumbSaveup from "../public/images/saveup.jpg";
import thumbCredit from "../public/images/credit.jpg";

const Page = () => {
    return (
        <Layout>
            <Container>
                <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
                    Hello! Wellcome to my Finance Helper!
                </Box>

                <Section delay={0.1}>
                    <Heading as="h2" variant="pade-title" align="center">
                        Pleace, choose option
                    </Heading>
                </Section>

                <Section delay={0.2}>
                    <SimpleGrid columns={[1,1,2]} gap={6}>
                        <Section>
                            <OptionGridItem id="saveup" title="Save up" thumbnail={thumbSaveup}>
                                How long should I save for this purchase?
                            </OptionGridItem>
                        </Section>
                        <Section>
                            <OptionGridItem id="credit" title="Credit" thumbnail={thumbCredit}>
                                How much will I pay for my loan?
                            </OptionGridItem>
                        </Section>
                    </SimpleGrid>
                </Section>

            </Container>
        </Layout>
    )
}

export default Page