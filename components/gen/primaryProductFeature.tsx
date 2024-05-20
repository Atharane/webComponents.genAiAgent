const fallback = {
  header: 'Product Specifications',
  subheading:
    "Elevate every moment with a touch of luxury that’s designed to dazzle. It's not just a product, it's a lifestyle revolution, crafted for the discerning few. Indulge in the extraordinary—where every detail is a masterpiece of innovation. Embrace the future with a design that's as stunning as it is smart. Why settle for ordinary when you can experience the extraordinary?",
  statsOne: {
    title: 'Weight',
    value: '12.4 oz',
    imageUrl:
      'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg'
  },
  statsTwo: {
    title: 'Dimensions',
    value: '6.25&quot; x 3.55&quot; x 1.15&quot;',
    imageUrl:
      'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg'
  },
  statsThree: {
    title: 'Material',
    value:
      'Solid walnut base with rare earth magnets and powder coated steel card cover',
    imageUrl:
      'https://tailwindui.com/img/ecommxerce-images/product-feature-03-detail-03.jpg'
  },
  statsFour: {
    title: 'Finish',
    value: 'Hand sanded and finished with natural oil',
    imageUrl:
      'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg'
  },
  statsFive: {
    title: 'Includes',
    value: 'Wood card tray and 3 refill packs'
  },
  statsSix: {
    title: 'Considerations',
    value: 'Made from natural materials. Grain and color vary with each item.'
  }
}

const PrimaryProductFeature = (props: {
  header?: string
  subheading?: string
  statsOne?: { title: string; value: string; imageUrl: string }
  statsTwo?: { title: string; value: string; imageUrl: string }
  statsThree?: { title: string; value: string; imageUrl: string }
  statsFour?: { title: string; value: string; imageUrl: string }
  statsFive?: { title: string; value: string; imageUrl: string }
  statsSix?: { title: string; value: string; imageUrl: string }
}) => {
  const config = {
    ...fallback,
    ...props
  }

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {config.header}
            </h2>
            <p className="mt-4 text-gray-500">{config.subheading}</p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  {config.statsOne.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {config.statsOne.value}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  {config.statsTwo.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {config.statsThree.value}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  {config.statsThree.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {config.statsThree.value}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  {config.statsFour.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {config.statsFour.value}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  {config.statsFive.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {config.statsFive.value}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  {config.statsSix.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {config.statsSix.value}
                </dd>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src={
                props?.statsOne?.imageUrl
                ? `https://image.pollinations.ai/prompt/${props.statsOne?.imageUrl}?width=1080&height=1420&nologo=true`
                : config.statsOne.imageUrl
              }
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={
                props?.statsTwo?.imageUrl
                ? `https://image.pollinations.ai/prompt/${props.statsTwo?.imageUrl}?width=1080&height=1420&nologo=true`
                : config.statsTwo.imageUrl
              }
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={
                props?.statsThree?.imageUrl
                ? `https://image.pollinations.ai/prompt/${props.statsThree?.imageUrl}?width=1080&height=1420&nologo=true`
                : config.statsThree.imageUrl
              }
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={
                props?.statsFour?.imageUrl
                ? `https://image.pollinations.ai/prompt/${props.statsFour?.imageUrl}?width=1080&height=1420&nologo=true`
                : config.statsFour.imageUrl
              }
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrimaryProductFeature
