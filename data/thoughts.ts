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
        contentSections: [
            { title: "The Neural Spark", body: "Every great idea starts with a single synaptic firing. It is the moment where chaos organizes into structure, where noise becomes signal. In this archive, we trace the lineage of these sparks." },
            { title: "The Luminous Void", body: "Thoughts exist in the vacuum between biology and data. They are weightless yet carry the heaviest of consequences. Here, we explore the abstract geometry of the mind." }
        ]
    },
    {
        id: "creative",
        title: "Neon Dreams.",
        subtitle: "Fabricating reality.",
        description: "Where imagination bleeds into the tangible world.",
        folderPath: "/images/blooms/gold", // Reusing gold for demo
        themeColor: "#00FFFF",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #008B8B 100%)",
        stats: [{ label: "Vibrancy", val: "Max" }, { label: "Source", val: "REM" }, { label: "Medium", val: "Visual" }],
        contentSections: [
            { title: "Synthetic Horizons", body: "We build worlds that never were, to understand the one that is. Creativity is not just decoration; it is the source code of the future." },
            { title: "Color Theory of the Soul", body: "Emotions are the palette. Experience is the canvas. We paint with light and shadow, crafting experiences that resonate on a cellular level." }
        ]
    },
    {
        id: "technical",
        title: "Silicon Core.",
        subtitle: "The language of machines.",
        description: "Deconstructing the algorithms that govern our digital existence.",
        folderPath: "/images/blooms/gold", // Reusing gold for demo
        themeColor: "#9370DB",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #4B0082 100%)",
        stats: [{ label: "Complexity", val: "O(n)" }, { label: "Uptime", val: "99.9%" }, { label: "Stack", val: "Full" }],
        contentSections: [
            { title: "Binary Poetry", body: "Code is the modern incantation. With the right words, we summon demons and angels alike. We structure logic to bend reality to our will." },
            { title: "The Ghost in the Machine", body: "As systems grow complex, they exhibit emergent behaviors. Are we programming them, or are they evolving? The line blurs with every commit." }
        ]
    }
];
