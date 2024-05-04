import { z } from 'zod'

import PrimaryBanner from '@/components/gen/banner'
import PrimaryFooter from '@/components/gen/footer'
import HeroWithImageAndReview from '@/components/gen/heroWithImageAndReview'
import PrimaryProductFeature from '@/components/gen/primaryProductFeature'

const componentsStore = {
  BANNER: {
    id: 'BANNER',
    schema: z.object({
      brand: z.string().describe('suggest a brand name for the website'),
      anchorsString: z
        .string()
        .describe(
          'suggest a list of anchors for the website separated by commas, e.g. Home, About, Services, Contact, FAQs, Careers'
        )
    }),
    component: PrimaryBanner
  },
  FOOTER: {
    id: 'FOOTER',
    component: PrimaryFooter,
    schema: z.object({
      stat1: z.object({
        statName: z.string().describe('The name of the first stat'),
        statValue: z.string().describe('The value of the first stat')
      }),
      stat2: z.object({
        statName: z.string().describe('The name of the second stat'),
        statValue: z.string().describe('The value of the second stat')
      }),
      stat3: z.object({
        statName: z.string().describe('The name of the third stat'),
        statValue: z.string().describe('The value of the third stat')
      })
    })
  },
  HERO_WITH_IMAGE_AND_REVIEW: {
    id: 'HERO_WITH_IMAGE_AND_REVIEW',
    component: HeroWithImageAndReview,
    schema: z.object({
      header: z
        .string()
        .describe('The header of the hero section approximately 5-7 words'),
      subheader: z
        .string()
        .describe(
          'The subheader of the hero section approximately 10-12 words'
        ),
      primaryCTA: z
        .string()
        .describe(
          'The primary call to action of the hero section approximately 1-4 words'
        ),
      secondaryCTA: z
        .string()
        .describe(
          'The secondary call to action of the hero section approximately 1-4 words'
        )
    })
  },
  PRIMARY_PRODUCT_FEATURE: {
    id: 'PRIMARY_PRODUCT_FEATURE',
    component: PrimaryProductFeature,
    schema: z.object({
      header: z.string().describe('The header of the product feature'),
      subheading: z.string().describe('The subheading of the product feature'),
      statsOne: z.object({
        title: z.string().describe('The title of the first stat'),
        value: z.string().describe('The value of the first stat')
      }),
      statsTwo: z.object({
        title: z.string().describe('The title of the second stat'),
        value: z.string().describe('The value of the second stat')
      }),
      statsThree: z.object({
        title: z.string().describe('The title of the third stat'),
        value: z.string().describe('The value of the third stat')
      }),
      statsFour: z.object({
        title: z.string().describe('The title of the fourth stat'),
        value: z.string().describe('The value of the fourth stat')
      }),
      statsFive: z.object({
        title: z.string().describe('The title of the fifth stat'),
        value: z.string().describe('The value of the fifth stat')
      }),
      statsSix: z.object({
        title: z.string().describe('The title of the sixth stat'),
        value: z.string().describe('The value of the sixth stat')
      })
    })
  }
}

export default componentsStore
