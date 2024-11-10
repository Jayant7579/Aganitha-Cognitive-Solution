import React from 'react';
import { Book } from '../types/book';
import { X, Calendar, User, BookOpen, Building2, Hash } from 'lucide-react';

interface BookDetailsProps {
  book: Book;
  onClose: () => void;
  onAddToWishlist: (book: Book) => void;
  onAddToReading: (book: Book) => void;
}

export default function BookDetails({ book, onClose, onAddToWishlist, onAddToReading }: BookDetailsProps) {
  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200';

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-transparent p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{volumeInfo.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={thumbnail}
                alt={volumeInfo.title}
                className="w-full rounded-lg shadow-lg"
              />
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => onAddToWishlist(book)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Wishlist
                </button>
                <button
                  onClick={() => onAddToReading(book)}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add to Reading List
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {volumeInfo.authors && (
                  <div className="flex items-center gap-2">
                    <User className="text-gray-500" size={20} />
                    <span>{volumeInfo.authors.join(', ')}</span>
                  </div>
                )}
                
                {volumeInfo.publishedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-500" size={20} />
                    <span>{new Date(volumeInfo.publishedDate).getFullYear()}</span>
                  </div>
                )}
                
                {volumeInfo.publisher && (
                  <div className="flex items-center gap-2">
                    <Building2 className="text-gray-500" size={20} />
                    <span>{volumeInfo.publisher}</span>
                  </div>
                )}
                
                {volumeInfo.categories && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-gray-500" size={20} />
                    <span>{volumeInfo.categories.join(', ')}</span>
                  </div>
                )}
                
                {volumeInfo.industryIdentifiers && (
                  <div className="flex items-center gap-2">
                    <Hash className="text-gray-500" size={20} />
                    <span>
                      {volumeInfo.industryIdentifiers[0].type}: {volumeInfo.industryIdentifiers[0].identifier}
                    </span>
                  </div>
                )}
              </div>

              {volumeInfo.description && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{volumeInfo.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}