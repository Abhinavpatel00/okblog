// import { Suspense, useRef, useState } from 'react'

// import { signIn, signOut, useSession } from 'next-auth/react'
// import { comment } from '@prisma/client'
// // import { format } from 'date-fns'
// import useSWR, { useSWRConfig } from 'swr'

// import fetcher from '@/lib/fetcher'
// // import useTranslation from '@/lib/useTranslation'

// // import ErrorMessage from '@/components/guestbook/ErrorMessage'
// // import LoadingSpinner from '@/components/guestbook/LoadingSpinner'
// // import SuccessMessage from '@/components/guestbook/SuccessMessage'

// enum Form {
//   Initial,
//   Loading,
//   Success,
//   Error,
// }

// type FormState = {
//   state: Form
//   message?: string
// }

// type ClickEvent = {
//   preventDefault: () => void
// }

// const Comment = ({ slug }: { slug: string }) => {
//   //   const { t } = useTranslation()
//   const { data: session } = useSession()
//   const { mutate } = useSWRConfig()

//   const inputEl = useRef<HTMLInputElement | null>(null)
//   const [form, setForm] = useState<FormState>({ state: Form.Initial })

//   const { data: entries } = useSWR<comment[]>(`/api/comments?post=${slug}`, fetcher)

//   const onSubmit = async (e: ClickEvent) => {
//     e.preventDefault()
//     setForm({ state: Form.Loading })

//     if (inputEl === null || inputEl.current === null) {
//       setForm({ state: Form.Error })
//       return
//     }

//     if (inputEl.current.value.trim().length === 0) {
//       setForm({ state: Form.Error, message: 'error' })
//       return
//     }

//     const res = await fetch('/api/comments?slug=' + slug, {
//       body: JSON.stringify({
//         body: inputEl.current.value,
//         slug,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     })

//     const { error } = await res.json()
//     if (error) {
//       setForm({
//         state: Form.Error,
//         message: error,
//       })
//       return
//     }

//     inputEl.current.value = ''
//     mutate(`/api/comments?post=${slug}`)
//     setForm({
//       state: Form.Success,
//       message: 'success',
//     })
//   }

//   const deleteEntry = async (e: ClickEvent, entryId: bigint) => {
//     e.preventDefault()

//     await fetch(`/api/comments/${entryId}`, {
//       method: 'DELETE',
//     })

//     mutate(`/api/comments?post=${slug}`)
//   }

//   return (
//     <div className="mt-10 w-full pt-4">
//       <p className="mb-2 text-base font-semibold">Comment</p>
//       <form onSubmit={onSubmit} className="relative">
//         <input
//           aria-label="Enter your comment..."
//           placeholder="Enter your comment..."
//           ref={inputEl}
//           required
//           disabled={!session}
//           type="text"
//           className="mt-1 block w-full rounded-md border border-blue-50 bg-gray-200 py-2 pl-4 pr-32 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-opaque dark:bg-gray-700 dark:text-gray-100"
//         />
//         <button
//           className="absolute right-1 top-1 flex h-8 w-28 items-center justify-center rounded bg-gray-100 px-4 py-1 font-medium text-gray-900 dark:bg-gray-600 dark:text-gray-100"
//           disabled={!session}
//           type="submit"
//         >
//           {form.state === Form.Loading ? 'Loading...' : 'Submit'}
//         </button>
//         <div className="mt-1"></div>
//         {session && (
//           <div className="mt-1 ml-1">
//             <button
//               type="button"
//               onClick={() => signOut()}
//               className="mt-2 mr-2 h-8 w-28 rounded bg-gray-200 px-4 py-1 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
//             ></button>
//             Logged in as: {session.user?.name} ({session.user?.email})
//           </div>
//         )}
//         {!session && (
//           <button
//             type="button"
//             onClick={() => signIn('google')}
//             className="mt-2 h-8 w-28 rounded bg-gray-200 px-4 py-1 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
//           >
//             Login
//           </button>
//         )}
//       </form>
//       <div className="mt-4 space-y-8" suppressHydrationWarning>
//         <Suspense fallback={<span>...</span>}>
//           {entries &&
//             entries.length > 0 &&
//             entries.map((entry) => (
//               <div className="flex flex-col space-y-2" key={entry.id.toString()}>
//                 <div className="prose w-full dark:prose-dark">{entry.body}</div>
//                 <div className="flex items-center space-x-3">
//                   <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">{entry.created_by}</p>
//                   <span className=" text-gray-600 dark:text-[#c2c2c2]">/</span>
//                   <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">{entry.updated_at}</p>
//                   {session?.user && entry.email === session?.user?.email && (
//                     <>
//                       <span className="text-gray-600 dark:text-[#c2c2c2]">/</span>
//                       <button
//                         className="text-sm text-red-600 dark:text-red-400"
//                         onClick={(e) => deleteEntry(e, entry.id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//         </Suspense>
//       </div>
//     </div>
//   )
// }

// export default Comment
