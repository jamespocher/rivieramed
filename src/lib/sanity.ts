import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'amas9704',
  dataset: 'riviera-med',
  useCdn: import.meta.env.PROD,
  apiVersion: '2024-01-01',
})

export type CmsService = {
  icon: string
  title: string
  description: string
}

export type CmsBullet = {
  title: string
  description: string
}

export type CmsTestimonial = {
  quote: string
  author: string
  role: string
  location: string
}

export type CmsFaq = {
  question: string
  answer: string
}

export type HomepageData = {
  heroEyebrow?: string
  heroHeading?: string
  heroHeadingAccent?: string
  heroSubtext?: string
  heroCtaText?: string
  heroTrustBadges?: string[]
  heroTrustCardQuote?: string
  heroTrustCardAttribution?: string
  servicesEyebrow?: string
  servicesHeading?: string
  servicesSubtext?: string
  services?: CmsService[]
  whyEyebrow?: string
  whyHeading?: string
  whyHeadingAccent?: string
  whySubtext?: string
  whyBullets?: CmsBullet[]
  landscapeEyebrow?: string
  landscapeHeading?: string
  testimonialsEyebrow?: string
  testimonialsHeading?: string
  testimonials?: CmsTestimonial[]
  faqEyebrow?: string
  faqHeading?: string
  faqs?: CmsFaq[]
  ctaHeading?: string
  ctaSubtext?: string
  ctaButtonText?: string
}

export const homepageQuery = `*[_type == "homepage"][0]{
  heroEyebrow, heroHeading, heroHeadingAccent, heroSubtext, heroCtaText,
  heroTrustBadges, heroTrustCardQuote, heroTrustCardAttribution,
  servicesEyebrow, servicesHeading, servicesSubtext,
  services[]{ icon, title, description },
  whyEyebrow, whyHeading, whyHeadingAccent, whySubtext,
  whyBullets[]{ title, description },
  landscapeEyebrow, landscapeHeading,
  testimonialsEyebrow, testimonialsHeading,
  testimonials[]{ quote, author, role, location },
  faqEyebrow, faqHeading,
  faqs[]{ question, answer },
  ctaHeading, ctaSubtext, ctaButtonText
}`

export const leistungenQuery = `*[_type == "leistungen"][0]{
  eyebrow, heading, subtext, ctaText,
  items[]{ icon, title, text }
}`

export const tarifeQuery = `*[_type == "tarife"][0]{
  eyebrow, heading, subtext,
  pflegeHeading, pflegeSubtext, pflegeRows[]{ label, unit, price, note },
  haushaltsHeading, haushaltsSubtext, haushaltsRows[]{ label, unit, price, note },
  nachtHeading, nachtSubtext, nachtRows[]{ label, unit, price, note },
  finanzierungHeading, finanzierungItems[]{ q, a },
  ctaHeading, ctaSubtext
}`

export const ueberUnsQuery = `*[_type == "ueberUns"][0]{
  eyebrow, heading, subtext,
  stats[]{ number, label },
  teamEyebrow, teamHeading, teamSubtext,
  team[]{ name, role, bio }
}`

export const kontaktQuery = `*[_type == "kontakt"][0]{
  eyebrow, heading, subtext,
  formEyebrow, formHeading, formSubtext
}`

export const datenschutzQuery = `*[_type == "datenschutz"][0]{
  title, stand, body
}`

export const impressumQuery = `*[_type == "impressum"][0]{
  companyName, street, city, phone, phoneTel, email, hinEmail, extraInfo
}`
