import toast from 'react-hot-toast';

const validation = (values) => {
    let errors = {}
    if (!values.eventTitle) {
        toast.error("Įveskite renginio pavadinimą!")
    }
    if (!values.eventDate) {
        toast.error("Įveskite renginio datą!")
        // console.log(values.eventDate)
        // console.log(strDate => Date.parse(strDate))
    } else if (!/\d\d\d\d+-\d\d+-\d\d/.test(values.eventDate)) {
        toast.error("Renginio data turi būti nurodoma tokiu formatu: mm/dd/yyyy")
    }

    if (!values.eventTime) {
        toast.error("Įveskite renginio laiką!")
    } else if (!/\d\d+:\d\d/.test(values.eventTime)) {
        toast.error("Laikas turi būti įvestas tokiu formatu: hh:mm")
    }
    if (!values.eventDesc) {
        toast.error("Įveskite renginio aprašymą!")
    }
    return errors
}

export default validation