import {Box, Button, Container} from "@chakra-ui/react";
import Layout from "../components/layouts/article";
import {useState} from "react";
import Section from "../components/section";
import RowWithoutSelect from "../components/rowWithoutSelect";
import Result from "../components/result";
import {getCountString} from "../utils/utils";

type Field = {
    id: keyof State
    placeholder: string
    delay: number
    text: string
}

const fields: Field[] = [
    {
        id: 'sum',
        placeholder: 'Введите сумму',
        delay: 0.1,
        text: 'Введите сумму кредита'
    },
    {
        id: 'term',
        placeholder: 'Введите срок (мес.)',
        delay: 0.2,
        text: 'Введите срок кредита в месяцах'
    },
    {
        id: 'percent',
        placeholder: 'Введите ставку (%)',
        delay: 0.3,
        text: 'Введите годовую процентную ставку по кредиту'
    }
]

type FieldNames = 'sum' | 'term' | 'percent'

/* eslint-disable no-unused-vars */
type State = {
    [key in FieldNames]: {
        value: string
    }
}

type Result = string | undefined

const Credit = () => {

    const [state, setState] = useState<State>({
        sum: {value: ''},
        term: {value: ''},
        percent: {value: ''}
    })
    const [result, setResult] = useState<Result>(undefined)
    const [resultCredit, setResultCredit] = useState<Result>(undefined)

    const handleResReset = () => {
        if (result !== undefined) {
            setResult (undefined)
        }
    }

    const handleFieldValue = (value: string, key: keyof State) => {
        handleResReset()
        setState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                value
            },
        }))
        console.log(state)
    }

    const handleResetFields = () => {
        setState({
            sum: {value: ''},
            term: {value: ''},
            percent: {value: ''}
        })
        handleResReset()
    }

    const handleCalculate = () => {
        let p = +state.percent.value / 1200
        let a = p * Math.pow((1 + p), +state.term.value) / (Math.pow((1 + p), +state.term.value) - 1)
        a = (Math.ceil(a * 10000)) / 10000
        let mp = a * +state.sum.value
        let total = getCountString((Math.floor(+state.term.value * mp * 100)) / 100 , ['рубль', 'рубля', 'рублей'])
        let over = getCountString((Math.floor((+state.term.value * mp - +state.sum.value) * 100)) / 100, ['рубль', 'рубля', 'рублей'])
        setResult(total)
        setResultCredit(over)
    }

    return (
        <Layout title='Loan'>
            <Container alignItems='center'>
                {fields.map(field => {
                    return(
                        <Section delay={field.delay} key={field.id}>
                            <RowWithoutSelect
                                id={field.id}
                                value={state[field.id].value}
                                onChange={(e) => {
                                    handleFieldValue(e.target.value, field.id)
                                }}
                                type='number'
                                placeholder={field.placeholder}
                                text={field.text}
                            />
                        </Section>
                    )
                })}
                <Section delay={0.4}>
                    <Box display="flex" flexDirection="row" w="full" justifyContent="center">
                        <Button mr={9} colorScheme="teal" onClick={handleCalculate}>Расчитать</Button>
                        <Button colorScheme="red" onClick={handleResetFields}>Очистить</Button>
                    </Box>
                </Section>
                {!!result && (
                    <Result creditText='и из них переплаты' resultCredit={resultCredit} text='Всего вы заплатите'>{result}</Result>
                )}
            </Container>
        </Layout>
    );
};


export default Credit;