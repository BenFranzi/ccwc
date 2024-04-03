type Options = {
    c: boolean;
    l: boolean;
    w: boolean;
    m: boolean;
    file?: string;
}

type Result = {
    bytes: number;
    lines: number;
    words: number;
    characters: number;
}