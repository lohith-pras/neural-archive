import { ThoughtCategory } from '@/types/thoughts';

export const thoughts: ThoughtCategory[] = [
    {
        id: "philosophy",
        title: "Deep Logic.",
        subtitle: "The architecture of 'Why'.",
        description: "Exploring the foundational structures of human reasoning.",
        folderPath: "/images/blooms/gold",
        frameCount: 90, // WebP converted frames
        themeColor: "#FFD700",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #B8860B 100%)",
        stats: [
            { label: "Depth", val: "9/10" },
            { label: "Frequency", val: "Daily" },
            { label: "Type", val: "Abstract" }
        ],
        contentSections: []
    },
];
