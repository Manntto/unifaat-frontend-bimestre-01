import createNameList from "./createNameList.js";
import jsonContent from "../example.json" with { type: "json" };

/**
 * Popula o ul com os itens vindos do example.json
 *
 * @param {HTMLUListElement} ulElement
 */
export default function initList(ulElement) {
    jsonContent.data.forEach(({ name }) => {
        const liElement = createNameList(name);
        ulElement.append(liElement);
    });
}
