/*
jQuery Timer Plugin
(http://me.itslimetime.com)

jQuery.timer(interval, callback [, options]);
timer.stop();
timer.reset();
*/

(function (jQuery) {
    jQuery.timer = function (interval, callback, options) {
        // Create options for the default reset value
        var options = jQuery.extend({ reset: 500 }, options);
        var interval = interval || options.reset;

        

        if (!callback) { return false; }

        timer = function (interval, callback) {
            // Only used by internal code to call the callback
            this.internalCallback = function () { callback(self); };

            // Clears any timers
            this.stop = function () { clearInterval(self.id); };
            
            // Resets timers to a new time
            this.reset = function (time) {
                if (self.id) { clearInterval(self.id); }
                var time = time || options.reset;

                this.id = setInterval(this.internalCallback, time);
            };

            // Set the interval time again
            this.interval = interval;
            this.id = setInterval(this.internalCallback, this.interval);

            var self = this;
        };

        // Create a new timer object
        return new timer(interval, callback);
    };
})(jQuery);

jQuery.fn.formatTime = function () {
    return this.each(function () {
        var t = parseInt(jQuery(this).val(), 10);
        if (t > -1) {
            jQuery(this).data('original', t);
            var h = Math.floor(t / 3600);
            t %= 3600;
            var m = Math.floor(t / 60);
            var s = Math.floor(t % 60);
            jQuery(this).val((h > 0 ? (h < 10 ? "" + h + ':' : h + ":") : '0:') +
                     (m > 0 ? (m < 10 ? "0" + m + ':' : m + ":") : '00:') +
                     (s < 10 ? "0" + s : s));
        }
    });
};

jQuery.fn.formatTimehtml = function () {
    return this.each(function () {

        var t = parseInt(jQuery(this).html(), 10);
        if (t > -1) {
            jQuery(this).data('original', t);
            var h = Math.floor(t / 3600);
            t %= 3600;
            var m = Math.floor(t / 60);
            var s = Math.floor(t % 60);
            jQuery(this).html((h > 0 ? (h < 10 ? "" + h + ':' : h + ":") : '0:') +
                     (m > 0 ? (m < 10 ? "0" + m + ':' : m + ":") : '00:') +
                     (s < 10 ? "0" + s : s));
        }
    });
};