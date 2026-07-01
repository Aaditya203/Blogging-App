import React from 'react'
import { Search } from 'lucide-react'
const SearchBar = () => {
  return (
          <div className="hidden lg:flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 w-100 border border-gray-300">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent outline-none text-sm font-inter"
            />

            <kbd className="rounded bg-white px-2 py-1 text-xs text-gray-500 shadow-sm whitespace-nowrap">
              ⌘ K
            </kbd>
          </div>
  )
}

export default SearchBar