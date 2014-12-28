module NovaBurst.ModularTypeScript.Core {

    export class PagingOptions {

        public take: number;
        public skip: number;

        public getPageSize(): number {
            return this.take;
        }

        public getPageIndex(): number {
            if (!this.take)
                return 1;

            return Math.floor(this.skip / this.take) + 1;
        }
    }
}