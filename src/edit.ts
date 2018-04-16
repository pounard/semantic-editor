
/**
 * Many thanks to:
 *   https://stackoverflow.com/a/3866442
 *
 * All credits to its original author.
 */
function changeCursorPosition(element: HTMLElement, toStart: boolean): void {
    let range, selection;
    if (document.createRange) { //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(element);//Select the entire contents of the element with the range
        range.collapse(toStart);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    } else if((<any>document).selection) { // IE 8 and lower
        range = (<any>document.body).createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(element);//Select the entire contents of the element with the range
        range.collapse(toStart);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

/**
 * Considering the item is currently being focused, set the current selection
 * at the begining of the inner text - on a contenteditable element, this means that
 * the user will type right at the end of the text.
 */
export function changeCursorPositionToStart(element: HTMLElement): void {
    changeCursorPosition(element, true);
}

/**
 * Considering the item is currently being focused, set the current selection
 * at the begining of the inner text - on a contenteditable element, this means that
 * the user will type right at the end of the text.
 */
export function changeCursorPositionToEnd(element: HTMLElement): void {
    changeCursorPosition(element, false);
}

/**
 * Represents an cursor position
 */
interface Cursor {
    readonly position: number;
    readonly selectionLength: number;
    readonly atStart: boolean;
    readonly atEnd: boolean;
}

/**
 * Is cursor in the end of the given element
 *
 * Many thanks to:
 *   https://stackoverflow.com/a/4812022
 *
 * All credits to its original author.
 */
export function getCursorPosition(element: HTMLElement): Cursor {
    const _document = element.ownerDocument;
    const _window = _document.defaultView || <Window>(<any>_document).parentWindow;
    let selection: Selection;
    let caretOffset = 0;
    let endOffset = 0;

    if (_window.getSelection) { // Firefox, Chrome, Opera, Safari, IE 9+
        selection = _window.getSelection();
        if (selection.rangeCount > 0) {
            const range = _window.getSelection().getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            endOffset = preCaretRange.toString().length;
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((selection = (<any>_document).selection) && selection.type != "Control") { // IE 8 and lower
        const textRange = (<any>selection).createRange();
        const preCaretTextRange = (<any>_document.body).createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }

    return {
        position: caretOffset,
        selectionLength: endOffset + 1,
        atStart: caretOffset === 0,
        atEnd: caretOffset === endOffset, // @todo
    };
}

/**
 * Select and focus next tabbable element in the given context
 *
 * If there is no current selection, move to first.
 */
export function selectTabbablePrev(context: HTMLElement, wrapLookup: boolean = false): boolean {
    const current = <HTMLElement>context.querySelector(':focus');
    if (current) {
        let previous: HTMLElement | null = null;
        let fallbackOnNext = false;

        for (let element of (<HTMLElement[]><any>context.querySelectorAll(`[contenteditable="true"]`))) {
            if (element === current) {
                if (previous) {
                    previous.focus();
                    changeCursorPositionToEnd(previous);
                    return true;
                } else {
                    // Our element is the first one, select the next
                    fallbackOnNext = true;
                }
            } else if (fallbackOnNext) {
                element.focus();
                changeCursorPositionToEnd(element);
                return true;
            } else {
                previous = element;
            }
        }
    }

    if (wrapLookup) {
        // Nothing to focus was found, just select the first
        const first = context.querySelector(`[contenteditable="true"]`);
        if (first) {
            (<HTMLElement>first).focus();
            changeCursorPositionToEnd(<HTMLElement>first);
            return true;
        }
    }

    return false;
}

/**
 * Select and focus next tabbable element in the given context
 *
 * If there is no current selection, move to first.
 */
export function selectTabbableNext(context: HTMLElement, wrapLookup: boolean = false): boolean {
    const current = <HTMLElement>context.querySelector(':focus');
    if (current) {
        let isNext = false;
        for (let element of (<HTMLElement[]><any>context.querySelectorAll(`[contenteditable="true"]`))) {
            if (isNext) {
                element.focus();
                changeCursorPositionToStart(element);
                return true;
            } else if (element === current) {
                isNext = true;
            }
        }
    }

    if (wrapLookup) {
        // Nothing to focus was found, just select the first
        const first = context.querySelector(`[contenteditable="true"]`);
        if (first) {
            (<HTMLElement>first).focus();
            changeCursorPositionToStart(<HTMLElement>first);
            return true;
        }
    }

    return false;
}
