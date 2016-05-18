/**
 *
 *
 **/
(function () {
    "use strict";
    module.exports = {
        logRecord: function (req, res) {
            var parameter = req.query;
            console.info(parameter);
            res.ok();
        }
    };
})();
