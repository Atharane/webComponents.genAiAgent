/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useState, useTransition } from 'react'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import ComponentEditable from '@/components/decorators/componentEditable'
import componentsStore from '@/lib/store'

import Confetti from 'react-confetti'
import { useAIState, useActions, useUIState } from 'ai/rsc'

import {
  IconArrowRight,
  IconCopy,
  IconDatabase,
  IconExternalLink,
  IconMicrophone
} from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { nanoid } from 'nanoid'
import { RevisionPromptForm } from '@/components/revision-prompt-form'

const deployWebpage = async () => {
  try {
    const generatedWebpage = document.getElementById('generation')
      ?.innerHTML as string

    if (!generatedWebpage) return toast.error('No Webpage Generated')

    const linkKey = nanoid(10)

    const data = {
      linkKey: linkKey,
      username: 'Hem',
      DOMString: generatedWebpage
    }

    const response = await fetch(
      'https://webcomponents-genaiagent-server.onrender.com/api/v1/addWebsite',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )

    toast.success(
      'Webpage live on https://genwebcomponents.vercel.app/${linkKey}'
    )
  } catch (error) {
    console.log(error)
  }
}

const LoadingState = () => {
  return (
    <div className="m-6">
      <div className="p-2 pl-4 bg-slate-200 rounded-t-md flex items-center sticky">
        <div className="rounded-full size-4 bg-red-400 flex mr-2"></div>
        <div className="rounded-full size-4 bg-yellow-400 flex mr-2"></div>
        <div className="rounded-full size-4 bg-green-400 flex mr-2"></div>
        <div className="flex-auto p-2 pl-4 ml-2 mr-1 rounded-md bg-white/60 text-slate-600 text-xs font-mono">
          https://lorem.vercel.app
        </div>
      </div>
      <div className="grow text-clip overflow-y-scroll border-4 border-slate-200 rounded-b-lg bg-white">
        <div id="generation">
          <div>
            <div role="status" className="animate-pulse w-full p-12">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[90vw]"></div>
              <div className="flex items-center justify-center mt-4">
                <svg
                  className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>

            <div className="px-32">
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-12">
                {/* make an dumy arrayof 3 elemenrs */}
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    role="status"
                    className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                      </svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="flex items-center mt-4">
                      <svg
                        className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      <div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProtectedClient = () => {
  const fabStripRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState(
    'Create a homepage for my indie plant shop that highlights the incredible variety of plants I offer, brags about my top-notch customer service, and shows off those 100+ happy customers.'
  )
  const [revisionQuery, setRevisionQuery] = useState(
    'Mention that we have flat 12% sale going on currently 🎉'
  )

  const [aiState] = useAIState()

  const componentIDs = aiState.componentIDs as string[]
  const components = componentIDs?.map(id => componentsStore[id])

  const [loading, startTransition] = useTransition()
  const { invokeToolsIncludedProvider } = useActions()

  const initializeComponents = async () => {
    const messages = [
      new SystemMessage("You're a helpful assistant"),
      new HumanMessage(
        `A user is planning to launch a new website for their business. Based on the user's specifications: ${query}, identify the essential components that the website should include from the following options: "STATS_CARD", "ANNOUNCEMENT_BANNER", "FAQ_SECTION", "IMAGE_OVERLAY_CARD", "BLOG_SECTION". The list should be presented in the order those components should appear on the website, and only the chosen components should be mentioned. Provide the components names in all caps and separated by a space, with no additional text or formatting. For example, if the needed components are stats card and blog section, you would respond with 'STATS_CARD BLOG_SECTION.`
      )
    ]

    fabStripRef.current?.scrollIntoView({
      behavior: 'smooth'
    })

    startTransition(async () => {
      const response = await invokeToolsIncludedProvider({
        prompt: `The website content must be funny and sarcastic, the site is ${query}`
      })

      console.log('~ startTransition ~ response:', response)
    })
  }

  return (
    <div className="w-full relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 text-slate-950 ">
      <img
        src="https://play.tailwindcss.com/img/beams.jpg"
        alt=""
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        width="1308"
      />
      <div className="absolute inset-0  bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* no fuckin idea, why ui does not work without this z-10, something to ponder upon later */}
      <div className="z-10">
        <div className="mt-16 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl dark:text-white ">
            The website maker for people in a&nbsp;
            <span className="">hurry</span>
          </h1>
          <p className="mt-3 font-serif text-slate-800 dark:text-gray-400">
            The ai powered copilot for the web
          </p>
        </div>

        <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <textarea
              // todo: ad focus on load
              rows={6}
              className="p-4 pr-32 text-lg bg-white/60 block w-full border rounded-2xl border-gray-700  disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 font-serif"
              placeholder="ask me anything..."
              value={query}
              onKeyDown={e => {
                e.key === 'Enter' && initializeComponents()
              }}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="absolute top-2 right-2 grid gap-2">
              <button
                onClick={initializeComponents}
                type="button"
                className="bg-slate-900  size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-100 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <IconArrowRight />
              </button>

              <button
                // todo: implement data ingestion from csv
                type="button"
                className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 mr-2"
              >
                <IconDatabase />
              </button>

              <button
                // todo: implement speech to text https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
                type="button"
                className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 mr-2"
              >
                <IconMicrophone />
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------- ✨ GENERATED_WEBSITE ----------------------- */}

        {loading && <LoadingState />}

        {aiState?.componentIDs?.length > 0 && (
          <div className="p-8 flex flex-col h-screen mt-24 z-10">
            <Confetti
              style={{
                zIndex: 1000
              }}
              recycle={false}
              // drawShape={ctx => {
              //   ctx.beginPath()
              //   for (let i = 0; i < 22; i++) {
              //     const angle = 0.35 * i
              //     const x = (0.2 + 1.5 * angle) * Math.cos(angle)
              //     const y = (0.2 + 1.5 * angle) * Math.sin(angle)
              //     ctx.lineTo(x, y)
              //   }
              //   ctx.stroke()
              //   ctx.closePath()
              // }}
            />
            {/* ----------------------- 📦 MINI_BROSWER_WINDOW ----------------------- */}
            {/* <div className="overflow-y-scroll relative"> */}
            <div className="p-2 pl-4 bg-slate-200 rounded-t-md flex items-center sticky">
              <div className="rounded-full size-4 bg-red-400 flex mr-2"></div>
              <div className="rounded-full size-4 bg-yellow-400 flex mr-2"></div>
              <div className="rounded-full size-4 bg-green-400 flex mr-2"></div>
              <div className="flex-auto p-2 pl-4 ml-2 mr-1 rounded-md bg-white/60 text-slate-600 text-xs font-mono">
                https://lorem.vercel.app
              </div>
            </div>
            <div className="grow text-clip overflow-y-scroll border-4 border-slate-200 rounded-b-lg bg-white">
              <div id="generation">
                {[...components].map(component => {
                  return (
                    <ComponentEditable id={component.id} key={component.id}>
                      <component.component
                        {...aiState.componentConfig?.[component.id]}
                      />
                    </ComponentEditable>
                  )
                })}
              </div>
            </div>
            {/* </div> */}
            {/* ----------------------- 🦄 FAB_STRIP ----------------------- */}
            <div className="flex gap-2 p-2 mt-2 rounded-lg border-4 border-slate-200 bg-transparent">
              <Button
                onClick={() => {
                  const generatedWebpage = document.getElementById('generation')
                    ?.innerHTML as string
                  const blob = new Blob([generatedWebpage], {
                    type: 'text/html'
                  })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'index.html'
                  a.click()
                  URL.revokeObjectURL(url)
                  toast.success('Copied to clipboard')
                }}
                size="lg"
                className="rounded-sm px-12 py-6 flex items-center justify-center  font-semibold"
              >
                <IconCopy className="mr-2" />
                Download Code
              </Button>
              <Button
                size="lg"
                className="rounded-sm px-12 py-6 flex items-center justify-center  font-semibold"
                onClick={deployWebpage}
              >
                <IconExternalLink className="mr-2" />
                {/* todo: implement deploy functionality */}
                Get Sharable Link
              </Button>
              <Button
                size="lg"
                className="rounded-sm px-12 py-6 flex items-center justify-center  font-semibold"
              >
                lorem ispum dolor sit
              </Button>
              <RevisionPromptForm
                input={revisionQuery}
                setInput={setRevisionQuery}
              />
            </div>
          </div>
        )}

        <footer ref={fabStripRef}></footer>
      </div>
    </div>
  )
}

export default ProtectedClient
