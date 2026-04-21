// Article data and interfaces
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  relatedArticleIds: number[];
  readingTime: number;
  relatedProductIds: number[];
  datePublished: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'The Truth About Plastic Pollution',
    excerpt: 'Discover how plastic pollution is affecting our oceans and what you can do to help reduce your plastic footprint.',
    category: 'Plastic Pollution',
    content: `# The Truth About Plastic Pollution

Plastic pollution has become one of the most pressing environmental challenges of our time. Every year, millions of tons of plastic waste end up in our oceans, landfills, and ecosystems, causing irreversible damage to wildlife and human health.

## The Scale of the Problem

Did you know that over 8 million tons of plastic enter our oceans annually? This staggering number represents just the tip of the iceberg. Plastic takes hundreds of years to decompose, and in the process, it breaks down into microplastics that contaminate our food chain and drinking water.

## Impact on Marine Life

Marine animals often mistake plastic debris for food, leading to injury, starvation, and death. Sea turtles, whales, and seabirds are particularly vulnerable to plastic entanglement and ingestion. Microplastics have been found in the tissues of fish and shellfish that we consume, raising serious health concerns.

## What You Can Do

The solution starts with reducing your plastic consumption. Choose reusable alternatives, support businesses committed to plastic-free packaging, and participate in beach cleanups. Every small action contributes to a larger movement toward a plastic-free future.`,
    relatedArticleIds: [2, 5],
    readingTime: 4,
    relatedProductIds: [1, 8, 10, 16],
    datePublished: '2024-01-15'
  },
  {
    id: 2,
    title: 'Understanding Your Carbon Footprint',
    excerpt: 'Learn how to calculate and reduce your personal carbon footprint through sustainable lifestyle choices.',
    category: 'Carbon Footprint',
    content: `# Understanding Your Carbon Footprint

Your carbon footprint represents the total amount of greenhouse gases, primarily carbon dioxide, produced by your actions. Understanding and reducing your carbon footprint is crucial for combating climate change.

## What Contributes to Your Carbon Footprint?

Your daily activities contribute to your carbon footprint in various ways. Transportation, energy consumption at home, food choices, and shopping habits all play a role. On average, a person in a developed country produces about 16 tons of CO2 annually.

## The Biggest Contributors

Transportation is often the largest contributor to personal carbon footprints, especially air travel and driving. Food production, particularly meat consumption, is another significant factor. Energy use in homes for heating, cooling, and electricity also contributes substantially.

## Reducing Your Carbon Footprint

Simple changes can make a big difference. Choose sustainable transportation options like public transit or cycling. Reduce meat consumption and buy local, seasonal produce. Improve home energy efficiency through better insulation and renewable energy sources. Every ton of CO2 you prevent from entering the atmosphere matters.`,
    relatedArticleIds: [1, 3],
    readingTime: 5,
    relatedProductIds: [4, 9, 17],
    datePublished: '2024-02-10'
  },
  {
    id: 3,
    title: 'Sustainable Fashion: Making Better Choices',
    excerpt: 'Explore how the fashion industry impacts the environment and discover how to build a sustainable wardrobe.',
    category: 'Sustainable Fashion',
    content: `# Sustainable Fashion: Making Better Choices

The fashion industry is one of the most polluting industries globally, second only to oil production. By making conscious fashion choices, you can significantly reduce your environmental impact.

## The Environmental Cost of Fast Fashion

Fast fashion encourages overconsumption and produces massive amounts of textile waste. The industry uses enormous quantities of water, chemicals, and energy. Synthetic fabrics shed microplastics that pollute our oceans, and workers in developing countries often face poor working conditions.

## Building a Sustainable Wardrobe

Start by buying less and choosing quality over quantity. Invest in timeless pieces made from sustainable materials like organic cotton, linen, and bamboo. Support ethical brands that prioritize fair wages and safe working conditions. Consider buying secondhand clothing and participating in clothing swaps.

## The Power of Conscious Consumption

Every purchase is a vote for the kind of world you want to live in. By choosing sustainable fashion, you support businesses that respect both people and the planet. You also reduce demand for harmful fast fashion practices.`,
    relatedArticleIds: [1, 4],
    readingTime: 4,
    relatedProductIds: [2, 7, 11],
    datePublished: '2024-03-05'
  },
  {
    id: 4,
    title: 'The Benefits of Organic Agriculture',
    excerpt: 'Discover why organic farming is better for the environment and your health.',
    category: 'Sustainable Agriculture',
    content: `# The Benefits of Organic Agriculture

Organic agriculture represents a more sustainable approach to food production. By avoiding synthetic pesticides and fertilizers, organic farming protects soil health, water quality, and biodiversity.

## Why Organic Matters

Conventional agriculture relies heavily on synthetic chemicals that damage ecosystems and accumulate in our bodies. Organic farming works with nature, using crop rotation, composting, and natural pest management to maintain soil fertility and prevent disease.

## Environmental Benefits

Organic farms support greater biodiversity, with more insects, birds, and microorganisms than conventional farms. They use significantly less water and energy, and they don't contaminate groundwater with chemical runoff. Organic soil also sequesters more carbon, helping combat climate change.

## Health and Nutritional Advantages

Studies show that organic produce contains higher levels of certain nutrients and antioxidants. By avoiding pesticide residues, you reduce your exposure to potentially harmful chemicals. Supporting organic farming also ensures better working conditions for agricultural workers.`,
    relatedArticleIds: [2, 5],
    readingTime: 4,
    relatedProductIds: [4, 9, 13, 17],
    datePublished: '2024-04-20'
  },
  {
    id: 5,
    title: 'Ocean Conservation: Protecting Our Blue Planet',
    excerpt: 'Learn about the threats facing our oceans and how you can help protect marine ecosystems.',
    category: 'Ocean Conservation',
    content: `# Ocean Conservation: Protecting Our Blue Planet

Our oceans cover 71% of Earth's surface and are vital to all life. Yet they face unprecedented threats from pollution, overfishing, and climate change. Protecting our oceans is essential for the survival of countless species and human communities.

## Threats to Marine Ecosystems

Ocean acidification, caused by increased CO2 absorption, threatens coral reefs and shellfish. Overfishing has depleted many fish stocks, disrupting the entire food chain. Plastic pollution and chemical contamination harm marine life at every level.

## What's Being Done

Marine protected areas are being established to allow ecosystems to recover. Sustainable fishing practices are being promoted to prevent overharvesting. International agreements aim to reduce ocean pollution and protect endangered species.

## How You Can Help

Make sustainable seafood choices by avoiding overfished species. Reduce your plastic consumption to prevent ocean pollution. Support organizations working to protect marine ecosystems. Choose sustainable tourism options that don't harm coral reefs or marine habitats.`,
    relatedArticleIds: [1, 2],
    readingTime: 5,
    relatedProductIds: [8, 3, 5],
    datePublished: '2024-05-15'
  },
  {
    id: 6,
    title: 'Zero Waste Living: A Practical Guide',
    excerpt: 'Explore practical strategies for reducing waste and moving toward a zero-waste lifestyle.',
    category: 'Waste Reduction',
    content: `# Zero Waste Living: A Practical Guide

Zero waste living is about reducing the amount of trash you send to landfills. It's not about perfection but about making conscious choices that minimize your environmental impact.

## The Waste Hierarchy

The most effective approach follows the waste hierarchy: Refuse, Reduce, Reuse, Recycle, and Compost. Refusing unnecessary items prevents waste before it starts. Reducing consumption is more effective than recycling, as it requires less energy and resources.

## Practical Steps to Get Started

Start with the easiest changes: bring reusable bags to the store, buy in bulk to reduce packaging, and choose products with minimal packaging. Compost food scraps and yard waste. Repair items instead of replacing them. Buy secondhand when possible.

## Making It Sustainable

Zero waste living becomes easier with practice. Find local bulk stores and farmers markets. Connect with your community through repair cafes and clothing swaps. Remember that progress is more important than perfection.`,
    relatedArticleIds: [1, 3],
    readingTime: 4,
    relatedProductIds: [1, 3, 8, 16],
    datePublished: '2024-06-10'
  },
  {
    id: 7,
    title: 'Climate Change: What You Need to Know',
    excerpt: 'Understand the science behind climate change and its impact on our planet.',
    category: 'Climate Change',
    content: `# Climate Change: What You Need to Know

Climate change is the defining challenge of our time. Rising global temperatures are causing widespread environmental, economic, and social impacts. Understanding the science is the first step toward taking meaningful action.

## The Science Behind Climate Change

The greenhouse effect is a natural process that keeps Earth warm enough for life. However, human activities, particularly burning fossil fuels, have increased atmospheric CO2 levels by 50% since pre-industrial times. This enhanced greenhouse effect is causing rapid global warming.

## Observable Impacts

We're already seeing the effects: rising sea levels, more frequent extreme weather events, shifting ecosystems, and species extinction. Coral bleaching, melting ice caps, and changing migration patterns are all signs of a warming planet.

## Solutions and Hope

The transition to renewable energy, improved energy efficiency, and sustainable land use can significantly reduce emissions. Many countries and companies are committing to net-zero targets. Individual actions, combined with systemic change, can make a real difference.`,
    relatedArticleIds: [2, 4],
    readingTime: 5,
    relatedProductIds: [4, 11, 15],
    datePublished: '2024-07-25'
  },
  {
    id: 8,
    title: 'Ethical Consumerism: Shop with Purpose',
    excerpt: 'Learn how to make purchasing decisions that align with your values and support ethical businesses.',
    category: 'Ethical Shopping',
    content: `# Ethical Consumerism: Shop with Purpose

Every purchase you make is a vote for the kind of world you want to live in. Ethical consumerism means making purchasing decisions that consider environmental and social impacts.

## Understanding Labels and Certifications

Look for certifications like Fair Trade, Organic, B Corp, and Rainforest Alliance. These labels indicate that products meet specific environmental and ethical standards. However, not all eco-friendly claims are legitimate, so research companies before buying.

## Supporting Ethical Businesses

Choose companies that are transparent about their supply chains and labor practices. Support local businesses and small producers. Look for businesses that give back to communities or invest in environmental conservation.

## The Power of Your Wallet

Consumer demand drives market change. When you support ethical businesses, you encourage others to adopt sustainable practices. You also send a message that you value sustainability and ethics over cheap prices and convenience.`,
    relatedArticleIds: [3, 5],
    readingTime: 4,
    relatedProductIds: [2, 4, 13, 17],
    datePublished: '2024-08-30'
  },
];
