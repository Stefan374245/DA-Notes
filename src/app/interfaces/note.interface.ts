export interface Note {
    id?: string;
    type: "note" | "trash";
    title: string;
    content: string;
    marked: boolean;
    uid?: string; // User-ID für Multi-User
}
