// Mock Backend API
class LibraryAPI {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('library_books')) || [];
        this.history = JSON.parse(localStorage.getItem('library_history')) || [];
        this.nextBookId = parseInt(localStorage.getItem('library_next_id')) || 1;
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('library_books', JSON.stringify(this.books));
        localStorage.setItem('library_history', JSON.stringify(this.history));
        localStorage.setItem('library_next_id', this.nextBookId.toString());
    }

    // Book methods
    async getBooks() {
        return this.books;
    }

    async addBook(bookData) {
        const book = {
            id: this.nextBookId++,
            ...bookData,
            status: 'Available',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.books.push(book);
        this.saveData();
        return book;
    }

    async updateBook(id, bookData) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = {
                ...this.books[index],
                ...bookData,
                updatedAt: new Date().toISOString()
            };
            this.saveData();
            return this.books[index];
        }
        throw new Error('Book not found');
    }

    async deleteBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.saveData();
            return true;
        }
        throw new Error('Book not found');
    }

    // History methods
    async getHistory() {
        return this.history;
    }

    async addHistory(historyData) {
        const history = {
            id: Date.now(),
            ...historyData,
            date: new Date().toISOString()
        };
        this.history.unshift(history);
        // Keep only last 50 history entries
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        this.saveData();
        return history;
    }
}

// Initialize API
const api = new LibraryAPI();

// DOM Elements
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const bookIdInput = document.getElementById('book-id');
const borrowForm = document.getElementById('borrow-form');
const borrowBookIdInput = document.getElementById('borrow-book-id');
const borrowerNameInput = document.getElementById('borrower-name');
const historyList = document.getElementById('history-list');
const emptyBooks = document.getElementById('empty-books');
const emptyHistory = document.getElementById('empty-history');

// Stats elements
const totalBooksEl = document.getElementById('total-books');
const availableBooksEl = document.getElementById('available-books');
const borrowedBooksEl = document.getElementById('borrowed-books');
const recentActivityEl = document.getElementById('recent-activity');

let booksData = [];
let historyData = [];

// Initialize the application
async function init() {
    await loadBooks();
    await loadHistory();
    updateStats();
}

// Load Books
async function loadBooks() {
    try {
        booksData = await api.getBooks();
        displayBooks(booksData);
    } catch (error) {
        console.error("Error loading books:", error);
        showToast('Error loading books', 'danger');
    }
}

// Load History
async function loadHistory() {
    try {
        historyData = await api.getHistory();
        displayHistory(historyData);
    } catch (error) {
        console.error("Error loading history:", error);
        showToast('Error loading history', 'danger');
    }
}

// Add or Edit Book
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const bookId = bookIdInput.value;

    // Validation
    if (!title || !author || !isbn) {
        showToast('Please fill in all required fields', 'warning');
        return;
    }

    try {
        if (bookId) {
            // Edit book
            await api.updateBook(parseInt(bookId), { title, author, isbn });
            showToast('Book updated successfully!', 'success');
        } else {
            // Add new book
            await api.addBook({ title, author, isbn });
            showToast('Book added successfully!', 'success');
        }

        // Reset form and reload data
        bookForm.reset();
        bookIdInput.value = '';
        await loadBooks();
        updateStats();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
        modal.hide();
    } catch (error) {
        console.error("Error saving book:", error);
        showToast('Error saving book. Please try again.', 'danger');
    }
});

// Display Books
function displayBooks(books) {
    bookList.innerHTML = '';
    
    if (books.length === 0) {
        emptyBooks.style.display = 'block';
        return;
    } else {
        emptyBooks.style.display = 'none';
    }
    
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <span class="status-badge ${book.status === 'Available' ? 'status-available' : 'status-borrowed'}">
                    ${book.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn ${book.status === 'Available' ? 'btn-success' : 'btn-warning'} btn-sm" 
                            onclick="${book.status === 'Available' ? `showBorrowModal(${book.id})` : `returnBook(${book.id})`}">
                        <i class="bi ${book.status === 'Available' ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle'}"></i>
                        ${book.status === 'Available' ? 'Borrow' : 'Return'}
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="editBook(${book.id})">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        bookList.appendChild(row);
    });
}

// Display History
function displayHistory(history) {
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        emptyHistory.style.display = 'block';
        return;
    } else {
        emptyHistory.style.display = 'none';
    }
    
    history.forEach(record => {
        const row = document.createElement('tr');
        const date = new Date(record.date).toLocaleString();
        row.innerHTML = `
            <td>${record.bookTitle}</td>
            <td>${record.borrowerName || 'N/A'}</td>
            <td>
                <span class="status-badge ${record.action === 'Borrowed' ? 'status-borrowed' : 'status-available'}">
                    ${record.action}
                </span>
            </td>
            <td>${date}</td>
        `;
        historyList.appendChild(row);
    });
}

// Update Stats
function updateStats() {
    const totalBooks = booksData.length;
    const availableBooks = booksData.filter(book => book.status === 'Available').length;
    const borrowedBooks = totalBooks - availableBooks;
    
    totalBooksEl.textContent = totalBooks;
    availableBooksEl.textContent = availableBooks;
    borrowedBooksEl.textContent = borrowedBooks;
    recentActivityEl.textContent = historyData.length;
}

// Delete Book
async function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            await api.deleteBook(id);
            showToast('Book deleted successfully!', 'success');
            await loadBooks();
            updateStats();
        } catch (error) {
            console.error("Error deleting book:", error);
            showToast('Error deleting book. Please try again.', 'danger');
        }
    }
}

// Edit Book
function editBook(id) {
    const book = booksData.find(b => b.id === id);
    if (book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        bookIdInput.value = book.id;
        formTitle.textContent = 'Edit Book';
        submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Update Book';
        
        const modal = new bootstrap.Modal(document.getElementById('bookModal'));
        modal.show();
    }
}

// Show Borrow Modal
function showBorrowModal(id) {
    borrowBookIdInput.value = id;
    borrowerNameInput.value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('borrowModal'));
    modal.show();
}

// Borrow Book
borrowForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookId = parseInt(borrowBookIdInput.value);
    const borrowerName = borrowerNameInput.value.trim();

    if (!borrowerName) {
        showToast('Please enter borrower name', 'warning');
        return;
    }

    try {
        const book = booksData.find(b => b.id === bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        // Update book status
        await api.updateBook(bookId, {
            status: 'Borrowed',
            borrowedBy: borrowerName,
            borrowedDate: new Date().toISOString()
        });
        
        // Add to history
        await api.addHistory({
            bookId: bookId,
            bookTitle: book.title,
            borrowerName: borrowerName,
            action: 'Borrowed'
        });
        
        showToast('Book borrowed successfully!', 'success');
        
        // Reload data
        await loadBooks();
        await loadHistory();
        updateStats();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('borrowModal'));
        modal.hide();
    } catch (error) {
        console.error("Error borrowing book:", error);
        showToast('Error borrowing book. Please try again.', 'danger');
    }
});

// Return Book
async function returnBook(id) {
    try {
        const book = booksData.find(b => b.id === id);
        if (!book) {
            throw new Error('Book not found');
        }

        // Update book status
        await api.updateBook(id, {
            status: 'Available',
            returnedDate: new Date().toISOString()
        });
        
        // Add to history
        await api.addHistory({
            bookId: id,
            bookTitle: book.title,
            borrowerName: book.borrowedBy || 'Unknown',
            action: 'Returned'
        });
        
        showToast('Book returned successfully!', 'success');
        
        // Reload data
        await loadBooks();
        await loadHistory();
        updateStats();
    } catch (error) {
        console.error("Error returning book:", error);
        showToast('Error returning book. Please try again.', 'danger');
    }
}

// Search Functionality
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = booksData.filter(book => {
        return book.title.toLowerCase().includes(query) || 
               book.author.toLowerCase().includes(query) || 
               book.isbn.toLowerCase().includes(query);
    });
    displayBooks(filteredBooks);
});

// Show Toast Notification
function showToast(message, type = 'success') {
    const toastEl = document.getElementById('toast');
    const toastBody = document.getElementById('toast-body');
    
    // Set background color based on type
    const bgClass = type === 'success' ? 'bg-success' : 
                   type === 'danger' ? 'bg-danger' : 
                   type === 'warning' ? 'bg-warning' : 'bg-info';
    
    toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
    toastBody.textContent = message;
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// Reset form when modal is closed
document.getElementById('bookModal').addEventListener('hidden.bs.modal', function () {
    bookForm.reset();
    formTitle.textContent = 'Add New Book';
    submitBtn.innerHTML = '<i class="bi bi-plus-circle"></i> Add Book';
    bookIdInput.value = '';
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);