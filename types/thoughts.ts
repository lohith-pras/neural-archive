/**
 * Represents a category of thoughts in the Neural Archive
 */
export interface ThoughtCategory {
  /** Unique identifier for the thought category */
  id: string;
  
  /** Main title of the thought category */
  title: string;
  
  /** Subtitle providing additional context */
  subtitle: string;
  
  /** Detailed description of the thought category */
  description: string;
  
  /** Path to the folder containing "Mind-Bloom" brain frames */
  folderPath: string;
  
  /** Number of frames available for this thought category */
  frameCount: number;
  
  /** Theme color for this category (e.g., Electric Gold, Neon Blue, Deep Violet) */
  themeColor: string;
  
  /** CSS gradient string for visual effects */
  gradient: string;
  
  /** Statistical metadata about the thought category */
  stats: ThoughtStat[];
  
  /** Content sections with detailed information */
  contentSections: ContentSection[];
}

/**
 * Statistical metadata for a thought category
 */
export interface ThoughtStat {
  /** Label for the statistic (e.g., "Complexity", "Frequency") */
  label: string;
  
  /** Value of the statistic (e.g., "High", "Daily", "9/10") */
  val: string;
}

/**
 * Content section within a thought category
 */
export interface ContentSection {
  /** Title of the content section */
  title: string;
  
  /** Body text of the content section */
  body: string;
}

/**
 * Saved thought captured by the user
 */
export interface SavedThought {
  /** Unique identifier (timestamp) */
  id: number;
  
  /** The thought text */
  text: string;
  
  /** ISO timestamp when the thought was captured */
  timestamp: string;
}
