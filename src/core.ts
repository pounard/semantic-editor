
import * as Edit from "./edit";
import * as Interface from "./interface";
import * as Items from "./items";

const DEFAULT_CONFIGURATION_ITEMS = [
    Items.BlockQuote,
    Items.DefinitionBody,
    Items.DefinitionList,
    Items.DefinitionTitle,
    Items.Heading1,
    Items.Heading2,
    Items.Heading3,
    Items.Heading4,
    Items.Heading5,
    Items.Heading6,
    Items.ListItem,
    Items.OrderedList,
    Items.Paragraph,
    Items.UnorderedList,
];

/**
 * On editable enter keypress callback
 */
export type EditableEnterKeypressCallback = (target: HTMLElement, editor: Editor) => void;

/**
 * On editable enter keypress callback
 */
export type BuildCallback = (target: HTMLElement, editor: Editor) => void;

/**
 * Item interface
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
     * Can this item be spawned by the user
     */
    readonly insertable?: boolean;

    /**
     * Build callback, given target item is an empty element whose tag name
     * matches the tagName property. If you do not implement it, the tag
     * will be left empty
     */
    readonly build?: BuildCallback;

    /**
     * Is item editable, if set to true you MUST implement the Editable
     * interface as well.
     *
     * @todo this is rather ugly, a better way should be found
     */
    editable?: boolean;
}

/**
 * Editable item interface
 */
export interface Editable extends Item {
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
    readonly onEnterKeyPress?: EditableEnterKeypressCallback;
}

/**
 * Editor configuration
 */
export interface Configuration {
    items: Item[],
}

/**
 * Represents an editor along its configuration
 */
export interface Editor {
    readonly config: Configuration,
    readonly document: Document,
    readonly root: HTMLElement,
    insertDialog: HTMLElement | null,
    focusedElement: HTMLElement | null,
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
        document: root.ownerDocument,
        insertDialog: null,
        root: root,
        focusedElement: null,
    };

    Interface.buildAddButons(editor);

    initAllItemsIn(editor);

    const testElement = editor.document.querySelector("#insert-blockquote-test");
    if (testElement) {
        testElement.addEventListener("click", (event: Event) => {
            event.stopPropagation();
            event.preventDefault();

            insertItemAfter(Items.BlockQuote, editor, <HTMLElement>root.querySelector(":focus"));
        });
    }
}

/**
 * Build and insert new item structure in the given editor after the given
 * current element, fallback on append if there is no current selection.
 */
export function insertItemAfter(item: Item, editor: Editor, current?: HTMLElement, doFocus: boolean = true): void {

    // Create rightfully the item structure
    if (!item.insertable) {
        throw `item is not insertable: ${item}`;
    }

    const element = editor.document.createElement(item.tagName);
    if (item.build) {
        item.build(element, editor);
    }

    if (current && current.parentElement) {
        current.parentElement.insertBefore(element, current.nextElementSibling);
    } else if (editor.focusedElement && editor.focusedElement.parentElement) {
        editor.focusedElement.parentElement.insertBefore(element, editor.focusedElement.nextElementSibling);
    } else {
        // insert at root
        editor.root.appendChild(element);
    }

    initSingleItem(editor, element);
    initAllItemsIn(editor, element);

    // Focus the very first one, seems legit to position the user
    // on the first (and most oftenly will be the only one).
    if (element.isContentEditable) {
        element.focus();
    } else {
        const editable = element.querySelector(`[contenteditable="true"]`);
        if (editable) {
            (<HTMLElement>editable).focus();
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
 * Traverse all enabled items from the editor config, respectively build their
 * selectors and initialize the elements found in the editor context.
 */
function initAllItemsIn(editor: Editor, context?: HTMLElement) {
    if (!context) {
        context = editor.root;
    } else if (!editor.root.contains(context)) {
        throw `you cannot initialize an item that is not in the editor: ${context}`;
    }
    for (let item of editor.config.items) {
        const selectors = buildItemSelector(item);
        for (let element of (<HTMLElement[]><any>context.querySelectorAll(selectors))) {
            initItem(element, item, editor);
        }
    }
}

/**
 * Lookup over allowed item types, and initialize the item if a matching item
 * type exists.
 */
function initSingleItem(editor: Editor, element: HTMLElement): boolean {
    if (!editor.root.contains(element)) {
        throw `you cannot initialize an item that is not in the editor: ${element}`;
    }
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
    if (element.getAttribute("data-ready")) {
        // This should NOT happen, it means a selector is too wide
        console.log(`element is already initialized ${element}`);
        return;
    }
    element.setAttribute("data-ready", "1");

    if (item.editable) {
        // Since that all properties on the Editable interface are optional
        // it's safe to cast the Item as Editable.
        initEditableItem(element, <Editable>item, editor);
    }
}

/**
 * Initialize an editable item
 */
function initEditableItem(element: HTMLElement, item: Editable, editor: Editor) {
    // Make item editable
    element.contentEditable = "true";

    // Force item to have at least an empty space: this forces some browsers
    // to correctly display the empty element, especially when the element
    // size is directly dependent from the font size
    if (element.innerText.match(/^\s*$/)) {
        element.innerText = "\n";
    }

    // On focus, the element should be set as the latest editor selected element
    element.addEventListener("focus", (event: Event) => {
        editor.focusedElement = element;
        if (element.parentElement) {
            if (element.parentElement === editor.root) {
                Interface.refreshAddButtons(editor);
            } else {
                Interface.refreshAddButtons(editor, element.parentElement);
            }
        }
    });

    // Handle keypress
    element.addEventListener("keypress", (event: KeyboardEvent) => {
        if (!event.target) {
            return;
        }

        if (event.keyCode === 13) { // Enter
            if (!element.parentElement) {
                throw `element is invalid (has no parent): ${element}`;
            }

            event.stopPropagation();
            event.preventDefault();

            if (item.onEnterKeyPress) {
                item.onEnterKeyPress(element, editor);
            } else {
                // Default behavior is document within the Editables interface: per
                // default we just create a new element right after, which is
                // either p, or any tag specified by the onEnterKeyPressCreateTag
                // property
                const tagName: string = item.onEnterKeyPressCreateTag || "p";
                const sibling = editor.document.createElement(tagName);

                // Insert element at the right position
                element.parentElement.insertBefore(sibling, element.nextElementSibling);

                // In the end, initialize it, it must be in the right DOM position
                // to be correctly initialized
                initSingleItem(editor, sibling);

                // A void space will force the item to reserve space for text
                sibling.innerText = "\n";

                // And the very last touch, focus!
                sibling.focus();
            }
        } else if (event.keyCode === 8) { // Backspace
            if (!element.parentElement) {
                throw `element is invalid (has no parent): ${element}`;
            }

            if (element.innerText === "" || element.innerText === "\n") {
                event.stopPropagation();
                event.preventDefault();

                // Simulate "Shift+Tab" on the element to focus the parent in
                // tabindex, ensuring the user may continue to edit without the
                // mouse.
                if (!Edit.selectTabbablePrev(editor.root)) {
                    // Focus out to prevent editor from being wiped out by serial backslashers.
                    element.blur();
                }

                // @todo
                //  - It should not remove the item if it's the last sibling
                //  - OR it could, but it must deal with locked parents too
                element.parentElement.removeChild(element);
            }
        } else if (event.keyCode === 46) { // Delete
            if (!element.parentElement) {
                throw `element is invalid (has no parent): ${element}`;
            }

            if (element.innerText === "" || element.innerText === "\n") {
                event.stopPropagation();
                event.preventDefault();

                // Simulate "Shift+Tab" on the element to focus the parent in
                // tabindex, ensuring the user may continue to edit without the
                // mouse.
                if (!Edit.selectTabbableNext(editor.root)) {
                    // Focus out to prevent editor from being wiped out by serial deleters.
                    element.blur();
                }

                // @todo
                //  - It should not remove the item if it's the last sibling
                //  - OR it could, but it must deal with locked parents too

                element.parentElement.removeChild(element);
            } else if (Edit.getCursorPosition(element).atEnd) {
                event.stopPropagation();
                event.preventDefault();

                // @todo
                console.log("not implemented yet: I should move content from the next focusable element within here");
            }
        }
    });
}
