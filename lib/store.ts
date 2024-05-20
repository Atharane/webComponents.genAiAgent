import { z } from 'zod'

import PrimaryBanner from '@/components/gen/banner'
import PrimaryFooter from '@/components/gen/footer'
import HeroWithImageAndReview from '@/components/gen/heroWithImageAndReview'
import PrimaryProductFeature from '@/components/gen/primaryProductFeature'
import SecondaryDescriptionComponent from '../components/gen/secondaryDescriptionComponent'

const componentsStore = {
  BANNER: {
    rank: 1,
    id: 'BANNER',
    schema: z.object({
      brand: z.string().describe('suggest the same brand name for the website'),
      anchorsString: z
        .string()
        .describe(
          'suggest a list of anchors for the website separated by commas, e.g. Home, About, Services, Contact, FAQs, Careers'
        )
    }),
    component: PrimaryBanner
  },
  FOOTER: {
    rank: 100,
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
    rank: 10,
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
        ),
      heroImageUrl: z
        .string()
        .describe(
          'suggest a description for the hero image, make it descriptive and detailed 6 - 12 words'
        )
    })
  },
  PRIMARY_PRODUCT_FEATURE: {
    rank: 50,
    id: 'PRIMARY_PRODUCT_FEATURE',
    component: PrimaryProductFeature,
    schema: z.object({
      header: z.string().describe('The header of the product feature'),
      subheading: z.string().describe('The subheading of the product feature'),
      statsOne: z.object({
        title: z.string().describe('The title of the first stat'),
        value: z.string().describe('The value of the first stat'),
        imageUrl: z
          .string()
          .describe(
            'suggest a description for the first image accordingly, make it descriptive and detailed 6 - 12 words'
          )
      }),
      statsTwo: z.object({
        title: z.string().describe('The title of the second stat'),
        value: z.string().describe('The value of the second stat'),
        imageUrl: z
          .string()
          .describe(
            'suggest a description for the second image accordingly, make it descriptive and detailed 6 - 12 words'
          )
      }),
      statsThree: z.object({
        title: z.string().describe('The title of the third stat'),
        value: z.string().describe('The value of the third stat'),
        imageUrl: z
          .string()
          .describe(
            'suggest a description for the third image accordingly, make it descriptive and detailed 6 - 12 words'
          )
      }),
      statsFour: z.object({
        title: z.string().describe('The title of the fourth stat'),
        value: z.string().describe('The value of the fourth stat'),

        imageUrl: z
          .string()
          .describe(
            'suggest a description for the fourth image accordingly, make it descriptive and detailed 6 - 12 words'
          )
      }),
      statsFive: z.object({
        title: z.string().describe('The title of the fifth stat'),
        value: z.string().describe('The value of the fifth stat'),
        imageUrl: z
          .string()
          .describe(
            'suggest a description for the fifth image accordingly, make it descriptive and detailed 6 - 12 words'
          )
      }),
      statsSix: z.object({
        title: z.string().describe('The title of the sixth stat'),
        value: z.string().describe('The value of the sixth stat'),
        imageUrl: z
          .string()
          .describe(
            'suggest a description for the sixth image accordingly, make it descriptive and detailed 6 - 12 words'
          )
      })
    })
  },
  SECONDARY_DESCRIPTION: {
    rank: 70,
    id: 'SECONDARY_DESCRIPTION',
    component: SecondaryDescriptionComponent,
    schema: z.object({
      header: z
        .string()
        .describe(
          'The description of the secondary component section approximately 15-20 words'
        ),
      subheader: z
        .string()
        .describe(
          'The sub description of the secondary component section approximately 10-12 words'
        )
    })
  }
}

export default componentsStore
