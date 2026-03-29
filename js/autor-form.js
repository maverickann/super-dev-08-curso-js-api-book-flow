let formAutores = document.getElementById("form-autor");
formAutores.addEventListener("submit", salvar);


function salvar(event) {

    event.preventDefault();
    let nome = document.getElementById("input-nome").value;
    let nacionalidade = document.getElementById("input-nacionalidade").value;
    let dataNascimento = document.getElementById("input-data-nascimento").value;

    let payload = {
        " nome": nome,
        "nacionalidade": nacionalidade,
        "dataNascimento": dataNascimento
    }
    fetch(API_AUTORES_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(payload)
    }
        .then(dados => dados.json())
        .then(_ => window.location.href = "/autores.html")
        .catch(erro => {
            console.log(erro);
            alert("Ocorreu um erro ao salvar o autor. Tente novamente mais tarde.");
        });
}