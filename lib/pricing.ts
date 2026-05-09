// lib/pricing.ts

export type PricingPlan = {
  plan: string
  pricePerSeat: number // per month
  yearly?: number | "Free" | "Custom";
  customPricing?: boolean
  usagePricing?: boolean
  minSeats?: number
  maxSeats?: number
}

export type ApiPricing = {
  model: string

  standard: {
    input: number
    cachedInput?: number
    output: number
  }

  batch?:{
    input: number
    cachedInput?: number
    output: number
  }

  flex?:{
    input: number
    cachedInput?: number
    output: number
  }

  priority?: {
    input: number
    cachedInput?: number
    output: number
  }
  
  

  unit: string
}

export const PRICING: Record<string, PricingPlan[]> = {
  cursor: [
    { plan: 'Hobby', pricePerSeat: 0 },
    { plan: 'Pro', pricePerSeat: 20 },
    { plan: 'Pro+', pricePerSeat: 60 },
    { plan: 'Ultra', pricePerSeat: 200 }, 
    { plan: 'Team', pricePerSeat: 40 }, 
    { plan: 'Enterprise',customPricing: true ,pricePerSeat: 0}, 

  ],
  github_copilot: [
    { plan: 'Free', pricePerSeat: 0 },
    { plan: 'Pro', pricePerSeat: 10 },
    { plan: 'Pro+', pricePerSeat: 39 },
    { plan: 'Business', pricePerSeat: 19 },
    { plan: 'Enterprise', pricePerSeat: 39 },
  ],
  claude: [
    { plan: 'Free', pricePerSeat: 0 },
    { plan: 'Pro', pricePerSeat: 17 },
    { plan: 'Max', pricePerSeat: 100 },
    { plan: 'Team Standard', pricePerSeat: 20, minSeats: 5 ,maxSeats: 150 },
    { plan: 'Team Premium', pricePerSeat: 100, minSeats: 5 , maxSeats: 150 },
    { plan: 'Enterprise', pricePerSeat: 0, customPricing: true },
  ],

 chatgpt: [
  { plan: 'Free', pricePerSeat: 0 },

  { plan: 'Go', pricePerSeat: 4 },

  { plan: 'Plus', pricePerSeat: 20 },
  { plan: 'Pro', pricePerSeat: 113 },

  {
    plan: 'Business Codex',
    usagePricing: true,
    pricePerSeat: 0,
    
  }, 
  {
    plan: 'Business ChatGPT & Codex',
    pricePerSeat: 20,
    
  },

  {
    plan: 'Enterprise',
    customPricing: true,
    pricePerSeat: 0,
  }, 

  {
    plan: 'API',
    customPricing: true,
    pricePerSeat: 0,
  }, 

],
  gemini: [
    {
      "plan": "Free (15 GB)",
      "pricePerSeat": 0
    },
    {
      "plan": "Lite (30 GB)",
      "pricePerSeat": 0.62
    },
    {
      "plan": "Basic (100 GB)",
      "pricePerSeat": 1.38
    },
    {
      "plan": "Standard (200 GB)",
      "pricePerSeat": 2.22
    },
    {
      "plan": "Google AI Plus (200 GB)",
      "pricePerSeat": 4.23
    },
    {
      "plan": "Premium (2 TB)",
      "pricePerSeat": 6.88
    },
    {
      "plan": "Google AI Pro (5 TB)",
      "pricePerSeat": 20.65
    }
  ],

  windsurf: [
    { plan: 'Free', pricePerSeat: 0 },
    { plan: 'Pro', pricePerSeat: 20 },
    { plan: 'Max', pricePerSeat: 200 },
    { plan: 'Teams', pricePerSeat: 40 },
    { plan: 'Enterprise', pricePerSeat: 0 ,customPricing:true },

  ],
}


export const CLAUDE_API_PRICING: ApiPricing[] = [
  {
    model: 'Opus 4.7',
    standard: {
      input: 5,
      cachedInput: 0.5,
      output: 25,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'Sonnet 4.6',
    standard: {
      input: 3,
      cachedInput: 0.3,
      output: 15,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'Haiku 4.5',
    standard: {
      input: 1,
      cachedInput: 0.1,
      output: 5,
    },
    unit: 'per 1M tokens',
  },
]



export const OPENAI_API_PRICING: ApiPricing[] = [
  {
    model: 'gpt-5.5',

    standard: {
      input: 5,
      cachedInput: 0.5,
      output: 30,
    },

    priority: {
      input: 10,
      cachedInput: 1,
      output: 45,
    },

    unit: '$ / 1M tokens',
  },

  {
    model: 'gpt-5.5-pro',

    standard: {
      input: 30,
      output: 180,
    },

    priority: {
      input: 60,
      output: 270,
    },

    unit: '$ / 1M tokens',
  },

  {
    model: 'gpt-5.4',

    standard: {
      input: 2.5,
      cachedInput: 0.25,
      output: 15,
    },

    priority: {
      input: 5,
      cachedInput: 0.5,
      output: 22.5,
    },

    unit: '$ / 1M tokens',
  },

  {
    model: 'gpt-5.4-mini',

    standard: {
      input: 0.75,
      cachedInput: 0.075,
      output: 4.5,
    },

    unit: '$ / 1M tokens',
  },

  {
    model: 'gpt-5.4-nano',

    standard: {
      input: 0.2,
      cachedInput: 0.02,
      output: 1.25,
    },

    unit: '$ / 1M tokens',
  },

  {
    model: 'gpt-5.4-pro',

    standard: {
      input: 30,
      output: 180,
    },

    priority: {
      input: 60,
      output: 270,
    },

    unit: '$ / 1M tokens',
  },
  {
    model: 'gpt-5.1',
    standard: { input: 1.25, cachedInput: 0.125, output: 10 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-5',
    standard: { input: 1.25, cachedInput: 0.125, output: 10 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-5-mini',
    standard: { input: 0.25, cachedInput: 0.025, output: 2 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-5-nano',
    standard: { input: 0.05, cachedInput: 0.005, output: 0.4 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-5-pro',
    standard: { input: 15, output: 120 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4.1',
    standard: { input: 2, cachedInput: 0.5, output: 8 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4.1-mini',
    standard: { input: 0.4, cachedInput: 0.1, output: 1.6 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4.1-nano',
    standard: { input: 0.1, cachedInput: 0.025, output: 0.4 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4o',
    standard: { input: 2.5, cachedInput: 1.25, output: 10 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4o-mini',
    standard: { input: 0.15, cachedInput: 0.075, output: 0.6 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o4-mini',
    standard: { input: 1.1, cachedInput: 0.275, output: 4.4 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o3',
    standard: { input: 2, cachedInput: 0.5, output: 8 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o3-mini',
    standard: { input: 1.1, cachedInput: 0.55, output: 4.4 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o3-pro',
    standard: { input: 20, output: 80 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o1',
    standard: { input: 15, cachedInput: 7.5, output: 60 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o1-mini',
    standard: { input: 1.1, cachedInput: 0.55, output: 4.4 },
    unit: 'per 1M tokens',
  },
  {
    model: 'o1-pro',
    standard: { input: 150, output: 600 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4o-2024-05-13',
    standard: { input: 5, output: 15 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-turbo-2024-04-09',
    standard: { input: 10, output: 30 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-0125-preview',
    standard: { input: 10, output: 30 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-1106-preview',
    standard: { input: 10, output: 30 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-1106-vision-preview',
    standard: { input: 10, output: 30 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-0613',
    standard: { input: 30, output: 60 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-0314',
    standard: { input: 30, output: 60 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-4-32k',
    standard: { input: 60, output: 120 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-turbo',
    standard: { input: 0.5, output: 1.5 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-turbo-0125',
    standard: { input: 0.5, output: 1.5 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-turbo-1106',
    standard: { input: 1, output: 2 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-turbo-0613',
    standard: { input: 1.5, output: 2 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-0301',
    standard: { input: 1.5, output: 2 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-turbo-instruct',
    standard: { input: 1.5, output: 2 },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-3.5-turbo-16k-0613',
    standard: { input: 3, output: 4 },
    unit: 'per 1M tokens',
  },
  {
    model: 'davinci-002',
    standard: { input: 2, output: 2 },
    unit: 'per 1M tokens',
  },
  {
    model: 'babbage-002',
    standard: { input: 0.4, output: 0.4 },
    unit: 'per 1M tokens',
  },
]

export const OPENAI_MULTIMODAL_PRICING: ApiPricing[] = [
  {
    model: 'gpt-realtime-2 (Audio)',
    standard: {
      input: 32,
      cachedInput: 0.4,
      output: 64,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-realtime-2 (Text)',
    standard: {
      input: 4,
      cachedInput: 0.4,
      output: 24,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-realtime-2 (Image)',
    standard: {
      input: 5,
      cachedInput: 0.5,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-realtime-translate',
    standard: {
      input: 0,
      output: 0.034,
    },
    unit: 'per minute',
  },

  {
    model: 'gpt-realtime-whisper',
    standard: {
      input: 0,
      output: 0.017,
    },
    unit: 'per minute',
  },

  {
    model: 'gpt-realtime-1.5 (Audio)',
    standard: {
      input: 32,
      cachedInput: 0.4,
      output: 64,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-realtime-1.5 (Text)',
    standard: {
      input: 4,
      cachedInput: 0.4,
      output: 16,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-realtime-1.5 (Image)',
    standard: {
      input: 5,
      cachedInput: 0.5,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-realtime-mini (Audio)',
    standard: {
      input: 10,
      cachedInput: 0.3,
      output: 20,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-realtime-mini (Text)',
    standard: {
      input: 0.6,
      cachedInput: 0.06,
      output: 2.4,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-realtime-mini (Image)',
    standard: {
      input: 0.8,
      cachedInput: 0.08,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-audio-1.5 (Audio)',
    standard: {
      input: 32,
      output: 64,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-audio-1.5 (Text)',
    standard: {
      input: 2.5,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-audio-mini (Audio)',
    standard: {
      input: 10,
      output: 20,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-audio-mini (Text)',
    standard: {
      input: 0.6,
      output: 2.4,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'tts-1',
    standard: {
      input: 15,
      output: 0,
    },
    unit: 'per 1M characters',
  },

  {
    model: 'tts-1-hd',
    standard: {
      input: 30,
      output: 0,
    },
    unit: 'per 1M characters',
  },
]

export const OPENAI_IMAGE_PRICING: ApiPricing[] = [
  {
    model: 'gpt-image-2 (Image)',
    standard: {
      input: 8,
      cachedInput: 2,
      output: 30,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-image-2 (Text)',
    standard: {
      input: 5,
      cachedInput: 1.25,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-image-1.5 (Image)',
    standard: {
      input: 8,
      cachedInput: 2,
      output: 32,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-image-1.5 (Text)',
    standard: {
      input: 5,
      cachedInput: 1.25,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-image-1-mini (Image)',
    standard: {
      input: 2.5,
      cachedInput: 0.25,
      output: 8,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-image-1-mini (Text)',
    standard: {
      input: 2,
      cachedInput: 0.2,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-image-1 (Image)',
    standard: {
      input: 10,
      cachedInput: 2.5,
      output: 40,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'gpt-image-1 (Text)',
    standard: {
      input: 5,
      cachedInput: 1.25,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'chatgpt-image-latest (Image)',
    standard: {
      input: 8,
      cachedInput: 2,
      output: 32,
    },
    unit: 'per 1M tokens',
  },
  {
    model: 'chatgpt-image-latest (Text)',
    standard: {
      input: 5,
      cachedInput: 1.25,
      output: 10,
    },
    unit: 'per 1M tokens',
  },
]

export const OPENAI_VIDEO_PRICING: ApiPricing[] = [
  {
    model: 'sora-2 (720p)',
    standard: {
      input: 0,
      output: 0.1,
    },
    unit: 'per second',
  },

  {
    model: 'sora-2-pro (720p)',
    standard: {
      input: 0,
      output: 0.3,
    },
    unit: 'per second',
  },

  {
    model: 'sora-2-pro (1024p)',
    standard: {
      input: 0,
      output: 0.5,
    },
    unit: 'per second',
  },

  {
    model: 'sora-2-pro (1080p)',
    standard: {
      input: 0,
      output: 0.7,
    },
    unit: 'per second',
  },
]

export const OPENAI_TRANSCRIPTION_PRICING: ApiPricing[] = [
  {
    model: 'gpt-4o-transcribe',
    standard: {
      input: 2.5,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4o-mini-transcribe',
    standard: {
      input: 1.25,
      output: 5,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4o-transcribe-diarize',
    standard: {
      input: 2.5,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'Whisper',
    standard: {
      input: 0,
      output: 0.006,
    },
    unit: 'per minute',
  },
]

export const OPENAI_TOOL_PRICING = [
  {
    tool: 'Web search',
    details: 'Web search (all models)',
    pricing: '$10 / 1k calls + model token costs',
  },

  {
    tool: 'Web search preview',
    details: 'Reasoning models (gpt-5, o-series)',
    pricing: '$10 / 1k calls + model token costs',
  },

  {
    tool: 'Web search preview',
    details: 'Non-reasoning models',
    pricing: '$25 / 1k calls (search tokens free)',
  },

  {
    tool: 'Containers',
    details: 'Hosted Shell & Code Interpreter',
    pricing:
      '1GB $0.03, 4GB $0.12, 16GB $0.48, 64GB $1.92 per 20-min session',
  },

  {
    tool: 'File search',
    details: 'Storage',
    pricing: '$0.10 / GB per day (1GB free)',
  },

  {
    tool: 'File search',
    details: 'Tool call',
    pricing: '$2.50 / 1k calls',
  },

  {
    tool: 'Agent Kit',
    details: 'ChatKit upload storage',
    pricing: '$0.10 / GB-day after 1GB free/month',
  },
]

export const OPENAI_SPECIALIZED_PRICING: ApiPricing[] = [
  {
    model: 'chat-latest',
    standard: {
      input: 5,
      cachedInput: 0.5,
      output: 30,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.3-chat-latest',
    standard: {
      input: 1.75,
      cachedInput: 0.175,
      output: 14,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.2-chat-latest',
    standard: {
      input: 1.75,
      cachedInput: 0.175,
      output: 14,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.1-chat-latest',
    standard: {
      input: 1.25,
      cachedInput: 0.125,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5-chat-latest',
    standard: {
      input: 1.25,
      cachedInput: 0.125,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'chatgpt-4o-latest',
    standard: {
      input: 5,
      output: 15,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.3-codex',
    standard: {
      input: 1.75,
      cachedInput: 0.175,
      output: 14,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.2-codex',
    standard: {
      input: 1.75,
      cachedInput: 0.175,
      output: 14,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.1-codex-max',
    standard: {
      input: 1.25,
      cachedInput: 0.125,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.1-codex',
    standard: {
      input: 1.25,
      cachedInput: 0.125,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5-codex',
    standard: {
      input: 1.25,
      cachedInput: 0.125,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5.1-codex-mini',
    standard: {
      input: 0.25,
      cachedInput: 0.025,
      output: 2,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'codex-mini-latest',
    standard: {
      input: 1.5,
      cachedInput: 0.375,
      output: 6,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-5-search-api',
    standard: {
      input: 1.25,
      cachedInput: 0.125,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4o-search-preview',
    standard: {
      input: 2.5,
      output: 10,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4o-mini-search-preview',
    standard: {
      input: 0.15,
      output: 0.6,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'o3-deep-research',
    standard: {
      input: 10,
      cachedInput: 2.5,
      output: 40,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'o4-mini-deep-research',
    standard: {
      input: 2,
      cachedInput: 0.5,
      output: 8,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'computer-use-preview',
    standard: {
      input: 3,
      output: 12,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'text-embedding-3-small',
    standard: {
      input: 0.02,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'text-embedding-3-large',
    standard: {
      input: 0.13,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'text-embedding-ada-002',
    standard: {
      input: 0.1,
      output: 0,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'omni-moderation-latest',
    standard: {
      input: 0,
      output: 0,
    },
    unit: 'free',
  },

  {
    model: 'text-moderation-latest',
    standard: {
      input: 0,
      output: 0,
    },
    unit: 'free',
  },
]

export const OPENAI_FINETUNING_PRICING = [
  {
    model: 'o4-mini-2025-04-16',
    training: '$100 / hour',
    standard: {
      input: 4,
      cachedInput: 1,
      output: 16,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'o4-mini-2025-04-16 (with data sharing)',
    training: '$100 / hour',
    standard: {
      input: 2,
      cachedInput: 0.5,
      output: 8,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4.1-2025-04-14',
    training: '$25',
    standard: {
      input: 3,
      cachedInput: 0.75,
      output: 12,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4.1-mini-2025-04-14',
    training: '$5',
    standard: {
      input: 0.8,
      cachedInput: 0.2,
      output: 3.2,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4.1-nano-2025-04-14',
    training: '$1.50',
    standard: {
      input: 0.2,
      cachedInput: 0.05,
      output: 0.8,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4o-2024-08-06',
    training: '$25',
    standard: {
      input: 3.75,
      cachedInput: 1.875,
      output: 15,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-4o-mini-2024-07-18',
    training: '$3',
    standard: {
      input: 0.3,
      cachedInput: 0.15,
      output: 1.2,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'gpt-3.5-turbo (Legacy)',
    training: '$8',
    standard: {
      input: 3,
      output: 6,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'davinci-002 (Legacy)',
    training: '$6',
    standard: {
      input: 12,
      output: 12,
    },
    unit: 'per 1M tokens',
  },

  {
    model: 'babbage-002 (Legacy)',
    training: '$0.40',
    standard: {
      input: 1.6,
      output: 1.6,
    },
    unit: 'per 1M tokens',
  },
]