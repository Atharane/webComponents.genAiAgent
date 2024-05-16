/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useTransition } from 'react'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import ComponentEditable from '@/components/decorators/componentEditable'
import componentsStore from '@/lib/store'

import {
  IconArrowRight,
  IconCopy,
  IconDatabase,
  IconExternalLink,
  IconMicrophone
} from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { RevisionPromptForm } from '@/components/revision-prompt-form'
import Confetti from 'react-confetti'
import { useAIState, useActions, useUIState } from 'ai/rsc'

const ProtectedClient = () => {
  const { invokeToolsIncludedProvider } = useActions()

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

  const initializeComponents = async () => {
    const messages = [
      new SystemMessage("You're a helpful assistant"),
      new HumanMessage(
        `A user is planning to launch a new website for their business. Based on the user's specifications: ${query}, identify the essential components that the website should include from the following options: "STATS_CARD", "ANNOUNCEMENT_BANNER", "FAQ_SECTION", "IMAGE_OVERLAY_CARD", "BLOG_SECTION". The list should be presented in the order those components should appear on the website, and only the chosen components should be mentioned. Provide the components names in all caps and separated by a space, with no additional text or formatting. For example, if the needed components are stats card and blog section, you would respond with 'STATS_CARD BLOG_SECTION.`
      )
    ]

    startTransition(async () => {
      const response = await invokeToolsIncludedProvider({
        prompt: `The website content must be funny and sarcastic, the site is ${query}`
      })
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
              // todo: add focus on load
              rows={6}
              className="p-4 pr-32 bg-white/60 block w-full border rounded-2xl border-gray-700  disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 font-serif text-lg"
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

        {aiState?.componentIDs?.length > 0 && (
          <div className="p-8 flex flex-col h-screen mt-24 z-10 relative">
            {/* <Confetti
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
            /> */}
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
                      {/* @ts-ignore */}
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

            <div className="flex gap-2 items-center p-2 mt-2 rounded-lg  bg-transparent">
              {/* border-4 border-slate-200 */}
              <Button
                onClick={() => {
                  // todo: structure to include head, body, tags, ignore componentEditable wrraper and tailwindcss CDN
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
                variant="secondary"
                className="rounded-sm px-12 py-6 flex items-center justify-center  font-semibold"
              >
                <IconCopy className="mr-2" />
                Download Code
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-sm px-12 py-6 flex items-center justify-center  font-semibold"
              >
                <IconExternalLink className="mr-2" />
                {/* todo: implement deploy functionality */}
                Get Sharable Link
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-sm px-12 py-6 flex items-center justify-center  font-semibold"
              >
                lorem ispum
              </Button>
              {/* <Input type="text"  className='w-full border py-[22px]' /> */}
              <RevisionPromptForm
                input={revisionQuery}
                setInput={setRevisionQuery}
              />
              {/* <Button
                    variant="secondary
                  className="px-4 py-6 bg-blue-500">
                <IconJarLogoIcon />
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProtectedClient