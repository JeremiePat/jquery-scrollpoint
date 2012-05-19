jQuery scrollPoint
==================

A jQuery plugin to define and interact with scroll zones.

Defining a scroll zone
----------------------

To bind an element with a scroll zone, just do the following :

```javascript
jQuery('#foo').scrollPoint({
    up   : 200,
    down : 400
});
```

In this example, the #foo element will trigger events (see below) each time the page scroll will reach the "up" and "down" limits previously defined.

The following scroll zone definition are equivalent :

```javascript
jQuery('#foo').scrollPoint();
```

```javascript
jQuery('#foo').scrollPoint({
    up   : jQuery('#foo').offset().top,
    down : jQuery('#foo').offset().top + jQuery('#foo').height()
});
```

Using events
------------

Each time the window scroll position reach or leave a defined scroll zone, all the elements bind to this zone will trigger events.

3 kind of events are triggered :

* ``scrollPointEnter``  
  When the scroll position enter the defined scroll zone.
* ``scrollPointLeave``  
  When the scroll position leave the defined scroll zone.
* ``scrollPointMove``  
  Each time you scroll to say if the scroll position is in or out the scroll zone.

You can use those events as usual :

```javascript
jQuery(document).on("scrollPointEnter", "#foo", function(event) {
    /* Do whatever you want when reaching the scroll zone watches by #foo */
});

jQuery(document).on("scrollPointLeave", "#foo", function(event) {
    /* Do whatever you want when leaving the scroll zone watches by #foo */
});

jQuery(document).on("scrollPointMove", "#foo", function(event) {
    if (event.isIn) {
        /* Do whatever you want while you scroll inside the scroll zone watches by #foo */
    } else {
        /* Do whatever you want while you scroll outside the scroll zone watches by #foo */
    }
});
```