export interface ThoughtCategory {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    folderPath: string; // Path to "Mind-Bloom" brain frames
    themeColor: string; // Electric Gold, Neon Blue, or Deep Violet
    gradient: string;
    stats: { label: string; val: string }[]; // e.g., { label: "Complexity", val: "High" }
    contentSections: { title: string; body: string }[];
}

export const thoughts: ThoughtCategory[] = [
    {
        id: "philosophy",
        title: "Deep Logic.",
        subtitle: "The architecture of 'Why'.",
        description: "Exploring the foundational structures of human reasoning.",
        folderPath: "/images/blooms/gold", // We only have gold frames for now
        themeColor: "#FFD700",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #B8860B 100%)",
        stats: [{ label: "Depth", val: "9/10" }, { label: "Frequency", val: "Daily" }, { label: "Type", val: "Abstract" }],
        contentSections: []
    },
];
