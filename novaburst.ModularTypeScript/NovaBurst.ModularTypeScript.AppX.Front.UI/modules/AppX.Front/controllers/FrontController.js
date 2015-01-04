var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Front;
            (function (Front) {
                var FrontController = (function () {
                    function FrontController($scope, $location) {
                        this.$scope = $scope;
                        this.$location = $location;
                        this.greetings = 'Index.html and FrontController';
                        $scope['front'] = this;
                    }
                    return FrontController;
                })();
                Front.FrontController = FrontController;
                // register angular controller
                angular.module(Front.angularModuleName).controller('FrontController', ['$scope', '$location', FrontController]);
            })(Front = AppX.Front || (AppX.Front = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=FrontController.js.map