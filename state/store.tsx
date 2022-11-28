import create from 'zustand';

type State = {
    seriesDetails: {
        image: {
            medium: string
            original: string
        },
        name: string,
        summary: string,
        schedule: {
            days: string,
            time: string
        },
        genres: string[]
    },
    episodeList: [],
    currentEpisode: {
        "_links": {
            "self": {
                "href": string
            },
            "show": {
                "href": string
            }
        },
        "airdate": string,
        "airstamp": string,
        "airtime": string,
        "id": number,
        "image": {
        "medium": string,
        "original": string
        },
        "name": string,
        "number": number,
        "rating": {
        "average": number
        },
        "runtime": number,
        "season": number,
        "summary": string,
        "type": string,
        "url": string
    };
}
  
type Action = {
    saveSeriesDetails: (showDetails: State["seriesDetails"]) => void;
    saveEpisodeList: (episodeList: []) => void;
    saveCurrentEpisode: (currentEpisode: State["currentEpisode"]) => void;
}

const useStore = create<State & Action>((set) => ({
    seriesDetails: {
        image: {
            medium: '',
            original: ''
        },
        name: '',
        summary: '',
        schedule: {
            days: '',
            time: ''
        },
        genres: []
    },
    saveSeriesDetails:  (seriesDetails) => set({seriesDetails:  seriesDetails}),
    episodeList: [],
    saveEpisodeList: (episodeList) => set({episodeList: episodeList}),
    currentEpisode: {
        "_links": {
            "self": {
                "href": ""
            },
            "show": {
                "href": ""
            }
        },
        "airdate": "",
        "airstamp": "",
        "airtime": "",
        "id": 0,
        "image": {
        "medium": "",
        "original": ""
        },
        "name": "",
        "number": 0,
        "rating": {
            "average": 0
        },
        "runtime": 0,
        "season": 0,
        "summary": "",
        "type": "",
        "url": ""
    },
    saveCurrentEpisode: (currentEpisode) => set({currentEpisode: currentEpisode}),
}))



export default useStore;