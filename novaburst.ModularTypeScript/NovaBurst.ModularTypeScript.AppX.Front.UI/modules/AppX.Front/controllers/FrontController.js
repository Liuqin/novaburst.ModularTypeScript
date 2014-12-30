var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Front) {
                var FrontController = (function () {
                    function FrontController($scope, $location) {
                        this.$scope = $scope;
                        this.$location = $location;
                        this.greetings = 'Index.html and FrontController';
                        $scope['front'] = this;
                    }
                    // go to customer account
                    FrontController.prototype.goToAccount = function () {
                        this.$location.url('/account');
                    };
                    return FrontController;
                })();
                Front.FrontController = FrontController;

                // register angular controller
                angular.module(Front.angularModuleName).controller('FrontController', FrontController);
            })(AppX.Front || (AppX.Front = {}));
            var Front = AppX.Front;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=FrontController.js.map
