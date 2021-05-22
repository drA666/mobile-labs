export default class AboutBookDto {
    constructor(
        public authors: string = '',
        public desc: string = '',
        public image: string = '',
        public isbn13: string = '',
        public language: string = '',
        public pages: string = '',
        public price: string = '',
        public publisher: string = '',
        public rating: string = '',
        public subtitle: string = '',
        public title: string = '',
        public year: string = '',
    ) {}
}
