/**
 * Usage:
 * -to constructor pass dbl click & long click delays
 * (there are default values)
 *
 * -on mount pass Handlers as parameter to ...clickCall functions
 * (not mandatory to use them all)
 *
 * -attach click event to a call to click() & mousedown event to mouseDown()
 * parameters are passed to each function handler
 * (mouseDown's to longClickHandler & click's to the others)
 */
export default class ClickService {
    constructor(dblClickDelay = 300, longClickDelay = 1000) {
        this.dblClickDelay = dblClickDelay;
        this.longClickDelay = longClickDelay;
        this.clicked = false;
        this.clickTimer = 0;
        this.ignoreNextClick = false;
        this.mouseDownTimer = 0;
        this.clickHandler = null;
        this.dblClickHandler = null;
        this.longClickHandler = null;
        this.longClickEndHandler = null;
    }

    click() {
        clearTimeout(this.mouseDownTimer);
        if (!this.ignoreNextClick) {
            if (this.clicked) {
                clearTimeout(this.clickTimer);
                this.clicked = false;
                if (this.dblClickHandler) {
                    this.dblClickHandler(...arguments);
                }
            } else {
                this.clicked = true;
                this.clickTimer = setTimeout(() => {
                    this.clicked = false;
                    if (this.clickHandler) {
                        this.clickHandler(...arguments);
                    }
                }, this.dblClickDelay);
            }
        } else {
            if (this.longClickEndHandler) {
                this.longClickEndHandler(...arguments);
            }
        }
    }

    mouseDown() {
        this.ignoreNextClick = false;
        this.mouseDownTimer = setTimeout(() => {
            this.ignoreNextClick = true;
            this.longClickHandler(...arguments);
        }, this.longClickDelay);
    }

    clickCall(functionHandler) {
        this.clickHandler = functionHandler;
    }

    dblClickCall(functionHandler) {
        this.dblClickHandler = functionHandler;
    }

    longClickCall(functionHandler) {
        this.longClickHandler = functionHandler;
    }

    longClickEndCall(functionHandler) {
        this.longClickEndHandler = functionHandler;
    }

}

