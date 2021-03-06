
jheatmap.components.VerticalScrollBar = function(drawer, heatmap) {

    this.heatmap = heatmap;

    // Create markup
    this.markup = $("<td class='borderL'>");
    this.canvas = $("<canvas class='header' width='10' height='" + heatmap.size.height + "'></canvas>");
    this.markup.append(this.canvas);
    this.canvas.bind('contextmenu', function(e){
        return false;
    });

    // Events
    var vScrollMouseDown = false;
    var vScrollDownOffset = 0;
    var scrollTarget = this.canvas;

    var onScrollClick = function (e) {
        var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
        var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
        var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));

        var pY = e.pageY - $(e.target).offset().top - ((endY - iniY) / 2);
        pY = (pY < 0 ? 0 : pY);
        heatmap.offset.top = Math.round((pY / maxHeight) * heatmap.rows.order.length);
        drawer.paint();
    };

    var onScrollMouseDown = function (e) {
        e.preventDefault();

        vScrollMouseDown = true;

        var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
		var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
		var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));

        vScrollDownOffset = ((endY - iniY) / 2) - (e.pageY - scrollTarget.offset().top);

    }

    var onScrollMouseUp = function (e) {

        if (vScrollMouseDown) {
	        e.preventDefault();

	        if (e.originalEvent.touches && e.originalEvent.touches.length > 1) {
	            return;
	        }

	        drawer.paint();
	        vScrollMouseDown = false;
        }
    }


    var onScrollMouseMove = function (e) {

        if (vScrollMouseDown) {
            var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
            var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
            var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));

            var pY = e.pageY + vScrollDownOffset - scrollTarget.offset().top - ((endY - iniY) / 2);
            pY = (pY < 0 ? 0 : pY);
            heatmap.offset.top = Math.round((pY / maxHeight) * heatmap.rows.order.length);
            drawer.paint();
        }

    }

    // Bind events
    this.canvas.bind('click', function (e) {
        onScrollClick(e);
    });
    this.canvas.bind('mousedown', function (e) {
        onScrollMouseDown(e);
    });
    $(document).bind('mouseup', function (e) {
            onScrollMouseUp(e);
    });
    $(document).bind('mousemove', function (e) {
        onScrollMouseMove(e);
    });

};

jheatmap.components.VerticalScrollBar.prototype.paint = function() {
    var heatmap = this.heatmap;
    var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
    var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
    var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));
    var scrollVertCtx = this.canvas.get()[0].getContext('2d');
    scrollVertCtx.clearRect(0, 0, scrollVertCtx.canvas.width, scrollVertCtx.canvas.height)
    scrollVertCtx.fillStyle = "rgba(0,136,204,1)";
    scrollVertCtx.fillRect(0, iniY, 10, endY - iniY);
};