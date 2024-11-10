import React from 'react';
import { Book } from '../types/book';
import { BookOpen, Calendar, User } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export default function BookCard({ book, onSelect }: BookCardProps) {
  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200';

  return (
    <div 
      onClick={() => onSelect(book)}
      className="flex flex-col bg-blue-950 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={volumeInfo.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg text-white font-semibold line-clamp-2 mb-2">{volumeInfo.title}</h3>
        
        <div className="space-y-2 text-sm text-white flex-1">
          {volumeInfo.authors && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="line-clamp-1">{volumeInfo.authors.join(', ')}</span>
            </div>
          )}
          
          {volumeInfo.publishedDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(volumeInfo.publishedDate).getFullYear()}</span>
            </div>
          )}
          
          {volumeInfo.categories && (
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span className="line-clamp-1">{volumeInfo.categories[0]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}