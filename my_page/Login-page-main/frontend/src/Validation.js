// Login validation

function Validation(values) {
    let error = {};
    const customerId_pattern = /^[a-zA-Z0-9]{2}$/; 
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.customerId === "") {
        error.customerId = "Customer ID should not be empty";
    } else if (!customerId_pattern.test(values.customerId)) {
        error.customerId = "Customer ID should be 4 letters alphanumeric";
    } else {
        error.customerId = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password did not match";
    } else {
        error.password = "";
    }
    
    return error;
}

export default Validation;
