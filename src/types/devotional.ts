export interface DevotionalResponse {
    title: {
        content: string;
    };
    description: {
        content: string;
    };
    targetPublic: {
        content: string;
    };
    weeksDetailed: Array<{
        week: {
            content: string;
        };
        subtitle: {
            content: string;
        };
        scripture: {
            items: string[];
        };
        reflection: {
            items: string[];
        };
        practical: {
            items: string[];
        };
        motivation: {
            content: string;
        };
    }>;
}