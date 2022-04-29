import {Box, Button, Container} from "@chakra-ui/react";
import Section from "../components/section";
import RowWithCheckboxInput from "../components/rowWithInput";
import {useState} from "react";
import Result from "../components/result";
import But from "../components/but";
import Noman from "../components/noman";
import {months1, months2} from "../lib/months";
import axios from "axios";

const Saveup = () => {

    const [sumForSaveup, setSumForSaveup] = useState("")
    const [salary, setSalary] = useState("")
    const [save, setSave] = useState("")
    const [displayBut, setDisplayBut] = useState('none')
    const [displayNoman, setDisplayNoman] = useState('none')
    const [displayResult, setDisplayResult] = useState('none')
    const [result, setResult] = useState(0)
    const [ideal, setIdeal] = useState(0)
    const [months, setMonths] = useState('')
    const [monthsRes, setMonthsRes] = useState('')
    const [convert, setConvert] = useState(0)
    const [convertSalary, setConvertSalary] = useState(0)
    const [convertSave, setConvertSave] = useState(0)
    const baseValute = 'EUR'

    const handleResetDisplay = () => {
        setDisplayNoman('none')
        setDisplayBut('none')
        setDisplayResult('none')
    }

    const handleReset = () => {
        handleResetDisplay()
        setSumForSaveup('')
        setSalary('')
        setSave('')
    }

    const handleChangeSum = (evt) => {
        setSumForSaveup(evt.target.value)
        handleResetDisplay()
    }

    const handleChangeSalary = (evt) => {
        setSalary(evt.target.value)
        handleResetDisplay()
    }

    const handleChangeSave = (evt) => {
        setSave(evt.target.value)
        handleResetDisplay()
    }

    const handleCalculate = () => {

        handleResetDisplay()
        handleConverter()

        const sum = convert
        const sal = convertSalary
        const sav = convertSave

        let res = sum / sav
        let ide = sal / 10
        let ideRes = sum / ide

        if (sum > sal * 100 && sum > sav * 100) {
            setDisplayNoman('flex')
        } else if (salary !== '' && sumForSaveup !== '' && save < ide) {
            setResult(Math.ceil(res))
            setIdeal(Math.ceil(ideRes))
            changeMonths()
            changeMonthsRes()
            setDisplayNoman('none')
            setDisplayResult('flex')
            setDisplayBut('flex')
        } else if (salary !== '' && sumForSaveup !== '' && save >= ide) {
            setResult(Math.ceil(res))
            changeMonthsRes()
            setDisplayBut('none')
            setDisplayResult('flex')
        } else {
            setDisplayResult('none')
            setDisplayBut('none')
        }

        console.log(sum)
        console.log(sal)
        console.log(sav)
    }

    const handleConverter = () => {
        const sum = +document.querySelector('#sum').value
        const sumValute = document.querySelector('#sumSelect').value
        const sal = +document.querySelector('#salary').value
        const salValute = document.querySelector('#salarySelect').value
        const sav = +document.querySelector('#save').value
        const savValute = document.querySelector('#saveSelect').value

        if (sumValute !== baseValute) {
            axios.get("http://api.exchangeratesapi.io/v1/latest?access_key=8172c095996c361dd2a965bdbf6e69f8&format=1&symbols=USD,EUR,RUB")
                .then((res) => {
                    const rates = res.data.rates
                    setConvert(sum / rates[sumValute])
                })
                .catch(e => console.log(e))
        } else {
            setConvert(sum)
        }
        if (salValute !== baseValute) {
            axios.get("http://api.exchangeratesapi.io/v1/latest?access_key=8172c095996c361dd2a965bdbf6e69f8&format=1&symbols=USD,EUR,RUB")
                .then((res) => {
                    const rates = res.data.rates
                    setConvertSalary(sal / rates[salValute])
                })
                .catch(e => console.log(e))
        } else {
            setConvertSalary(sal)
        }
        if (savValute !== baseValute) {
            axios.get("http://api.exchangeratesapi.io/v1/latest?access_key=8172c095996c361dd2a965bdbf6e69f8&format=1&symbols=USD,EUR,RUB")
                .then((res) => {
                    const rates = res.data.rates
                    setConvertSave(sav / rates[savValute])
                })
                .catch(e => console.log(e))
        } else {
            setConvertSave(sav)
        }
    }

    const changeMonths = () => {
        for (let i = 0; i < months1.length; i++) {
            if (months1[i] === ideal) {
                setMonths('месяц')
                return;
            }
        }
        for (let i = 0; i < months2.length; i++) {
            if (months2[i] === ideal) {
                setMonths('месяцa')
                return;
            }
        }
        setMonths('месяцев')
    }

    const changeMonthsRes = () => {
        for (let i = 0; i < months1.length; i++) {
            if (months1[i] === result) {
                setMonthsRes('месяц')
                return;
            }
        }
        for (let i = 0; i < months2.length; i++) {
            if (months2[i] === result) {
                setMonthsRes('месяцa')
                return;
            }
        }
        setMonthsRes('месяцев')
    }

    return (
        <Container align="center">
            <Section delay={0.1}>
                <RowWithCheckboxInput idSelect="sumSelect" id="sum" value={sumForSaveup} onChange={handleChangeSum} type="number" placeholder="Введите сумму" text="Введите сумму, которую хотите накопить" />
            </Section>
            <Section delay={0.3}>
                <RowWithCheckboxInput idSelect="salarySelect" id="salary" onChange={handleChangeSalary} value={salary} type="number" placeholder="Введите доход" text="Ввдедите ваш ежемесячный доход" />
            </Section>
            <Section delay={0.5}>
                <RowWithCheckboxInput idSelect="saveSelect" id="save" onChange={handleChangeSave} value={save} type="number" placeholder="Ввдедите сумму" text="Сколько денег вы готовы откладывать ежемесячно?" />
            </Section>
            <Section delay={0.7}>
                <Box display="flex" flexDirection="row" w="full" justifyContent="center">
                    <Button mr={9} colorScheme="teal" onClick={handleCalculate}>Расчитать</Button>
                    <Button colorScheme="red" onClick={handleReset}>Очистить</Button>
                </Box>
            </Section>
            <Result display={displayResult} months={monthsRes}>{result}</Result>
            <But months={months} display={displayBut}>{ideal}</But>
            <Noman display={displayNoman} />
        </Container>
    )
};

export default Saveup;