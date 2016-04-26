import * as pbi from 'powerbi-client';

((window: Window, $: JQueryStatic) => {
    if (!$) {
        throw new Error(`Cannot create PowerBi jQuery plugin. jQuery was not loaded.`);
    }
    
    if (!window.powerbi) {
        throw new Error(`Cannont create PowerBi jQuery plugin. powerbi was not loaded.`);
    }
    
    const plugin = function (options: pbi.IEmbedOptions) {
        const $element: JQuery = this;
        const element = $element.get(0);
        window.powerbi.embed(<pbi.IPowerBiElement>element, options);
        return this;
    };
    
    // TODO: Calling $().powerbi.embed() is more semantic than $().powerbi() however;
    // jQuery is not properly setting the context of the function to the jquery object.\
    // Instead it is the default parent object/function which makes it unusable
    // since we can't access the jQuery object from it.
    //(<any>plugin).embed = plugin;
    $.fn.powerbi = plugin;
})(this, this.jQuery);