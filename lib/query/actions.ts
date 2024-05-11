'use server'

import { ChatOpenAI } from '@langchain/openai'
import { DynamicStructuredTool } from '@langchain/core/tools'
import store from '@/lib/store'
import { createAI, getMutableAIState, getAIState } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { getUIStateFromAIState } from '../chat/actions'

import { z } from 'zod'

const openAIProvider = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4-turbo',
  temperature: 0.6
})

export type AIState = {
  generationID: string
  components: any
  componentIDs: Array<string>
  componentConfig: Record<string, any>
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const invokeToolsIncludedProvider = async (
  query: any,
  componentIDs: Array<string> = []
) => {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  if (query === true) {
    console.log("here.....")
    aiState.done({
      ...aiState.get(),
      // components: [
      //   store.BANNER,
      //   store.HERO_WITH_IMAGE_AND_REVIEW,
      //   store.PRIMARY_PRODUCT_FEATURE,
      //   store.FOOTER
      // ],
      componentIDs: [
        'BANNER',
        'HERO_WITH_IMAGE_AND_REVIEW',
        'PRIMARY_PRODUCT_FEATURE',
        'FOOTER'
      ],
      componentConfig: {
        ...aiState.get().componentConfig,
        BANNER: {
          brand: 'SHOP NOW YO GET EXCLUSIVE 12% OFF!',
          anchorsString: 'Home, About, Services, Contact, FAQs, Careers'
        }
      }
    })
  }

  const webpageSchema =
    // componentIDs.length > 0
    //   ? z.object({
    //       BANNER: store[componentIDs[0]].schema,
    //     })
    //   :
    z.object({
      BANNER: store.BANNER.schema,
      FOOTER: store.FOOTER.schema,
      HERO_WITH_IMAGE_AND_REVIEW: store.HERO_WITH_IMAGE_AND_REVIEW.schema,
      PRIMARY_PRODUCT_FEATURE: store.PRIMARY_PRODUCT_FEATURE.schema
    })

  const webpageMicropyTool = new DynamicStructuredTool({
    name: 'website_templater',
    description:
      'Give me the appropraite micropcopy and content for a wbsite that I am designing',
    schema: webpageSchema,
    // @ts-ignore-next-line
    func: async ({ ...args }) => {
      //
    }
  })

  // const toolsIncludedProvider = openAIProvider.bindTools([webpageMicropyTool])

  // const response = await toolsIncludedProvider.invoke(query)
  // console.log('FNCALL_RSP: ', response)
  // const microcopy = response?.tool_calls?.[0]?.args
  const microcopy = {}

  aiState.done({
    ...aiState.get(),
    // components: [
    //   store.BANNER,
    //   store.HERO_WITH_IMAGE_AND_REVIEW,
    //   store.PRIMARY_PRODUCT_FEATURE,
    //   store.FOOTER
    // ],
    componentIDs: [
      'BANNER',
      'HERO_WITH_IMAGE_AND_REVIEW',
      'PRIMARY_PRODUCT_FEATURE',
      'FOOTER'
    ],
    componentConfig: {
      ...aiState.get().componentConfig,
      ...microcopy
    }
  })

  // return response?.tool_calls?.[0]?.args
  return 'lorem'
}

export const AI = createAI<AIState, UIState>({
  actions: {
    invokeToolsIncludedProvider
  },
  initialUIState: [],
  initialAIState: {
    generationID: nanoid(),
    components: [],
    componentIDs: [],
    componentConfig: {}
  },
  onGetUIState: async () => {
    'use server'

    const aiState = getAIState()

    if (aiState) {
      const uiState = getUIStateFromAIState(aiState)
      return uiState
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'
    // todo: save generaion functionality
  }
})
