
import *  as Core from "./core";

/**
 * Create the insert buttons dialog
 */
export function buildAddButons(editor: Core.Editor): HTMLElement {
    const dialog = editor.document.createElement("div");
    dialog.setAttribute("data-insert-dialog", "true");
    dialog.setAttribute("class", "semantic-editor-insert");

    for (let item of editor.config.items) {
        if (item.insertable) {
            const button = editor.document.createElement("button");
            button.setAttribute("data-insert-tag", item.tagName);
            // @todo translation system
            button.innerHTML = item.tagName;
            dialog.appendChild(button);

            button.addEventListener("click", (event: Event) => {
                event.stopPropagation();
                event.preventDefault();
                if (!button.disabled) {
                    Core.insertItemAfter(item, editor);
                }
            });
        }
    }

    editor.insertDialog = dialog;
    (<HTMLElement>editor.root.parentElement).insertBefore(dialog, editor.root);

    return dialog;
}

/**
 * Refreshes the insert buttons dialog depending upon context.
 * If no context is provided, this mean the insert dialog target is editor root.
 */
export function refreshAddButtons(editor: Core.Editor, target?: HTMLElement) {
    if (editor.insertDialog) {
        for (let item of editor.config.items) {
            const button = <HTMLButtonElement>editor.insertDialog.querySelector(`[data-insert-tag="${item.tagName}"]`);
            if (button) {
                button.disabled = true;
                if (target) {
                    if (item.validParents) {
                        for (let validParent of item.validParents) {
                            if (target.tagName === validParent) {
                                button.disabled = false;
                                continue;
                            }
                        }
                    }
                } else {
                    button.disabled = !item.rootAllowed;
                }
            }
        }
    }
}
