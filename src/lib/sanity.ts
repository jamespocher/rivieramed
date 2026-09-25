import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'amas9704',
  dataset: 'riviera-med',
  useCdn: import.meta.env.PROD,
  apiVersion: '2024-01-01',
})
