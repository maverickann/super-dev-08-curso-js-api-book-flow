const botaoSalvar = document.getElementById('btn-salvar');
botaoSalvar.addEventListener("click", salvar);

const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get('id');
function salvar() {
    // alert('Categoria salva com sucesso!');
    let campoNome = document.getElementById('input-nome');
    let nome = campoNome.value;
    let payload = { "nome": nome };
    if (idParaEditar === null) {
        cadastrar(payload);
    } else {
        idParaEditar(payload)
        
    }
    cadastrar(payload, nome);
}
function editar(payload) {
      fetch("https://api.franciscosensaulas.com/api/v1/biblioteca/categorias/${idParaEditar}",{
          "method": "PUT",
        "headers":
         {"Content-Type": "application/json"},
        "body": JSON.stringify(payload)
    })
        .then(()=>alert("Categoria editada com sucesso!")   )
        .then((categoria) => {
            const campoNome = document.getElementById('input-nome');
            campoNome.value = categoria.nome;
            alert(categoria.nome);
        })
        .catch((erro) => {
            alert("Não foi possível carregar os dados da categoria para edição!");
        })}
    

function cadastrar(payload, nome) {
    fetch("https://api.franciscosensaulas.com/api/v1/biblioteca/categorias", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then((data) => {
            return data.json();

        })
        .then(() => {
            alert("Categoria salva com sucesso!");
        })
        .catch((erro) => {
            alert("Não foi possivel cadastrar a categoria!");
        });

    alert('O nome da categoria é: ' + nome);
}

function carregarCategoriaParaEditar() {
    fetch("https://api.franciscosensaulas.com/api/v1/biblioteca/categorias/${idParaEditar}")
        .then((dados => dados.json()))
        .then((categoria) => {
            const campoNome = document.getElementById('input-nome');
            campoNome.value = categoria.nome;
            alert(categoria.nome);
        })
        .catch((erro) => {
            alert("Não foi possível carregar os dados da categoria para edição!");
        })
}


if (idParaEditar !== null) {
    carregarCategoriaParaEditar();
}