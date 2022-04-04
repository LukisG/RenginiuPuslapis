
const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Būtinas prisijungimo vardas."
    }
    if (!values.email) {
        errors.email = "Įveskite Email adrasą."
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Netaisiklingai nurodėte email adrasą"
    }
    if (!values.password) {
        errors.password = "Slaptažodis yra būtinas."
    } else if (values.password.length < 6) {
        errors.password = "Password is too short";
    } else if (values.password.length > 24) {
        errors.password = "Password is too long";
    } else if (values.password.search(/\d/) == -1) {
        errors.password = "Password must contain a number";
    } else if (values.password.search(/[a-zA-Z]/) == -1) {
        errors.password = "Password must contain letters";
    } else if (values.password.search(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) == -1) {
        errors.password = "Password must contain at least one symbol";
    }
    return (0);
    return errors
}

export default validation