(function(cjs, an) {

    var p; // shortcut to reference prototypes
    var lib = {};
    var ss = {};
    var img = {};
    lib.ssMetadata = [];


    // symbols:



    (lib.Bitmap4 = function() {
        this.initialize(img.Bitmap4);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 431, 394);


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


    (lib.touchring = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#66CCFF").s().p("AgpAqQgRgSAAgYQAAgYARgRQARgRAYAAQAYAAASARQARARAAAYQAAAYgRASQgSARgYAAQgYAAgRgRg");
        this.shape.setTransform(5.9, 5.9);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.touchring, new cjs.Rectangle(0, 0, 11.8, 11.8), null);


    (lib.questionbox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#D171A7").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.questionbox, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.plus1ring = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#999999").s().p("AllFmQiUiVAAjRQAAjRCUiUQCUiUDRAAQDRAACVCUQCTCUAADRQAADRiTCVQiVCTjRAAQjRAAiUiTg");
        this.shape.setTransform(50.6, 50.6);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.plus1ring, new cjs.Rectangle(0, 0, 101.1, 101.1), null);


    (lib.plus1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.plusone();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.507, 0.507);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = getMCSymbolPrototype(lib.plus1, new cjs.Rectangle(0, 0, 136.3, 136.3), null);


    (lib.playbutton = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("Ahrh8IDXB8IjXB9g");
        this.shape.setTransform(10.8, 12.5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.playbutton, new cjs.Rectangle(0, 0, 21.6, 25), null);


    (lib.hand_1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.hand();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = getMCSymbolPrototype(lib.hand_1, new cjs.Rectangle(0, 0, 50, 58), null);


    (lib.ctabground = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#48B648").s().p("AoCICQjVjUAAkuQAAksDVjWQDWjVEsAAQEuAADUDVQDWDWAAEsQAAEujWDUQjUDWkuAAQksAAjWjWg");
        this.shape.setTransform(72.8, 72.8);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 145.5, 145.5);


    (lib.ctabgring = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#CCCCCC").s().p("AtFNHQlblbgBnsQABnrFblaQFalbHrgBQHrABFbFbQFbFaAAHrQAAHslbFbQlbFbnrgBQnrABlalbg");
        this.shape.setTransform(118.6, 118.6);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.ctabgring, new cjs.Rectangle(0, 0, 237.1, 237.1), null);


    (lib.cornerd = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#48B648").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.cornerd, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.cornerc = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#48B648").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.cornerc, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.cornerb = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#48B648").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.cornerb, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.cornera = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#48B648").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.cornera, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.button = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(255,255,255,0.008)").s().p("A4NZjMAAAgzFMAwbAAAMAAAAzFg");
        this.shape.setTransform(155, 163.5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 310, 327);


    (lib.answerdgreycorner = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#ABABAB").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerdgreycorner, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.answerdgreybox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#CACACA").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerdgreybox, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.answerdgrey = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape.setTransform(125, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerdgrey, new cjs.Rectangle(0, 0, 250, 50), null);


    (lib.answerdbox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#70D170").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerdbox, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.answercwhitetext = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("AgaAgQgHgGAAgJQAAgFADgFQACgEAEgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgDgDQgFgEgJAAQgIAAgEADQgEADgCAIIgMgCQACgHADgFQAEgFAHgCQAHgDAIAAQAKAAAFACQAGACADAEQADADABAFIAAALIAAAQQAAARACAFQAAAEADAEIgOAAQgBgEgBgFQgGAGgHACQgFADgIAAQgMAAgGgGgAgCAEIgLADQgDABgCADQgBADAAADQAAAFADADQAEADAIAAQAFAAAGgDQAGgDACgFQACgFAAgIIAAgEQgHADgMABg");
        this.shape.setTransform(85.2, 11);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFFFFF").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_1.setTransform(79.8, 9.7);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#FFFFFF").s().p("AgQAjQgFgDgDgEQgDgDgBgFIAAgMIAAgsIAMAAIAAAnIAAANQABAFAFADQADACAGABQAEAAAFgEQAFgCACgFQACgFAAgJIAAgmIAMAAIAABIIgLAAIAAgLQgIAMgNAAQgHAAgGgCg");
        this.shape_2.setTransform(74.3, 11.1);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#FFFFFF").s().p("AgTAgQgIgGgCgLIAMgCQABAHAEAEQAGAEAHAAQAJAAADgEQAFgDAAgFQgBgEgDgCIgNgFQgNgDgEgCQgFgCgEgEQgCgFAAgFQAAgFACgEQADgEADgDQADgCAFgBQAFgCAGAAQAHAAAGACQAHADADAEQADAEACAHIgMACQgCgGgEgDQgEgDgGAAQgIAAgEADQgDADAAADQAAABAAAAQAAABAAABQABAAAAABQAAAAAAABIAFADIAKADIASAGQAFABADAEQADAFAAAGQAAAGgDAGQgEAFgHADQgGADgJAAQgOAAgGgGg");
        this.shape_3.setTransform(66.9, 11);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#FFFFFF").s().p("AgTAlIAAhIIALAAIAAALQAFgHADgDQADgCAEAAQAGAAAHADIgEAMQgFgDgEAAQgFAAgCADQgDACgBAEQgCAHAAAIIAAAlg");
        this.shape_4.setTransform(61.7, 11);

        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#FFFFFF").s().p("AgWAuQgJgFgDgJQgFgJAAgQIAAg5IAOAAIAAA5QAAANACAGQADAGAGAEQAFADAJAAQAOAAAGgHQAGgGAAgTIAAg5IANAAIAAA5QAAAPgDAJQgDAJgKAFQgIAGgPAAQgNAAgJgFg");
        this.shape_5.setTransform(53.8, 9.7);

        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f("#FFFFFF").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAOAAQAPAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAEgDAEgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgHAFAAAKIAoAAQgBgJgEgFQgGgHgKAAQgHAAgFAGg");
        this.shape_6.setTransform(40.9, 11);

        this.shape_7 = new cjs.Shape();
        this.shape_7.graphics.f("#FFFFFF").s().p("AgVAuQgIgGAAgMIANACQAAAGAEACQAEAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgIAEQgHAEgKAAQgNAAgIgGgAgMgiQgGAHgBANQABAOAGAGQAFAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgFgHgIAAQgIAAgFAHg");
        this.shape_7.setTransform(32.9, 12.4);

        this.shape_8 = new cjs.Shape();
        this.shape_8.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
        this.shape_8.setTransform(27.7, 9.7);

        this.shape_9 = new cjs.Shape();
        this.shape_9.graphics.f("#FFFFFF").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_9.setTransform(24.5, 9.7);

        this.shape_10 = new cjs.Shape();
        this.shape_10.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
        this.shape_10.setTransform(21.5, 9.7);

        this.shape_11 = new cjs.Shape();
        this.shape_11.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAJAKQAJAKAAARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAoAAQgCgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_11.setTransform(16, 11);

        this.shape_12 = new cjs.Shape();
        this.shape_12.graphics.f("#FFFFFF").s().p("AAaAyIAAgvIgzAAIAAAvIgOAAIAAhjIAOAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_12.setTransform(7.1, 9.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_12 }, { t: this.shape_11 }, { t: this.shape_10 }, { t: this.shape_9 }, { t: this.shape_8 }, { t: this.shape_7 }, { t: this.shape_6 }, { t: this.shape_5 }, { t: this.shape_4 }, { t: this.shape_3 }, { t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answercwhitetext, new cjs.Rectangle(0, 0, 91.4, 19.6), null);


    (lib.answercgreytogreen = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#70D170").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape.setTransform(125, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answercgreytogreen, new cjs.Rectangle(0, 0, 250, 50), null);


    (lib.answercgrey = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape.setTransform(125, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answercgrey, new cjs.Rectangle(0, 0, 250, 50), null);


    (lib.answercbox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#70D170").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answercbox, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.answerbgreycorner = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#ABABAB").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerbgreycorner, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.answerbgrey = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape.setTransform(125, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerbgrey, new cjs.Rectangle(0, 0, 250, 50), null);


    (lib.answerbboxgrey = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#CACACA").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerbboxgrey, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.answerbbox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#70D170").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerbbox, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.answeratextgrey = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#CCCCCC").s().p("AgaAgQgGgGgBgJQABgFACgFQADgEADgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgEADgCAIIgNgCQACgHAEgFQAEgFAHgCQAHgDAIAAQAJAAAHACQAFACADAEQADADABAFIAAALIAAAQQAAARABAFQABAEADAEIgOAAQgCgEAAgFQgHAGgGACQgGADgGAAQgMAAgHgGgAgCAEIgLADQgDABgBADQgCADAAADQAAAFAEADQADADAHAAQAHAAAFgDQAGgDACgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape.setTransform(99.3, 11);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#CCCCCC").s().p("AARAlIAAgrQABgIgCgEQgCgDgDgDQgEgCgFAAQgGAAgGAGQgGAEAAAPIAAAmIgMAAIAAhIIALAAIAAAKQAIgLAOAAQAHAAAFACQAFADADADQADAEABAGIAAALIAAAsg");
        this.shape_1.setTransform(91.5, 11);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#CCCCCC").s().p("AgXAcQgKgKAAgSQAAgTALgKQAKgIAMAAQAPAAAJAKQAKAKAAARQAAANgEAIQgEAIgIAEQgJAFgJAAQgOAAgJgKgAgOgUQgGAHAAANQAAAOAGAHQAGAHAIAAQAKAAAFgHQAHgHAAgOQAAgNgHgHQgFgHgKAAQgIAAgGAHg");
        this.shape_2.setTransform(83.7, 11);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#CCCCCC").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAIAAQAHAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_3.setTransform(75.9, 11);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#CCCCCC").s().p("AgTAlIAAhIIALAAIAAALQAFgHADgDQADgCAEAAQAGAAAHADIgEAMQgFgDgEAAQgFAAgCADQgDACgBAEQgCAHAAAIIAAAlg");
        this.shape_4.setTransform(70.3, 11);

        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#CCCCCC").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgNgVQgFAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgGAGg");
        this.shape_5.setTransform(63.5, 11);

        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f("#CCCCCC").s().p("AgVAuQgMgHgGgMQgGgMAAgOQAAgOAGgNQAGgMALgHQAMgGAOAAQALAAAJAEQAIADAFAHQAFAGADAKIgMADQgCgHgEgFQgDgEgGgDQgGgCgIAAQgIAAgHACQgGADgEAFQgFAEgCAGQgEAJAAAKQAAANAFAJQAFAJAIAFQAJAEAJAAQAJAAAIgDQAIgEAEgDIAAgTIgdAAIAAgLIAqAAIAAAkQgJAIgLAEQgKAEgLAAQgOAAgMgGg");
        this.shape_6.setTransform(54.1, 9.6);

        this.shape_7 = new cjs.Shape();
        this.shape_7.graphics.f("#CCCCCC").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAOAAQAPAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAEgDAEgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgHAFAAAKIAoAAQgBgJgEgFQgGgHgKAAQgHAAgFAGg");
        this.shape_7.setTransform(40.9, 11);

        this.shape_8 = new cjs.Shape();
        this.shape_8.graphics.f("#CCCCCC").s().p("AgVAuQgIgGAAgMIANACQAAAGAEACQAEAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgIAEQgHAEgKAAQgNAAgIgGgAgMgiQgGAHgBANQABAOAGAGQAFAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgFgHgIAAQgIAAgFAHg");
        this.shape_8.setTransform(32.9, 12.4);

        this.shape_9 = new cjs.Shape();
        this.shape_9.graphics.f("#CCCCCC").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
        this.shape_9.setTransform(27.7, 9.7);

        this.shape_10 = new cjs.Shape();
        this.shape_10.graphics.f("#CCCCCC").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_10.setTransform(24.5, 9.7);

        this.shape_11 = new cjs.Shape();
        this.shape_11.graphics.f("#CCCCCC").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
        this.shape_11.setTransform(21.5, 9.7);

        this.shape_12 = new cjs.Shape();
        this.shape_12.graphics.f("#CCCCCC").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAJAKQAJAKAAARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAoAAQgCgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_12.setTransform(16, 11);

        this.shape_13 = new cjs.Shape();
        this.shape_13.graphics.f("#CCCCCC").s().p("AAaAyIAAgvIgzAAIAAAvIgOAAIAAhjIAOAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_13.setTransform(7.1, 9.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_13 }, { t: this.shape_12 }, { t: this.shape_11 }, { t: this.shape_10 }, { t: this.shape_9 }, { t: this.shape_8 }, { t: this.shape_7 }, { t: this.shape_6 }, { t: this.shape_5 }, { t: this.shape_4 }, { t: this.shape_3 }, { t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answeratextgrey, new cjs.Rectangle(0, 0, 105.5, 19.6), null);


    (lib.answeragreycorner = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#ABABAB").s().p("AgxgxIBjAAIhjBjg");
        this.shape.setTransform(5, 5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answeragreycorner, new cjs.Rectangle(0, 0, 10, 10), null);


    (lib.answeragreybox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#CACACA").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answeragreybox, new cjs.Rectangle(0, 0, 50, 50), null);


    (lib.answeragrey = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape.setTransform(125, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answeragrey, new cjs.Rectangle(0, 0, 250, 50), null);


    (lib.answerabox = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#70D170").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape.setTransform(25, 25);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    }).prototype = getMCSymbolPrototype(lib.answerabox, new cjs.Rectangle(0, 0, 50, 50), null);


    // stage content:
    (lib.quizintroduction2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // timeline functions:
        this.frame_0 = function() {
            /* Click to Go to Web Page
            Clicking on the specified symbol instance loads the URL in a new browser window.
            
            Instructions:
            1. Replace http://www.adobe.com with the desired URL address.
               Keep the quotation marks ("").
            */

            this.buttonquiz.addEventListener("click", fl_ClickToGoToWebPage_2);

            function fl_ClickToGoToWebPage_2() {
                // window.open("/start1", "_self");
                gtmEPush(_, 'Animation Start Click');
                window.location.href = route_start1;
            }
        }
        this.frame_181 = function() {
            /* Stop at This Frame
            The  timeline will stop/pause at the frame where you insert this code.
            Can also be used to stop/pause the timeline of movieclips.
            */

            // this.stop();
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(181).call(this.frame_181).wait(50));

        // button-area
        this.buttonquiz = new lib.button();
        this.buttonquiz.name = "buttonquiz";
        this.buttonquiz.parent = this;
        this.buttonquiz.setTransform(163, 181.5, 1, 1, 0, 0, 0, 155, 163.5);
        new cjs.ButtonHelper(this.buttonquiz, 0, 1, 1);

        this.timeline.addTween(cjs.Tween.get(this.buttonquiz).wait(182));

        // play-button
        this.instance = new lib.playbutton();
        this.instance.parent = this;
        this.instance.setTransform(216.8, 135.3, 1, 1, 0, 0, 0, 10.8, 12.5);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({ _off: false }, 0).wait(7).to({ scaleX: 1.44, scaleY: 1.44 }, 0).wait(1).to({ scaleX: 1.88, scaleY: 1.88, y: 135.4 }, 0).wait(1).to({ scaleX: 1.44, scaleY: 1.44, y: 135.3 }, 0).wait(1).to({ scaleX: 1, scaleY: 1 }, 0).wait(4).to({ scaleX: 1.56, scaleY: 1.56 }, 0).wait(1).to({ scaleX: 2.13, scaleY: 2.13 }, 0).wait(1).to({ scaleX: 1.56, scaleY: 1.56 }, 0).wait(1).to({ scaleX: 1, scaleY: 1 }, 0).wait(2));

        // cta-start
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("AgTBkIAAilIg8AAIAAgiICfAAIAAAiIg8AAIAAClg");
        this.shape.setTransform(189.4, 135.6);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFFFFF").s().p("AAqBkIgdgrQgPgYgGgGQgGgGgGgCQgGgCgOAAIgIAAIAABTIgpAAIAAjHIBVAAQAgAAAOAFQAPAGAIANQAJAOAAASQAAAXgNAOQgOAOgaAEQANAHAJAKQAIAJAPAXIAYAngAgwgOIAdAAQAcAAAIgDQAHgCAEgGQAEgGAAgJQAAgLgFgGQgGgGgJgCIgdAAIgfAAg");
        this.shape_1.setTransform(171.7, 135.6);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#FFFFFF").s().p("AA4BkIgRgtIhPAAIgRAtIgqAAIBNjHIArAAIBQDHgAgbAVIA1AAIgahJg");
        this.shape_2.setTransform(150.5, 135.6);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#FFFFFF").s().p("AgTBkIAAilIg8AAIAAgiICfAAIAAAiIg8AAIAAClg");
        this.shape_3.setTransform(134, 135.6);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#FFFFFF").s().p("Ag4BWQgUgRgFgiIAogEQADAUALAJQAMAKAQAAQAVAAAKgJQAJgIAAgLQAAgHgEgFQgEgFgKgEIgggJQghgIgNgKQgSgRAAgYQAAgPAIgNQAJgOARgHQAQgHAXAAQAkAAAUARQATAQABAcIgpACQgCgQgJgGQgJgHgQAAQgRAAgKAHQgHAFAAAIQABAHAFAFQAIAGAdAHQAeAHANAIQAPAHAHAMQAIANAAATQAAARgJAPQgKAPgRAIQgSAHgaAAQgkAAgVgSg");
        this.shape_4.setTransform(115.9, 135.6);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_4 }, { t: this.shape_3 }, { t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }, 163).wait(19));

        // cta-bg-round
        this.instance_1 = new lib.ctabground();
        this.instance_1.parent = this;
        this.instance_1.setTransform(167.9, 135, 0.072, 0.072, 0, 0, 0, 72.1, 72.8);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(156).to({ _off: false }, 0).wait(1).to({ regX: 72.8, scaleX: 0.21, scaleY: 0.21, y: 134.9, alpha: 0.2 }, 0).wait(1).to({ scaleX: 0.34, scaleY: 0.34, y: 134.8, alpha: 0.4 }, 0).wait(1).to({ scaleX: 0.47, scaleY: 0.47, y: 134.7, alpha: 0.6 }, 0).wait(1).to({ scaleX: 0.6, scaleY: 0.6, y: 134.6, alpha: 0.8 }, 0).wait(1).to({ scaleX: 0.74, scaleY: 0.74, y: 134.5, alpha: 1 }, 0).wait(1).to({ scaleX: 0.87, scaleY: 0.87, y: 134.4 }, 0).wait(1).to({ scaleX: 1, scaleY: 1, y: 134.3 }, 0).wait(19));

        // cta-bg-ring
        this.instance_2 = new lib.ctabgring();
        this.instance_2.parent = this;
        this.instance_2.setTransform(166.6, 134.8, 0.108, 0.108, 0, 0, 0, 117.7, 117.7);
        this.instance_2.alpha = 0;
        this.instance_2._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(163).to({ _off: false }, 0).wait(1).to({ regX: 118.5, regY: 118.5, scaleX: 0.41, scaleY: 0.41, x: 167, y: 135.1, alpha: 0.333 }, 0).wait(1).to({ scaleX: 0.7, scaleY: 0.7, x: 167.2, y: 135.3, alpha: 0.667 }, 0).wait(1).to({ scaleX: 1, scaleY: 1, x: 167.5, y: 135.6, alpha: 1 }, 0).wait(1).to({ scaleX: 1.04, scaleY: 1.04, y: 135.7, alpha: 0.667 }, 0).wait(1).to({ scaleX: 1.07, scaleY: 1.07, alpha: 0.333 }, 0).wait(1).to({ scaleX: 1.11, scaleY: 1.11, x: 167.6, alpha: 0 }, 0).wait(13));

        // plus1
        this.instance_3 = new lib.plus1();
        this.instance_3.parent = this;
        this.instance_3.setTransform(168.2, 133.2, 0.068, 0.068, 0, 0, 0, 68.1, 66.7);
        this.instance_3.alpha = 0;
        this.instance_3._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(78).to({ _off: false }, 0).wait(1).to({ regX: 68.2, regY: 68.2, scaleX: 0.24, scaleY: 0.24, y: 133.6, alpha: 0.167 }, 0).wait(1).to({ scaleX: 0.41, scaleY: 0.41, y: 133.8, alpha: 0.333 }, 0).wait(1).to({ scaleX: 0.58, scaleY: 0.58, y: 134.1, alpha: 0.5 }, 0).wait(1).to({ scaleX: 0.76, scaleY: 0.76, y: 134.4, alpha: 0.667 }, 0).wait(1).to({ scaleX: 0.93, scaleY: 0.93, x: 168.3, y: 134.7, alpha: 0.833 }, 0).wait(1).to({ scaleX: 1.1, scaleY: 1.1, y: 134.9, alpha: 1 }, 0).wait(1).to({ scaleX: 1.02, scaleY: 1.02, x: 168.2, y: 134.8 }, 0).wait(1).to({ scaleX: 0.94, scaleY: 0.94, y: 134.7 }, 0).wait(1).to({ scaleX: 1.01, scaleY: 1.01, x: 168.3, y: 134.8 }, 0).wait(1).to({ scaleX: 1.09, scaleY: 1.09, x: 168.2, y: 134.9 }, 0).wait(64).to({ scaleX: 0.9, scaleY: 0.92, y: 134.6, alpha: 0.833 }, 0).wait(1).to({ scaleX: 0.7, scaleY: 0.75, y: 134.4, alpha: 0.667 }, 0).wait(1).to({ scaleX: 0.51, scaleY: 0.57, y: 134.1, alpha: 0.5 }, 0).wait(1).to({ scaleX: 0.32, scaleY: 0.4, y: 133.8, alpha: 0.333 }, 0).wait(1).to({ scaleX: 0.13, scaleY: 0.23, y: 133.5, alpha: 0.167 }, 0).wait(1).to({ scaleX: 0.06, scaleY: 0.06, skewY: 180, x: 168.1, y: 133.3, alpha: 0 }, 0).to({ _off: true }, 1).wait(24));

        // plus1-ring
        this.instance_4 = new lib.plus1ring();
        this.instance_4.parent = this;
        this.instance_4.setTransform(168.2, 134.9, 1, 1, 0, 0, 0, 50.6, 50.6);
        this.instance_4.alpha = 0;
        this.instance_4._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(88).to({ _off: false }, 0).wait(1).to({ regX: 50.5, regY: 50.5, scaleX: 1.38, scaleY: 1.38, x: 168.1, y: 134.7, alpha: 0.133 }, 0).wait(1).to({ scaleX: 1.77, scaleY: 1.77, alpha: 0.267 }, 0).wait(1).to({ scaleX: 2.15, scaleY: 2.15, x: 168, alpha: 0.4 }, 0).wait(1).to({ scaleX: 2.25, scaleY: 2.25, alpha: 0.3 }, 0).wait(1).to({ scaleX: 2.34, scaleY: 2.34, x: 168.1, alpha: 0.2 }, 0).wait(1).to({ scaleX: 2.44, scaleY: 2.44, x: 168, alpha: 0.1 }, 0).wait(1).to({ scaleX: 2.54, scaleY: 2.54, alpha: 0 }, 0).wait(55).to({ _off: true }, 1).wait(31));

        // hand
        this.hand = new lib.hand_1();
        this.hand.name = "hand";
        this.hand.parent = this;
        this.hand.setTransform(371, 102, 1, 1, 0, 0, 0, 25, 29);
        this.hand.alpha = 0;
        this.hand._off = true;

        this.timeline.addTween(cjs.Tween.get(this.hand).wait(29).to({ _off: false }, 0).wait(1).to({ x: 352.2, y: 104.2, alpha: 0.143 }, 0).wait(1).to({ x: 333.3, y: 106.4, alpha: 0.286 }, 0).wait(1).to({ x: 314.5, y: 108.6, alpha: 0.429 }, 0).wait(1).to({ x: 295.6, y: 110.7, alpha: 0.571 }, 0).wait(1).to({ x: 276.8, y: 112.9, alpha: 0.714 }, 0).wait(1).to({ x: 257.9, y: 115.1, alpha: 0.857 }, 0).wait(1).to({ x: 239.1, y: 117.3, alpha: 1 }, 0).wait(1).to({ x: 231.8, y: 143.6 }, 0).wait(1).to({ x: 224.6, y: 169.8 }, 0).wait(1).to({ x: 217.4, y: 196.1 }, 0).wait(1).to({ x: 210.2, y: 222.3 }, 0).wait(1).to({ x: 202.9, y: 248.6 }, 0).wait(1).to({ x: 195.7, y: 274.8 }, 0).wait(1).to({ x: 188.5, y: 301 }, 0).wait(1).to({ x: 181.3, y: 327.3 }, 0).wait(1).to({ x: 178.7, y: 320.1 }, 0).wait(1).to({ x: 176.1, y: 312.8 }, 0).wait(1).to({ x: 173.5, y: 305.6 }, 0).wait(1).to({ x: 170.9, y: 298.3 }, 0).wait(1).to({ x: 168.3, y: 291.1 }, 0).wait(1).to({ x: 165.8, y: 283.8 }, 0).wait(1).to({ x: 163.2, y: 276.6 }, 0).wait(1).to({ x: 160.6, y: 269.3 }, 0).wait(6).to({ scaleX: 0.89, scaleY: 0.89 }, 0).wait(1).to({ scaleX: 0.77, scaleY: 0.77 }, 0).wait(1).to({ scaleX: 0.89, scaleY: 0.89 }, 0).wait(1).to({ scaleX: 1, scaleY: 1 }, 0).wait(83).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // touch-ring
        this.instance_5 = new lib.touchring();
        this.instance_5.parent = this;
        this.instance_5.setTransform(156.3, 245.9, 1, 1, 0, 0, 0, 5.9, 5.9);
        this.instance_5.alpha = 0;
        this.instance_5._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(59).to({ _off: false }, 0).wait(1).to({ scaleX: 3.59, scaleY: 3.59, x: 156.2, alpha: 0.3 }, 0).wait(1).to({ scaleX: 6.18, scaleY: 6.18, x: 156.3, alpha: 0.6 }, 0).wait(1).to({ scaleX: 7.07, scaleY: 7.07, x: 156.2, alpha: 0.5 }, 0).wait(1).to({ scaleX: 7.96, scaleY: 7.96, alpha: 0.4 }, 0).wait(1).to({ scaleX: 8.85, scaleY: 8.85, alpha: 0.3 }, 0).wait(1).to({ scaleX: 9.74, scaleY: 9.74, alpha: 0.2 }, 0).wait(1).to({ scaleX: 10.63, scaleY: 10.63, alpha: 0.1 }, 0).wait(1).to({ scaleX: 11.52, scaleY: 11.52, alpha: 0 }, 0).wait(83).to({ _off: true }, 1).wait(31));

        // answer-d-text-grey
        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#CCCCCC").s().p("AgaAgQgHgGABgJQAAgFACgFQADgEAEgDIAIgDIALgCQAOgBAHgDIAAgDQAAgIgDgDQgFgEgJAAQgIAAgEADQgFADgCAIIgLgCQACgHADgFQAEgFAHgCQAHgDAIAAQAKAAAFACQAGACADAEQADADABAFIABALIAAAQQAAARABAFQAAAEACAEIgMAAQgDgEAAgFQgHAGgGACQgFADgIAAQgMAAgGgGgAgCAEIgLADQgDABgCADQgCADABADQgBAFAEADQAEADAIAAQAFAAAGgDQAFgDADgFQACgFAAgIIAAgEQgHADgMABg");
        this.shape_5.setTransform(168.1, 308.3);

        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f("#CCCCCC").s().p("AASAlIAAgrQAAgHgCgFQgBgDgEgCQgEgCgEAAQgIAAgFAEQgGAFAAAOIAAAnIgNAAIAAhHIAMAAIAAAKQAIgMAOAAQAHAAAFACQAFACADAEQADAEABAFIABANIAAArg");
        this.shape_6.setTransform(160.3, 308.3);

        this.shape_7 = new cjs.Shape();
        this.shape_7.graphics.f("#CCCCCC").s().p("AgaAgQgGgGgBgJQABgFACgFQACgEAEgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgEADgCAIIgNgCQADgHADgFQAEgFAHgCQAHgDAIAAQAJAAAHACQAFACADAEQADADABAFIAAALIAAAQQAAARABAFQABAEADAEIgOAAQgCgEAAgFQgHAGgGACQgFADgIAAQgLAAgHgGgAgCAEIgLADQgDABgBADQgCADAAADQAAAFADADQAEADAHAAQAHAAAFgDQAGgDACgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_7.setTransform(152.5, 308.3);

        this.shape_8 = new cjs.Shape();
        this.shape_8.graphics.f("#CCCCCC").s().p("AgPAuQgHgFgEgIQgEgJAAgLQAAgLADgIQAEgJAHgEQAHgFAJAAQAGAAAFADQAFADADAEIAAgkIAMAAIAABjIgLAAIAAgJQgHALgNAAQgIAAgHgFgAgMgHQgGAHAAANQAAAOAGAHQAGAHAHAAQAIAAAGgHQAFgGAAgOQAAgOgFgHQgGgHgJAAQgHAAgFAHg");
        this.shape_8.setTransform(144.5, 307);

        this.shape_9 = new cjs.Shape();
        this.shape_9.graphics.f("#CCCCCC").s().p("AASAlIAAgrQAAgHgCgFQgBgDgEgCQgEgCgEAAQgIAAgFAEQgGAFAAAOIAAAnIgNAAIAAhHIAMAAIAAAKQAIgMAOAAQAHAAAFACQAFACADAEQADAEABAFIABANIAAArg");
        this.shape_9.setTransform(136.9, 308.3);

        this.shape_10 = new cjs.Shape();
        this.shape_10.graphics.f("#CCCCCC").s().p("AgaAgQgGgGgBgJQABgFACgFQACgEAEgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgEADgCAIIgNgCQADgHADgFQAEgFAHgCQAHgDAIAAQAJAAAHACQAFACADAEQADADABAFIAAALIAAAQQAAARABAFQABAEADAEIgOAAQgCgEAAgFQgHAGgGACQgFADgHAAQgMAAgHgGgAgCAEIgLADQgDABgBADQgCADAAADQAAAFADADQAEADAHAAQAHAAAFgDQAGgDACgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_10.setTransform(129.1, 308.3);

        this.shape_11 = new cjs.Shape();
        this.shape_11.graphics.f("#CCCCCC").s().p("AAjAyIAAhTIgdBTIgLAAIgdhVIAABVIgNAAIAAhjIAUAAIAYBFIAEAQIAFgRIAYhEIASAAIAABjg");
        this.shape_11.setTransform(119.4, 307);

        this.shape_12 = new cjs.Shape();
        this.shape_12.graphics.f("#CCCCCC").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgGAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgFAGg");
        this.shape_12.setTransform(105.8, 308.3);

        this.shape_13 = new cjs.Shape();
        this.shape_13.graphics.f("#CCCCCC").s().p("AgVAuQgIgGAAgMIANACQAAAGADACQAFAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgHAEQgIAEgKAAQgNAAgIgGgAgNgiQgFAHgBANQABAOAFAGQAGAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgGgHgHAAQgIAAgGAHg");
        this.shape_13.setTransform(97.8, 309.7);

        this.shape_14 = new cjs.Shape();
        this.shape_14.graphics.f("#CCCCCC").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_14.setTransform(92.6, 307);

        this.shape_15 = new cjs.Shape();
        this.shape_15.graphics.f("#CCCCCC").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_15.setTransform(89.4, 307);

        this.shape_16 = new cjs.Shape();
        this.shape_16.graphics.f("#CCCCCC").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_16.setTransform(86.4, 307);

        this.shape_17 = new cjs.Shape();
        this.shape_17.graphics.f("#CCCCCC").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAJAAQAGAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_17.setTransform(80.9, 308.3);

        this.shape_18 = new cjs.Shape();
        this.shape_18.graphics.f("#CCCCCC").s().p("AAaAyIAAgvIgzAAIAAAvIgNAAIAAhjIANAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_18.setTransform(72, 307);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_18 }, { t: this.shape_17 }, { t: this.shape_16 }, { t: this.shape_15 }, { t: this.shape_14 }, { t: this.shape_13 }, { t: this.shape_12 }, { t: this.shape_11 }, { t: this.shape_10 }, { t: this.shape_9 }, { t: this.shape_8 }, { t: this.shape_7 }, { t: this.shape_6 }, { t: this.shape_5 }] }, 73).to({ state: [] }, 74).wait(35));

        // answer-d-text
        this.text = new cjs.Text("Heilige Mandana", "14px 'Arial'", "#333333");
        this.text.lineHeight = 18;
        this.text.parent = this;
        this.text.setTransform(-243.1, 299.3);

        this.shape_19 = new cjs.Shape();
        this.shape_19.graphics.f("#333333").s().p("AgaAgQgHgGABgJQAAgFACgFQADgEAEgDIAIgDIALgCQAOgBAHgDIAAgDQAAgIgDgDQgFgEgJAAQgIAAgEADQgFADgCAIIgLgCQACgHADgFQAEgFAHgCQAHgDAIAAQAKAAAFACQAGACADAEQADADABAFIABALIAAAQQAAARABAFQAAAEACAEIgMAAQgDgEAAgFQgHAGgGACQgFADgIAAQgMAAgGgGgAgCAEIgLADQgDABgCADQgCADABADQgBAFAEADQAEADAIAAQAFAAAGgDQAFgDADgFQACgFAAgIIAAgEQgHADgMABg");
        this.shape_19.setTransform(168.1, 308.3);

        this.shape_20 = new cjs.Shape();
        this.shape_20.graphics.f("#333333").s().p("AASAlIAAgrQAAgHgCgFQgBgDgEgCQgEgCgEAAQgIAAgFAEQgGAFAAAOIAAAnIgNAAIAAhHIAMAAIAAAKQAIgMAOAAQAHAAAFACQAFACADAEQADAEABAFIABANIAAArg");
        this.shape_20.setTransform(160.3, 308.3);

        this.shape_21 = new cjs.Shape();
        this.shape_21.graphics.f("#333333").s().p("AgaAgQgGgGgBgJQABgFACgFQACgEAEgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgEADgCAIIgNgCQADgHADgFQAEgFAHgCQAHgDAIAAQAJAAAHACQAFACADAEQADADABAFIAAALIAAAQQAAARABAFQABAEADAEIgOAAQgCgEAAgFQgHAGgGACQgFADgIAAQgLAAgHgGgAgCAEIgLADQgDABgBADQgCADAAADQAAAFADADQAEADAHAAQAHAAAFgDQAGgDACgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_21.setTransform(152.5, 308.3);

        this.shape_22 = new cjs.Shape();
        this.shape_22.graphics.f("#333333").s().p("AgPAuQgHgFgEgIQgEgJAAgLQAAgLADgIQAEgJAHgEQAHgFAJAAQAGAAAFADQAFADADAEIAAgkIAMAAIAABjIgLAAIAAgJQgHALgNAAQgIAAgHgFgAgMgHQgGAHAAANQAAAOAGAHQAGAHAHAAQAIAAAGgHQAFgGAAgOQAAgOgFgHQgGgHgJAAQgHAAgFAHg");
        this.shape_22.setTransform(144.5, 307);

        this.shape_23 = new cjs.Shape();
        this.shape_23.graphics.f("#333333").s().p("AASAlIAAgrQAAgHgCgFQgBgDgEgCQgEgCgEAAQgIAAgFAEQgGAFAAAOIAAAnIgNAAIAAhHIAMAAIAAAKQAIgMAOAAQAHAAAFACQAFACADAEQADAEABAFIABANIAAArg");
        this.shape_23.setTransform(136.9, 308.3);

        this.shape_24 = new cjs.Shape();
        this.shape_24.graphics.f("#333333").s().p("AgaAgQgGgGgBgJQABgFACgFQACgEAEgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgEADgCAIIgNgCQADgHADgFQAEgFAHgCQAHgDAIAAQAJAAAHACQAFACADAEQADADABAFIAAALIAAAQQAAARABAFQABAEADAEIgOAAQgCgEAAgFQgHAGgGACQgFADgHAAQgMAAgHgGgAgCAEIgLADQgDABgBADQgCADAAADQAAAFADADQAEADAHAAQAHAAAFgDQAGgDACgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_24.setTransform(129.1, 308.3);

        this.shape_25 = new cjs.Shape();
        this.shape_25.graphics.f("#333333").s().p("AAjAyIAAhTIgdBTIgLAAIgdhVIAABVIgNAAIAAhjIAUAAIAYBFIAEAQIAFgRIAYhEIASAAIAABjg");
        this.shape_25.setTransform(119.4, 307);

        this.shape_26 = new cjs.Shape();
        this.shape_26.graphics.f("#333333").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgGAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgFAGg");
        this.shape_26.setTransform(105.8, 308.3);

        this.shape_27 = new cjs.Shape();
        this.shape_27.graphics.f("#333333").s().p("AgVAuQgIgGAAgMIANACQAAAGADACQAFAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgHAEQgIAEgKAAQgNAAgIgGgAgNgiQgFAHgBANQABAOAFAGQAGAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgGgHgHAAQgIAAgGAHg");
        this.shape_27.setTransform(97.8, 309.7);

        this.shape_28 = new cjs.Shape();
        this.shape_28.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_28.setTransform(92.6, 307);

        this.shape_29 = new cjs.Shape();
        this.shape_29.graphics.f("#333333").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_29.setTransform(89.4, 307);

        this.shape_30 = new cjs.Shape();
        this.shape_30.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_30.setTransform(86.4, 307);

        this.shape_31 = new cjs.Shape();
        this.shape_31.graphics.f("#333333").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAJAAQAGAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_31.setTransform(80.9, 308.3);

        this.shape_32 = new cjs.Shape();
        this.shape_32.graphics.f("#333333").s().p("AAaAyIAAgvIgzAAIAAAvIgNAAIAAhjIANAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_32.setTransform(72, 307);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text }] }).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.shape_32 }, { t: this.shape_31 }, { t: this.shape_30 }, { t: this.shape_29 }, { t: this.shape_28 }, { t: this.shape_27 }, { t: this.shape_26 }, { t: this.shape_25 }, { t: this.shape_24 }, { t: this.shape_23 }, { t: this.shape_22 }, { t: this.shape_21 }, { t: this.shape_20 }, { t: this.shape_19 }] }, 1).to({ state: [] }, 64).wait(109));
        this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({ x: -204.3 }, 0).wait(1).to({ x: -165.6 }, 0).wait(1).to({ x: -126.8 }, 0).wait(1).to({ x: -88.1 }, 0).wait(1).to({ x: -49.3 }, 0).wait(1).to({ x: -10.6 }, 0).wait(1).to({ x: 28.1 }, 0).wait(1).to({ x: 66.9 }, 0).to({ _off: true }, 1).wait(173));

        // answer-d-letter
        this.text_1 = new cjs.Text("D", "14px 'Arial'", "#FFFFFF");
        this.text_1.lineHeight = 18;
        this.text_1.lineWidth = 10;
        this.text_1.parent = this;
        this.text_1.setTransform(-281.4, 300.3);

        this.shape_33 = new cjs.Shape();
        this.shape_33.graphics.f("#FFFFFF").s().p("AgoAyIAAhjIAiAAIARABQAJACAGAGQAIAGAEAKQADALAAANQAAALgCAIQgDAKgEAFQgEAGgFADQgFADgHADQgHABgIAAgAgbAmIAVAAQAJAAAGgCQAFgCAEgDQAEgEADgJQADgIAAgKQAAgQgFgIQgGgJgHgDQgFgBgLAAIgVAAg");
        this.shape_33.setTransform(33.8, 308);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_1 }] }).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.text_1 }] }, 1).to({ state: [{ t: this.shape_33 }] }, 1).to({ state: [] }, 138).wait(35));
        this.timeline.addTween(cjs.Tween.get(this.text_1).wait(1).to({ x: -242.7 }, 0).wait(1).to({ x: -203.9 }, 0).wait(1).to({ x: -165.2 }, 0).wait(1).to({ x: -126.4 }, 0).wait(1).to({ x: -87.7 }, 0).wait(1).to({ x: -48.9 }, 0).wait(1).to({ x: -10.2 }, 0).wait(1).to({ x: 28.6 }, 0).to({ _off: true }, 1).wait(173));

        // answer-d-grey-corner
        this.instance_6 = new lib.answerdgreycorner();
        this.instance_6.parent = this;
        this.instance_6.setTransform(52.8, 336.7, 1, 1, 0, 0, 0, 5, 5);
        this.instance_6.alpha = 0;
        this.instance_6._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(73).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(66).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-d-corner
        this.instance_7 = new lib.cornerd();
        this.instance_7.parent = this;
        this.instance_7.setTransform(-257.2, 336.7, 1, 1, 0, 0, 0, 5, 5);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({ x: -218.4 }, 0).wait(1).to({ x: -179.7 }, 0).wait(1).to({ x: -140.9 }, 0).wait(1).to({ x: -102.2 }, 0).wait(1).to({ x: -63.4 }, 0).wait(1).to({ x: -24.7 }, 0).wait(1).to({ x: 14 }, 0).wait(1).to({ x: 52.8 }, 0).wait(66).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0 }, 0).to({ _off: true }, 1).wait(103));

        // answer-d-box-grey
        this.instance_8 = new lib.answerdgreybox();
        this.instance_8.parent = this;
        this.instance_8.setTransform(32.8, 306.6, 1, 1, 0, 0, 0, 25, 25);
        this.instance_8.alpha = 0;
        this.instance_8._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(73).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(66).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-d-box
        this.instance_9 = new lib.answerdbox();
        this.instance_9.parent = this;
        this.instance_9.setTransform(-277.2, 306.7, 1, 1, 0, 0, 0, 25, 25);

        this.shape_34 = new cjs.Shape();
        this.shape_34.graphics.f("#70D170").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape_34.setTransform(32.8, 306.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_9 }] }).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.instance_9 }] }, 1).to({ state: [{ t: this.shape_34 }] }, 1).to({ state: [] }, 70).wait(103));
        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1).to({ x: -238.4 }, 0).wait(1).to({ x: -199.7 }, 0).wait(1).to({ x: -160.9 }, 0).wait(1).to({ x: -122.2 }, 0).wait(1).to({ x: -83.4 }, 0).wait(1).to({ x: -44.7 }, 0).wait(1).to({ x: -5.9 }, 0).wait(1).to({ x: 32.8 }, 0).to({ _off: true }, 1).wait(173));

        // answer-d-grey
        this.instance_10 = new lib.answerdgrey();
        this.instance_10.parent = this;
        this.instance_10.setTransform(-137.2, 316.7, 1, 1, 0, 0, 0, 125, 25);

        this.shape_35 = new cjs.Shape();
        this.shape_35.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape_35.setTransform(172.8, 316.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_10 }] }).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.instance_10 }] }, 1).to({ state: [{ t: this.shape_35 }] }, 1).to({ state: [] }, 138).wait(35));
        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({ x: -98.4 }, 0).wait(1).to({ x: -59.7 }, 0).wait(1).to({ x: -20.9 }, 0).wait(1).to({ x: 17.8 }, 0).wait(1).to({ x: 56.6 }, 0).wait(1).to({ x: 95.3 }, 0).wait(1).to({ x: 134 }, 0).wait(1).to({ x: 172.8 }, 0).to({ _off: true }, 1).wait(173));

        // answer-c-white-text
        this.instance_11 = new lib.answercwhitetext();
        this.instance_11.parent = this;
        this.instance_11.setTransform(110.5, 236.1, 1, 1, 0, 0, 0, 45.6, 9.8);
        this.instance_11.alpha = 0;
        this.instance_11._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(73).to({ _off: false }, 0).wait(1).to({ regX: 45.8, regY: 11.1, x: 110.7, y: 237.4, alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(68).to({ _off: true }, 1).wait(35));

        // answer-c-text
        this.text_2 = new cjs.Text("Heilige Ursula", "14px 'Arial'", "#333333");
        this.text_2.lineHeight = 18;
        this.text_2.parent = this;
        this.text_2.setTransform(-243.1, 228.3);

        this.shape_36 = new cjs.Shape();
        this.shape_36.graphics.f("#333333").s().p("AgaAgQgHgGABgJQAAgFACgFQADgEAEgDIAIgDIALgCQAOgBAHgDIAAgDQAAgIgDgDQgFgEgJAAQgIAAgEADQgFADgCAIIgLgCQACgHADgFQAEgFAHgCQAHgDAIAAQAKAAAFACQAGACADAEQADADABAFIABALIAAAQQAAARABAFQAAAEACAEIgMAAQgDgEAAgFQgHAGgGACQgFADgIAAQgMAAgGgGgAgCAEIgLADQgDABgCADQgCADABADQgBAFAEADQAEADAIAAQAFAAAGgDQAFgDADgFQACgFAAgIIAAgEQgHADgMABg");
        this.shape_36.setTransform(150.1, 237.3);

        this.shape_37 = new cjs.Shape();
        this.shape_37.graphics.f("#333333").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_37.setTransform(144.7, 236);

        this.shape_38 = new cjs.Shape();
        this.shape_38.graphics.f("#333333").s().p("AgQAiQgFgCgDgEQgCgDgCgGIAAgLIAAgsIAMAAIAAAnIAAANQACAFAEADQADADAGgBQAEAAAFgCQAFgDACgFQACgFAAgJIAAgmIAMAAIAABHIgLAAIAAgKQgIAMgNAAQgHAAgGgDg");
        this.shape_38.setTransform(139.2, 237.4);

        this.shape_39 = new cjs.Shape();
        this.shape_39.graphics.f("#333333").s().p("AgTAgQgIgGgCgLIAMgCQABAHAFAEQAEAEAIAAQAIAAAEgEQAFgDAAgFQgBgEgDgCIgNgFQgNgDgEgCQgFgCgEgEQgCgFAAgFQAAgFACgEQADgEADgDQADgCAFgBQAFgCAGAAQAHAAAGACQAHADADAEQADAEACAHIgMACQgCgGgEgDQgEgDgGAAQgIAAgDADQgEADAAADQAAABAAAAQAAABAAABQABAAAAABQAAAAAAABIAFADIAKADIASAGQAFABADAEQADAFAAAGQAAAGgDAGQgEAFgHADQgHADgIAAQgOAAgGgGg");
        this.shape_39.setTransform(131.8, 237.3);

        this.shape_40 = new cjs.Shape();
        this.shape_40.graphics.f("#333333").s().p("AgTAlIAAhHIALAAIAAALQAFgJADgCQADgCAEAAQAGAAAHAEIgEALQgFgDgEABQgFgBgCADQgDADgBAEQgCAGAAAIIAAAlg");
        this.shape_40.setTransform(126.6, 237.3);

        this.shape_41 = new cjs.Shape();
        this.shape_41.graphics.f("#333333").s().p("AgWAuQgJgFgDgJQgEgJgBgQIAAg5IAOAAIAAA5QAAANACAGQADAGAFAEQAHADAIAAQANAAAHgHQAGgGAAgTIAAg5IANAAIAAA5QABAPgEAJQgDAJgKAFQgIAGgPAAQgNAAgJgFg");
        this.shape_41.setTransform(118.7, 236);

        this.shape_42 = new cjs.Shape();
        this.shape_42.graphics.f("#333333").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgGAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgFAGg");
        this.shape_42.setTransform(105.8, 237.3);

        this.shape_43 = new cjs.Shape();
        this.shape_43.graphics.f("#333333").s().p("AgVAuQgIgGAAgMIANACQAAAGADACQAFAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgHAEQgIAEgKAAQgNAAgIgGgAgNgiQgFAHgBANQABAOAFAGQAGAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgGgHgHAAQgIAAgGAHg");
        this.shape_43.setTransform(97.8, 238.7);

        this.shape_44 = new cjs.Shape();
        this.shape_44.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_44.setTransform(92.6, 236);

        this.shape_45 = new cjs.Shape();
        this.shape_45.graphics.f("#333333").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_45.setTransform(89.4, 236);

        this.shape_46 = new cjs.Shape();
        this.shape_46.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_46.setTransform(86.4, 236);

        this.shape_47 = new cjs.Shape();
        this.shape_47.graphics.f("#333333").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAJAAQAGAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_47.setTransform(80.9, 237.3);

        this.shape_48 = new cjs.Shape();
        this.shape_48.graphics.f("#333333").s().p("AAaAyIAAgvIgzAAIAAAvIgNAAIAAhjIANAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_48.setTransform(72, 236);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_2 }] }).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.text_2 }] }, 1).to({ state: [{ t: this.shape_48 }, { t: this.shape_47 }, { t: this.shape_46 }, { t: this.shape_45 }, { t: this.shape_44 }, { t: this.shape_43 }, { t: this.shape_42 }, { t: this.shape_41 }, { t: this.shape_40 }, { t: this.shape_39 }, { t: this.shape_38 }, { t: this.shape_37 }, { t: this.shape_36 }] }, 1).to({ state: [] }, 64).wait(109));
        this.timeline.addTween(cjs.Tween.get(this.text_2).wait(1).to({ x: -204.3 }, 0).wait(1).to({ x: -165.6 }, 0).wait(1).to({ x: -126.8 }, 0).wait(1).to({ x: -88.1 }, 0).wait(1).to({ x: -49.3 }, 0).wait(1).to({ x: -10.6 }, 0).wait(1).to({ x: 28.1 }, 0).wait(1).to({ x: 66.9 }, 0).to({ _off: true }, 1).wait(173));

        // answer-c-letter
        this.text_3 = new cjs.Text("C", "14px 'Arial'", "#FFFFFF");
        this.text_3.lineHeight = 18;
        this.text_3.lineWidth = 10;
        this.text_3.parent = this;
        this.text_3.setTransform(-281.4, 230.3);

        this.shape_49 = new cjs.Shape();
        this.shape_49.graphics.f("#FFFFFF").s().p("AgWAtQgLgGgFgNQgFgMAAgOQAAgPAGgMQAGgMALgGQALgGAMAAQAPAAAKAIQALAIAEAOIgNADQgEgLgHgFQgGgFgKAAQgLAAgIAFQgHAGgDAJQgEAJAAAKQAAAMAEAKQAEAJAIAFQAIAFAIAAQALAAAIgHQAHgGADgNIANADQgEARgLAIQgLAJgPAAQgPAAgKgHg");
        this.shape_49.setTransform(33.7, 237.9);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_3 }] }).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.text_3 }] }, 1).to({ state: [{ t: this.shape_49 }] }, 1).to({ state: [] }, 138).wait(35));
        this.timeline.addTween(cjs.Tween.get(this.text_3).wait(1).to({ x: -242.7 }, 0).wait(1).to({ x: -203.9 }, 0).wait(1).to({ x: -165.2 }, 0).wait(1).to({ x: -126.4 }, 0).wait(1).to({ x: -87.7 }, 0).wait(1).to({ x: -48.9 }, 0).wait(1).to({ x: -10.2 }, 0).wait(1).to({ x: 28.6 }, 0).to({ _off: true }, 1).wait(173));

        // answer-c-corner
        this.instance_12 = new lib.cornerc();
        this.instance_12.parent = this;
        this.instance_12.setTransform(-257.2, 266.7, 1, 1, 0, 0, 0, 5, 5);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({ x: -218.4 }, 0).wait(1).to({ x: -179.7 }, 0).wait(1).to({ x: -140.9 }, 0).wait(1).to({ x: -102.2 }, 0).wait(1).to({ x: -63.4 }, 0).wait(1).to({ x: -24.7 }, 0).wait(1).to({ x: 14 }, 0).wait(1).to({ x: 52.8 }, 0).wait(136).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-c-box
        this.instance_13 = new lib.answercbox();
        this.instance_13.parent = this;
        this.instance_13.setTransform(-277.2, 236.7, 1, 1, 0, 0, 0, 25, 25);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1).to({ x: -238.4 }, 0).wait(1).to({ x: -199.7 }, 0).wait(1).to({ x: -160.9 }, 0).wait(1).to({ x: -122.2 }, 0).wait(1).to({ x: -83.4 }, 0).wait(1).to({ x: -44.7 }, 0).wait(1).to({ x: -5.9 }, 0).wait(1).to({ x: 32.8 }, 0).wait(136).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-c-grey-to-green
        this.instance_14 = new lib.answercgreytogreen();
        this.instance_14.parent = this;
        this.instance_14.setTransform(172.8, 246.7, 1, 1, 0, 0, 0, 125, 25);
        this.instance_14.alpha = 0;
        this.instance_14._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(72).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(67).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-c-grey
        this.instance_15 = new lib.answercgrey();
        this.instance_15.parent = this;
        this.instance_15.setTransform(-137.2, 246.7, 1, 1, 0, 0, 0, 125, 25);

        this.shape_50 = new cjs.Shape();
        this.shape_50.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape_50.setTransform(172.8, 246.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_15 }] }).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.instance_15 }] }, 1).to({ state: [{ t: this.shape_50 }] }, 1).to({ state: [] }, 64).wait(109));
        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1).to({ x: -98.4 }, 0).wait(1).to({ x: -59.7 }, 0).wait(1).to({ x: -20.9 }, 0).wait(1).to({ x: 17.8 }, 0).wait(1).to({ x: 56.6 }, 0).wait(1).to({ x: 95.3 }, 0).wait(1).to({ x: 134 }, 0).wait(1).to({ x: 172.8 }, 0).to({ _off: true }, 1).wait(173));

        // answer-b-test-grey
        this.shape_51 = new cjs.Shape();
        this.shape_51.graphics.f("#CCCCCC").s().p("AASAlIAAgrQAAgIgCgDQgBgEgEgDQgEgBgEAAQgIAAgFAEQgGAGAAAOIAAAmIgNAAIAAhHIAMAAIAAAJQAIgLAOAAQAHAAAFACQAFADADAEQADADABAGIABALIAAAsg");
        this.shape_51.setTransform(154, 167.3);

        this.shape_52 = new cjs.Shape();
        this.shape_52.graphics.f("#CCCCCC").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_52.setTransform(148.6, 166);

        this.shape_53 = new cjs.Shape();
        this.shape_53.graphics.f("#CCCCCC").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_53.setTransform(145.5, 166);

        this.shape_54 = new cjs.Shape();
        this.shape_54.graphics.f("#CCCCCC").s().p("AgYAcQgJgKAAgSQAAgTAMgKQAIgIANAAQAPAAAKAKQAJAKAAARQAAANgEAIQgEAIgIAEQgJAFgJAAQgOAAgKgKgAgOgUQgGAHAAANQAAAOAGAHQAGAHAIAAQAJAAAHgHQAFgHAAgOQAAgNgFgHQgHgHgJAAQgIAAgGAHg");
        this.shape_54.setTransform(140, 167.3);

        this.shape_55 = new cjs.Shape();
        this.shape_55.graphics.f("#CCCCCC").s().p("AgTAlIAAhHIALAAIAAAKQAFgHADgDQADgCAEAAQAGAAAHADIgEAMQgFgCgEgBQgFABgCACQgDADgBADQgCAHAAAIIAAAlg");
        this.shape_55.setTransform(134.4, 167.3);

        this.shape_56 = new cjs.Shape();
        this.shape_56.graphics.f("#CCCCCC").s().p("AgaAgQgGgGgBgJQABgFACgFQADgEADgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgFADgBAIIgNgCQACgHAEgFQAEgFAHgCQAHgDAJAAQAJAAAGACQAGACACAEQADADABAFIAAALIAAAQQAAARABAFQABAEACAEIgNAAQgCgEAAgFQgHAGgGACQgGADgGAAQgMAAgHgGgAgCAEIgLADQgDABgBADQgCADgBADQABAFAEADQADADAHAAQAHAAAFgDQAFgDADgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_56.setTransform(127.6, 167.3);

        this.shape_57 = new cjs.Shape();
        this.shape_57.graphics.f("#CCCCCC").s().p("AgWAtQgLgGgFgNQgFgMAAgOQAAgPAGgMQAGgMALgGQALgGAMAAQAPAAAKAIQALAIAEAOIgNADQgEgLgHgFQgGgFgKAAQgLAAgIAFQgHAGgDAJQgEAJAAAKQAAAMAEAKQAEAJAIAFQAIAFAIAAQALAAAIgHQAHgGADgNIANADQgEARgLAIQgLAJgPAAQgPAAgKgHg");
        this.shape_57.setTransform(118.7, 165.9);

        this.shape_58 = new cjs.Shape();
        this.shape_58.graphics.f("#CCCCCC").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgGAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgFAGg");
        this.shape_58.setTransform(105.8, 167.3);

        this.shape_59 = new cjs.Shape();
        this.shape_59.graphics.f("#CCCCCC").s().p("AgVAuQgIgGAAgMIANACQAAAGADACQAFAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgHAEQgIAEgKAAQgNAAgIgGgAgNgiQgFAHgBANQABAOAFAGQAGAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgGgHgHAAQgIAAgGAHg");
        this.shape_59.setTransform(97.8, 168.7);

        this.shape_60 = new cjs.Shape();
        this.shape_60.graphics.f("#CCCCCC").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_60.setTransform(92.6, 166);

        this.shape_61 = new cjs.Shape();
        this.shape_61.graphics.f("#CCCCCC").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_61.setTransform(89.4, 166);

        this.shape_62 = new cjs.Shape();
        this.shape_62.graphics.f("#CCCCCC").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_62.setTransform(86.4, 166);

        this.shape_63 = new cjs.Shape();
        this.shape_63.graphics.f("#CCCCCC").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAJAAQAGAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_63.setTransform(80.9, 167.3);

        this.shape_64 = new cjs.Shape();
        this.shape_64.graphics.f("#CCCCCC").s().p("AAaAyIAAgvIgzAAIAAAvIgNAAIAAhjIANAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_64.setTransform(72, 166);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.shape_64 }, { t: this.shape_63 }, { t: this.shape_62 }, { t: this.shape_61 }, { t: this.shape_60 }, { t: this.shape_59 }, { t: this.shape_58 }, { t: this.shape_57 }, { t: this.shape_56 }, { t: this.shape_55 }, { t: this.shape_54 }, { t: this.shape_53 }, { t: this.shape_52 }, { t: this.shape_51 }] }, 73).to({ state: [] }, 74).wait(35));

        // answer-b-text
        this.text_4 = new cjs.Text("Heilige Carolin", "14px 'Arial'", "#333333");
        this.text_4.lineHeight = 18;
        this.text_4.parent = this;
        this.text_4.setTransform(-243.1, 158.3);

        this.shape_65 = new cjs.Shape();
        this.shape_65.graphics.f("#333333").s().p("AASAlIAAgrQAAgIgCgDQgBgEgEgDQgEgBgEAAQgIAAgFAEQgGAGAAAOIAAAmIgNAAIAAhHIAMAAIAAAJQAIgLAOAAQAHAAAFACQAFADADAEQADADABAGIABALIAAAsg");
        this.shape_65.setTransform(154, 167.3);

        this.shape_66 = new cjs.Shape();
        this.shape_66.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_66.setTransform(148.6, 166);

        this.shape_67 = new cjs.Shape();
        this.shape_67.graphics.f("#333333").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_67.setTransform(145.5, 166);

        this.shape_68 = new cjs.Shape();
        this.shape_68.graphics.f("#333333").s().p("AgYAcQgJgKAAgSQAAgTAMgKQAIgIANAAQAPAAAKAKQAJAKAAARQAAANgEAIQgEAIgIAEQgJAFgJAAQgOAAgKgKgAgOgUQgGAHAAANQAAAOAGAHQAGAHAIAAQAJAAAHgHQAFgHAAgOQAAgNgFgHQgHgHgJAAQgIAAgGAHg");
        this.shape_68.setTransform(140, 167.3);

        this.shape_69 = new cjs.Shape();
        this.shape_69.graphics.f("#333333").s().p("AgTAlIAAhHIALAAIAAAKQAFgHADgDQADgCAEAAQAGAAAHADIgEAMQgFgCgEgBQgFABgCACQgDADgBADQgCAHAAAIIAAAlg");
        this.shape_69.setTransform(134.4, 167.3);

        this.shape_70 = new cjs.Shape();
        this.shape_70.graphics.f("#333333").s().p("AgaAgQgGgGgBgJQABgFACgFQADgEADgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgFADgBAIIgNgCQACgHAEgFQAEgFAHgCQAHgDAJAAQAJAAAGACQAGACACAEQADADABAFIAAALIAAAQQAAARABAFQABAEACAEIgNAAQgCgEAAgFQgHAGgGACQgGADgGAAQgMAAgHgGgAgCAEIgLADQgDABgBADQgCADgBADQABAFAEADQADADAHAAQAHAAAFgDQAFgDADgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_70.setTransform(127.6, 167.3);

        this.shape_71 = new cjs.Shape();
        this.shape_71.graphics.f("#333333").s().p("AgWAtQgLgGgFgNQgFgMAAgOQAAgPAGgMQAGgMALgGQALgGAMAAQAPAAAKAIQALAIAEAOIgNADQgEgLgHgFQgGgFgKAAQgLAAgIAFQgHAGgDAJQgEAJAAAKQAAAMAEAKQAEAJAIAFQAIAFAIAAQALAAAIgHQAHgGADgNIANADQgEARgLAIQgLAJgPAAQgPAAgKgHg");
        this.shape_71.setTransform(118.7, 165.9);

        this.shape_72 = new cjs.Shape();
        this.shape_72.graphics.f("#333333").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgGAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgFAGg");
        this.shape_72.setTransform(105.8, 167.3);

        this.shape_73 = new cjs.Shape();
        this.shape_73.graphics.f("#333333").s().p("AgVAuQgIgGAAgMIANACQAAAGADACQAFAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgHAEQgIAEgKAAQgNAAgIgGgAgNgiQgFAHgBANQABAOAFAGQAGAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgGgHgHAAQgIAAgGAHg");
        this.shape_73.setTransform(97.8, 168.7);

        this.shape_74 = new cjs.Shape();
        this.shape_74.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_74.setTransform(92.6, 166);

        this.shape_75 = new cjs.Shape();
        this.shape_75.graphics.f("#333333").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_75.setTransform(89.4, 166);

        this.shape_76 = new cjs.Shape();
        this.shape_76.graphics.f("#333333").s().p("AgFAyIAAhHIALAAIAABHgAgFgjIAAgOIALAAIAAAOg");
        this.shape_76.setTransform(86.4, 166);

        this.shape_77 = new cjs.Shape();
        this.shape_77.graphics.f("#333333").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAJAAQAGAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_77.setTransform(80.9, 167.3);

        this.shape_78 = new cjs.Shape();
        this.shape_78.graphics.f("#333333").s().p("AAaAyIAAgvIgzAAIAAAvIgNAAIAAhjIANAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_78.setTransform(72, 166);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_4 }] }).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.text_4 }] }, 1).to({ state: [{ t: this.shape_78 }, { t: this.shape_77 }, { t: this.shape_76 }, { t: this.shape_75 }, { t: this.shape_74 }, { t: this.shape_73 }, { t: this.shape_72 }, { t: this.shape_71 }, { t: this.shape_70 }, { t: this.shape_69 }, { t: this.shape_68 }, { t: this.shape_67 }, { t: this.shape_66 }, { t: this.shape_65 }] }, 1).to({ state: [] }, 64).wait(109));
        this.timeline.addTween(cjs.Tween.get(this.text_4).wait(1).to({ x: -204.3 }, 0).wait(1).to({ x: -165.6 }, 0).wait(1).to({ x: -126.8 }, 0).wait(1).to({ x: -88.1 }, 0).wait(1).to({ x: -49.3 }, 0).wait(1).to({ x: -10.6 }, 0).wait(1).to({ x: 28.1 }, 0).wait(1).to({ x: 66.9 }, 0).to({ _off: true }, 1).wait(173));

        // answer-b-letter
        this.text_5 = new cjs.Text("B", "14px 'Arial'", "#FFFFFF");
        this.text_5.lineHeight = 18;
        this.text_5.lineWidth = 10;
        this.text_5.parent = this;
        this.text_5.setTransform(-281.4, 160.3);

        this.shape_79 = new cjs.Shape();
        this.shape_79.graphics.f("#FFFFFF").s().p("AglAyIAAhjIAlAAQALAAAHADQAHADAEAGQAEAGAAAIQAAAGgEAFQgDAGgHADQAJADAFAGQAFAGAAAJQAAAHgDAGQgDAGgFADQgEAEgHACQgGABgKAAgAgYAmIAYAAIAJAAQAFgBADgCQADgCACgDQACgEAAgFQAAgFgDgFQgDgEgFgCQgFgCgJABIgXAAgAgYgHIAWAAQAIAAAEgBQAFgCACgDQADgDAAgGQAAgFgDgEQgCgEgEgBQgFgCgKAAIgUAAg");
        this.shape_79.setTransform(33.4, 168);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_5 }] }).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.text_5 }] }, 1).to({ state: [{ t: this.shape_79 }] }, 1).to({ state: [] }, 138).wait(35));
        this.timeline.addTween(cjs.Tween.get(this.text_5).wait(1).to({ x: -242.7 }, 0).wait(1).to({ x: -203.9 }, 0).wait(1).to({ x: -165.2 }, 0).wait(1).to({ x: -126.4 }, 0).wait(1).to({ x: -87.7 }, 0).wait(1).to({ x: -48.9 }, 0).wait(1).to({ x: -10.2 }, 0).wait(1).to({ x: 28.6 }, 0).to({ _off: true }, 1).wait(173));

        // answer-b-grey-corner
        this.instance_16 = new lib.answerbgreycorner();
        this.instance_16.parent = this;
        this.instance_16.setTransform(52.8, 196.7, 1, 1, 0, 0, 0, 5, 5);
        this.instance_16.alpha = 0;
        this.instance_16._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(73).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(66).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).to({ _off: true }, 1).wait(35));

        // answer-b-corner
        this.instance_17 = new lib.cornerb();
        this.instance_17.parent = this;
        this.instance_17.setTransform(-257.2, 196.7, 1, 1, 0, 0, 0, 5, 5);

        this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1).to({ x: -218.4 }, 0).wait(1).to({ x: -179.7 }, 0).wait(1).to({ x: -140.9 }, 0).wait(1).to({ x: -102.2 }, 0).wait(1).to({ x: -63.4 }, 0).wait(1).to({ x: -24.7 }, 0).wait(1).to({ x: 14 }, 0).wait(1).to({ x: 52.8 }, 0).wait(66).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0 }, 0).wait(68).to({ _off: true }, 1).wait(35));

        // answer-b-box-grey
        this.instance_18 = new lib.answerbboxgrey();
        this.instance_18.parent = this;
        this.instance_18.setTransform(33, 166.7, 1, 1, 0, 0, 0, 25, 25);
        this.instance_18.alpha = 0;
        this.instance_18._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(73).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(66).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-b-box
        this.instance_19 = new lib.answerbbox();
        this.instance_19.parent = this;
        this.instance_19.setTransform(-277.2, 166.7, 1, 1, 0, 0, 0, 25, 25);

        this.shape_80 = new cjs.Shape();
        this.shape_80.graphics.f("#70D170").s().p("Aj5D6IAAnzIHzAAIAAHzg");
        this.shape_80.setTransform(32.8, 166.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_19 }] }).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.instance_19 }] }, 1).to({ state: [{ t: this.shape_80 }] }, 1).to({ state: [] }, 70).wait(103));
        this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1).to({ x: -238.4 }, 0).wait(1).to({ x: -199.7 }, 0).wait(1).to({ x: -160.9 }, 0).wait(1).to({ x: -122.2 }, 0).wait(1).to({ x: -83.4 }, 0).wait(1).to({ x: -44.7 }, 0).wait(1).to({ x: -5.9 }, 0).wait(1).to({ x: 32.8 }, 0).to({ _off: true }, 1).wait(173));

        // answer-b-grey
        this.instance_20 = new lib.answerbgrey();
        this.instance_20.parent = this;
        this.instance_20.setTransform(-137.2, 176.7, 1, 1, 0, 0, 0, 125, 25);

        this.shape_81 = new cjs.Shape();
        this.shape_81.graphics.f("#F1F1F1").s().p("AzhD6IAAnzMAnDAAAIAAHzg");
        this.shape_81.setTransform(172.8, 176.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_20 }] }).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.instance_20 }] }, 1).to({ state: [{ t: this.shape_81 }] }, 1).to({ state: [] }, 138).wait(35));
        this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1).to({ x: -98.4 }, 0).wait(1).to({ x: -59.7 }, 0).wait(1).to({ x: -20.9 }, 0).wait(1).to({ x: 17.8 }, 0).wait(1).to({ x: 56.6 }, 0).wait(1).to({ x: 95.3 }, 0).wait(1).to({ x: 134 }, 0).wait(1).to({ x: 172.8 }, 0).to({ _off: true }, 1).wait(173));

        // answer-a-text-grey
        this.instance_21 = new lib.answeratextgrey();
        this.instance_21.parent = this;
        this.instance_21.setTransform(117.6, 96.1, 1, 1, 0, 0, 0, 52.7, 9.8);
        this.instance_21._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(73).to({ _off: false }, 0).to({ _off: true }, 74).wait(35));

        // answer-a-text
        this.text_6 = new cjs.Text("Heilige Gereona", "14px 'Arial'", "#333333");
        this.text_6.lineHeight = 18;
        this.text_6.parent = this;
        this.text_6.setTransform(-243.1, 88.3);

        this.shape_82 = new cjs.Shape();
        this.shape_82.graphics.f("#333333").s().p("AgaAgQgGgGgBgJQABgFACgFQACgEAEgDIAJgDIALgCQAOgBAHgDIAAgDQAAgIgEgDQgEgEgJAAQgIAAgEADQgEADgCAIIgNgCQADgHADgFQAEgFAHgCQAHgDAIAAQAJAAAHACQAFACADAEQADADABAFIAAALIAAAQQAAARABAFQABAEADAEIgOAAQgCgEAAgFQgHAGgGACQgFADgIAAQgLAAgHgGgAgCAEIgLADQgDABgBADQgCADAAADQAAAFADADQAEADAHAAQAHAAAFgDQAGgDACgFQACgFAAgIIAAgEQgGADgNABg");
        this.shape_82.setTransform(164.2, 97.3);

        this.shape_83 = new cjs.Shape();
        this.shape_83.graphics.f("#333333").s().p("AARAlIAAgrQABgIgCgDQgCgEgDgDQgEgCgEAAQgIAAgFAGQgGAFAAAOIAAAmIgNAAIAAhIIAMAAIAAAKQAIgLAOAAQAGAAAGACQAFADADAEQADADABAGIABALIAAAsg");
        this.shape_83.setTransform(156.4, 97.3);

        this.shape_84 = new cjs.Shape();
        this.shape_84.graphics.f("#333333").s().p("AgXAcQgKgKAAgSQAAgTALgKQAKgIAMAAQAPAAAJAKQAKAKAAARQAAANgEAIQgEAIgIAEQgJAFgJAAQgOAAgJgKgAgOgUQgGAHAAANQAAAOAGAHQAGAHAIAAQAKAAAFgHQAHgHAAgOQAAgNgHgHQgFgHgKAAQgIAAgGAHg");
        this.shape_84.setTransform(148.6, 97.3);

        this.shape_85 = new cjs.Shape();
        this.shape_85.graphics.f("#333333").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAOAAQAPAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAIAAQAHAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgGAFAAAKIAnAAQgBgJgDgFQgGgHgKAAQgHAAgGAGg");
        this.shape_85.setTransform(140.8, 97.3);

        this.shape_86 = new cjs.Shape();
        this.shape_86.graphics.f("#333333").s().p("AgTAlIAAhIIALAAIAAALQAFgHADgDQADgCAEAAQAGAAAHADIgEAMQgFgDgEAAQgFAAgCADQgDACgBAEQgCAHAAAIIAAAlg");
        this.shape_86.setTransform(135.2, 97.3);

        this.shape_87 = new cjs.Shape();
        this.shape_87.graphics.f("#333333").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAKgKAOAAQAOAAAJAKQAJAKAAARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgNgVQgFAFgBAKIAoAAQgCgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_87.setTransform(128.4, 97.3);

        this.shape_88 = new cjs.Shape();
        this.shape_88.graphics.f("#333333").s().p("AgVAuQgMgHgGgMQgGgMAAgOQAAgOAGgNQAGgMALgHQAMgGAOAAQALAAAJAEQAIADAFAHQAFAGADAKIgMADQgCgHgEgFQgDgEgGgDQgGgCgIAAQgIAAgHACQgGADgEAFQgFAEgCAGQgEAJAAAKQAAANAFAJQAFAJAIAFQAJAEAJAAQAJAAAIgDQAIgEAEgDIAAgTIgdAAIAAgLIAqAAIAAAkQgJAIgLAEQgKAEgLAAQgOAAgMgGg");
        this.shape_88.setTransform(119, 95.9);

        this.shape_89 = new cjs.Shape();
        this.shape_89.graphics.f("#333333").s().p("AgXAcQgJgKAAgRQAAgSAJgKQAJgKAPAAQAOAAAJAKQAKAKgBARIAAADIg1AAQABAMAGAGQAGAHAJAAQAGAAAFgEQAFgDADgIIAMABQgDAMgIAGQgIAGgNAAQgOAAgKgKgAgMgVQgGAFgBAKIAoAAQgBgJgEgFQgGgHgJAAQgIAAgFAGg");
        this.shape_89.setTransform(105.8, 97.3);

        this.shape_90 = new cjs.Shape();
        this.shape_90.graphics.f("#333333").s().p("AgVAuQgIgGAAgMIANACQAAAGADACQAFAEAIAAQAIAAAFgEQAEgDACgGIABgQQgJAJgLAAQgPAAgIgLQgIgKAAgOQAAgLAEgJQADgIAIgFQAHgFAJAAQAMAAAJAKIAAgIIALAAIAAA9QAAARgDAHQgEAIgHAEQgIAEgKAAQgNAAgIgGgAgNgiQgFAHgBANQABAOAFAGQAGAGAIAAQAIAAAGgGQAFgGABgOQAAgNgHgHQgGgHgHAAQgIAAgGAHg");
        this.shape_90.setTransform(97.8, 98.7);

        this.shape_91 = new cjs.Shape();
        this.shape_91.graphics.f("#333333").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
        this.shape_91.setTransform(92.6, 96);

        this.shape_92 = new cjs.Shape();
        this.shape_92.graphics.f("#333333").s().p("AgFAyIAAhjIALAAIAABjg");
        this.shape_92.setTransform(89.4, 96);

        this.shape_93 = new cjs.Shape();
        this.shape_93.graphics.f("#333333").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
        this.shape_93.setTransform(86.4, 96);

        this.shape_94 = new cjs.Shape();
        this.shape_94.graphics.f("#333333").s().p("AgXAcQgKgKAAgRQAAgSAKgKQAJgKAPAAQAOAAAKAKQAIAKABARIAAADIg1AAQAAAMAGAGQAGAHAJAAQAGAAAFgEQAEgDADgIIANABQgDAMgIAGQgIAGgNAAQgPAAgJgKgAgNgVQgFAFgBAKIAnAAQgBgJgDgFQgGgHgJAAQgIAAgGAGg");
        this.shape_94.setTransform(80.9, 97.3);

        this.shape_95 = new cjs.Shape();
        this.shape_95.graphics.f("#333333").s().p("AAaAyIAAgvIgzAAIAAAvIgNAAIAAhjIANAAIAAApIAzAAIAAgpIANAAIAABjg");
        this.shape_95.setTransform(72, 96);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_6 }] }).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.text_6 }] }, 1).to({ state: [{ t: this.shape_95 }, { t: this.shape_94 }, { t: this.shape_93 }, { t: this.shape_92 }, { t: this.shape_91 }, { t: this.shape_90 }, { t: this.shape_89 }, { t: this.shape_88 }, { t: this.shape_87 }, { t: this.shape_86 }, { t: this.shape_85 }, { t: this.shape_84 }, { t: this.shape_83 }, { t: this.shape_82 }] }, 1).to({ state: [] }, 64).wait(109));
        this.timeline.addTween(cjs.Tween.get(this.text_6).wait(1).to({ x: -204.3 }, 0).wait(1).to({ x: -165.6 }, 0).wait(1).to({ x: -126.8 }, 0).wait(1).to({ x: -88.1 }, 0).wait(1).to({ x: -49.3 }, 0).wait(1).to({ x: -10.6 }, 0).wait(1).to({ x: 28.1 }, 0).wait(1).to({ x: 66.9 }, 0).to({ _off: true }, 1).wait(173));

        // answer-a-letter
        this.text_7 = new cjs.Text("A", "14px 'Arial'", "#FFFFFF");
        this.text_7.lineHeight = 18;
        this.text_7.parent = this;
        this.text_7.setTransform(-281.4, 90.3);

        this.shape_96 = new cjs.Shape();
        this.shape_96.graphics.f("#FFFFFF").s().p("AAgAyIgMgeIgpAAIgLAeIgOAAIAnhjIANAAIApBjgAgGgTIgLAcIAhAAIgLgbIgGgVIgFAUg");
        this.shape_96.setTransform(33.2, 98);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_7 }] }).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.text_7 }] }, 1).to({ state: [{ t: this.shape_96 }] }, 1).to({ state: [] }, 138).wait(35));
        this.timeline.addTween(cjs.Tween.get(this.text_7).wait(1).to({ x: -242.7 }, 0).wait(1).to({ x: -203.9 }, 0).wait(1).to({ x: -165.2 }, 0).wait(1).to({ x: -126.4 }, 0).wait(1).to({ x: -87.7 }, 0).wait(1).to({ x: -48.9 }, 0).wait(1).to({ x: -10.2 }, 0).wait(1).to({ x: 28.6 }, 0).to({ _off: true }, 1).wait(173));

        // answer-a-grey-corner
        this.instance_22 = new lib.answeragreycorner();
        this.instance_22.parent = this;
        this.instance_22.setTransform(52.8, 127.7, 1, 1, 0, 0, 0, 5, 5);
        this.instance_22.alpha = 0;
        this.instance_22._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(73).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(66).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-a-corner
        this.instance_23 = new lib.cornera();
        this.instance_23.parent = this;
        this.instance_23.setTransform(-257.2, 127.7, 1, 1, 0, 0, 0, 5, 5);

        this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1).to({ x: -218.4 }, 0).wait(1).to({ x: -179.7 }, 0).wait(1).to({ x: -140.9 }, 0).wait(1).to({ x: -102.2 }, 0).wait(1).to({ x: -63.4 }, 0).wait(1).to({ x: -24.7 }, 0).wait(1).to({ x: 14 }, 0).wait(1).to({ x: 52.8 }, 0).wait(66).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0 }, 0).to({ _off: true }, 1).wait(103));

        // answer-a-box-grey
        this.instance_24 = new lib.answeragreybox();
        this.instance_24.parent = this;
        this.instance_24.setTransform(32.8, 97.7, 1, 1, 0, 0, 0, 25, 25);
        this.instance_24.alpha = 0;
        this.instance_24._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(73).to({ _off: false }, 0).wait(1).to({ alpha: 0.2 }, 0).wait(1).to({ alpha: 0.4 }, 0).wait(1).to({ alpha: 0.6 }, 0).wait(1).to({ alpha: 0.8 }, 0).wait(1).to({ alpha: 1 }, 0).wait(66).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // answer-a-box
        this.instance_25 = new lib.answerabox();
        this.instance_25.parent = this;
        this.instance_25.setTransform(-277.2, 97.7, 1, 1, 0, 0, 0, 25, 25);

        this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1).to({ x: -238.4 }, 0).wait(1).to({ x: -199.7 }, 0).wait(1).to({ x: -160.9 }, 0).wait(1).to({ x: -122.2 }, 0).wait(1).to({ x: -83.4 }, 0).wait(1).to({ x: -44.7 }, 0).wait(1).to({ x: -5.9 }, 0).wait(1).to({ x: 32.8 }, 0).wait(70).to({ _off: true }, 1).wait(103));

        // answer-a-grey
        this.instance_26 = new lib.answeragrey();
        this.instance_26.parent = this;
        this.instance_26.setTransform(-137.2, 107.7, 1, 1, 0, 0, 0, 125, 25);

        this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1).to({ x: -98.4 }, 0).wait(1).to({ x: -59.7 }, 0).wait(1).to({ x: -20.9 }, 0).wait(1).to({ x: 17.8 }, 0).wait(1).to({ x: 56.6 }, 0).wait(1).to({ x: 95.3 }, 0).wait(1).to({ x: 134 }, 0).wait(1).to({ x: 172.8 }, 0).wait(138).to({ _off: true }, 1).wait(35));

        // questionmark
        this.text_8 = new cjs.Text("?", "bold 16px 'Arial Narrow'", "#FFFFFF");
        this.text_8.lineHeight = 20;
        this.text_8.lineWidth = 8;
        this.text_8.parent = this;
        this.text_8.setTransform(-280.8, 28);

        this.timeline.addTween(cjs.Tween.get(this.text_8).wait(1).to({ x: -242 }, 0).wait(1).to({ x: -203.3 }, 0).wait(1).to({ x: -164.5 }, 0).wait(1).to({ x: -125.8 }, 0).wait(1).to({ x: -87 }, 0).wait(1).to({ x: -48.3 }, 0).wait(1).to({ x: -9.6 }, 0).wait(1).to({ x: 29.2 }, 0).wait(138).to({ _off: true }, 1).wait(35));

        // question
        this.text_9 = new cjs.Text("Welche Märtyrerin wird als Stadtpatronin\nKölns bezeichnet?", "14px 'Arial'", "#333333");
        this.text_9.lineHeight = 18;
        this.text_9.parent = this;
        this.text_9.setTransform(-246.2, 14.1);

        this.timeline.addTween(cjs.Tween.get(this.text_9).wait(1).to({ x: -207.4 }, 0).wait(1).to({ x: -168.7 }, 0).wait(1).to({ x: -129.9 }, 0).wait(1).to({ x: -91.2 }, 0).wait(1).to({ x: -52.4 }, 0).wait(1).to({ x: -13.7 }, 0).wait(1).to({ x: 25 }, 0).wait(1).to({ x: 63.8 }, 0).wait(138).to({ _off: true }, 1).wait(35));

        // question-box
        this.instance_27 = new lib.questionbox();
        this.instance_27.parent = this;
        this.instance_27.setTransform(-277, 37.1, 1, 1, 0, 0, 0, 25, 25);

        this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1).to({ x: -238.2 }, 0).wait(1).to({ x: -199.5 }, 0).wait(1).to({ x: -160.7 }, 0).wait(1).to({ x: -122 }, 0).wait(1).to({ x: -83.2 }, 0).wait(1).to({ x: -44.5 }, 0).wait(1).to({ x: -5.7 }, 0).wait(1).to({ x: 33 }, 0).wait(136).to({ alpha: 0.667 }, 0).wait(1).to({ alpha: 0.333 }, 0).wait(1).to({ alpha: 0 }, 0).wait(4).to({ _off: true }, 1).wait(31));

        // background
        this.instance_28 = new lib.Bitmap4();
        this.instance_28.parent = this;
        this.instance_28.setTransform(-454, 18);

        this.timeline.addTween(cjs.Tween.get(this.instance_28).to({ _off: true }, 142).wait(40));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-294, 199.6, 772, 400);
    // library properties:
    lib.properties = {
        id: 'C81F7A39B94C8A49A9FAF3AC7D8F759D',
        width: 320,
        height: 375,
        fps: 24,
        color: "#FFFFFF",
        opacity: 1.00,
        manifest: [
            { src: src_bitmap4, id: "Bitmap4" },
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
    an.compositions['C81F7A39B94C8A49A9FAF3AC7D8F759D'] = {
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

function initAni() {
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    var comp = AdobeAn.getComposition("C81F7A39B94C8A49A9FAF3AC7D8F759D");
    var lib = comp.getLibrary();
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
    exportRoot = new lib.quizintroduction2();
    stage = new lib.Stage(canvas);
    stage.enableMouseOver();
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