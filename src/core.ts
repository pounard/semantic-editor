
import * as Items from "./items";

const DEFAULT_CONFIGURATION_ITEMS = [
    Items.Paragraph,
    Items.BlockQuote,
    Items.ListItem,
    Items.DictTitle,
    Items.DictDefinition,
    Items.Heading1,
    Items.Heading2,
    Items.Heading3,
    Items.Heading4,
    Items.Heading5,
    Items.Heading6,
];

/**
 * On keypress item callback
 */
export type ItemEnterKeypressCallback = (target: HTMLElement) => void;

/**
 * Editable item interface
 */
export interface Item {
    /**
     * Tag name to match
     */
    readonly tagName: string;

    /**
     * Valid parents in editor
     */
    readonly validParents?: string[];

    /**
     * Advanced query selector (will be run over the editor itself) that
     * tells if the item is valid or not. Per default, the selector will
     * be naive and will be "validParents > tagName" or "> tagName" if
     * rootAllowed is set to true.
     */
    readonly selector?: string;

    /**
     * Can this item be spawned at the editor root
     */
    readonly rootAllowed?: boolean;

    /**
     * If set to true, this item will be considered as an editor itself
     */
    readonly canNestEditor?: boolean;

    /**
     * If onKeyPress property is not set, this defines the element created
     * under the one being focused, if nothing specified, this will always
     * be a "p" tag.
     */
    readonly onEnterKeyPressCreateTag?: string;

    /**
     * On key press callback if different from default: default will just
     * create a new default element and focus onto it. Default element tag
     * name will be the onKeyPressCreateTag property.
     */
    readonly onEnterKeyPress?: ItemEnterKeypressCallback;
}

/**
 * Represents an editor along its configuration
 */
export interface Editor {
    config: Configuration,
    root: HTMLElement,
}

/**
 * Editor configuration
 */
export interface Configuration {
    items: Item[],
}

/**
 * Initialize editor on the given DOM element
 */
export function editor(root: HTMLElement, config?: Configuration): void {

    if (!root.querySelectorAll) {
        console.log(`${root} is not a valid HtmlElement`);
        return;
    }
    root.classList.add("semantic-editor");

    if (!config) {
        config = {
            items: DEFAULT_CONFIGURATION_ITEMS,
        };
    }

    if (!config.items.length) {
        console.log(`${root} is not a valid HtmlElement`);
        return;
    }

    const editor: Editor = {
        config: config,
        root: root,
    };

    // For each item, build selector and find items
    for (let item of config.items) {
        const selectors = buildItemSelector(item);
        for (let element of (<HTMLElement[]><any>root.querySelectorAll(selectors))) {
            initItem(element, item, editor);
        }
    }
}

/**
 * Build item selector as documented in the Item interface
 */
function buildItemSelector(item: Item): string {
    const parts: string[] = [];
    let isValid: boolean = false;

    if (item.validParents && item.validParents.length) {
        isValid = true;
        for (let parent of item.validParents) {
            parts.push(`${parent} > ${item.tagName}`);
        }
    }

    if (item.rootAllowed) {
        isValid = true;
        parts.push(`${item.tagName}`);
    }

    if (!isValid) {
        throw `item is not valid, it must have at least one valid parent or be allowed to root: ${item}`;
    }

    return parts.join(", ");
}

/**
 * Variant of Element.matches() - intead of just trying to match the item
 * using a CSS selector, it will match it relatively to the editor root.
 */
function matches(element: HTMLElement, selectors: string, editor: Editor): boolean {
    const found = editor.root.querySelectorAll(selectors);
    if (found.length) {
        for (let i = 0; i < found.length; i++) {
            if (found[i] === element) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Lookup over allowed item types, and initialize the item if a matching item
 * type exists.
 */
function initSingleItem(element: HTMLElement, editor: Editor): boolean {
    for (let item of editor.config.items) {
        const selectors = buildItemSelector(item);
        if (matches(element, selectors, editor)) {
            initItem(element, item, editor);
            return true;
        }
    }
    return false;
}

/**
 * Initialize a single item.
 */
function initItem(element: HTMLElement, item: Item, editor: Editor): void {
    // @todo once implemented, add here:
    //   - hover / tooltip behavior
    //   - menus, if there are?

    // Make item editable
    element.contentEditable = "true";

    // Handle keypress
    element.addEventListener("keypress", (event: KeyboardEvent) => {
        if (!event.target) {
            return;
        }
        if (event.keyCode !== 13) {
            return; // Not the enter key
        }

        if (!element.parentElement) {
            throw `element is invalid (has no parent): ${element}`;
        }

        event.stopPropagation();
        event.preventDefault();

        if (item.onEnterKeyPress) {
            item.onEnterKeyPress(element);
        } else {
            // Default behavior is document within the Item interface: per
            // default we just create a new element right after, which is
            // either p, or any tag specified by the onEnterKeyPressCreateTag
            // property
            const tagName: string = item.onEnterKeyPressCreateTag || "p";
            const sibling = document.createElement(tagName);

            // Insert element at the right position
            element.parentElement.insertBefore(sibling, element.nextElementSibling);

            // In the end, initialize it, it must be in the right DOM position
            // to be correctly initialized
            initSingleItem(sibling, editor);

            // A void space will force the item to reserve space for text
            sibling.innerText = "\n";

            // And the very last touch, focus!
            sibling.focus();
        }
    });
}
