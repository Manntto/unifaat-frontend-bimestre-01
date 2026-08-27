import createNameList from "./createNameList.js";
import createUl from "./createUl.js";
import initList from "./initList.js";

window.addEventListener("DOMContentLoaded", () => {
    const sectionListElement    = document.querySelector("#list-container");
    const addSectionElement     = document.querySelector("#add-section");
    const buttonListAddElement  = addSectionElement.querySelector("button");
    const inputListAddElement   = addSectionElement.querySelector("input");

    // Cria e insere o ul na seção principal
    const ulElement = createUl();
    sectionListElement.append(ulElement);

    // Popula com os dados iniciais do JSON
    initList(ulElement);

    // Botão "Adicionar"
    buttonListAddElement.addEventListener("click", (event) => {
        event.preventDefault();

        const inputValue = inputListAddElement.value.trim();
        if (inputValue === "") return;

        const liElement = createNameList(inputValue);
        ulElement.prepend(liElement);

        inputListAddElement.value = "";
    });

    // Desafio: Enter no input de adicionar dispara o clique no botão
    inputListAddElement.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        buttonListAddElement.dispatchEvent(new Event("click"));
    });
});
