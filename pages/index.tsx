import {useEffect, useState} from "react";
import axios from "axios";
import {
    Container,
    Box,
    Heading,
    useColorModeValue,
    SimpleGrid,
    GridItem
} from "@chakra-ui/react";
import Section from "../components/section";
import Layout from "../components/layouts/article";
import {OptionGridItem} from "../components/grid-item";
import Currency from '../components/currency'
import thumbSaveup from "../public/images/saveup.webp";
import thumbCredit from "../public/images/credit.webp";
import thumbChill from '../public/images/chill.webp'

type Currency = {
    Value: number
}

/* eslint-disable no-unused-vars */
type Currencies = {
    [key in string]: Currency
}

const Page = () => {
    const [currency, setCurrency] = useState<Currencies>({})

    /* eslint-disable react-hooks/exhaustive-deps*/
    useEffect(() => {
        axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((res) => {
                setCurrency(prevState => res.data.Valute)
            })
            .catch(e => console.log(e))
    }, [])

    /* eslint-disable react-hooks/rules-of-hooks*/
    // @ts-ignore
    return (
        <Layout title={'Home'}>
            <Container>
                <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} textAlign="center">
                    <Heading as='h1' fontWeight={500} fontSize={16}>Привет! добро пожаловать в ваш Финансовый ассистент</Heading>
                </Box>

                {!! currency.USD && !!currency.EUR &&(
                    <Box borderRadius="lg" bg={useColorModeValue('green.200', 'green.900')} p={3} mb={6} textAlign="center">
                        <Heading fontWeight={500} fontSize={20}>Актуальные курсы валют</Heading>
                        <Section delay={0.1}>
                            <SimpleGrid mt={2} columns={2} spacing={6}>
                                <GridItem>
                                    <Currency symbol='&#36;'>{Math.floor(currency.USD.Value * 100) / 100}</Currency>
                                </GridItem>
                                <GridItem>
                                    <Currency symbol='&#8364;'>{Math.floor(currency.EUR.Value * 100) / 100}</Currency>
                                </GridItem>
                            </SimpleGrid>
                        </Section>
                    </Box>
                )}

                <Section delay={0.1}>
                    <Heading as="h2" variant="pade-title" textAlign="center">
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
                        <Section>
                            <OptionGridItem id="chill" title="Отдохни" thumbnail={thumbChill}>
                                Отдохни и понаблюдай как со временем на твой счет падают деньги
                            </OptionGridItem>
                        </Section>
                    </SimpleGrid>
                </Section>

            </Container>
        </Layout>
    )
}

export default Page