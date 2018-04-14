
import { Item } from "./core";

export const Paragraph: Item = {
    tagName: "p",
    validParents: ["li"],
    rootAllowed: true,
}

export const BlockQuote: Item = {
    tagName: "blockquote",
    rootAllowed: true,
    canNestEditor: true,
}

export const ListItem: Item = {
    tagName: "li",
    validParents: ["ul"],
    onEnterKeyPressCreateTag: "li",
}

export const DictTitle: Item = {
    tagName: "dt",
    validParents: ["dl"],
    onEnterKeyPressCreateTag: "dd",
}

export const DictDefinition: Item = {
    tagName: "dd",
    validParents: ["dl"],
    onEnterKeyPressCreateTag: "dt",
}

export const Heading1: Item = {
    tagName: "h1",
    rootAllowed: true,
}

export const Heading2: Item = {
    tagName: "h2",
    rootAllowed: true,
}

export const Heading3: Item = {
    tagName: "h3",
    rootAllowed: true,
}

export const Heading4: Item = {
    tagName: "h4",
    rootAllowed: true,
}

export const Heading5: Item = {
    tagName: "h5",
    rootAllowed: true,
}

export const Heading6: Item = {
    tagName: "h6",
    rootAllowed: true,
}
