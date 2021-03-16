window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('date').value = Date();
});

function setFetch() {
    document.getElementById("postBtn").setAttribute("onclick", "showForm('Post', 'fetch')");
    document.getElementById("getBtn").setAttribute("onclick", "fetchGet()");
    document.getElementById("putBtn").setAttribute("onclick", "showForm('Put', 'fetch')");
    document.getElementById("deleteBtn").setAttribute("onclick", "showForm('Delete', 'fetch')");
}

function setXML() {
    document.getElementById("postBtn").setAttribute("onclick", "showForm('Post', 'XML')");
    document.getElementById("getBtn").setAttribute("onclick", "XMLGet()");
    document.getElementById("putBtn").setAttribute("onclick", "showForm('Put', 'XML')");
    document.getElementById("deleteBtn").setAttribute("onclick", "showForm('Delete', 'XML')");
}

function showForm(command, api) {
    document.getElementById("response").innerHTML = "";
    document.getElementById("inForm").hidden="";
    switch(command) {
        case "Post":
            for (let elem of document.querySelectorAll(".put")) elem.hidden="hidden";
            for (let elem of document.querySelectorAll(".delete")) elem.hidden="hidden";
            for (let elem of document.querySelectorAll(".post")) elem.hidden="";
            break;
        case "Put":
            for (let elem of document.querySelectorAll(".post")) elem.hidden="hidden";
            for (let elem of document.querySelectorAll(".delete")) elem.hidden="hidden";
            for (let elem of document.querySelectorAll(".put")) elem.hidden="";
            break;
        case "Delete":
            for (let elem of document.querySelectorAll(".post")) elem.hidden="hidden";
            for (let elem of document.querySelectorAll(".put")) elem.hidden="hidden";
            for (let elem of document.querySelectorAll(".delete")) elem.hidden=""; 
            break;
        default:
            
    }
    document.getElementById("subBtn").value=command;
    document.getElementById("subBtn").name=api;
}

function subForm(command, api) {
    document.getElementById("inForm").hidden="hidden";
    switch(command) {
        case "Post":
            for (let elem of document.querySelectorAll(".post")) elem.hidden="hidden";
            if (api == 'fetch') {
                fetchPost();
            }
            else {
                XMLPost();
            }
            break;
        case "Put":
            for (let elem of document.querySelectorAll(".put")) elem.hidden="hidden";
            if (api == 'fetch') {
                fetchPut();
            }
            else {
                XMLPut();
            }
            break;
        case "Delete":
            for (let elem of document.querySelectorAll(".delete")) elem.hidden="hidden";
            if (api == 'fetch') {
                fetchDelete();
            }
            else {
                XMLDelete();
            }
            break;
        default:
    }
}

function fetchGet() {
    document.getElementById("inForm").hidden="hidden";
    document.getElementById("response").innerHTML = "";
    fetch("https://httpbin.org/get")
    .then(response => {
        if (!response.ok) {
        document.getElementById("response").innerHTML = 'Error: ' + response.status + " " + response.statusText;
        throw new Error(response.status)
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("response").innerHTML = JSON.stringify(data, null, '\t');
    })
    .catch((error) => {
        console.error(error);
    });
}

function fetchPut() {
    document.getElementById("response").innerHTML = "";
    fetch("https://httpbin.org/put", {
        method: 'PUT', 
        body: JSON.stringify({
            id: document.getElementById("id").value,
            article_name: document.getElementById("article_name").value,
            article_body: document.getElementById("article_body").value,
            date: new Date()
        }),
        headers: {
          "Content-type": "application/json"
        }  
      })
      .then(response => {
        if (!response.ok) {
          document.getElementById("response").innerHTML = 'Error: ' + response.status + " " + response.statusText;
          throw new Error(response.status)
        }
        return response.json();
      })
      .then(data=> {
          document.getElementById("response").innerHTML = JSON.stringify(data, null, '\t');
      })
      .catch((error) => {
        console.error(error);
      });
}

function fetchPost() {
    fetch("https://httpbin.org/post", {
        method: 'POST', 
        body: JSON.stringify({
            id: document.getElementById("id").value,
            article_name: document.getElementById("article_name").value,
            article_body: document.getElementById("article_body").value,
            date: new Date()
        }),
        headers: {
            "Content-type": "application/json"
        }  
    })
    .then(response => {
        if (!response.ok) {
            document.getElementById("response").innerHTML = 'Error: ' + response.status + " " + response.statusText;
            throw new Error(response.status)
        }
        return response.json();
    })
    .then(data=> {
        document.getElementById("response").innerHTML = JSON.stringify(data, null, '\t');
    })
    .catch((error) => {
        console.error(error);
    });
}

function fetchDelete() {
    let url = "https://httpbin.org/delete";
    //url += "/" + document.getElementById("id");
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({
            id: document.getElementById("id").value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
    if (!response.ok) {
        document.getElementById("response").innerHTML = 'Error: ' + response.status + " " + response.statusText;
        throw new Error(response.status)
    }
    return response.json();
    })
    .then(data=> {
        document.getElementById("response").innerHTML = JSON.stringify(data, null, '\t');
    })
    .catch((error) => {
        console.error(error);
    });
}

function XMLGet() {
    document.getElementById("inForm").hidden="hidden";
    document.getElementById("response").innerHTML = "";
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = () => {
        if(xml.readyState == 4 && xml.status == 200) {
            document.getElementById("response").innerHTML = xml.responseText;
        }
    };
    xml.open("GET", "http://httpbin.org/get", true);
    xml.setRequestHeader("Content-type", "application/json");
    xml.send(null);
}

function XMLPost() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = () => {
        if(xml.readyState == 4 && xml.status == 200) {
            document.getElementById("response").innerHTML = xml.responseText;
        }
    };
    xml.open("POST", "http://httpbin.org/post", true);
    xml.setRequestHeader("Content-type", "application/json");
    xml.send(JSON.stringify({
        id: document.getElementById("id").value,
        article_name: document.getElementById("article_name").value,
        article_body: document.getElementById("article_body").value,
        date: new Date()
    }));
}

function XMLPut() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = () => {
        if(xml.readyState == 4 && xml.status == 200) {
            document.getElementById("response").innerHTML = xml.responseText;
        }
    };
    xml.open("PUT", "http://httpbin.org/put", true);
    xml.setRequestHeader("Content-type", "application/json");
    xml.send(JSON.stringify({
        id: document.getElementById("id").value,
        article_name: document.getElementById("article_name").value,
        article_body: document.getElementById("article_body").value,
        date: new Date()
    }));
}

function XMLDelete() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = () => {
        if(xml.readyState == 4 && xml.status == 200) {
            document.getElementById("response").innerHTML = xml.responseText;
        }
    };

    let url = "https://httpbin.org/delete";
    //url += "/" + document.getElementById("id");

    xml.open("DELETE", url, true);
    xml.setRequestHeader("Content-type", "application/json");
    xml.send(JSON.stringify({
        id: document.getElementById("id").value
    }));
}