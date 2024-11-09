import React, { useState } from 'react';
import { Search, Book, Loader2 } from 'lucide-react';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    publisher?: string;
    pageCount?: number;
  };
}

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
      );
      const data = await response.json();
      
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
        setError('No books found');
      }
    } catch (err) {
      setError('Failed!!!  Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Book className="inline-block mr-2 mb-1" />
            Book Finder
          </h1>
          <p className="text-gray-400">Discover your book</p>
        </div>

        <form onSubmit={searchBooks} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books..."
              className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all pr-12"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
              disabled={loading}
            >
              <Search size={24} />
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center mb-8">
            <Loader2 className="animate-spin text-white" size={32} />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-blend-color-burn">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                {book.volumeInfo.imageLinks ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Book size={48} />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                  {book.volumeInfo.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                </p>
                {book.volumeInfo.publishedDate && (
                  <p className="text-gray-500 text-sm mb-2">
                    Published: {new Date(book.volumeInfo.publishedDate).getFullYear()}
                  </p>
                )}
                <p className="text-gray-600 text-sm line-clamp-3">
                  {book.volumeInfo.description || 'No description available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;