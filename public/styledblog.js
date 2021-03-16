window.addEventListener("DOMContentLoaded", () => {
    if (window.localStorage.getItem("posts") === null) {
        window.localStorage.setItem("posts", JSON.stringify([
            {
                "date": "2017-08-01",
                "title": "First Post",
                "summary": "My first blog post! I talk about how I set up this blog."
            },
            {
                "date": "2019-12-04",
                "title": "Second Post",
                "summary": "My second blog post. Updates to the website."
            },
            {
                "date": "2021-01-01",
                "title": "Third Post",
                "summary": "My third blog post. More recent changes."
            }
        ]));
    }
    listPosts();
});

function listPosts() {
    let posts = JSON.parse(window.localStorage.getItem("posts"));
    for (let i = 0; i < posts.length; i++) {
        const postList = document.getElementById("post-list");
        const newPost = document.createElement("li");
        const newList = document.createElement("ul");
        newPost.appendChild(document.createTextNode(`Title: ${posts[i].title}`));
        const newDate = document.createElement("li");
        newDate.appendChild(document.createTextNode(`Date: ${posts[i].date}`));
        const newSummary = document.createElement("li");
        newSummary.appendChild(document.createTextNode(`Summary: ${posts[i].summary}`));
        const newButton = document.createElement("button");
        newButton.setAttribute("type", "button");
        newButton.innerHTML = "<i class='fa fa-pencil'></i>";
        newButton.setAttribute("id", i);
        newButton.setAttribute("onclick", "editDiag(id)");
        newButton.setAttribute("value", `${posts[i].title}`);
        newList.appendChild(newDate);
        newList.appendChild(newSummary);
        newList.appendChild(newButton);
        postList.appendChild(newPost);
        postList.appendChild(newList);
    }
}

function openDiag(name) {
    document.getElementById(`${name}diag`).showModal();
}

function closeDiag(name) {
    document.getElementById(`${name}diag`).close();
}

function add() {
    let newobj = {
        "title": document.getElementById("newtitle").value,
        "date": document.getElementById("newdate").value,
        "summary": document.getElementById("newsummary").value
    };
    let posts = JSON.parse(window.localStorage.getItem("posts"));
    posts.push(newobj);
    window.localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("adddiag").close();
    document.getElementById("newtitle").value = "";
    document.getElementById("newdate").value = "";
    document.getElementById("newsummary").value = "";
    document.getElementById("post-list").innerHTML = "";
    listPosts();
}

function del() {
    let deltitle = document.getElementById("deltitle").value;
    let posts = JSON.parse(window.localStorage.getItem("posts"));
    posts.splice(posts.findIndex((obj => obj.title===deltitle)), 1);
    window.localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("deldiag").close();
    document.getElementById("deltitle").value = "";
    document.getElementById("post-list").innerHTML = "";
    listPosts();
}

function editDiag(id) {
    document.getElementById("editdiag").showModal();
    document.getElementById("editok").value = id;
}

function edit(value) {
    let oldtitle = document.getElementById(value).value;
    let posts = JSON.parse(window.localStorage.getItem("posts"));
    let ind = posts.findIndex((obj => obj.title === oldtitle));
    posts[ind].title = document.getElementById("edittitle").value;
    posts[ind].date = document.getElementById("editdate").value;
    posts[ind].summary = document.getElementById("editsummary").value;
    window.localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("editdiag").close();
    document.getElementById("edittitle").value = "";
    document.getElementById("editdate").value = "";
    document.getElementById("editsummary").value = "";
    document.getElementById("post-list").innerHTML = "";
    listPosts();
}