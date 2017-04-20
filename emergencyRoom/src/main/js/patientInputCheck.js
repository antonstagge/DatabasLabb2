export default function patientInputCheck (patient) {
    var newPatient = patient;
    var canBeNull = {
        name: "",
        age: "",
        female: "",
        waiting_time: ""
    };
    var someThingIsNull = false;
    Object.keys(newPatient).map(oneKey => {
        if (oneKey in canBeNull && newPatient[oneKey] == "") {
            delete newPatient[oneKey];
            return;
        } else {
            if (newPatient[oneKey] == "") {
                someThingIsNull = true;
            }
        }
    });

    if (someThingIsNull) {
        return {error: "Some required field was left empty"};
    }

    if (!validateSSN(newPatient.ssn)) {
        return {error: "Error in ssn input"};
    }

    return newPatient;

}

function validateSSN(ssn) {
    if (ssn.length != 10) {
        return false;
    }

    if (Number(ssn.substring(2,4)) > 12 || Number(ssn.substring(2,4)) < 1) {
        return false;
    }


    if (Number(ssn.substring(4,6)) > 31 || Number(ssn.substring(4,6)) < 1) {
        return false;
    }

    return true;
}