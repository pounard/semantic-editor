
import { Editable, Item } from "./core";

export const Paragraph: Editable = {
    tagName: "p",
    validParents: ["li"],
    rootAllowed: true,
    editable: true,
    insertable: true,
}

export const BlockQuote: Item = {
    tagName: "blockquote",
    rootAllowed: true,
    insertable: true,
    build: target => {
        const paragraph = document.createElement("p");
        target.appendChild(paragraph);
        paragraph.focus();
    },
}

export const OrderedList: Item = {
    tagName: "ol",
    rootAllowed: true,
    insertable: true,
    build: target => {
        const item = document.createElement("li");
        target.appendChild(item);
        item.focus();
    },
}

export const UnorderedList: Item = {
    tagName: "ul",
    rootAllowed: true,
    insertable: true,
    build: target => {
        const item = document.createElement("li");
        target.appendChild(item);
        item.focus();
    },
}

export const ListItem: Editable = {
    tagName: "li",
    validParents: ["ul"],
    editable: true,
    onEnterKeyPressCreateTag: "li",
}

export const DefinitionList: Item = {
    tagName: "dl",
    rootAllowed: true,
    insertable: true,
    build: target => {
        const heading = document.createElement("dt");
        const body = document.createElement("dd");
        target.appendChild(heading);
        target.appendChild(body);
        heading.focus();
    },
}

export const DefinitionTitle: Editable = {
    tagName: "dt",
    validParents: ["dl"],
    editable: true,
    onEnterKeyPressCreateTag: "dd",
}

export const DefinitionBody: Editable = {
    tagName: "dd",
    validParents: ["dl"],
    editable: true,
    onEnterKeyPressCreateTag: "dt",
}

export const Heading1: Editable = {
    tagName: "h1",
    rootAllowed: true,
    insertable: true,
    editable: true,
}

export const Heading2: Editable = {
    tagName: "h2",
    rootAllowed: true,
    insertable: true,
    editable: true,
}

export const Heading3: Editable = {
    tagName: "h3",
    rootAllowed: true,
    insertable: true,
    editable: true,
}

export const Heading4: Editable = {
    tagName: "h4",
    rootAllowed: true,
    insertable: true,
    editable: true,
}

export const Heading5: Editable = {
    tagName: "h5",
    rootAllowed: true,
    insertable: true,
    editable: true,
}

export const Heading6: Editable = {
    tagName: "h6",
    rootAllowed: true,
    insertable: true,
    editable: true,
}
