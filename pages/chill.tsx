import Layout from "../components/layouts/article";
import Section from "../components/section";
import RowWithoutSelect from "../components/rowWithoutSelect";
import {useEffect, useRef, useState} from "react";
import {Box, Button, Container} from "@chakra-ui/react";
import ChillCounter from "../components/chillCounter";

const d30 = [3, 5, 8, 10]
const d31 = [0, 2, 4, 6, 7, 9, 11]

type Field = {
    id: keyof State
    placeholder: string
    delay: number
    text: string
}

const fields: Field[] = [
    {
        id: 'salary',
        placeholder: 'Введите доход',
        delay: 0.1,
        text: 'Введите ваш ежемесячный доход'
    }
]

type FieldNames = 'salary'

/* eslint-disable no-unused-vars */
type State = {
    [key in FieldNames]: {
        value: number
    }
}

type Result = {
    res: number | undefined
    inSec: number
}

const Chill = () => {

    const [inSec, setInSec] = useState(0)
    const [state, setState] = useState<State>({
        salary: {value: null}
    })
    const [result, setResult] = useState<Result>({res: undefined, inSec: 0})
    const counter = useRef(1000)

   useEffect(() => {
        if (counter.current < 1000) {
            counter.current += 1;
            const timer = setTimeout(() => setResult({res: result.res + result.inSec, inSec: inSec} ), 1000);
            return () => clearTimeout(timer);
        }
    }, [result, inSec]);

    const handleResReset = () => {
        if (result.res !== undefined) {
            setResult ({res: undefined, inSec: 0})
            counter.current = 1000
        }
    }

    const handleFieldValue = (value: number, key: keyof State) => {
        handleResReset()
        setState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                value
            },
        }))
    }

    const handleResetFields = () => {
        setState({
            salary: {value: null}
        })
        handleResReset()
    }

    const handleCalculate = () => {
        let date = new Date()
        let month = date.getMonth()
        let year = date.getFullYear()
        let salInDay = 0

        for (let i = 0; i < d30.length; i++) {
            if (month === d30[i]) {
                salInDay = state.salary.value / 30
            }
        }
        for (let i = 0; i < d31.length; i++) {
            if (month === d31[i]) {
                salInDay = state.salary.value / 31
            }
        }
        if (month === 1 && year % 4 === 0) {
            salInDay = state.salary.value / 29
        } else {
            salInDay = state.salary.value / 28
        }

        let salInSec = salInDay / 86400

        setInSec(salInSec)
        setResult({res: inSec, inSec: inSec})
        counter.current = 0
    }

    return (
        <Layout title='Chill'>
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
                        <Button mr={9} colorScheme="teal" onClick={handleCalculate}>Насладиться</Button>
                        <Button colorScheme="red" onClick={handleResetFields}>Очистить</Button>
                    </Box>
                </Section>
                {!!result.res && (
                    <ChillCounter>{Math.floor(result.res * 100) / 100}</ChillCounter>
                )}
            </Container>
        </Layout>
    )
}

export default Chill