import editNameList from "./editNameList.js";

/**
 * Cria um item <li> da lista com:
 * - Texto do nome
 * - Botão "Excluir"
 * - Listener de clique no li para entrar em modo de edição
 *   (clicar nos botões não aciona a edição — verificado via event.target)
 *
 * @param {string} name - nome a ser exibido no item
 * @returns {HTMLLIElement}
 */
export default function createNameList(name) {
    const liElement = document.createElement("li");
    liElement.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    // Span que exibe o texto — facilita localizar e ocultar/exibir
    const textSpanElement = document.createElement("span");
    textSpanElement.classList.add("item-text");
    textSpanElement.textContent = name;

    // Botão "Excluir"
    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm", "btn-delete");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", (event) => {
        event.preventDefault();
        event.currentTarget.parentElement.remove();
    });

    liElement.append(textSpanElement, buttonDeleteElement);

    // Listener de edição no li
    // Usa event.target para ignorar cliques nos botões "Excluir" e "Alterar"
    liElement.addEventListener("click", (event) => {
        const targetElement = event.target;

        // Ignora clique em qualquer botão
        if (targetElement.closest("button")) return;

        // Ignora se já estiver em modo de edição
        if (liElement.querySelector(".edit-wrapper")) return;

        editNameList(liElement);
    });

    return liElement;
}
