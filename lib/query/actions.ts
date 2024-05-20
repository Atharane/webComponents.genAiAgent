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

const deicideComponents = async (prompt: string) => {
  const componentIDs = [] as string[]

  for (const property in store) {
    // @ts-ignore-next-line
    componentIDs.push(store[property].id)
  }

  console.log('🚀 ~ componentIDs:', componentIDs)

  const cstmStr = `Decide which component to use based on the prompt, and return the component ids, the ids miust be one of the available components in the store, The available components are ${componentIDs.join(', ')}`

  const fnCallSchema = z.object({
    // componentIDs: z.enum(componentIDs)
    componentIDs: z.string().describe(cstmStr)
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
    // @ts-ignore-next-line
    .filter(id => componentIDs.includes(id))
  console.log('🚀 ~ deicideComponents ~ validComponentIDs:', validComponentIDs)
  return validComponentIDs
}

const deicideComponentsToBeChanged = async (
  prompt: string,
  oldComponentIDs: string[]
) => {
  const cstmStr = `We have a prebuilt site that has the following components, ${oldComponentIDs.join(
    ', '
  )}. Now the user has some changes in mind, based on the user's need Decide which component need to be changed, and return the component ids, the ids must be one of the available components in the store, The available components are ${oldComponentIDs.join(', ')}`

  const fnCallSchema = z.object({
    // componentIDs: z.enum(componentIDs)
    componentIDs: z.string().describe(cstmStr)
  })

  const webpageMicropyTool = new DynamicStructuredTool({
    name: 'component_decider',
    description: `Decide which component need to be modified based on the prompt, and return the component ids space separated, the ids must be one of the available components in the store, nothing else. The available components are ${oldComponentIDs.join(', ')}`,
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
    // @ts-ignore-next-line
    .filter(id => oldComponentIDs.includes(id))
  console.log('🚀 ~ deicideComponents ~ validComponentIDs:', validComponentIDs)
  return validComponentIDs
}

export const invokeToolsIncludedProvider = async (config: any) => {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  const readableAIState = aiState.get()

  if (config?.aiAgent) {
    console.log('AI PROMPT', config?.prompt)

    const componentIDs = await deicideComponentsToBeChanged(
      config?.prompt,
      readableAIState.componentIDs
    )

    const targetScehma = {}

    // add the schema for the components, who's .id is in the componentIDs array
    for (const property in store) {
      // @ts-ignore-next-line
      if (componentIDs?.includes(store[property]?.id)) {
        // @ts-ignore-next-line
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

    const response = await llmWithTools.invoke(readableAIState.prompt + ' ' + config?.prompt)

    const microcopy = response?.tool_calls?.[0]?.args
    console.log(JSON.stringify(response.tool_calls, null, 2))

    aiState.done({
      ...aiState.get(),
      componentConfig: {
        ...aiState.get().componentConfig,
        ...microcopy
      }
    })


    return microcopy
  }

  if (config.revision) {
    const componentIDs = config?.targetComponentIDs

    const targetScehma = {}

    // add the schema for the components, who's .id is in the componentIDs array
    for (const property in store) {
      // @ts-ignore-next-line
      if (componentIDs?.includes(store[property]?.id)) {
        // @ts-ignore-next-line
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

    console.log("🚀 ~ invokeToolsIncludedProvider ~ readableAIState.prompt + ' ' + config?.prompt:", readableAIState.prompt + ' ' + config?.prompt)
    const response = await llmWithTools.invoke(readableAIState.prompt + ' ' + config?.prompt)

    const microcopy = response?.tool_calls?.[0]?.args
    console.log(JSON.stringify(response.tool_calls, null, 2))

    aiState.done({
      ...aiState.get(),
      componentConfig: {
        ...aiState.get().componentConfig,
        ...microcopy
      }
    })

    return microcopy
  }

  const componentIDs = await deicideComponents(config?.prompt)


  const targetScehma = {
    GLOBAL: z.object({
      brand: z
        .string()
        .describe('suggest a attractive brand name for the brand')
    }),
  }

  // add the schema for the components, who's .id is in the componentIDs array
  for (const property in store) {
    // @ts-ignore-next-line
    if (componentIDs?.includes(store[property]?.id)) {
      // @ts-ignore-next-line
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
    prompt: config?.prompt,
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
  prompt: string
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
    prompt: '',
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
