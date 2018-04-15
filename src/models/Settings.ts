
export class Settings {
    static DefaultMaxDays = 1;
    static DefaultMaxSp = 50;
    static DefaultMinRusLetters = 100;
    static DefaultWhitelist = ["veta-less", "afrosiab", "agnessa", "amalinavia", "mister-omortson", "sibr.hus", "eto-ka", "soroka74"];

    isFilterActive_RecentPost: boolean = true;
    isFilterActive_SpLow: boolean = true;
    isFilterActive_Rus: boolean = true;
    isFilterActive_Pictures: boolean = true;
    isFilterActive_Whitelist: boolean = false;
    maxDays: number = Settings.DefaultMaxDays;
    maxSp: number = Settings.DefaultMaxSp;
    minRusLetters: number = Settings.DefaultMinRusLetters;
    whitelist: string[] = Settings.DefaultWhitelist;
}
