let email = document.querySelector("#email")
let senha = document.querySelector("#senha")

localStorage.removeItem("data")


function fazerLogin() {
    let body = `
    {
        "email":"${email.value}",
        "senha":"${senha.value}"
    }`

    fetch("http://localhost:3000/login",
        {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": body
        })
        .then(resp => {
            if (resp.status === 401) {
                alert("CAI FORA PATIFE")
            } else {
                resp.json().then(data => {
                    localStorage.setItem("data", JSON.stringify(data));
                    window.location.href = "../panel";
                })
            }
        })

}


