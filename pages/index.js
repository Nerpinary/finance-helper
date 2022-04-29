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
                    Привет! добро пожаловать в мой Финансовый ассистент
                </Box>

                <Section delay={0.1}>
                    <Heading as="h2" variant="pade-title" align="center">
                        Выбери опцию
                    </Heading>
                </Section>

                <Section delay={0.2}>
                    <SimpleGrid columns={[1,1,2]} gap={6}>
                        <Section>
                            <OptionGridItem id="saveup" title="Сколько мне копить" thumbnail={thumbSaveup}>
                                Сколько мне копить ту или иную сумму?
                            </OptionGridItem>
                        </Section>
                        <Section>
                            <OptionGridItem id="credit" title="Кредит" thumbnail={thumbCredit}>
                                Как много я переплачу за кредит?
                            </OptionGridItem>
                        </Section>
                    </SimpleGrid>
                </Section>

            </Container>
        </Layout>
    )
}

export default Page