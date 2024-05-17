'use server'

import { ChatOpenAI } from '@langchain/openai'
import { DynamicStructuredTool } from '@langchain/core/tools'

import { createAI, getMutableAIState, getAIState } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { getUIStateFromAIState } from '../chat/actions'
import store from '@/lib/store'

import { z } from 'zod'

const openAIProvider = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4-turbo',
  temperature: 0.6
})


import store from '@/lib/store'
export const invokeToolsIncludedProvider = async (
  query: any,
  componentIDs: Array<string> = []
) => {
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
      PRIMARY_PRODUCT_FEATURE: store.PRIMARY_PRODUCT_FEATURE.schema,
      SECONDARY_DESCRIPTION: store.SECONDARY_DESCRIPTION.schema

const deicideComponents = async (prompt: string) => {
  const componentIDs = [] as string[]

  for (const property in store) {
    componentIDs.push(store[property].id)
  }

  console.log('🚀 ~ componentIDs:', componentIDs)

  const cstmStr = `Decide which component to use based on the prompt, and return the component ids, the ids miust be one of the available components in the store, The available components are ${componentIDs.join(', ')}`

  const fnCallSchema = z.object({
    // componentIDs: z.enum(componentIDs)
    componentIDs: z.string()
  })

  const webpageMicropyTool = new DynamicStructuredTool({
    name: 'component_decider',
    description: `Decide which component to use based on the prompt, and return the component ids space separated, the ids miust be one of the available components in the store, nothing else. The available components are ${componentIDs.join(', ')}`,
    schema: fnCallSchema,
    // @ts-ignore-next-line
    func: async args => {}
  })

  const llmWithTools = openAIProvider.bindTools([webpageMicropyTool])

  const response = await llmWithTools.invoke(prompt)

  const microcopy = response?.tool_calls?.[0]?.args
  console.log('🚀 ~ deicideComponents ~ array:', microcopy)

  const validComponentIDs = microcopy?.componentIDs
    ?.split(' ')
    .filter(id => componentIDs.includes(id))
  console.log('🚀 ~ deicideComponents ~ validComponentIDs:', validComponentIDs)
  return validComponentIDs
}

export const invokeToolsIncludedProvider = async (config: any) => {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  if (config.revision) {
    const componentIDs = config?.targetComponentIDs
    console.log(
      '🚀 ~ invokeToolsIncludedProvider ~ componentIDs:',
      componentIDs
    )

    const targetScehma = {}

    // add the schema for the components, who's .id is in the componentIDs array
    for (const property in store) {
      if (componentIDs?.includes(store[property]?.id)) {
        targetScehma[property] = store[property].schema
        console.log('🚀 ~ invokeToolsIncludedProvider ~ property:', property)
      }
    }

    const webpageSchema = z.object(targetScehma)

    const webpageMicropyTool = new DynamicStructuredTool({
      name: 'website_templater',
      description:
        'Give me the appropriate micropcopy and content for a website that I am developing.',
      schema: webpageSchema,
      // @ts-ignore-next-line
      func: async args => {}

    })

    const llmWithTools = openAIProvider.bindTools([webpageMicropyTool])

    const response = await llmWithTools.invoke(config?.prompt)

    const microcopy = response?.tool_calls?.[0]?.args
    console.log(JSON.stringify(response.tool_calls, null, 2))

    aiState.done({
      ...aiState.get(),
      componentIDs,
      componentConfig: {
        ...aiState.get().componentConfig,
        ...microcopy
      }
    })

    return microcopy
  }

  const componentIDs = await deicideComponents(config?.prompt)
  const webpageSchema = z.object({
    GLOBAL: z.object({
      brand: z
        .string()
        .describe('suggest a attractive brand name for the brand')
    }),
    BANNER: store.BANNER.schema,
    FOOTER: store.FOOTER.schema,
    HERO_WITH_IMAGE_AND_REVIEW: store.HERO_WITH_IMAGE_AND_REVIEW.schema,
    PRIMARY_PRODUCT_FEATURE: store.PRIMARY_PRODUCT_FEATURE.schema
  })

  const webpageMicropyTool = new DynamicStructuredTool({
    name: 'website_templater',
    description:
      'Give me the appropriate micropcopy and content for a website that I am developing.',
    schema: webpageSchema,
    // @ts-ignore-next-line
    func: async args => {}
  })

  const llmWithTools = openAIProvider.bindTools([webpageMicropyTool])

  const response = await llmWithTools.invoke(config?.prompt)

  const microcopy = response?.tool_calls?.[0]?.args
  console.log(JSON.stringify(response.tool_calls, null, 2))

  aiState.done({
    ...aiState.get(),
    componentIDs,
    componentConfig: {
      ...aiState.get().componentConfig,
      ...microcopy
    }
  })

  return microcopy
}

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
  onSetAIState: async ({ state, done }) => {
    'use server'
    // todo: save generaion functionality
  }
})
