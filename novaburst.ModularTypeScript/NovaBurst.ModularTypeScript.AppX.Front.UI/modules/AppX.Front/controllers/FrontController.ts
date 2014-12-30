module NovaBurst.ModularTypeScript.AppX.Front {

    export class FrontController {

        public greetings: string = 'Index.html and FrontController';

        constructor(
            private $scope: ng.IScope,
            private $location: ng.ILocationService) {

            $scope['front'] = this;
        }


        // go to customer account
        public goToAccount(): void {
            this.$location.url('/account');
        }
    }


    // register angular controller
    angular.module(angularModuleName).controller('FrontController', FrontController);
}  