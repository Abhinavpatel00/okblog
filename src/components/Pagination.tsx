import Link from 'next/link'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const getPageLink = (pageNumber: number) => {
    return pageNumber === 1 ? `/blog/` : `/blog/page/${pageNumber}`
  }

  const getPageButtons = () => {
    const pageButtons = []
    const maxButtonsToShow = 3 // change this value to control how many buttons to show at once

    if (totalPages <= maxButtonsToShow) {
      // show all pages
      for (let i = 1; i <= totalPages; i++) {
        const isActive = currentPage === i
        pageButtons.push(
          <Link key={i} href={getPageLink(i)}>
            <button
              className={`${isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } py-2 px-4 border border-gray-300 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 inline-block m-0`}
            >
              {i}
            </button>
          </Link>
        )
      }
    } else {
      // show subset of pages with arrows
      const startPage = Math.max(currentPage - Math.floor(maxButtonsToShow / 2), 1)
      const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages)
      if (startPage > 1) {
        pageButtons.push(
          <Link key={'prev'} href={getPageLink(currentPage - 1)}>
            <button
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 border border-gray-300 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 inline-block m-0"
            >
              <FiChevronLeft />
            </button>
          </Link>
        )
      }
      for (let i = startPage; i <= endPage; i++) {
        const isActive = currentPage === i
        pageButtons.push(
          <Link key={i} href={getPageLink(i)}>
            <button
              className={`${isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } py-2 px-4 border border-gray-300 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 inline-block m-0`}
            >
              {i}
            </button>
          </Link>
        )
      }
      if (endPage < totalPages) {
        pageButtons.push(
          <Link key={'next'} href={getPageLink(currentPage + 1)}>
            <button
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 border border-gray-300 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 inline-block m-0"
            >
              <FiChevronRight />
            </button>
          </Link>
        )
      }
    }
    return pageButtons
  }
  



  return (
    <div className=" flex-wrap justify-center space-y-2 pt-6 pb-8 md:space-y-5 whitespace-nowrap">
      <nav className="flex flex-wrap justify-center ">
       
      
     
        {getPageButtons()}
       
      </nav>
    </div>
  )
}
