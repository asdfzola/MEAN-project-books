export class Book{
    constructor(n,a,t,i,r,id,g,p,l,pub){
        this.name=n;
        this.author=a;
        this.timestaken=t;
        this.img=i;
        this.rating=r;
        this.idB=id;
        this.genre=g;
        this.publisher=p;
        this.language=l;
        this.publication=pub;
        
    }
    name: string;
    author: string;
    timestaken: number;
    img: string;
    rating: number;
    idB: number;
    genre: Array<string>;
    publisher: string;
    language: string;
    publication: string;
    number: number;
    datumzaduzivanja: Date;
    datumvracanja: Date;
    

}