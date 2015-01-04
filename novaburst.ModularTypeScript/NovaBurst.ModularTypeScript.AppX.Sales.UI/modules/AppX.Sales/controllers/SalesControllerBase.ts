module NovaBurst.ModularTypeScript.AppX.Sales {

    // base controller for all sales controllers
    export class SalesControllerBase {

        constructor(
            protected $scope: ng.IScope,
            protected $location: ng.ILocationService) {

            $scope['sales'] = this;
        }

        // go to customer account
        public goToCustomer(): void {
            this.$location.url('/account');
        }

        public goToProducts(): void {
            this.$location.url('/');
        }
    }
}