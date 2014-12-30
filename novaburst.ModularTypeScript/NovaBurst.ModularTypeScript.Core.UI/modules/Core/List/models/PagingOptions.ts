module NovaBurst.ModularTypeScript.Core {

    export class PagingOptions {

        public take: number;
        public skip: number;

        constructor() {
        }

        public getPageSize(): number {
            return this.take;
        }

        public getPageIndex(): number {
            if (!this.take || this.skip == null || typeof(this.skip) == 'undefined')
                return 1;

            return Math.floor(this.skip / this.take) + 1;
        }

        public setSkip(skip: number): PagingOptions {
            this.skip = skip;
            return this;
        }

        public setTake(take: number): PagingOptions {
            this.take = take;
            return this;
        }

        public setPage(pageIndex: number, pageSize: number): PagingOptions {
            this.take = pageSize;
            this.skip = (pageIndex - 1) * pageSize;
            return this;
        }
    }
}