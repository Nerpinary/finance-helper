import {useEffect, useState} from "react";
import {Box, Button, Container} from "@chakra-ui/react";
import axios from "axios";
import Section from "../components/section";
import RowWithCheckboxInput from "../components/rowWithInput";
import {months1, months2} from '../lib/months'
import Result from "../components/result";
import But from '../components/but'
import Noman from '../components/noman'

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
        text: 'Введите сумму, которую хотите накопить'
    },
    {
        id: 'salary',
        placeholder: 'Введите доход',
        delay: 0.3,
        text: 'Введите ваш ежемесячный доход'
    },
    {
        id: 'save',
        placeholder: 'Введите сумму',
        delay: 0.5,
        text: 'Сколько денег вы готовы откладывать ежемесячно?'
    }
]

type FieldNames = 'sum' | 'salary' | 'save'

/* eslint-disable no-unused-vars */
type State = {
    [key in FieldNames]: {
        value: string,
        currency: string
    }
}

type Currency = {
    Value: number
}

/* eslint-disable no-unused-vars */
type Currencies = {
    [key in string]: Currency
}

type Result = {
    res: number | undefined
    month: string
}

const Saveup = () => {

    const [state, setState] = useState<State>({
        sum: {
            value: '',
            currency: 'RUB'
        },
        salary: {
            value: '',
            currency: 'RUB'
        },
        save: {
            value: '',
            currency: 'RUB'
        }
    })
    const [result, setResult] = useState<Result>({
        res: undefined,
        month: ''
    })
    const [but, setBut] = useState<Result>({
        res: undefined,
        month: ''
    })
    const [currency, setCurrency] = useState<Currencies>({})
    const [noman, setNoman] = useState(false)

    /* eslint-disable react-hooks/exhaustive-deps*/
    useEffect(() => {
        axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((res) => {
                setCurrency(res.data.Valute)
                console.log(currency)
            })
            .catch(e => console.log(e))
    }, [])

    const initialItemState = {
        value: '',
        currency: 'RUB'
    }

    const initialResState = {
        res: undefined,
        month: ''
    }

    const handleResReset = () => {
        if (result.res !== undefined || but.res !== undefined) {
            setResult (initialResState)
            setBut(initialResState)
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
    }

    const handleFieldValute = (currency: string, key: keyof State) => {
        handleResReset()
        setState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                currency
            },
        }))
    }

    const handleResetFields = () => {

        setState({
            sum: initialItemState,
            salary: initialItemState,
            save: initialItemState
        })
        setResult(initialResState)
        setBut(initialResState)
    }

    const handleCalculate = () => {
        let csum = 0
        let csalary = 0
        let csave = 0
        let monthRes = ''
        let monthIdeal = ''

        console.log(Object.entries(state))
        console.log(Object.entries(state)[0][1].currency)

        if (state.sum.currency !== 'RUB') {
            csum = currency[state.sum.currency].Value * +state.sum.value
        } else {
            csum = +state.sum.value
        }
        if (state.salary.currency !== 'RUB') {
            csalary = currency[state.salary.currency].Value * +state.salary.value
        } else {
            csalary = +state.salary.value
        }
        if (state.save.currency !== 'RUB') {
            csave = currency[state.save.currency].Value * +state.save.value
        } else {
            csave = +state.save.value
        }

        if (csum > csalary * 100 || csum > csave * 1000) {
            setNoman(true)
        } else {
            setNoman(false)
        }

        let ideal: number = csalary * 0.1

        if (csave < csalary * 0.1) {
            const months = () => {
                for (let i = 0; i < months1.length; i++) {
                    if (months1[i] === Math.ceil(csum / ideal)) {
                        monthIdeal = 'месяц'
                        return;
                    }
                }
                for (let i = 0; i < months2.length; i++) {
                    if (months2[i] === Math.ceil(csum / ideal)) {
                        monthIdeal = 'месяца'
                        return;
                    }
                }
                monthIdeal = 'месяцев'
            }

            months()

            setBut({
                res: Math.ceil(csum / ideal),
                month: monthIdeal
            })
        } else {
            setBut({
                res: undefined,
                month: ''
            })
        }

        const months = () => {
            for (let i = 0; i < months1.length; i++) {
                if (months1[i] === Math.ceil(csum / csave)) {
                    monthRes = 'месяц'
                    return;
                }
            }
            for (let i = 0; i < months2.length; i++) {
                if (months2[i] === Math.ceil(csum / csave)) {
                    monthRes = 'месяца'
                    return;
                }
            }
            monthRes = 'месяцев'
        }
        months()

        setResult({
            res: Math.ceil(csum / csave),
            month: monthRes
        })
    }

    return (
        <Container alignItems="center">
            {fields.map(field => {
                return (
                    <Section delay={field.delay} key={field.id}>
                        <RowWithCheckboxInput
                            id={field.id}
                            value={state[field.id].value}
                            valuteValue={state[field.id].currency}
                            onChange={(e) => {
                                handleFieldValue(e.target.value, field.id)
                            }}
                            onChangeSelect={(e) => {
                                handleFieldValute(e.target.value, field.id)
                            }}
                            type='number'
                            placeholder={field.placeholder}
                            text={field.text} />
                    </Section>
                )
            })}
            <Section delay={0.7}>
                <Box display="flex" flexDirection="row" w="full" justifyContent="center">
                    <Button mr={9} colorScheme="teal" onClick={handleCalculate}>Расчитать</Button>
                    <Button colorScheme="red" onClick={handleResetFields}>Очистить</Button>
                </Box>
            </Section>
            {!!result.res && !noman && (
                <Result months={result.month}>{result.res}</Result>
            )}
            {!!but.res && !noman && (
                <But months={but.month}>{but.res}</But>
            )}
            {!!noman && (
                <Noman />
            )}
        </Container>
    )
};

export default Saveup;