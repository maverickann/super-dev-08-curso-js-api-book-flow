// Seleciona o elemento <tbody> da tabela onde as categorias serão inseridas
const tbodyCategorias = document.getElementById("tbody-categorias");

// Função responsável por buscar e exibir as categorias na tabela
function carregarCategorias() {

    // Faz uma requisição GET para a API de categorias
    fetch("https://api.franciscosensaulas.com/api/v1/biblioteca/categorias")

        // Converte a resposta para JSON
        .then((response) => {
            return response.json()
        })

        // Recebe a lista de categorias já convertida em objeto JavaScript
        .then((categorias) => {

            // Limpa o conteúdo atual da tabela antes de inserir novos dados
            tbodyCategorias.innerHTML = "";

            // Percorre todas as categorias retornadas pela API
            for (let i = 0; i < categorias.length; i = i + 1) {

                // Pega a categoria atual do loop
                let categoria = categorias[i];

                // Cria uma nova linha <tr>
                const novaLinha = document.createElement("tr");

                // Define o conteúdo HTML da linha com os dados da categoria
                novaLinha.innerHTML = `<tr>
                  <td class="cell-id">${categoria.id}</td>
                  <td>${categoria.nome}</td>
                  <td class="cell-actions">
                    
                    <!-- Botão de editar -->
                    <button class="btn-icon btn-icon-edit" 
                        data-action="edit" data-id="${categoria.id}" title="Editar">
                        <i class="fas fa-pen"></i>
                    </button>

                    <!-- Botão de apagar -->
                    <a class="btn-icon btn-icon-danger botao-apagar" href="/categorias.html?id=${categoria.id}  "
                        data-action="delete" data-id="${categoria.id}" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </a>

                  </td>
                </tr>`

                // Adiciona a nova linha dentro do tbody da tabela
                tbodyCategorias.appendChild(novaLinha);

                // Registra eventos de clique nos botões de apagar
                registrarCliqueBotaoApagar();
            }

            // Aqui poderia haver lógica adicional após montar a tabela
        })

        // Caso ocorra erro na requisição
        .catch((erro) => {
            alert("Não foi possível carregar as categoiras");
        })
}

// Função que adiciona evento de clique em todos os botões de apagar
function registrarCliqueBotaoApagar() {

    // Seleciona todos os elementos com a classe "botao-apagar"
    let botoesApagar = document.getElementsByClassName("botao-apagar");

    // Percorre todos os botões encontrados
    for (let i = 0; i < botoesApagar.length; i += 1) {

        // Pega o botão atual
        let botao = botoesApagar[i];

        // Adiciona o evento de clique chamando a função confirmarApagar
        botao.addEventListener("click", confirmarApagar);
    }
}

// Função chamada ao clicar no botão de apagar
function confirmarApagar(event) {

    // Mostra um popup de confirmação para o usuário
    let deveApagar = confirm("Deseja apagar?");

    // Se o usuário cancelar, interrompe a execução
    if (deveApagar !== true) {
        return;
    }

    // Tenta obter o ID diretamente do elemento clicado
    let id = event.target.getAttribute("data-id");

    // Se o clique foi no ícone <i> dentro do botão
    if (event.target.tagName === "I"){

        // Pega o ID do elemento pai (o botão)
        id = event.target.parentNode.getAttribute("data-id");
    }

    // Faz a requisição DELETE para remover a categoria
    fetch(`https://api.franciscosensaulas.com/api/v1/biblioteca/categorias/${id}`, {
        "method": "DELETE"
    })

        // Após apagar, recarrega a lista de categorias
        .then(() => {
            carregarCategorias();
        })

        // Caso ocorra erro ao apagar
        .catch((erro), () => {
            alert("Ocorreu um erro ao apagar a categoria");
        });
}


// Executa a função ao carregar o script
// Isso busca os dados da API e preenche a tabela automaticamente
carregarCategorias();