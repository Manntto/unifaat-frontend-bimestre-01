/**
 * Coloca o li em modo de edição:
 * - Substitui o texto por um input já preenchido com o valor atual
 * - Adiciona um botão "Alterar" ao lado do input
 * - Confirmar pelo clique no botão OU pressionando Enter no input
 * - Não salva valor vazio (mantém o valor anterior)
 *
 * @param {HTMLLIElement} liElement - o item da lista a ser editado
 */
export default function editNameList(liElement) {
    // Pega o texto atual (primeiro nó de texto do li)
    const currentTextNode = liElement.querySelector(".item-text");
    const currentValue = currentTextNode.textContent;

    // Oculta o texto e o botão Excluir para dar espaço ao modo de edição
    liElement.querySelectorAll(".item-text, .btn-delete").forEach((el) => {
        el.classList.add("d-none");
    });

    // Cria o wrapper para agrupar input + botão Alterar
    const editWrapperElement = document.createElement("div");
    editWrapperElement.classList.add("d-flex", "gap-2", "flex-grow-1", "edit-wrapper");

    // Cria o input de edição
    const inputEditElement = document.createElement("input");
    inputEditElement.setAttribute("type", "text");
    inputEditElement.classList.add("form-control", "form-control-sm");
    inputEditElement.value = currentValue;

    // Cria o botão "Alterar"
    const buttonAlterElement = document.createElement("button");
    buttonAlterElement.classList.add("btn", "btn-success", "btn-sm", "btn-alter");
    buttonAlterElement.innerText = "Alterar";

    editWrapperElement.append(inputEditElement, buttonAlterElement);
    liElement.append(editWrapperElement);

    // Foca o input e posiciona o cursor no fim
    inputEditElement.focus();
    inputEditElement.setSelectionRange(inputEditElement.value.length, inputEditElement.value.length);

    // Função que confirma a edição
    function confirmEdit() {
        const newValue = inputEditElement.value.trim();

        // Não salva valor vazio — mantém o anterior
        if (newValue === "") {
            inputEditElement.focus();
            return;
        }

        // Atualiza o texto exibido
        currentTextNode.textContent = newValue;

        // Remove o wrapper de edição
        editWrapperElement.remove();

        // Restaura o texto e o botão Excluir
        liElement.querySelectorAll(".item-text, .btn-delete").forEach((el) => {
            el.classList.remove("d-none");
        });
    }

    // Confirma ao clicar em "Alterar"
    buttonAlterElement.addEventListener("click", (event) => {
        event.preventDefault();
        confirmEdit();
    });

    // Desafio: Enter no input também confirma
    inputEditElement.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        confirmEdit();
    });
}
