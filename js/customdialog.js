function closeDiag(name) {
    document.getElementById(`${name}diag`).close();
}

function openDiag(name) {
    document.getElementById("output").style.display = "none";
    document.getElementById(`${name}diag`).showModal();
}

function confirm(name, value) {
    closeDiag(name);
    document.getElementById("output").style.display = "inline-block";
    document.getElementById("output").innerHTML = `Confirm result: ${value}`;
}

function prompt(name, value) {
    closeDiag(name);
    document.getElementById("output").style.display = "inline-block";
    if (value == "true") {
        let text = document.getElementById("prompttext").value;
        document.getElementById("output").innerHTML = `Prompt result: ${text}`;
    }
    else {
        document.getElementById("output").innerHTML = "User didn't enter anything";
    }

    document.getElementById("prompttext").value = "";
}

function sprompt(name, value) {
    closeDiag(name);
    document.getElementById("output").style.display = "inline-block";
    if (value == "true") {
        let text = document.getElementById("sprompttext").value;
        text = DOMPurify.sanitize(text);
        document.getElementById("output").innerHTML = `Prompt result: ${text}`;
    }
    else {
        document.getElementById("output").innerHTML = "User didn't enter anything";
    }

    document.getElementById("sprompttext").value = "";
}