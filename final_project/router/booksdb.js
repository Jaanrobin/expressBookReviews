function getBooks(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);
        },1000);
        
    })
}

function getISBN(isbn){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books[isbn]);
        },1000);
    })
}

function getAuthor(reqAuthor){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const targetAuthor = reqAuthor;
            let foundBook = null;
        
            // Convert books object to an array and iterate over it
            const bookArray = Object.values(books);
        
            for (let i = 0; i < bookArray.length; i++) {
                if (bookArray[i].author === targetAuthor) {
                    foundBook = bookArray[i];
                    break;
                }
            }
        
            if (foundBook) {
                resolve(foundBook);
            } else {
                resolve({ message: 'Book not found' });
            } 
        },1000)
    })
}

function getTitle(reqTitle){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const targetTitle = reqTitle;
            let foundBook = null;

            const bookArray = Object.values(books);

            for (let i = 0; i < bookArray.length; i++) {
                if (bookArray[i].title === targetTitle) {
                    foundBook = bookArray[i];
                    break;
                }
            }

            if (foundBook) {
                resolve(foundBook);
            } else {
                resolve({ message: 'Book not found' });
            }

                },1000);
            })
}

let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

module.exports=books;
module.exports=getBooks;
module.exports=getISBN;
module.exports=getAuthor;
module.exports=getTitle;