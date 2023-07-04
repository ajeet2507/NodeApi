let books = [];

const addBook = async(req,res)=>{
    // console.log(req.body)
    try {
        books.push(req.body); 
        res.status(200).json({
            success : true,
            title: req.body.title,
            masg : 'Book Added successfully...'
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            masg : 'failed'
        })
    }
    
}

const getAllBook = async(req,res)=>{
    res.json({
        data: books
    })
}

const getBookByISBN = async(req,res)=>{
    let isbn = req.params.isbn;
    console.log(isbn)
    for (let book of books) {
        if (book.isbn === isbn) {
           res.json({
            data : book
           })
        }
    }
}

const deleteBookByISBN = async (req,res)=>{
    let isbn = req.params.isbn;
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            res.json({
                success: false,
                msg: 'Book is not found'
            })
        }
        res.json({
            success: true,
            msg: 'Book deleted successfully'
        })
    });
}



module.exports = {
    addBook,
    getAllBook,
    getBookByISBN,
    deleteBookByISBN
}