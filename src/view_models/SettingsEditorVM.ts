import { PostViewer, Settings } from '../models/Settings'

export class SettingsEditorVM {
    isFilterActive_RecentPost: boolean = true;
    isFilterActive_SpLow: boolean = true;
    isFilterActive_Rus: boolean = true;
    isFilterActive_Pictures: boolean = true;
    isFilterActive_Whitelist: boolean = false;
    isFilterActive_NotRewarded: boolean = true;
    maxDays: string = "";
    maxSp: string = "";
    minRusLetters: string = "";
    whitelist: string = "";
    postViewer: PostViewer = Settings.DefaultPostViewer;
}
