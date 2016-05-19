/**
 *
 *
 **/
(function () {
    "use strict";
    module.exports = {
        logRecord: function (req, res) {
            var parameter = req.query.info;
            console.info(parameter);
            res.ok();
        }
    };
})();
