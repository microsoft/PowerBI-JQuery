(function (global, $) {
    if (!$) {
        throw new Error("Cannot create PowerBi jQuery plugin. jQuery was not loaded.");
    }
    if (!global.powerbi) {
        throw new Error("Cannont create PowerBi jQuery plugin. powerbi was not loaded.");
    }
    var plugin = function (options) {
        var element = this.get(0);
        global.powerbi.embed(element, options);
        return this;
    };
    // TODO: Calling $().powerbi.embed() is more semantic than $().powerbi() however;
    // jQuery is not properly setting the context of the function to the jquery object.\
    // Instead it is the default parent object/function which makes it unusable
    // since we can't access the jQuery object from it.
    //(<any>plugin).embed = plugin;
    $.fn.powerbi = plugin;
})(this, this.jQuery);
