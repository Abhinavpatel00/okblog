import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionCon({ children }: Props) {
  return <div className=" bg-green-300 blur-2xl mx-auto max-w-3xl px-2 sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
}
