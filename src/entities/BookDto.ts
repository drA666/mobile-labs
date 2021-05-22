export default class BookDto {
    constructor(
        public title: string,
        public subtitle: string,
        public isbn13: string,
        public price: string,
        public image: string,
    ) {}
}
