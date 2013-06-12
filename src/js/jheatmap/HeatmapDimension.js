/**
 *
 * Heatmap dimension
 *
 * @class
 */
jheatmap.HeatmapDimension = function () {

    /**
     * Height in pixels of one cell (default 20)
     * @type {number}
     */
    this.zoom = 20;

    /**
     * Header of the items values
     * @type {Array}
     */
    this.header = [];

    /**
     * Array with all the items values and annotations (one array per line)
     * @type {Array}
     */
    this.values = [];

    /**
     * Array of index of the visible values sorted as current order
     * @type {Array}
     */
    this.order = [];

    /**
     * Index of the current visible row label (zero it's the first)
     * @type {number}
     */
    this.selectedValue = 0;

    /**
     * type: Type of sort ('none', 'label', 'single' or 'value')
     * field: Index of the field that we are sorting
     * asc: true if ascending order, false if descending
     *
     * @type {{type: string, field: number, asc: boolean}}
     */
    this.sort = {
        type: "none",
        field: 0,
        asc: false
    };

    /**
     * Active user filters on items
     * @type {Array}
     */
    this.filters = [];

    /**
     * Decorators for the items fields
     * @type {Array}
     */
    this.decorators = [];

    /**
     * Array with the index of the items fields to show as annotations
     * @type {Array}
     */
    this.annotations = [];

    /**
     *
     * Index of the selected items
     *
     * @type {Array}
     */
    this.selected = [];

};

jheatmap.HeatmapDimension.prototype.init = function () {

    // Initialize order array
    this.order = [];
    var i;
    for (i = 0; i < this.values.length; i++) {
        this.order[this.order.length] = i;
    }

    // Initialize default decorator
    var defaultDecorator = new jheatmap.decorators.Constant({});
    for (c = 0; c < this.header.length; c++) {
        this.decorators[c] = defaultDecorator;
    }

};

jheatmap.HeatmapDimension.prototype.reindex = function (heatmap) {

    jheatmap.utils.reindexArray(this.decorators, this.header);
    jheatmap.utils.reindexArray(this.aggregators, this.header);
    jheatmap.utils.convertToIndexArray(this.annotations, this.header);

    var key;
    for(key in this.filters) {
        jheatmap.utils.convertToIndexArray(this.filters[key].fields, heatmap.cells.header);
    }

    this.sort.field = jheatmap.utils.reindexField(this.sort.field, heatmap.cells.header);

};