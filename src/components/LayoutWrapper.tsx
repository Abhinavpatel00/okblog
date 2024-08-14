import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from 'next/link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import dropdownLinks from '@/data/dropdownlinks'
import { useState } from 'react'
import Breadcrumbs from './breadscrumb'
import { useRouter } from 'next/router'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  const [dropdownShow, setDropdownShow] = useState(false)

  const onToggleDropdown = () => {
    setDropdownShow(!dropdownShow)
  }

  return (
    <>
      <header className="blur-10 sticky top-0 z-[110] flex items-center justify-between border-b border-gray-200 bg-opacity-30 px-4 py-0 backdrop-blur-lg backdrop-filter dark:border-gray-700 sm:py-2 md:py-2">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="sticky flex items-center justify-between">
              <div className="ml-3" style={{ color: '#00FF00' }}>
                <Logo />
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden sm:block">
          <div className="ml-4 flex flex-1 items-center justify-end">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="link-underline rubikaaa dark:link-underline-black link rounded-xl p-1 font-medium text-gray-900 hover:bg-gray-400/10 dark:text-gray-100 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                className="link-underline rubikaaa dark:link-underline-black link rounded-xl p-1 font-medium text-gray-900 hover:bg-gray-400/10 dark:text-gray-100 sm:p-4"
                aria-expanded="false"
                onClick={onToggleDropdown}
              >
                <span>Category pages</span>
              </button>
              {dropdownShow && (
                <div className="rubikaaa absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-2 shadow-lg">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="link block px-12 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <ThemeSwitch />
            <div className="pl-12"></div>
          </div>
        </div>
        <MobileNav />
      </header>
      <Breadcrumbs />
      <SectionContainer>
        <main className="mb-auto">{children}</main>
      </SectionContainer>
      <Footer />
    </>
  )
}

export default LayoutWrapper
