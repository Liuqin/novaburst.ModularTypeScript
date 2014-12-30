module NovaBurst.ModularTypeScript.AppX.Sales {

    export class CustomerController extends SalesControllerBase {

        public currentCustomer: Customer;

        /*
         * Ctor.
         * Inject CustomerService to handle customer related operations.
         */
        constructor(
            public $scope: ng.IScope,
            public $location: ng.ILocationService,
            public CustomerService: ICustomerService) {

            super($scope, $location);

            var ctx = this;            

            // initialize
            var initPromise = ctx.init();
        }

        // initialize
        private init(): ng.IPromise<any> {
            var ctx = this;

            // get current customer
            var customerPromise = ctx.CustomerService.getById("123");

            customerPromise.then(function (customer) {
                ctx.currentCustomer = customer;
            });

            return customerPromise;
        }
    }


    // register angular controller
    angular.module(angularModuleName).controller('CustomerController', ['$scope', '$location', 'CustomerService', CustomerController]);
} 