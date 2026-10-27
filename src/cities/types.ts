/**
 * Programmatic city/state landing pages for the `/electric-cycle-in-*` URL
 * family. Every entry below is hand-written per location — the template
 * composes these fields into a full landing page. NEVER generate two
 * entries with shared sentences: the pages must stay genuinely unique so
 * Google treats them as real city pages, not doorway pages.
 *
 * To add a new city: append an entry to the relevant state file in this
 * directory (or create a new state file and register it in ./index.ts).
 * The route, sitemap entry, metadata and internal links are derived
 * automatically — no other code change is needed.
 */

export interface CityFaq {
  question: string
  answer: string
}

export interface CityWhyPoint {
  title: string
  body: string
}

/** A real commute corridor inside the city, used to prove local relevance. */
export interface CityRoute {
  from: string
  to: string
  /** e.g. "14 km one way" */
  distance: string
  /** Why an Eparv cycle fits this specific corridor. */
  note: string
}

export interface CityPageData {
  /** Full page slug, e.g. "electric-cycle-in-lucknow". */
  slug: string
  /** Display name, e.g. "Lucknow". */
  city: string
  /** State or union territory the city sits in. */
  state: string
  /**
   * Slug of the state hub page this city links up to
   * (e.g. "electric-cycle-in-uttar-pradesh"). null for cities whose state
   * has no dedicated hub yet — the breadcrumb then shows the state as text.
   */
  stateHubSlug: string | null
  /** ~150-character unique meta description. */
  metaDescription: string
  /** Two to three hand-written paragraphs (~60–90 words each) introducing e-cycles for this city. */
  intro: string[]
  /** 4–6 city-specific reasons, each with a real local anchor. */
  whyPoints: CityWhyPoint[]
  /** 4–5 real, well-known commute corridors. */
  routes: CityRoute[]
  /** 8–12 real localities for cities; 6–10 acceptable for smaller towns — only names that genuinely exist. */
  localities: string[]
  /** 4–6 city-specific FAQs with genuinely local answers. */
  faqs: CityFaq[]
  /** Slugs of neighbouring city pages for cross-linking (must exist in the registry; unknown slugs are filtered out). */
  nearbySlugs: string[]
}

export interface StatePageData {
  /** Full page slug, e.g. "electric-cycle-in-uttar-pradesh". */
  slug: string
  /** Display name, e.g. "Uttar Pradesh". */
  state: string
  /** ~150-character unique meta description. */
  metaDescription: string
  /** Two hand-written paragraphs about riding e-cycles across this state. */
  intro: string[]
  /** 4 state-level reasons. */
  whyPoints: CityWhyPoint[]
  /** 4 state-level FAQs. */
  faqs: CityFaq[]
  /**
   * For state hubs: derived automatically from city entries whose
   * stateHubSlug matches. For region pages (e.g. Delhi NCR) list the
   * member city slugs explicitly.
   */
  linkedCitySlugs?: string[]
}
