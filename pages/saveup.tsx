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
    const [sumValute, setSumValute] = useState('RUB')
    const [salValute, setSalValute] = useState('RUB')
    const [savValute, setSavValute] = useState('RUB')

    let valute = {}

    const converter = () => {
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
            .then((res) => {
                valute = res.data.Valute
            })
            .catch(e => console.log(e))
    }

    converter()

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

    const handleChangeSumSelect = (evt) => {
        setSumValute(evt.target.value)
        handleResetDisplay()
    }

    const handleChangeSalSelect = (evt) => {
        setSalValute(evt.target.value)
        handleResetDisplay()
    }

    const handleChangeSavSelect = (evt) => {
        setSavValute(evt.target.value)
        handleResetDisplay()
    }

    const handleCalculate = () => {

        handleResetDisplay()
        handleConverter()

        const sum: number = convert
        const sal: number = convertSalary
        const sav: number = convertSave

        const res: number = sum / sav
        const ide: number = sal / 10
        const ideRes: number = sum / ide

        if (sum > sal * 100 && sum > sav * 100) {
            setDisplayNoman('flex')
        } else if (salary !== '' && sumForSaveup !== '' && parseFloat(save) < ide) {
            console.log(ide)
            console.log(parseFloat(save))
            setResult(Math.ceil(res))
            setIdeal(Math.ceil(ideRes))
            changeMonths()
            changeMonthsRes()
            setDisplayNoman('none')
            setDisplayResult('flex')
            setDisplayBut('flex')
        } else if (salary !== '' && sumForSaveup !== '' && parseFloat(save) >= ide) {
            setResult(Math.ceil(res))
            changeMonthsRes()
            setDisplayBut('none')
            setDisplayResult('flex')
        } else {
            setDisplayResult('none')
            setDisplayBut('none')
        }

    }

    const handleConverter = () => {
        if (sumValute !== 'RUB') {
            setConvert(+sumForSaveup * valute[sumValute].Value)
        } else {
            setConvert(+sumForSaveup)
        }
        if (salValute !== 'RUB') {
            setConvertSalary(+salary * valute[salValute].Value)
        } else {
            setConvertSalary(+salary)
        }
        if (savValute !== 'RUB') {
            setConvertSave(+save * valute[savValute].Value)
        } else {
            setConvertSave(+save)
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
        <Container alignItems="center">
            <Section delay={0.1}>
                <RowWithCheckboxInput idSelect="sumSelect" id="sum" value={sumForSaveup} onChange={handleChangeSum}
                                      type="number" placeholder="Введите сумму"
                                      text="Введите сумму, которую хотите накопить"
                                      onChangeSelect={handleChangeSumSelect} />
            </Section>
            <Section delay={0.3}>
                <RowWithCheckboxInput idSelect="salarySelect" id="salary" onChange={handleChangeSalary} value={salary}
                                      type="number" placeholder="Введите доход" text="Ввдедите ваш ежемесячный доход"
                                      onChangeSelect={handleChangeSalSelect} />
            </Section>
            <Section delay={0.5}>
                <RowWithCheckboxInput idSelect="saveSelect" id="save" onChange={handleChangeSave} value={save}
                                      type="number" placeholder="Ввдедите сумму"
                                      text="Сколько денег вы готовы откладывать ежемесячно?"
                                      onChangeSelect={handleChangeSavSelect} />
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