import {Box, Button, Container} from "@chakra-ui/react";
import Section from "../components/section";
import RowWithCheckboxInput from "../components/rowWithInput";
import {useEffect, useState} from "react";
import axios from "axios";
import {months1, months2} from '../lib/months'
import Result from "../components/result";
import But from '../components/but'
import Noman from '../components/noman'

type Field = {
    idSelect: string
    id: keyof State
    placeholder: string
    delay: number
    text: string
}

const fields: Field[] = [
    {
        idSelect: 'sumSelect',
        id: 'sum',
        placeholder: 'Введите сумму',
        delay: 0.1,
        text: 'Введите сумму, которую хотите накопить'
    },
    {
        idSelect: 'salarySelect',
        id: 'salary',
        placeholder: 'Введите доход',
        delay: 0.3,
        text: 'Введите ваш ежемесячный доход'
    },
    {
        idSelect: 'saveSelect',
        id: 'save',
        placeholder: 'Введите сумму',
        delay: 0.5,
        text: 'Сколько денег вы готовы откладывать ежемесячно?'
    }
]

type State = {
    sum: {
        value: string,
        valute: string
    }
    salary: {
        value: string,
        valute: string
    }
    save: {
        value: string,
        valute: string
    }
}

type Valute = {
    Value: number
}

/* eslint-disable no-unused-vars */
type Valutes = {
    [key in string]: Valute
}

type Result = {
    res: number | undefined
    month: string
}

const Saveup = () => {

    const [state, setState] = useState<State>({
        sum: {
            value: '',
            valute: 'RUB'
        },
        salary: {
            value: '',
            valute: 'RUB'
        },
        save: {
            value: '',
            valute: 'RUB'
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
    const [valute, setValute] = useState<Valutes>({})
    const [noman, setNoman] = useState(false)

    /* eslint-disable react-hooks/exhaustive-deps*/
    useEffect(() => {
        axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((res) => {
                setValute(res.data.Valute)
                console.log(valute)
            })
            .catch(e => console.log(e))
    }, [])

    const handleFieldValue = (value: string, key: keyof State) => {
        if (result.res !== undefined || but.res !== undefined) {
            setResult ({
                res: undefined,
                month: ''
            })
            setBut({
                res: undefined,
                month: ''
            })
        }
        console.log('work')
        setState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                value
            },
        }))
    }

    const handleFieldValute = (valute: string, key: keyof State) => {
        console.log('work2')
        setState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                valute
            },
        }))
    }

    const handleResetFields = () => {
        setState({
            sum: {
                value: '',
                valute: 'RUB'
            },
            salary: {
                value: '',
                valute: 'RUB'
            },
            save: {
                value: '',
                valute: 'RUB'
            }
        })
        setResult({
            res: undefined,
            month: ''
        })
        setBut({
            res: undefined,
            month: ''
        })
    }

    const handleCalculate = () => {
        let cSum = 0
        let cSal = 0
        let cSav = 0
        let monthRes = ''
        let monthIdeal = ''

        if (state.sum.valute !== 'RUB') {
            cSum = valute[state.sum.valute].Value * +state.sum.value
        } else {
            cSum = +state.sum.value
        }
        if (state.salary.valute !== 'RUB') {
            cSal = valute[state.salary.valute].Value * +state.salary.value
        } else {
            cSal = +state.salary.value
        }
        if (state.save.valute !== 'RUB') {
            cSav = valute[state.save.valute].Value * +state.save.value
        } else {
            cSav = +state.save.value
        }

        if (cSum > cSal * 100 || cSum > cSav * 1000) {
            setNoman(true)
        } else {
            setNoman(false)
        }

        let ideal: number = cSal * 0.1

        if (cSav < cSal * 0.1) {
            const months = () => {
                for (let i = 0; i < months1.length; i++) {
                    if (months1[i] === Math.ceil(cSum / ideal)) {
                        monthIdeal = 'месяц'
                        return;
                    }
                }
                for (let i = 0; i < months2.length; i++) {
                    if (months2[i] === Math.ceil(cSum / ideal)) {
                        monthIdeal = 'месяца'
                        return;
                    }
                }
                monthIdeal = 'месяцев'
            }

            months()

            setBut({
                res: Math.ceil(cSum / ideal),
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
                if (months1[i] === Math.ceil(cSum / cSav)) {
                    monthRes = 'месяц'
                    return;
                }
            }
            for (let i = 0; i < months2.length; i++) {
                if (months2[i] === Math.ceil(cSum / cSav)) {
                    monthRes = 'месяца'
                    return;
                }
            }
            monthRes = 'месяцев'
        }
        months()

        setResult({
            res: Math.ceil(cSum / cSav),
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
                            idSelect={field.idSelect}
                            value={state[field.id].value}
                            valuteValue={state[field.id].valute}
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