# ClickService

Allows managing click, long click, double click and long touch in the same element.

It can be used importing the module 'ClickService'. To the object constructor pass double click and long click delays (
300 and 1000 ms by default).

Call clickCall, dblClickCall, longClickCall, longClickEndCall passing a handler if that event is going to be used.

In the html element, attach click event to click() method and mouse down and touch start events to mouseDown() (this one
is only needed if long click is going to be used).

## For example:

###### html:

~~~
<img ...
    @click="clickImage(index)"
    @mousedown="mouseDown(index, $event)"
    @touchstart="mouseDown(index, $event)"
>
~~~

###### initialize:

~~~
mounted () {
    this.clickService = new ClickService(300, 1000);
    this.clickService.clickCall((index) => {
     this.selectImage(index);
    });
    this.clickService.dblClickCall((index) => {
      this.loadVisor(index);
    });
    this.clickService.longClickCall((index, event) => {
     this.longClickImage(index, event);
    });
    this.clickService.longClickEndCall(() => {
     this.endLongClickImage();
    });
}
~~~