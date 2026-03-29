const API_AUTORES_BASE_URL = "https://api.franciscosensaulas.com/api/v1/biblioteca/autores/";
const API_CATEGORIAS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias/";
const selectAutor = document.getElementById("select-autor");
const selectCategoria = document.getElementById("select-categoria");

const inputTitulo = document.getElementById("input-titulo");
const inputAnoPublicacao = document.getElementById("input-ano");
const inputIsbn = document.getElementById("input-isbn");
const inputQuantidade = document.getElementById("input-quantidade");
const textareaDescricao = document.getElementById("textarea-descricao");
const textareaResumo = document.getElementById("textarea-resumo");

const formLivro = document.getElementById("form-livro");
formLivro.addEventListener("submit", salvar);

function salvar(event) {
    event.preventDefault();
    let payload = {
        'autorId': selectAutor.value,
        'categoriaId': selectCategoria.value,
        'titulo': inputTitulo.value,
        'anoPublicacao': inputAnoPublicacao.value,
        'isbn': inputIsbn.value,
        'quantidade': inputQuantidade.value,
        'descricao': textareaDescricao.value,
        'resumo': textareaResumo.value
    }

    cadastrar(payload);
    };
console.log(selectAutor, 
    selectCategoria, 
    inputTitulo,
    inputAnoPublicacao,
    inputIsbn,
    inputQuantidade,
    textareaDescricao,
    textareaResumo
);

function carregarAutores(payload) {

    fetch(API_AUTORES_BASE_URL)
        .then(dados => {
            return dados.json();
        })
        .then(autores => {
            for (let i = 0; i < autores.length; i++) {
                const autor = autores[i];

                const optionSelect = `<option value="${autor.id}">${autor.nome}</option>`;

                selectAutor.innerHTML += optionSelect;
            }
        })
}
carregarAutores();
function carregarCategorias() {

    fetch(API_CATEGORIAS_BASE_URL)
        .then(dados => {
            return dados.json();
        })
        .then(categorias => {
            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];

                const optionSelect = `<option value="${categoria.id}">${categoria.nome}</option>`;

                selectCategoria.innerHTML += optionSelect;
            }
        })
}
carregarCategorias();