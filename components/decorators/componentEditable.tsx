'use client'

import { useRef, useState } from 'react'
import { invokeToolsIncludedProvider } from '@/lib/query/actions'
import { Button } from '@/components/ui/button'
import { IconPencilEdit, IconClick } from '@/components/ui/icons'

const EditFABStrip = ({ toggleEditMode }: { toggleEditMode: () => void }) => {
  return (
    <div className="z-10 flex min-h-12 w-full items-center justify-center gap-2 rounded-3xl bg-gray-900/80 px-2 shadow-lg  sm:shadow-black/40 max-w-[510px]">
      <div className="items-center justify-center rounded-l-full sm:flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          height="32"
          width="32"
          className="relative flex shrink-0 rounded-full"
          src="https://vercel.com/api/www/avatar/8Xv3se03Coj3YYtljRSVUNAn?s=64"
        />
      </div>
      <div className="flex w-full min-w-0 flex-1 items-center self-end border-gray-700 pl-2 sm:border-l">
        <form className="size-full">
          <div className="flex w-full flex-1 items-center gap-2">
            <label className="sr-only" htmlFor="textarea-input">
              prompt
            </label>
            <div className="relative flex w-full min-w-0 flex-1 justify-between self-start min-h-[3rem] items-center">
              <div className="pointer-events-none invisible ml-[-100%] min-w-[50%] flex-[1_0_50%] overflow-x-visible opacity-0">
                <div className="w-full pointer-events-none invisible opacity-0">
                  Make the heading larger and darker
                </div>
              </div>
              <textarea
                className="min-h-[1.5rem] flex-[1_0_50%] resize-none border-0 bg-transparent pr-2 text-sm leading-relaxed text-white shadow-none outline-none ring-0 [scroll-padding-block:0.75rem] selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80 py-2.5 sm:py-3 w-full"
                placeholder="Make the heading larger and darker"
                rows={1}
              ></textarea>
            </div>
            <div className="flex">
              <button
                className="flex size-8 shrink-0 items-center justify-center self-center rounded-full text-gray-300 outline-none ring-offset-1 ring-offset-gray-900 transition-colors hover:text-gray-50 focus-visible:ring-1 focus-visible:ring-gray-300 disabled:opacity-50 border-gray-600 hover:bg-gray-200/20"
                type="button"
                onClick={toggleEditMode}
              >
                <IconPencilEdit className="text-gray-300 size-3" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex h-full items-center gap-2 border-l border-gray-700 pl-2">
        <button className="flex size-8 shrink-0 items-center justify-center self-center rounded-full border text-gray-300 outline-none ring-offset-1 ring-offset-gray-900 transition-colors hover:text-gray-50 focus-visible:ring-1 focus-visible:ring-gray-300 disabled:opacity-50 border-gray-600 hover:bg-gray-800">
          <IconClick />
        </button>
      </div>
    </div>
  )
}

const ComponentEditable = ({
  id,
  children
}: {
  id: string
  children: React.ReactNode
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [prompt, setPrompt] = useState('')

  const toggleEditMode = () => {
    setIsEditing(previous => !previous)
  }

  return (
    <div
      contentEditable={isEditing ? 'true' : 'inherit'}
      className="relative group hover:z-10 hover:bg-rose-600/20x"
    >
      <div className="">{children}</div>

      {isEditing ? (
        <div className="save-btn z-10 invisible group-hover:visible absolute left-1/2 -bottom-10  -translate-x-1/2 -translate-y-1/2">
          <Button
            className=" text-white font-bold rounded-lg  bg-emerald-400"
            onClick={() => {
              setIsEditing(false)
            }}
          >
            Save Changes
          </Button>
        </div>
      ) : (
        // ------------------------------------ 🔨 FAB strip ------------------------------------
        <div className="fab-strip invisible group-hover:visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="z-10 flex min-h-12 w-full items-center justify-center gap-2 rounded-3xl bg-gray-900/80 px-2 shadow-lg  sm:shadow-black/40 max-w-[510px]">
            <div className="items-center justify-center rounded-l-full sm:flex">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="avatar"
                height="32"
                width="32"
                className="relative flex shrink-0 rounded-full"
                src="https://vercel.com/api/www/avatar/8Xv3se03Coj3YYtljRSVUNAn?s=64"
              />
            </div>
            <div className="flex w-full min-w-0 flex-1 items-center self-end border-gray-700 pl-2 sm:border-l">
              <form className="size-full">
                <div className="flex w-full flex-1 items-center gap-2">
                  <label className="sr-only" htmlFor="textarea-input">
                    prompt
                  </label>
                  <div className="relative flex w-full min-w-0 flex-1 justify-between self-start min-h-[3rem] items-center">
                    <div className="pointer-events-none invisible ml-[-100%] min-w-[50%] flex-[1_0_50%] overflow-x-visible opacity-0">
                      <div className="w-full pointer-events-none invisible opacity-0">
                        Make the heading larger and darker
                      </div>
                    </div>
                    <textarea
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                      name="prompt"
                      ref={textAreaRef}
                      className="min-h-[1.5rem] flex-[1_0_50%] resize-none border-0 bg-transparent pr-2 text-sm leading-relaxed text-white shadow-none outline-none ring-0 [scroll-padding-block:0.75rem] selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80 py-2.5 sm:py-3 w-full"
                      placeholder="Make the heading larger and darker"
                      rows={1}
                    ></textarea>
                  </div>
                  <div className="flex">
                    <button
                      className="flex size-8 shrink-0 items-center justify-center self-center rounded-full text-gray-300 outline-none ring-offset-1 ring-offset-gray-900 transition-colors hover:text-gray-50 focus-visible:ring-1 focus-visible:ring-gray-300 disabled:opacity-50 border-gray-600 hover:bg-gray-200/20"
                      type="submit"
                      onClick={toggleEditMode}
                    >
                      <IconPencilEdit className="text-gray-300 size-3" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex h-full items-center gap-2 border-l border-gray-700 pl-2">
              <button
                onClick={() => {
                  invokeToolsIncludedProvider(prompt, [id])
                }}
                className="flex size-8 shrink-0 items-center justify-center self-center rounded-full border text-gray-300 outline-none ring-offset-1 ring-offset-gray-900 transition-colors hover:text-gray-50 focus-visible:ring-1 focus-visible:ring-gray-300 disabled:opacity-50 border-gray-600 hover:bg-gray-800"
              >
                <IconClick />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComponentEditable
