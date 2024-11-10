import React, { useState } from 'react';
import { Book } from './types/book';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import { BookCopy, Library } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (query: string, filter: string) => {
    setLoading(true);
    try {
      let searchQuery = query;
      if (filter !== 'all') {
        searchQuery = `in${filter}:${query}`;
      }
      
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=40`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-700 ">
      <Toaster position="top-center" />
      
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookCopy className="text-white flex items-center   " size={32} />
              <h1 className="text-3xl font-bold text-white  ">Book Finder</h1>
            </div>
          </div>
          
          <div className="mt-6">
            <SearchBar onSearch={searchBooks} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        ) : (
          <>
            {books.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSelect={setSelectedBook}
                  />
                ))}
              </div>
            )}

            {books.length === 0 && (
              <div className="text-center py-12">
                <Library className="mx-auto text-white mb-4" size={48} />
                <h2 className="text-xl font-semibold text-white">
                  Search for your favorite books
                </h2>
                <p className="text-indigo-100 mt-2">
                  Enter a title, author, or ISBN to get started
                </p>
              </div>
            )}
          </>
        )}

        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onAddToWishlist={() => {}}
            onAddToReading={() => {}}
          />
        )}
      </main>
    </div>
  );
}

export default App;