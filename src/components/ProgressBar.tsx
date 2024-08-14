import React from 'react'

import { useEffect, useState } from 'react'

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    function updateScroll() {
      // already scrolled height
      const currentScrollY = window.scrollY
      // scrollable height
      let scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setProgress(Number((currentScrollY / scrollHeight).toFixed(2)) * 100)
      }
    }
    // Add a global scroll event listener
    window. addEventListener('scroll', updateScroll)

    // remove listener
    return () => {
      window. removeEventListener('scroll', updateScroll)
    }
  }, [])
  return progress
}

export default function ProgressBar() {
  const progress = useReadingProgress()
  return (
    <div
      style={{
        transform: `translateX(${progress - 100}%)`,
      }}
      className="fixed top-0 left-0 h-6 w-full bg-green-400 backdrop-blur-3xl transition-transform duration-150"
    />
  )
}
