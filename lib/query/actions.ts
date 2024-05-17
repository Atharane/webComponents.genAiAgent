'use server'

import { ChatOpenAI } from '@langchain/openai'
import { DynamicStructuredTool } from '@langchain/core/tools'

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

  const toolsIncludedProvider = openAIProvider.bindTools([webpageMicropyTool])

  const response = await toolsIncludedProvider.invoke(query)
  console.log('global microcopy', response)

  return response?.tool_calls?.[0]?.args
}
