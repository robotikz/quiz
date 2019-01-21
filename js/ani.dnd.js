(function(cjs, an) {

    var p; // shortcut to reference prototypes
    var lib = {};
    var ss = {};
    var img = {};
    lib.ssMetadata = [];


    // symbols:



    (lib.handgrab = function() {
        this.initialize(img.handgrab);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 50, 52);


    (lib.hand = function() {
        this.initialize(img.hand);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 50, 58);


    (lib.plusone = function() {
        this.initialize(img.plusone);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 269, 269); // helper functions:

    function mc_symbol_clone() {
        var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;
        return clone;
    }

    function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
        var prototype = cjs.extend(symbol, cjs.MovieClip);
        prototype.clone = mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;
        return prototype;
    }


    (lib.Tween2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.handgrab();
        this.instance.parent = this;
        this.instance.setTransform(-25, -26);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-25, -26, 50, 52);


    (lib.Tween1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.hand();
        this.instance.parent = this;
        this.instance.setTransform(-25, -29);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-25, -29, 50, 58);


    (lib.Symbol3 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#6FD370").s().rr(-72.9, -20.75, 145.8, 41.5, 20.75);
        this.shape.setTransform(72.9, 20.7);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.Symbol2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#6FD370").s().p("AolD6QhnAAhKhKQhJhIAAhoQAAhmBJhKQBKhJBnAAIRLAAQBoAABIBJQBKBKAABmQAABohKBIQhIBKhoAAg");
        this.shape.setTransform(72.9, 20.7, 0.911, 0.829);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.Symbol1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#6FD370").s().p("AnzD6QhoAAhJhJQhJhKAAhnQAAhnBJhJQBJhJBoAAIPnAAQBnAABKBJQBJBJAABnQAABnhJBKQhKBJhnAAg");
        this.shape.setTransform(72.9, 20.7, 0.972, 0.829);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.plusone_1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.plusone();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.145, 0.145);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = getMCSymbolPrototype(lib.plusone_1, new cjs.Rectangle(0, 0, 39, 39), null);


    (lib.answer_box4_text = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#333333").s().p("AgYA1QgJgHAAgNIAOACQABAGAEADQAFAEAJAAQAJAAAFgEQAFgEACgHQABgEAAgOQgJALgNAAQgRAAgJgNQgKgMAAgQQAAgMAFgKQAEgKAIgGQAIgFALAAQAOAAAKAMIAAgKIANAAIAABHQAAATgEAIQgEAIgJAFQgIAEgMAAQgPAAgJgGgAgPgnQgGAIAAAPQAAAQAGAHQAHAHAJAAQAJAAAHgHQAGgHAAgQQAAgPgGgIQgHgHgKAAQgIAAgHAHg");
        this.shape.setTransform(63.1, 13.9);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#333333").s().p("AgWAqIAAhSIANAAIAAANQAFgJAEgDQADgCAFAAQAHAAAHAEIgEANQgGgDgEAAQgGAAgCADQgDADgCAFQgDAHABAJIAAAqg");
        this.shape_1.setTransform(56.9, 12.3);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#333333").s().p("AgSAnQgGgCgDgFQgDgEgCgGIgBgNIAAgzIAPAAIAAAtIAAAQQACAFAEADQAEAEAHgBQAFABAGgEQAFgDACgGQADgGAAgKIAAgsIAOAAIAABSIgNAAIAAgLQgKAOgPAAQgHgBgHgDg");
        this.shape_2.setTransform(49.1, 12.5);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#333333").s().p("AgWAuIAAAKIgNAAIAAhxIAOAAIAAApQAJgMANAAQAHAAAIAEQAGADAFAFQAEAGADAIQACAHAAAJQAAAVgKALQgLAMgPAAQgNAAgJgMgAgQgIQgGAIAAAOQAAAPAEAHQAGALAMAAQAIAAAHgIQAHgIgBgQQABgQgHgHQgGgIgJAAQgIAAgIAIg");
        this.shape_3.setTransform(40.5, 10.9);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#333333").s().p("AAqAqIAAgzQAAgIgBgEQgBgEgEgCQgEgCgFAAQgIAAgGAGQgGAFAAANIAAAvIgNAAIAAg1QAAgJgDgEQgEgFgIAAQgGAAgFADQgFADgCAGQgCAGAAALIAAAqIgOAAIAAhSIAMAAIAAAMQAEgGAHgEQAGgDAJAAQAJAAAGADQAFAFACAGQAKgOAQAAQAMgBAHAIQAGAGAAAPIAAA3g");
        this.shape_4.setTransform(29.1, 12.3);

        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#333333").s().p("AgeAlQgHgHAAgKQAAgHACgEQADgGAFgCQAFgCAFgCIAMgDQARgCAHgCIAAgEQAAgJgDgDQgGgEgKgBQgKABgEADQgFADgCAJIgOgCQACgIAFgGQADgGAJgDQAIgCAJAAQALgBAHADQAGADADAEQAEADABAGIABANIAAARQAAAVABAEIADAKIgOAAIgEgKQgHAHgHACQgHADgIABQgNgBgIgGgAgCAFIgNADQgDABgCADQgCADAAAEQAAAGAEAEQAFADAHAAQAIABAGgEQAHgDADgHQABgFAAgJIAAgFQgHADgOACg");
        this.shape_5.setTransform(18, 12.4);

        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f("#333333").s().p("AAeA5IAAg2Ig7AAIAAA2IgPAAIAAhxIAPAAIAAAvIA7AAIAAgvIAPAAIAABxg");
        this.shape_6.setTransform(7.8, 10.8);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_6 }, { t: this.shape_5 }, { t: this.shape_4 }, { t: this.shape_3 }, { t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box4_text, new cjs.Rectangle(0, 0, 70.1, 21.9), null);


    (lib.answer_box4 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("An+DPQhWAAg9g9Qg8g8AAhWIAAAAQAAhVA8g9QA9g8BWAAIP9AAQBWAAA8A8QA9A9AABVIAAAAQAABWg9A8Qg8A9hWAAg");
        this.shape.setTransform(72.9, 20.7, 1.015, 1);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box4, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.answer_box3_text = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#333333").s().p("AAUAqIAAgxQAAgIgCgFQgCgEgEgCQgEgDgGAAQgIAAgGAGQgHAFAAAQIAAAsIgOAAIAAhSIANAAIAAAMQAJgOAQABQAIAAAGACQAGADAEAEQADAFABAGIABAOIAAAxg");
        this.shape.setTransform(38.4, 12.3);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#333333").s().p("AgGA5IAAhSIANAAIAABSgAgGgoIAAgQIANAAIAAAQg");
        this.shape_1.setTransform(32.2, 10.8);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#333333").s().p("AgGA5IAAhxIANAAIAABxg");
        this.shape_2.setTransform(28.6, 10.8);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#333333").s().p("AgWAqIAAhSIANAAIAAANQAFgJAEgDQADgCAFAAQAHAAAHAEIgEANQgFgDgGAAQgFAAgCADQgDADgCAFQgCAHAAAJIAAAqg");
        this.shape_3.setTransform(24.9, 12.3);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#333333").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKAMAAATIAAADIg9AAQABAPAHAGQAHAIAJAAQAIAAAFgEQAGgEADgJIAPACQgEAMgJAIQgJAGgPABQgRAAgLgMgAgPgYQgGAGgBALIAtAAQgBgKgEgGQgHgIgKAAQgJAAgHAHg");
        this.shape_4.setTransform(17.1, 12.4);

        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#333333").s().p("AgqA5IAAhxIAqAAQANAAAIADQAIAEAEAHQAFAHAAAIQAAAHgEAHQgEAGgIAEQAKADAGAHQAFAHAAAKQAAAIgDAHQgDAHgFAEQgFADgIACQgHACgLAAgAgbAsIAcAAIAKgBQAFgBAEgCQADgCACgEQADgEAAgGQAAgGgEgFQgDgFgGgCQgFgCgKAAIgbAAgAgbgIIAZAAIANgBQAGgCADgEQADgEAAgGQAAgGgDgEQgCgFgGgBQgFgCgLAAIgXAAg");
        this.shape_5.setTransform(7.5, 10.8);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_5 }, { t: this.shape_4 }, { t: this.shape_3 }, { t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box3_text, new cjs.Rectangle(0, 0, 45.1, 21.9), null);


    (lib.answer_box3_green = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#6FD370").s().p("ApXD6QhnAAhKhKQhJhIAAhoQAAhmBJhKQBKhJBnAAISvAAQBoAABIBJQBKBKAABmQAABohKBIQhIBKhoAAg");
        this.shape.setTransform(72.9, 20.7, 0.857, 0.829);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box3_green, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.answer_box3 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("An+DPQhWAAg9g9Qg8g8AAhWIAAAAQAAhVA8g9QA9g8BWAAIP9AAQBWAAA8A8QA9A9AABVIAAAAQAABWg9A8Qg8A9hWAAg");
        this.shape.setTransform(72.9, 20.7, 1.015, 1);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box3, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.answer_box2_text = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#333333").s().p("AgXAlQgIgHgCgNIANgDQACAJAFAFQAFAEAJAAQAKAAAEgEQAFgEAAgFQAAgFgFgDQgCgCgLgDQgPgDgGgDQgGgDgDgEQgDgGAAgFQAAgGACgFQADgEAEgDQADgDAGgCQAGgBAHAAQAIAAAHACQAIADAEAFQADAFABAIIgNACQgBgHgFgDQgFgEgHAAQgKAAgEAEQgDADAAAEIABAFIAFADIAMAEQAPAEAGADQAFABAEAFQAEAFAAAHQgBAHgEAGQgEAGgHAEQgJAEgJAAQgPgBgJgGg");
        this.shape.setTransform(34.4, 12.4);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#333333").s().p("AgGA5IAAhSIANAAIAABSgAgGgoIAAgQIANAAIAAAQg");
        this.shape_1.setTransform(28.7, 10.8);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#333333").s().p("AgWAqIAAhSIANAAIAAANQAFgJAEgDQADgCAFAAQAHAAAHAEIgEANQgFgDgGAAQgFAAgCADQgDADgCAFQgCAHAAAJIAAAqg");
        this.shape_2.setTransform(24.9, 12.3);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#333333").s().p("AgeAlQgHgHAAgKQAAgHACgEQADgGAFgCQAFgCAFgCIAMgDQARgCAHgCIAAgEQAAgJgDgDQgGgEgKgBQgKABgEADQgFADgCAJIgOgCQACgIAFgGQADgGAJgDQAIgCAJAAQALgBAHADQAGADADAEQAEADABAGIABANIAAARQAAAVABAEIADAKIgOAAIgEgKQgHAHgHACQgHADgIABQgNgBgIgGgAgCAFIgNADQgDABgCADQgCADAAAEQAAAGAEAEQAFADAHAAQAIABAGgEQAHgDADgHQABgFAAgJIAAgFQgHADgOACg");
        this.shape_3.setTransform(17.1, 12.4);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#333333").s().p("AgrA5IAAhxIArAAIARABQAIABAGAEQAGAEADAHQAEAHAAAJQAAAOgKAKQgJAKgYAAIgdAAIAAAugAgcgCIAdAAQAPAAAGgFQAGgGAAgKQAAgHgEgFQgDgFgGgCIgOgBIgdAAg");
        this.shape_4.setTransform(7.6, 10.8);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_4 }, { t: this.shape_3 }, { t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box2_text, new cjs.Rectangle(0, 0, 40.7, 21.9), null);


    (lib.answer_box2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("An+DPQhWAAg9g9Qg8g8AAhWIAAAAQAAhVA8g9QA9g8BWAAIP9AAQBWAAA8A8QA9A9AABVIAAAAQAABWg9A8Qg8A9hWAAg");
        this.shape.setTransform(72.9, 20.7, 1.015, 1);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box2, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.answer_box1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("An+DPQhWAAg9g9Qg8g8AAhWIAAAAQAAhVA8g9QA9g8BWAAIP9AAQBWAAA8A8QA9A9AABVIAAAAQAABWg9A8Qg8A9hWAAg");
        this.shape.setTransform(72.9, 20.7, 1.015, 1);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answer_box1, new cjs.Rectangle(0, 0, 145.8, 41.5), null);


    (lib.amswer_box1_text = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#333333").s().p("AAqAqIAAgzQAAgIgBgEQgBgEgEgCQgEgCgFAAQgIAAgGAGQgGAFAAANIAAAvIgNAAIAAg1QAAgJgDgEQgEgFgIAAQgGAAgFADQgFADgCAGQgCAGAAALIAAAqIgOAAIAAhSIAMAAIAAAMQAEgGAHgEQAGgDAJAAQAJAAAGADQAFAFACAGQAKgOAQAAQAMgBAHAIQAGAGAAAPIAAA3g");
        this.shape.setTransform(29.1, 12.3);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#333333").s().p("AgbAgQgLgLAAgVQAAgWANgLQALgJAOAAQARAAALALQALALAAAUQAAAPgFAJQgFAJgJAFQgJAFgLABQgQAAgLgMgAgRgXQgGAIAAAPQAAAQAGAIQAHAIAKAAQAKAAAHgIQAHgIAAgQQAAgPgHgIQgHgHgKgBQgKAAgHAIg");
        this.shape_1.setTransform(18, 12.4);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#333333").s().p("AAfA5IgOgYIgMgPIgHgIIgGgDIgIgBIgSAAIAAAzIgQAAIAAhxIAzAAQAPAAAHADQAIADAGAIQAEAIAAAJQAAAMgIAJQgIAHgQACIAJAGQAHAGAFAJIAUAfgAgigGIAgAAQAKAAAFgCQAHgCACgFQADgEABgGQgBgIgFgFQgHgGgMAAIgjAAg");
        this.shape_2.setTransform(8.3, 10.8);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(1));

    }).prototype = getMCSymbolPrototype(lib.amswer_box1_text, new cjs.Rectangle(0, 0, 38, 21.9), null);


    (lib.hand_show = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.Tween1("synched", 0);
        this.instance.parent = this;
        this.instance.setTransform(25, 29);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = getMCSymbolPrototype(lib.hand_show, null, null);


    // stage content:
    (lib.dragndropdemo = function(mode, startPosition, loop) {
        if (loop == null) { loop = false; }
        this.initialize(mode, startPosition, loop, {});

        // plusone
        this.instance = new lib.plusone_1();
        this.instance.parent = this;
        this.instance.setTransform(140.5, 90.5, 1, 1, 0, 0, 0, 19.5, 19.5);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(270).to({ _off: false }, 0).wait(1).to({ scaleX: 1.14, scaleY: 1.14, alpha: 0.125 }, 0).wait(1).to({ scaleX: 1.27, scaleY: 1.27, alpha: 0.25 }, 0).wait(1).to({ scaleX: 1.4, scaleY: 1.4, alpha: 0.375 }, 0).wait(1).to({ scaleX: 1.54, scaleY: 1.54, alpha: 0.5 }, 0).wait(1).to({ scaleX: 1.67, scaleY: 1.67, alpha: 0.625 }, 0).wait(1).to({ scaleX: 1.81, scaleY: 1.81, alpha: 0.75 }, 0).wait(1).to({ scaleX: 1.94, scaleY: 1.94, alpha: 0.875 }, 0).wait(1).to({ scaleX: 2.08, scaleY: 2.08, alpha: 1 }, 0).wait(1).to({ scaleX: 1.94, scaleY: 1.94 }, 0).wait(1).to({ scaleX: 1.8, scaleY: 1.8 }, 0).wait(1).to({ scaleX: 1.65, scaleY: 1.65 }, 0).wait(1).to({ scaleX: 1.51, scaleY: 1.51 }, 0).wait(4).to({ _off: true }, 1).wait(20));

        // x-icon
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("AAwBrIgwhKIgvBKIg0AAIBKhvIhDhmIAzAAIAqBEIAqhEIAyAAIhCBoIBJBtg");
        this.shape.setTransform(26.3, 199.6);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(307));

        // o-icon
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f().s("#FFFFFF").ss(5, 1, 1).p("ABZhXQAkAkAAAzQAAA0gkAkQglAlg0AAQgzAAgkglQglgkAAg0QAAgzAlgkQAkglAzAAQA0AAAlAlg");
        this.shape_1.setTransform(251.3, 199.6);

        this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(307));

        // hand_grab
        this.instance_1 = new lib.Tween2("synched", 0);
        this.instance_1.parent = this;
        this.instance_1.setTransform(200, 130);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(39).to({ _off: false }, 0).to({ alpha: 1 }, 2).to({ startPosition: 0 }, 11).to({ x: 95 }, 13).to({ startPosition: 0 }, 7).to({ alpha: 0 }, 3).to({ x: 93.2, y: 118.1 }, 17).to({ x: 188.6, y: 169 }, 8).to({ alpha: 1 }, 2).to({ startPosition: 0 }, 4).to({ x: 73.1 }, 10).to({ alpha: 0 }, 2).to({ x: 71.2 }, 20).to({ x: 91.6, y: 225.9 }, 20).to({ alpha: 1 }, 2).to({ startPosition: 0 }, 5).to({ x: 196.6 }, 13).to({ startPosition: 0 }, 7).to({ alpha: 0 }, 2).to({ x: 80, y: 290 }, 36).to({ alpha: 1 }, 2).to({ startPosition: 0 }, 6).to({ startPosition: 0 }, 11).to({ x: 185 }, 14).to({ startPosition: 0 }, 7).to({ alpha: 0 }, 2).wait(42));

        // hand_show
        this.instance_2 = new lib.hand_show();
        this.instance_2.parent = this;
        this.instance_2.setTransform(-240, 270, 1, 1, 0, 0, 0, 25, 29);
        this.instance_2._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({ _off: false }, 0).to({ guide: { path: [-239.9, 270.1, -179.9, 270.1, -119.9, 270.1, -79.7, 260.1, -39.4, 250.1, -29.7, 250.1, -20, 250.1, -20, 245.1, -20, 240.1, -5, 240.1, 10, 240.1, 25, 235.1, 40, 230.1, 85, 210.1, 130, 190.1, 145, 175.1, 160, 160.1, 165, 160.1, 170, 160.1, 175, 155.1, 180, 150.1, 180, 140.1, 180, 130.1, 184.4, 125.7, 188.8, 121.4] } }, 28).to({ scaleX: 0.73, scaleY: 0.73, alpha: 0 }, 4).to({ regX: 25.1, regY: 29.1, scaleX: 1, scaleY: 1, x: 93.3, y: 120.1 }, 33).to({ alpha: 1 }, 2).wait(16).to({ x: 188.7, y: 168.5 }, 7).to({ alpha: 0 }, 2).to({ x: 71.3 }, 16).to({ alpha: 1 }, 2).wait(18).to({ x: 91.7, y: 230.1 }, 12).wait(8).to({ alpha: 0 }, 2).to({ x: 200.2 }, 27).to({ alpha: 1 }, 2).wait(19).to({ x: 80.1, y: 281.2 }, 11).wait(4).to({ alpha: 0 }, 2).to({ x: 190, y: 293.1 }, 40).to({ alpha: 1 }, 2).wait(41));

        // answer_box4_text
        this.instance_3 = new lib.answer_box4_text();
        this.instance_3.parent = this;
        this.instance_3.setTransform(140, 284.3, 1, 1, 0, 0, 0, 35, 11);
        this.instance_3.alpha = 0;
        this.instance_3._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({ _off: false }, 0).wait(1).to({ regY: 12.5, y: 285.8, alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(229).to({ x: 147.5 }, 0).wait(1).to({ x: 155 }, 0).wait(1).to({ x: 162.5 }, 0).wait(1).to({ x: 170 }, 0).wait(1).to({ x: 177.5 }, 0).wait(1).to({ x: 185 }, 0).wait(1).to({ x: 192.5 }, 0).wait(1).to({ x: 200 }, 0).wait(1).to({ x: 207.5 }, 0).wait(1).to({ x: 215 }, 0).wait(1).to({ x: 222.5 }, 0).wait(1).to({ x: 230 }, 0).wait(1).to({ x: 237.5 }, 0).wait(1).to({ x: 245 }, 0).wait(23).to({ alpha: 0.75 }, 0).wait(1).to({ alpha: 0.5 }, 0).wait(1).to({ alpha: 0.25 }, 0).wait(1).to({ alpha: 0 }, 0).wait(25));

        // answer_box4_green
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#6FD370").s().p("AoJDPQhVAAg9g9Qg9g8AAhWIAAAAQAAhVA9g9QA9g8BVAAIQTAAQBVAAA9A8QA9A9AABVIAAAAQAABWg9A8Qg9A9hVAAg");
        this.shape_2.setTransform(245.7, 284.7);

        this.answer_box3_green = new lib.Symbol3();
        this.answer_box3_green.name = "answer_box3_green";
        this.answer_box3_green.parent = this;
        this.answer_box3_green.setTransform(245.7, 284.7, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.answer_box3_green._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_2 }] }, 273).to({ state: [{ t: this.answer_box3_green }] }, 5).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).to({ state: [{ t: this.answer_box3_green }] }, 1).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.answer_box3_green).wait(278).to({ _off: false }, 0).wait(1).to({ alpha: 0.75 }, 0).wait(1).to({ alpha: 0.5 }, 0).wait(1).to({ alpha: 0.25 }, 0).wait(1).to({ alpha: 0 }, 0).wait(25));

        // answer_box4
        this.instance_4 = new lib.answer_box4();
        this.instance_4.parent = this;
        this.instance_4.setTransform(140.7, 284.7, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.instance_4.alpha = 0;
        this.instance_4._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(229).to({ x: 148.2 }, 0).wait(1).to({ x: 155.7 }, 0).wait(1).to({ x: 163.2 }, 0).wait(1).to({ x: 170.7 }, 0).wait(1).to({ x: 178.2 }, 0).wait(1).to({ x: 185.7 }, 0).wait(1).to({ x: 193.2 }, 0).wait(1).to({ x: 200.7 }, 0).wait(1).to({ x: 208.2 }, 0).wait(1).to({ x: 215.7 }, 0).wait(1).to({ x: 223.2 }, 0).wait(1).to({ x: 230.7 }, 0).wait(1).to({ x: 238.2 }, 0).wait(1).to({ x: 245.7 }, 0).wait(16).to({ _off: true }, 1).wait(34));

        // answer_box3_text
        this.instance_5 = new lib.answer_box3_text();
        this.instance_5.parent = this;
        this.instance_5.setTransform(139.2, 229.7, 1, 1, 0, 0, 0, 22.6, 11);
        this.instance_5.alpha = 0;
        this.instance_5._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({ _off: false }, 0).wait(1).to({ regX: 22.5, regY: 10.9, x: 139.1, y: 229.6, alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(152).to({ x: 147.9 }, 0).wait(1).to({ x: 156.8 }, 0).wait(1).to({ x: 165.7 }, 0).wait(1).to({ x: 174.6 }, 0).wait(1).to({ x: 183.5 }, 0).wait(1).to({ x: 192.4 }, 0).wait(1).to({ x: 201.2 }, 0).wait(1).to({ x: 210.1 }, 0).wait(1).to({ x: 219 }, 0).wait(1).to({ x: 227.9 }, 0).wait(1).to({ x: 236.8 }, 0).wait(1).to({ x: 245.7 }, 0).wait(1).to({ x: 254.6 }, 0).wait(19).to({ alpha: 0.75 }, 0).wait(1).to({ alpha: 0.5 }, 0).wait(1).to({ alpha: 0.25 }, 0).wait(1).to({ alpha: 0 }, 0).wait(107));

        // answer_box3_green
        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#6FD370").s().p("ApXD6QhnAAhKhKQhJhIAAhoQAAhmBJhKQBKhJBnAAISvAAQBoAABIBJQBKBKAABmQAABohKBIQhIBKhoAAg");
        this.shape_3.setTransform(256.2, 231.2, 0.857, 0.829);

        this.instance_6 = new lib.answer_box3_green();
        this.instance_6.parent = this;
        this.instance_6.setTransform(256.2, 231.2, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.instance_6._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_3 }] }, 192).to({ state: [{ t: this.instance_6 }] }, 4).to({ state: [{ t: this.instance_6 }] }, 1).to({ state: [{ t: this.instance_6 }] }, 1).to({ state: [{ t: this.instance_6 }] }, 1).to({ state: [{ t: this.instance_6 }] }, 1).to({ state: [] }, 1).wait(106));
        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(196).to({ _off: false }, 0).wait(1).to({ alpha: 0.75 }, 0).wait(1).to({ alpha: 0.5 }, 0).wait(1).to({ alpha: 0.25 }, 0).wait(1).to({ alpha: 0 }, 0).to({ _off: true }, 1).wait(106));

        // answer_box3
        this.instance_7 = new lib.answer_box3();
        this.instance_7.parent = this;
        this.instance_7.setTransform(140.7, 231.2, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.instance_7.alpha = 0;
        this.instance_7._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(9).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(152).to({ x: 149.6 }, 0).wait(1).to({ x: 158.5 }, 0).wait(1).to({ x: 167.4 }, 0).wait(1).to({ x: 176.2 }, 0).wait(1).to({ x: 185.1 }, 0).wait(1).to({ x: 194 }, 0).wait(1).to({ x: 202.9 }, 0).wait(1).to({ x: 211.8 }, 0).wait(1).to({ x: 220.7 }, 0).wait(1).to({ x: 229.5 }, 0).wait(1).to({ x: 238.4 }, 0).wait(1).to({ x: 247.3 }, 0).wait(1).to({ x: 256.2 }, 0).wait(13).to({ _off: true }, 1).wait(115));

        // answer_box2_text
        this.instance_8 = new lib.answer_box2_text();
        this.instance_8.parent = this;
        this.instance_8.setTransform(141.3, 175.7, 1, 1, 0, 0, 0, 20.3, 11);
        this.instance_8.alpha = 0;
        this.instance_8._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(9).to({ _off: false }, 0).wait(1).to({ regX: 20.6, regY: 10.9, x: 141.6, y: 175.6, alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(93).to({ x: 130.1 }, 0).wait(1).to({ x: 118.5 }, 0).wait(1).to({ x: 107 }, 0).wait(1).to({ x: 95.4 }, 0).wait(1).to({ x: 83.9 }, 0).wait(1).to({ x: 72.3 }, 0).wait(1).to({ x: 60.8 }, 0).wait(1).to({ x: 49.2 }, 0).wait(1).to({ x: 37.7 }, 0).wait(1).to({ x: 26.1 }, 0).wait(13).to({ alpha: 0.75 }, 0).wait(1).to({ alpha: 0.5 }, 0).wait(1).to({ alpha: 0.25 }, 0).wait(1).to({ alpha: 0 }, 0).wait(175));

        // answer_box2_green
        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#6FD370").s().p("AolD6QhnAAhKhKQhJhIAAhoQAAhmBJhKQBKhJBnAAIRLAAQBoAABIBJQBKBKAABmQAABohKBIQhIBKhoAAg");
        this.shape_4.setTransform(25.2, 176.7, 0.911, 0.829);

        this.answer_box2_green = new lib.Symbol2();
        this.answer_box2_green.name = "answer_box2_green";
        this.answer_box2_green.parent = this;
        this.answer_box2_green.setTransform(25.2, 176.7, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.answer_box2_green._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_4 }] }, 124).to({ state: [{ t: this.answer_box2_green }] }, 4).to({ state: [{ t: this.answer_box2_green }] }, 1).to({ state: [{ t: this.answer_box2_green }] }, 1).to({ state: [{ t: this.answer_box2_green }] }, 1).to({ state: [{ t: this.answer_box2_green }] }, 1).to({ state: [] }, 1).wait(174));
        this.timeline.addTween(cjs.Tween.get(this.answer_box2_green).wait(128).to({ _off: false }, 0).wait(1).to({ alpha: 0.75 }, 0).wait(1).to({ alpha: 0.5 }, 0).wait(1).to({ alpha: 0.25 }, 0).wait(1).to({ alpha: 0 }, 0).to({ _off: true }, 1).wait(174));

        // answer_box2
        this.instance_9 = new lib.answer_box2();
        this.instance_9.parent = this;
        this.instance_9.setTransform(140.7, 176.7, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.instance_9.alpha = 0;
        this.instance_9._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(9).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(93).to({ x: 129.2 }, 0).wait(1).to({ x: 117.6 }, 0).wait(1).to({ x: 106.1 }, 0).wait(1).to({ x: 94.5 }, 0).wait(1).to({ x: 83 }, 0).wait(1).to({ x: 71.4 }, 0).wait(1).to({ x: 59.9 }, 0).wait(1).to({ x: 48.3 }, 0).wait(1).to({ x: 36.8 }, 0).wait(1).to({ x: 25.2 }, 0).wait(7).to({ _off: true }, 1).wait(183));

        // answer_box1_text
        this.instance_10 = new lib.amswer_box1_text();
        this.instance_10.parent = this;
        this.instance_10.setTransform(140, 120.7, 1, 1, 0, 0, 0, 19, 11);
        this.instance_10.alpha = 0;
        this.instance_10._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(9).to({ _off: false }, 0).wait(1).to({ regY: 10.9, y: 120.6, alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(39).to({ x: 131.9 }, 0).wait(1).to({ x: 123.8 }, 0).wait(1).to({ x: 115.8 }, 0).wait(1).to({ x: 107.7 }, 0).wait(1).to({ x: 99.6 }, 0).wait(1).to({ x: 91.5 }, 0).wait(1).to({ x: 83.5 }, 0).wait(1).to({ x: 75.4 }, 0).wait(1).to({ x: 67.3 }, 0).wait(1).to({ x: 59.2 }, 0).wait(1).to({ x: 51.2 }, 0).wait(1).to({ x: 43.1 }, 0).wait(1).to({ x: 35 }, 0).wait(24).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(216));

        // answer_box1_green
        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#6FD370").s().p("AnzD6QhoAAhJhJQhJhKAAhnQAAhnBJhJQBJhJBoAAIPnAAQBnAABKBJQBJBJAABnQAABnhJBKQhKBJhnAAg");
        this.shape_5.setTransform(35.7, 122.2, 0.972, 0.829);

        this.answer_box1_green = new lib.Symbol1();
        this.answer_box1_green.name = "answer_box1_green";
        this.answer_box1_green.parent = this;
        this.answer_box1_green.setTransform(35.7, 122.2, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.answer_box1_green._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_5 }] }, 82).to({ state: [{ t: this.answer_box1_green }] }, 6).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).to({ state: [{ t: this.answer_box1_green }] }, 1).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.answer_box1_green).wait(88).to({ _off: false }, 0).wait(1).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(216));

        // answer_box1
        this.instance_11 = new lib.answer_box1();
        this.instance_11.parent = this;
        this.instance_11.setTransform(140.7, 122.2, 1, 1, 0, 0, 0, 72.9, 20.7);
        this.instance_11.alpha = 0;
        this.instance_11._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(9).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(39).to({ x: 132.6 }, 0).wait(1).to({ x: 124.5 }, 0).wait(1).to({ x: 116.5 }, 0).wait(1).to({ x: 108.4 }, 0).wait(1).to({ x: 100.3 }, 0).wait(1).to({ x: 92.2 }, 0).wait(1).to({ x: 84.2 }, 0).wait(1).to({ x: 76.1 }, 0).wait(1).to({ x: 68.1 }, 0).wait(1).to({ x: 60 }, 0).wait(1).to({ x: 51.9 }, 0).wait(1).to({ x: 43.8 }, 0).wait(1).to({ x: 35.7 }, 0).wait(16).to({ _off: true }, 1).wait(225));

        // question_box_questionmark
        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f("#FFFFFF").s().p("AgKA6IAAgWIAVAAIAAAWgAgKAcIAAgFQAAgKAEgGQADgGAIgHQAKgIABgCQAEgEAAgFQgBgGgFgFQgFgEgIAAQgIAAgGAFQgFAEgCAKIgUgCQAAgOALgKQAMgKARAAQASAAAMAKQALAKAAANQAAAHgEAHQgEAGgNAKQgIAGgBAEQgCADAAAJg");
        this.shape_6.setTransform(27, 39.7);

        this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(307));

        // question_german
        this.shape_7 = new cjs.Shape();
        this.shape_7.graphics.f("#000000").s().p("AgHA6IAAgQIAPAAIAAAQgAgGAeIAAgEQAAgIACgGIAFgKIAKgIQAHgHADgEQABgEAAgEQAAgIgGgGQgHgHgIAAQgJAAgGAGQgFAGgDAMIgOgCQACgQAKgJQAKgIAOAAQARAAAKAJQAKAJAAANQAAAIgEAGQgDAGgKAIIgJAJIgEAHIgBAMg");
        this.shape_7.setTransform(155.8, 43.4);

        this.shape_8 = new cjs.Shape();
        this.shape_8.graphics.f("#000000").s().p("AgRA1QgJgGgFgKQgEgJAAgNQAAgNAEgJQAEgKAJgFQAIgGAKAAQAHAAAFAEQAHADADAFIAAgpIAOAAIAABxIgNAAIAAgKQgIAMgPAAQgJAAgIgFgAgOgIQgHAHABAQQgBAQAHAIQAHAIAIAAQAJAAAHgIQAGgIAAgPQAAgQgGgIQgHgIgKAAQgIAAgGAIg");
        this.shape_8.setTransform(146.7, 43.6);

        this.shape_9 = new cjs.Shape();
        this.shape_9.graphics.f("#000000").s().p("AAUAqIAAgxQAAgJgCgEQgCgEgEgDQgEgCgGAAQgIAAgGAGQgHAGAAAPIAAAsIgOAAIAAhRIANAAIAAALQAJgOAQABQAIAAAGACQAGADAEAFQADAEABAGIABAOIAAAxg");
        this.shape_9.setTransform(138, 45);

        this.shape_10 = new cjs.Shape();
        this.shape_10.graphics.f("#000000").s().p("AgeAlQgHgHAAgKQAAgHADgEQACgGAFgCQAFgDAFgBIAMgCQARgCAHgDIAAgEQAAgIgDgEQgGgEgKgBQgKABgEADQgFAEgCAIIgOgCQACgJAFgFQADgGAJgDQAIgCAJAAQALgBAHADQAGACADAFQAEADABAGIABANIAAARQAAAVABAEIADAKIgOAAIgEgKQgHAHgHACQgHADgIAAQgNAAgIgGgAgCAFIgNADQgDACgCACQgCADAAAEQAAAGAEAEQAFADAHAAQAIABAGgEQAHgDADgHQABgFAAgJIAAgFQgHADgOACg");
        this.shape_10.setTransform(129.1, 45.1);

        this.shape_11 = new cjs.Shape();
        this.shape_11.graphics.f("#000000").s().p("AgGA5IAAhxIANAAIAABxg");
        this.shape_11.setTransform(122.9, 43.5);

        this.shape_12 = new cjs.Shape();
        this.shape_12.graphics.f("#000000").s().p("AAUA5IAAg0QAAgKgFgFQgEgEgJAAQgFAAgFADQgGADgCAGQgDAEAAAKIAAAtIgOAAIAAhxIAOAAIAAApQAKgMAOAAQAJAAAHAEQAHAEADAGQADAGAAAMIAAA0g");
        this.shape_12.setTransform(116.7, 43.5);

        this.shape_13 = new cjs.Shape();
        this.shape_13.graphics.f("#000000").s().p("AgZAgQgKgLAAgUQAAgNAEgKQAEgKAKgGQAJgEAJAAQAOgBAJAIQAIAGADANIgOACQgCgIgFgEQgFgFgHAAQgKAAgGAIQgHAIAAAPQAAAQAGAIQAHAIAJAAQAJAAAFgFQAGgGABgKIAOACQgCAOgJAJQgKAHgOAAQgQAAgKgLg");
        this.shape_13.setTransform(108.5, 45.1);

        this.shape_14 = new cjs.Shape();
        this.shape_14.graphics.f("#000000").s().p("AgXAlQgIgHgDgOIAPgCQAAAJAGAFQAFAEAJAAQAKAAAEgEQAFgEAAgFQAAgFgEgDQgDgCgMgDQgOgDgGgDQgGgDgDgEQgDgGAAgGQAAgFADgFQACgEAEgEQADgCAGgBQAGgCAHAAQAIAAAIACQAHADAEAFQADAFABAIIgNACQgBgGgFgEQgFgEgHAAQgJAAgFADQgDADAAAFIABAFIAGADIALAEQAPAEAGADQAGABADAFQAEAFAAAHQAAAHgFAGQgEAGgHAEQgJADgJAAQgPAAgJgGg");
        this.shape_14.setTransform(100.2, 45.1);

        this.shape_15 = new cjs.Shape();
        this.shape_15.graphics.f("#000000").s().p("AgBA2QgFgCgBgEQgCgEAAgNIAAgvIgKAAIAAgKIAKAAIAAgVIANgIIAAAdIAOAAIAAAKIgOAAIAAAwQAAAGABABQAAABAAAAQAAABABAAQAAABAAAAQABAAAAABIAFABIAGgBIACAMIgLABQgHAAgDgCg");
        this.shape_15.setTransform(94.1, 43.7);

        this.shape_16 = new cjs.Shape();
        this.shape_16.graphics.f("#000000").s().p("AgSAnQgGgCgDgFQgDgEgCgGIgBgNIAAgyIAPAAIAAAsIAAAQQACAFAEADQAEADAHAAQAFAAAGgDQAFgDACgGQADgFAAgLIAAgrIAOAAIAABRIgNAAIAAgLQgKANgPAAQgHAAgHgDg");
        this.shape_16.setTransform(87.3, 45.2);

        this.shape_17 = new cjs.Shape();
        this.shape_17.graphics.f("#000000").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKALAAAUIAAAEIg9AAQABAOAHAGQAHAIAJAAQAIAAAFgEQAGgFADgIIAPABQgEANgJAIQgJAGgPAAQgRABgLgMgAgPgYQgGAGgBALIAtAAQgBgLgEgFQgHgIgKAAQgJAAgHAHg");
        this.shape_17.setTransform(78.4, 45.1);

        this.shape_18 = new cjs.Shape();
        this.shape_18.graphics.f("#000000").s().p("AguA5IAAhxIAnAAQAMAAAHABQAKADAHAGQAJAHAFAMQAEAMAAAPQAAAMgDAKQgDALgFAGQgEAHgGAEQgGADgIACQgIACgJAAgAgfAsIAYAAQALAAAGgCQAGgCAEgEQAGgGADgJQADgJAAgMQAAgSgGgJQgGgKgJgDQgGgDgMAAIgYAAg");
        this.shape_18.setTransform(68.4, 43.5);

        this.shape_19 = new cjs.Shape();
        this.shape_19.graphics.f("#000000").s().p("AAUAqIAAgxQAAgJgCgEQgCgEgEgDQgEgCgGAAQgIAAgGAGQgHAFAAAQIAAAsIgOAAIAAhRIANAAIAAALQAJgNAQAAQAIAAAGACQAGADAEAFQADAEABAGIABANIAAAyg");
        this.shape_19.setTransform(225.8, 25.1);

        this.shape_20 = new cjs.Shape();
        this.shape_20.graphics.f("#000000").s().p("AgGA5IAAhSIANAAIAABSgAgGgoIAAgQIANAAIAAAQg");
        this.shape_20.setTransform(219.6, 23.6);

        this.shape_21 = new cjs.Shape();
        this.shape_21.graphics.f("#000000").s().p("AAUAqIAAgxQAAgJgCgEQgCgEgEgDQgEgCgGAAQgIAAgGAGQgHAFAAAQIAAAsIgOAAIAAhRIANAAIAAALQAJgNAQAAQAIAAAGACQAGADAEAFQADAEABAGIABANIAAAyg");
        this.shape_21.setTransform(208.9, 25.1);

        this.shape_22 = new cjs.Shape();
        this.shape_22.graphics.f("#000000").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKALAAAUIAAAEIg9AAQABAOAHAGQAHAIAJAAQAIAAAFgEQAGgFADgIIAPABQgEANgJAIQgJAGgPAAQgRAAgLgLgAgPgYQgGAGgBALIAtAAQgBgLgEgEQgHgJgKAAQgJAAgHAHg");
        this.shape_22.setTransform(200, 25.2);

        this.shape_23 = new cjs.Shape();
        this.shape_23.graphics.f("#000000").s().p("AgYA1QgJgHAAgNIAOACQABAGAEADQAFAEAJAAQAJAAAFgEQAFgEACgHQABgEAAgOQgJALgNAAQgRAAgJgNQgKgMAAgQQAAgMAFgKQAEgKAIgGQAIgFALAAQAOAAAKAMIAAgKIANAAIAABHQAAATgEAIQgEAIgJAFQgIAEgMAAQgPAAgJgGgAgPgnQgGAIAAAPQAAAQAGAHQAHAHAJAAQAJAAAHgHQAGgHAAgQQAAgPgGgIQgHgHgKAAQgIAAgHAHg");
        this.shape_23.setTransform(190.8, 26.8);

        this.shape_24 = new cjs.Shape();
        this.shape_24.graphics.f("#000000").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKALAAAUIAAAEIg9AAQABAOAHAGQAHAIAJAAQAIAAAFgEQAGgFADgIIAPABQgEANgJAIQgJAGgPAAQgRAAgLgLgAgPgYQgGAGgBALIAtAAQgBgLgEgEQgHgJgKAAQgJAAgHAHg");
        this.shape_24.setTransform(182.2, 25.2);

        this.shape_25 = new cjs.Shape();
        this.shape_25.graphics.f("#000000").s().p("AgGA5IAAhSIANAAIAABSgAgGgoIAAgQIANAAIAAAQg");
        this.shape_25.setTransform(176, 23.6);

        this.shape_26 = new cjs.Shape();
        this.shape_26.graphics.f("#000000").s().p("AgGA5IAAhxIANAAIAABxg");
        this.shape_26.setTransform(172.4, 23.6);

        this.shape_27 = new cjs.Shape();
        this.shape_27.graphics.f("#000000").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKALAAAUIAAAEIg9AAQABAOAHAGQAHAIAJAAQAIAAAFgEQAGgFADgIIAPABQgEANgJAIQgJAGgPAAQgRAAgLgLgAgPgYQgGAGgBALIAtAAQgBgLgEgEQgHgJgKAAQgJAAgHAHg");
        this.shape_27.setTransform(161.7, 25.2);

        this.shape_28 = new cjs.Shape();
        this.shape_28.graphics.f("#000000").s().p("AgBA2QgFgCgBgEQgCgEAAgNIAAgvIgKAAIAAgKIAKAAIAAgVIANgIIAAAdIAOAAIAAAKIgOAAIAAAwQAAAGABABQAAABAAAAQAAABABAAQAAABAAAAQABAAAAABIAFABIAGgBIACAMIgLABQgHABgDgDg");
        this.shape_28.setTransform(155.2, 23.8);

        this.shape_29 = new cjs.Shape();
        this.shape_29.graphics.f("#000000").s().p("AgRA1QgJgGgEgKQgFgJAAgNQAAgNAEgJQAEgKAJgFQAIgGAKAAQAHAAAFAEQAHADADAFIAAgpIAOAAIAABxIgNAAIAAgKQgIAMgPAAQgJAAgIgFgAgOgIQgHAHABAQQgBAQAHAIQAHAIAIAAQAJAAAHgIQAGgIAAgPQAAgQgGgIQgHgIgKAAQgIAAgGAIg");
        this.shape_29.setTransform(148.1, 23.7);

        this.shape_30 = new cjs.Shape();
        this.shape_30.graphics.f("#000000").s().p("AgeA0QgHgHAAgKQAAgHACgFQADgEAFgDQAFgEAFgBIAMgCQARgCAHgDIAAgEQAAgHgDgEQgGgEgKgBQgKABgEADQgFAEgCAIIgOgCQACgJAFgFQADgGAJgDQAIgCAJAAQALAAAHACQAGADADAEQAEADABAGIABAMIAAASQAAAVABAFIADAJIgOAAIgEgJQgHAGgHACQgHADgIAAQgNAAgIgGgAgCAUIgNADQgDACgCADQgCADAAADQAAAGAEAEQAFADAHAAQAIAAAGgDQAHgDADgHQABgFAAgJIAAgFQgHADgOACgAAIgqIAAgQIAOAAIAAAQgAgVgqIAAgQIAPAAIAAAQg");
        this.shape_30.setTransform(139.5, 23.7);

        this.shape_31 = new cjs.Shape();
        this.shape_31.graphics.f("#000000").s().p("AgBA2QgFgCgBgEQgCgEAAgNIAAgvIgKAAIAAgKIAKAAIAAgVIANgIIAAAdIAOAAIAAAKIgOAAIAAAwQAAAGABABQAAABAAAAQAAABABAAQAAABAAAAQABAAAAABIAFABIAGgBIACAMIgLABQgHABgDgDg");
        this.shape_31.setTransform(132.9, 23.8);

        this.shape_32 = new cjs.Shape();
        this.shape_32.graphics.f("#000000").s().p("AgWA3QgKgFgGgJQgGgJgBgMIAPgBQABAJAEAFQADAGAIADQAIAEAJAAQAIAAAHgDQAHgDADgEQADgFAAgFQAAgFgDgEQgDgEgHgDIgUgGQgQgDgGgDQgIgEgEgGQgEgHAAgIQAAgIAFgIQAFgHAJgEQAKgEALAAQAMAAAKAEQAJAEAGAIQAFAIAAAKIgOABQgCgLgGgFQgHgGgNAAQgNAAgGAFQgHAFAAAHQAAAGAFAEQAEAEASAFQASAEAHADQAKAEAFAHQAFAHAAAJQAAAJgGAIQgFAIgKAFQgJAEgNAAQgOAAgLgEg");
        this.shape_32.setTransform(125.2, 23.6);

        this.shape_33 = new cjs.Shape();
        this.shape_33.graphics.f("#000000").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKALAAAUIAAAEIg9AAQABAOAHAGQAHAIAJAAQAIAAAFgEQAGgFADgIIAPABQgEANgJAIQgJAGgPAAQgRAAgLgLgAgPgYQgGAGgBALIAtAAQgBgLgEgEQgHgJgKAAQgJAAgHAHg");
        this.shape_33.setTransform(111, 25.2);

        this.shape_34 = new cjs.Shape();
        this.shape_34.graphics.f("#000000").s().p("AAUA5IAAg0QAAgKgFgFQgEgEgJAAQgFAAgFADQgGADgCAGQgDAEAAAKIAAAtIgOAAIAAhxIAOAAIAAApQAKgMAOAAQAJAAAHAEQAHAEADAGQADAGAAAMIAAA0g");
        this.shape_34.setTransform(102.1, 23.6);

        this.shape_35 = new cjs.Shape();
        this.shape_35.graphics.f("#000000").s().p("AgZAgQgKgLAAgUQAAgNAEgKQAFgKAJgGQAJgEAKAAQANAAAIAGQAKAIABAMIgNACQgCgIgFgFQgFgEgHAAQgJAAgHAIQgHAIAAAPQAAAQAHAIQAGAIAKAAQAHAAAGgGQAFgEACgLIAOACQgCAOgKAIQgJAIgNAAQgRAAgKgLg");
        this.shape_35.setTransform(94, 25.2);

        this.shape_36 = new cjs.Shape();
        this.shape_36.graphics.f("#000000").s().p("AgGA5IAAhxIANAAIAABxg");
        this.shape_36.setTransform(87.9, 23.6);

        this.shape_37 = new cjs.Shape();
        this.shape_37.graphics.f("#000000").s().p("AgbAgQgKgLAAgUQAAgUAKgMQALgLAQAAQARAAALALQAKALAAAUIAAAEIg9AAQABAOAHAGQAHAIAJAAQAIAAAFgEQAGgFADgIIAPABQgEANgJAIQgJAGgPAAQgRAAgLgLgAgPgYQgGAGgBALIAtAAQgBgLgEgEQgHgJgKAAQgJAAgHAHg");
        this.shape_37.setTransform(81.7, 25.2);

        this.shape_38 = new cjs.Shape();
        this.shape_38.graphics.f("#000000").s().p("AAbA5IgXhWIgEgNIgCANIgZBWIgPAAIgfhxIAQAAIASBKIAEAXIAGgVIAVhMIARAAIARA5QAGAVADATIAGgZIAShIIAOAAIgeBxg");
        this.shape_38.setTransform(70, 23.6);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_38 }, { t: this.shape_37 }, { t: this.shape_36 }, { t: this.shape_35 }, { t: this.shape_34 }, { t: this.shape_33 }, { t: this.shape_32 }, { t: this.shape_31 }, { t: this.shape_30 }, { t: this.shape_29 }, { t: this.shape_28 }, { t: this.shape_27 }, { t: this.shape_26 }, { t: this.shape_25 }, { t: this.shape_24 }, { t: this.shape_23 }, { t: this.shape_22 }, { t: this.shape_21 }, { t: this.shape_20 }, { t: this.shape_19 }, { t: this.shape_18 }, { t: this.shape_17 }, { t: this.shape_16 }, { t: this.shape_15 }, { t: this.shape_14 }, { t: this.shape_13 }, { t: this.shape_12 }, { t: this.shape_11 }, { t: this.shape_10 }, { t: this.shape_9 }, { t: this.shape_8 }, { t: this.shape_7 }] }).wait(307));

        // question_box
        this.shape_39 = new cjs.Shape();
        this.shape_39.graphics.f("#D46FA9").s().p("Aj2D3IAAnsIHtAAIAAHsg");
        this.shape_39.setTransform(28.6, 41.1);

        this.shape_40 = new cjs.Shape();
        this.shape_40.graphics.f("#D171A7").s().p("AgIDhIAAnBIARAAIAAHBg");
        this.shape_40.setTransform(48.8, 39);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_40 }, { t: this.shape_39 }] }).wait(307));

        // red_area
        this.shape_41 = new cjs.Shape();
        this.shape_41.graphics.f("#FFFFFF").s().p("AH5RWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAUAAQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAUQAAAIgGAGQgGAGgIAAIAAAAgAGBRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAEJRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgACRRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAAZRWIgnAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAnAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAheRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAjWRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAlORWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAnGRWIgoAAIgFAAIgFAAQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAUIAeAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAH5PyQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4PeQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5N6QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4NmQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5MCQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4LuQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5KKQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4J2QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5ISQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4H+QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5GaQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4GGQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5EiQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4EOQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5CqQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4CWQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5AyQgIAAgGgGQgGgGAAgIIAAgnQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAnQAAAIgGAGQgGAGgIAAIAAAAgAn4AeQgIAAgGgGQgGgGAAgIIAAgnQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAnQAAAIgGAGQgGAGgIAAIAAAAgAH5hFQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4hZQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5i9QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4jRQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5k1QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4lJQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5mtQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4nBQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5olQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4o5QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5qdQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4qxQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5sVQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4spQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5uNQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4uhQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5wFQgIAAgGgGQgGgGAAgIIAAgUIgeAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAIAFAAIAFAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4wZQgIAAgGgGQgGgGAAgIIAAgUQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIgUAAQAAAIgGAGQgGAGgIAAIAAAAgAF3wtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAD/wtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgACHwtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAAPwtIgnAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAnAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAhowtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAjgwtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAlYwtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAg");
        this.shape_41.setTransform(10.9, 201);

        this.shape_42 = new cjs.Shape();
        this.shape_42.graphics.f("#E35A5A").s().p("AGVRCQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgnAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgeAAIAAgUQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgnQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAUAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAnAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAeAAIAAAUQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAnQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIgUAAQgIAAgGAGQgGAGAAAIg");
        this.shape_42.setTransform(11, 201.1);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_42 }, { t: this.shape_41 }] }).wait(307));

        // green_area
        this.shape_43 = new cjs.Shape();
        this.shape_43.graphics.f("#FFFFFF").s().p("AH5RWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAUAAQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAUQAAAIgGAGQgGAGgIAAIAAAAgAGBRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAEJRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgACRRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAAZRWIgnAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAnAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAheRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAjWRWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAlORWIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAnGRWIgoAAIgFAAIgFAAQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAUIAeAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAH5PyQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4PeQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5N6QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4NmQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5MCQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4LuQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5KKQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4J2QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5ISQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4H+QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5GaQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4GGQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5EiQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4EOQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5CqQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4CWQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5AyQgIAAgGgGQgGgGAAgIIAAgnQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAnQAAAIgGAGQgGAGgIAAIAAAAgAn4AeQgIAAgGgGQgGgGAAgIIAAgnQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAnQAAAIgGAGQgGAGgIAAIAAAAgAH5hFQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4hZQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5i9QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4jRQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5k1QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4lJQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5mtQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4nBQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5olQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4o5QgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5qdQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4qxQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5sVQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4spQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5uNQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4uhQgIAAgGgGQgGgGAAgIIAAgoQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAH5wFQgIAAgGgGQgGgGAAgIIAAgUIgeAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAIAFAAIAFAAQAIAAAGAGQAGAGAAAIIAAAoQAAAIgGAGQgGAGgIAAIAAAAgAn4wZQgIAAgGgGQgGgGAAgIIAAgUQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIgUAAQAAAIgGAGQgGAGgIAAIAAAAgAF3wtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAD/wtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgACHwtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAAPwtIgnAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAnAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAhowtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAjgwtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAlYwtIgoAAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIAoAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAg");
        this.shape_43.setTransform(269.9, 201);

        this.shape_44 = new cjs.Shape();
        this.shape_44.graphics.f("#6FD370").s().p("AGVRCQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgnAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgoAAQgIAAgGAGQgGAGAAAIIgoAAQAAgIgGgGQgGgGgIAAIgeAAIAAgUQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgnQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAAgoQAAgIgGgGQgGgGgIAAIAAgoQAIAAAGgGQAGgGAAgIIAUAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAnAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAoAAQAIAAAGgGQAGgGAAgIIAoAAQAAAIAGAGQAGAGAIAAIAeAAIAAAUQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAnQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIAAAoQAAAIAGAGQAGAGAIAAIAAAoQgIAAgGAGQgGAGAAAIIgUAAQgIAAgGAGQgGAGAAAIg");
        this.shape_44.setTransform(269.9, 201.1);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_44 }, { t: this.shape_43 }] }).wait(307));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(98.5, 177.9, 364, 299.2);
    // library properties:
    lib.properties = {
        id: '6595779DE4B0F4488386A864EA4B15C2',
        width: 280,
        height: 330,
        fps: 24,
        color: "#FFFFFF",
        opacity: 1.00,
        manifest: [
            { src: src_handgrab, id: "handgrab" },
            { src: src_hand, id: "hand" },
            { src: src_plusone, id: "plusone" }
        ],
        preloads: []
    };



    // bootstrap callback support:

    (lib.Stage = function(canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.Stage();

    p.setAutoPlay = function(autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function() {
        this.tickEnabled = true;
        this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())
    }
    p.stop = function(ms) {
        if (ms) this.seek(ms);
        this.tickEnabled = false;
    }
    p.seek = function(ms) {
        this.tickEnabled = true;
        this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000);
    }
    p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

    p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if (!an.bootstrapListeners) {
        an.bootstrapListeners = [];
    }

    an.bootstrapCallback = function(fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if (an.bootcompsLoaded.length > 0) {
            for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };

    an.compositions = an.compositions || {};
    an.compositions['6595779DE4B0F4488386A864EA4B15C2'] = {
        getStage: function() { return exportRoot.getStage(); },
        getLibrary: function() { return lib; },
        getSpriteSheet: function() { return ss; },
        getImages: function() { return img; }
    };

    an.compositionLoaded = function(id) {
        an.bootcompsLoaded.push(id);
        for (var j = 0; j < an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }

    an.getComposition = function(id) {
        return an.compositions[id];
    }



})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;


var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;

function initAniDND() {
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    var comp = AdobeAn.getComposition("6595779DE4B0F4488386A864EA4B15C2");
    var lib = comp.getLibrary();
    createjs.MotionGuidePlugin.install();
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", function(evt) { handleFileLoad(evt, comp) });
    loader.addEventListener("complete", function(evt) { handleComplete(evt, comp) });
    var lib = comp.getLibrary();
    loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt, comp) {
    var images = comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function handleComplete(evt, comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp.getLibrary();
    var ss = comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    exportRoot = new lib.dragndropdemo();
    stage = new lib.Stage(canvas);
    //Registers the "tick" event listener.
    fnStartAnimation = function() {
            stage.addChild(exportRoot);
            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);
        }
        //Code to support hidpi screens and responsive scaling.
    function makeResponsive(isResp, respDim, isScale, scaleType) {
        var lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function resizeCanvas() {
            var w = lib.properties.width,
                h = lib.properties.height;
            var iw = window.innerWidth,
                ih = window.innerHeight;
            var pRatio = window.devicePixelRatio || 1,
                xRatio = iw / w,
                yRatio = ih / h,
                sRatio = 1;
            if (isResp) {
                if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                    sRatio = lastS;
                } else if (!isScale) {
                    if (iw < w || ih < h)
                        sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 1) {
                    sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            canvas.width = w * pRatio * sRatio;
            canvas.height = h * pRatio * sRatio;
            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
            stage.scaleX = pRatio * sRatio;
            stage.scaleY = pRatio * sRatio;
            lastW = iw;
            lastH = ih;
            lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }
    makeResponsive(false, 'both', false, 1);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}