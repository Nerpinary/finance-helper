import {Button, Container} from "@chakra-ui/react";
import Section from "../components/section";
import RowWithCheckboxInput from "../components/rowWithInput";
import {useState} from "react";
import Result from "../components/result";
import But from "../components/but";
import Noman from "../components/noman";

const Saveup = () => {

    const [sumForSaveup, setSumForSaveup] = useState("")
    const [salary, setSalary] = useState("")
    const [save, setSave] = useState("")
    const [displaySalary, setDisplaySalary] = useState("none")
    const [displayResult, setDisplayResult] = useState("none")
    const [displaySubmit, setDisplaySubmit] = useState('none')
    const [displaySave, setDisplaySave] = useState('none')
    const [displayBut, setDisplayBut] = useState('none')
    const [displayNoman, setDisplayNoman] = useState('none')
    const [result, setResult] = useState(0)
    const [ideal, setIdeal] = useState(0)

    const handleResetDisplay = () => {
        setDisplayNoman('none')
        setDisplaySubmit('none')
        setDisplayResult('none')
        setDisplayBut('none')
    }

    const handleChangeSum = (evt) => {
        setSumForSaveup(evt.target.value)
        if (evt.target.value !== '') {
            setDisplaySalary("flex")
        } else {
            setDisplaySalary("none")
            handleResetDisplay()
        }
    }

    const handleChangeSalary = (evt) => {
        setSalary(evt.target.value)
        if (evt.target.value !== '' && sumForSaveup !== '' ) {
            setDisplaySave('flex')
        } else {
            setDisplaySave('none')
            handleResetDisplay()
        }
    }

    const handleChangeSave = (evt) => {
        setSave(evt.target.value)
        if (evt.target.value !== '' && sumForSaveup !== '' && salary !== '') {
            setDisplaySubmit('flex')
        } else {
            handleResetDisplay()
        }
    }

    const handleCalculate = () => {
        const sum = sumForSaveup
        const sal = salary
        const sav = save

        let res = sum / sav
        let ide = sal / 10
        let ideRes = sum / ide

        if (sum > sal * 100 && sum > sav * 100) {
            setDisplayNoman('flex')
        } else if (salary !== '' && sumForSaveup !== '' && save < ide) {
            setDisplayNoman('none')
            setDisplayResult('flex')
            setDisplayBut('flex')
            setResult(Math.ceil(res))
            setIdeal(Math.ceil(ideRes))
        } else if (salary !== '' && sumForSaveup !== '' && save >= ide) {
            setDisplayBut('none')
            setDisplayResult('flex')
            setResult(Math.ceil(res))
        } else {
            setDisplayResult('none')
            setDisplayBut('none')
        }
    }



    return (
        <Container align="center">
            <Section delay={0.1}>
                <RowWithCheckboxInput id="summ" value={sumForSaveup} onChange={handleChangeSum} type="number" placeholder="Enter summ" text="Enter the amount you want to accumulate" />
            </Section>
            <Section>
                <RowWithCheckboxInput id="salary" onChange={handleChangeSalary} display={displaySalary} value={salary} type="number" placeholder="Enter salary" text="Enter your monthly salary" />
            </Section>
            <Section>
                <RowWithCheckboxInput id="save" onChange={handleChangeSave} display={displaySave} value={save} type="number" placeholder="Enter save" text="How much money are you willing to save per month?" />
            </Section>
            <Button display={displaySubmit} colorScheme="teal" onClick={handleCalculate}>Calculate</Button>
            <Result display={displayResult}>{result}</Result>
            <But display={displayBut}>{ideal}</But>
            <Noman display={displayNoman} />
        </Container>
    )
};

export default Saveup;