(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/data/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "groupStageMatches",
    ()=>groupStageMatches,
    "knockoutMatches",
    ()=>knockoutMatches,
    "participants",
    ()=>participants,
    "predictions",
    ()=>predictions,
    "tournamentState",
    ()=>tournamentState
]);
const participants = [
    {
        id: 'p1',
        name: 'Ana Martin',
        contact: 'ana@example.com',
        accessCode: 'PORRA-ANA1',
        status: 'validado'
    },
    {
        id: 'p2',
        name: 'Carlos Ruiz',
        contact: 'carlos@example.com',
        accessCode: 'PORRA-CAR2',
        status: 'validado'
    },
    {
        id: 'p3',
        name: 'Lucia Vega',
        contact: 'lucia@example.com',
        accessCode: 'PORRA-LUC3',
        status: 'pendiente'
    }
];
function groupMatch(group, number, date, venue, home, away) {
    return {
        id: `g-${group.toLowerCase()}-${number}`,
        group,
        stage: 'Grupo',
        date,
        venue,
        home,
        away,
        status: 'programado'
    };
}
const groupStageMatches = [
    groupMatch('A', 1, '2026-06-11', 'Mexico City', 'Mexico', 'South Africa'),
    groupMatch('A', 2, '2026-06-12', 'Guadalajara', 'South Korea', 'Czechia'),
    groupMatch('A', 3, '2026-06-18', 'Atlanta', 'Czechia', 'South Africa'),
    groupMatch('A', 4, '2026-06-19', 'Guadalajara', 'Mexico', 'South Korea'),
    groupMatch('A', 5, '2026-06-25', 'Mexico City', 'Czechia', 'Mexico'),
    groupMatch('A', 6, '2026-06-25', 'Monterrey', 'South Africa', 'South Korea'),
    groupMatch('B', 1, '2026-06-12', 'Toronto', 'Canada', 'Bosnia and Herzegovina'),
    groupMatch('B', 2, '2026-06-13', 'Santa Clara', 'Qatar', 'Switzerland'),
    groupMatch('B', 3, '2026-06-18', 'Inglewood', 'Switzerland', 'Bosnia and Herzegovina'),
    groupMatch('B', 4, '2026-06-18', 'Vancouver', 'Canada', 'Qatar'),
    groupMatch('B', 5, '2026-06-24', 'Vancouver', 'Switzerland', 'Canada'),
    groupMatch('B', 6, '2026-06-24', 'Seattle', 'Bosnia and Herzegovina', 'Qatar'),
    groupMatch('C', 1, '2026-06-14', 'Foxborough', 'Haiti', 'Scotland'),
    groupMatch('C', 2, '2026-06-13', 'East Rutherford', 'Brazil', 'Morocco'),
    groupMatch('C', 3, '2026-06-20', 'Philadelphia', 'Brazil', 'Haiti'),
    groupMatch('C', 4, '2026-06-19', 'Foxborough', 'Scotland', 'Morocco'),
    groupMatch('C', 5, '2026-06-24', 'Miami Gardens', 'Scotland', 'Brazil'),
    groupMatch('C', 6, '2026-06-24', 'Atlanta', 'Morocco', 'Haiti'),
    groupMatch('D', 1, '2026-06-13', 'Inglewood', 'United States', 'Paraguay'),
    groupMatch('D', 2, '2026-06-14', 'Vancouver', 'Australia', 'Turkiye'),
    groupMatch('D', 3, '2026-06-20', 'Santa Clara', 'Turkiye', 'Paraguay'),
    groupMatch('D', 4, '2026-06-19', 'Seattle', 'United States', 'Australia'),
    groupMatch('D', 5, '2026-06-26', 'Inglewood', 'Turkiye', 'United States'),
    groupMatch('D', 6, '2026-06-26', 'Santa Clara', 'Paraguay', 'Australia'),
    groupMatch('E', 1, '2026-06-15', 'Philadelphia', 'Ivory Coast', 'Ecuador'),
    groupMatch('E', 2, '2026-06-14', 'Houston', 'Germany', 'Curacao'),
    groupMatch('E', 3, '2026-06-20', 'Toronto', 'Germany', 'Ivory Coast'),
    groupMatch('E', 4, '2026-06-21', 'Kansas City', 'Ecuador', 'Curacao'),
    groupMatch('E', 5, '2026-06-25', 'Philadelphia', 'Curacao', 'Ivory Coast'),
    groupMatch('E', 6, '2026-06-25', 'East Rutherford', 'Ecuador', 'Germany'),
    groupMatch('F', 1, '2026-06-14', 'Arlington', 'Netherlands', 'Japan'),
    groupMatch('F', 2, '2026-06-15', 'Monterrey', 'Sweden', 'Tunisia'),
    groupMatch('F', 3, '2026-06-20', 'Houston', 'Netherlands', 'Sweden'),
    groupMatch('F', 4, '2026-06-21', 'Monterrey', 'Tunisia', 'Japan'),
    groupMatch('F', 5, '2026-06-26', 'Arlington', 'Japan', 'Sweden'),
    groupMatch('F', 6, '2026-06-26', 'Kansas City', 'Tunisia', 'Netherlands'),
    groupMatch('G', 1, '2026-06-15', 'Seattle', 'Belgium', 'Egypt'),
    groupMatch('G', 2, '2026-06-16', 'Inglewood', 'Iran', 'New Zealand'),
    groupMatch('G', 3, '2026-06-22', 'Inglewood', 'Belgium', 'Iran'),
    groupMatch('G', 4, '2026-06-22', 'Vancouver', 'New Zealand', 'Egypt'),
    groupMatch('G', 5, '2026-06-27', 'Seattle', 'Egypt', 'Iran'),
    groupMatch('G', 6, '2026-06-27', 'Vancouver', 'New Zealand', 'Belgium'),
    groupMatch('H', 1, '2026-06-15', 'Atlanta', 'Spain', 'Cape Verde'),
    groupMatch('H', 2, '2026-06-15', 'Miami Gardens', 'Saudi Arabia', 'Uruguay'),
    groupMatch('H', 3, '2026-06-21', 'Atlanta', 'Spain', 'Saudi Arabia'),
    groupMatch('H', 4, '2026-06-21', 'Miami Gardens', 'Uruguay', 'Cape Verde'),
    groupMatch('H', 5, '2026-06-27', 'Guadalajara', 'Uruguay', 'Spain'),
    groupMatch('H', 6, '2026-06-26', 'Houston', 'Cape Verde', 'Saudi Arabia'),
    groupMatch('I', 1, '2026-06-16', 'East Rutherford', 'France', 'Senegal'),
    groupMatch('I', 2, '2026-06-16', 'Foxborough', 'Iraq', 'Norway'),
    groupMatch('I', 3, '2026-06-23', 'East Rutherford', 'Norway', 'Senegal'),
    groupMatch('I', 4, '2026-06-22', 'Philadelphia', 'France', 'Iraq'),
    groupMatch('I', 5, '2026-06-26', 'Foxborough', 'Norway', 'France'),
    groupMatch('I', 6, '2026-06-26', 'Toronto', 'Senegal', 'Iraq'),
    groupMatch('J', 1, '2026-06-17', 'Kansas City', 'Argentina', 'Algeria'),
    groupMatch('J', 2, '2026-06-17', 'Santa Clara', 'Austria', 'Jordan'),
    groupMatch('J', 3, '2026-06-22', 'Arlington', 'Argentina', 'Austria'),
    groupMatch('J', 4, '2026-06-23', 'Santa Clara', 'Jordan', 'Algeria'),
    groupMatch('J', 5, '2026-06-28', 'Kansas City', 'Algeria', 'Austria'),
    groupMatch('J', 6, '2026-06-28', 'Arlington', 'Jordan', 'Argentina'),
    groupMatch('K', 1, '2026-06-17', 'Houston', 'Portugal', 'DR Congo'),
    groupMatch('K', 2, '2026-06-18', 'Mexico City', 'Uzbekistan', 'Colombia'),
    groupMatch('K', 3, '2026-06-23', 'Houston', 'Portugal', 'Uzbekistan'),
    groupMatch('K', 4, '2026-06-24', 'Guadalajara', 'Colombia', 'DR Congo'),
    groupMatch('K', 5, '2026-06-28', 'Miami Gardens', 'Colombia', 'Portugal'),
    groupMatch('K', 6, '2026-06-28', 'Atlanta', 'DR Congo', 'Uzbekistan'),
    groupMatch('L', 1, '2026-06-17', 'Toronto', 'Ghana', 'Panama'),
    groupMatch('L', 2, '2026-06-17', 'Arlington', 'England', 'Croatia'),
    groupMatch('L', 3, '2026-06-23', 'Foxborough', 'England', 'Ghana'),
    groupMatch('L', 4, '2026-06-24', 'Toronto', 'Panama', 'Croatia'),
    groupMatch('L', 5, '2026-06-27', 'East Rutherford', 'Panama', 'England'),
    groupMatch('L', 6, '2026-06-27', 'Philadelphia', 'Croatia', 'Ghana')
];
function knockoutMatch(id, stage, date, venue, home, away) {
    return {
        id,
        stage,
        date,
        venue,
        home,
        away,
        status: 'programado'
    };
}
const knockoutMatches = [
    knockoutMatch('m73', 'Ronda de 32', '2026-06-28', 'Los Angeles', '2A', '2B'),
    knockoutMatch('m74', 'Ronda de 32', '2026-06-29', 'Boston', '1E', '3A/B/C/D/F'),
    knockoutMatch('m75', 'Ronda de 32', '2026-06-29', 'Monterrey', '1F', '2C'),
    knockoutMatch('m76', 'Ronda de 32', '2026-06-29', 'Houston', '1C', '2F'),
    knockoutMatch('m77', 'Ronda de 32', '2026-06-30', 'New York/New Jersey', '2E', '2I'),
    knockoutMatch('m78', 'Ronda de 32', '2026-06-30', 'Dallas', '1I', '3C/D/F/G/H'),
    knockoutMatch('m79', 'Ronda de 32', '2026-06-30', 'Mexico City', '1A', '3C/E/F/H/I'),
    knockoutMatch('m80', 'Ronda de 32', '2026-07-01', 'Atlanta', '1L', '3E/H/I/J/K'),
    knockoutMatch('m81', 'Ronda de 32', '2026-07-01', 'San Francisco Bay Area', '1G', '3A/E/H/I/J'),
    knockoutMatch('m82', 'Ronda de 32', '2026-07-01', 'Seattle', '1D', '3B/E/F/I/J'),
    knockoutMatch('m83', 'Ronda de 32', '2026-07-02', 'Toronto', '1H', '2J'),
    knockoutMatch('m84', 'Ronda de 32', '2026-07-02', 'Los Angeles', '2K', '2L'),
    knockoutMatch('m85', 'Ronda de 32', '2026-07-02', 'Vancouver', '1B', '3E/F/G/I/J'),
    knockoutMatch('m86', 'Ronda de 32', '2026-07-03', 'Miami', '1K', '3D/E/I/J/L'),
    knockoutMatch('m87', 'Ronda de 32', '2026-07-03', 'Kansas City', '2D', '2G'),
    knockoutMatch('m88', 'Ronda de 32', '2026-07-03', 'Dallas', '1J', '2H'),
    knockoutMatch('m89', 'Octavos', '2026-07-04', 'Philadelphia', 'Ganador M74', 'Ganador M75'),
    knockoutMatch('m90', 'Octavos', '2026-07-04', 'Houston', 'Ganador M76', 'Ganador M73'),
    knockoutMatch('m91', 'Octavos', '2026-07-05', 'New York/New Jersey', 'Ganador M78', 'Ganador M77'),
    knockoutMatch('m92', 'Octavos', '2026-07-05', 'Mexico City', 'Ganador M79', 'Ganador M80'),
    knockoutMatch('m93', 'Octavos', '2026-07-06', 'Dallas', 'Ganador M83', 'Ganador M84'),
    knockoutMatch('m94', 'Octavos', '2026-07-06', 'Seattle', 'Ganador M81', 'Ganador M82'),
    knockoutMatch('m95', 'Octavos', '2026-07-07', 'Atlanta', 'Ganador M85', 'Ganador M86'),
    knockoutMatch('m96', 'Octavos', '2026-07-07', 'Vancouver', 'Ganador M87', 'Ganador M88'),
    knockoutMatch('m97', 'Cuartos', '2026-07-09', 'Boston', 'Ganador M89', 'Ganador M90'),
    knockoutMatch('m98', 'Cuartos', '2026-07-10', 'Los Angeles', 'Ganador M91', 'Ganador M92'),
    knockoutMatch('m99', 'Cuartos', '2026-07-11', 'Miami', 'Ganador M93', 'Ganador M94'),
    knockoutMatch('m100', 'Cuartos', '2026-07-11', 'Kansas City', 'Ganador M95', 'Ganador M96'),
    knockoutMatch('m101', 'Semifinal', '2026-07-14', 'Dallas', 'Ganador M97', 'Ganador M98'),
    knockoutMatch('m102', 'Semifinal', '2026-07-15', 'Atlanta', 'Ganador M99', 'Ganador M100'),
    knockoutMatch('m104', 'Final', '2026-07-19', 'New York/New Jersey', 'Ganador M101', 'Ganador M102')
];
const tournamentState = {
    semifinalists: [],
    groupWinners: {},
    groupQualified: {},
    bestThirds: [],
    matches: [
        ...groupStageMatches,
        ...knockoutMatches
    ]
};
const predictions = [
    {
        participantId: 'p1',
        locked: true,
        champion: 'Espana',
        semifinalists: [
            'Espana',
            'Argentina',
            'Brasil',
            'Inglaterra'
        ],
        topScorer: 'Kylian Mbappe',
        mvp: 'Pedri',
        groupWinners: {
            A: 'Mexico',
            B: 'Espana',
            C: 'Argentina'
        },
        groupQualified: {
            A: [
                'Mexico',
                'Uruguay'
            ],
            B: [
                'Espana',
                'Japon'
            ],
            C: [
                'Argentina',
                'Serbia'
            ]
        },
        bestThirds: [
            'Estados Unidos',
            'Marruecos',
            'Senegal'
        ],
        matches: [
            {
                matchId: 'g-a-1',
                homeScore: 2,
                awayScore: 1
            },
            {
                matchId: 'g-b-1',
                homeScore: 1,
                awayScore: 1
            },
            {
                matchId: 'r32-1',
                homeScore: 2,
                awayScore: 2,
                penaltyWinner: 'Espana'
            },
            {
                matchId: 'oct-1',
                homeScore: 2,
                awayScore: 0
            },
            {
                matchId: 'final',
                homeScore: 2,
                awayScore: 1
            }
        ]
    },
    {
        participantId: 'p2',
        locked: true,
        champion: 'Argentina',
        semifinalists: [
            'Espana',
            'Argentina',
            'Francia',
            'Portugal'
        ],
        topScorer: 'Lautaro Martinez',
        mvp: 'Lionel Messi',
        groupWinners: {
            A: 'Uruguay',
            B: 'Espana',
            C: 'Argentina'
        },
        groupQualified: {
            A: [
                'Mexico',
                'Uruguay'
            ],
            B: [
                'Espana',
                'Alemania'
            ],
            C: [
                'Argentina',
                'Croacia'
            ]
        },
        bestThirds: [
            'Estados Unidos',
            'Canada',
            'Marruecos'
        ],
        matches: [
            {
                matchId: 'g-a-1',
                homeScore: 1,
                awayScore: 1
            },
            {
                matchId: 'g-b-1',
                homeScore: 2,
                awayScore: 1
            },
            {
                matchId: 'r32-1',
                homeScore: 1,
                awayScore: 1,
                penaltyWinner: 'Marruecos'
            },
            {
                matchId: 'oct-1',
                homeScore: 3,
                awayScore: 1
            },
            {
                matchId: 'final',
                homeScore: 1,
                awayScore: 2
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/scoring.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildLeaderboard",
    ()=>buildLeaderboard,
    "scorePrediction",
    ()=>scorePrediction
]);
const knockoutExactPoints = {
    'Ronda de 32': 4,
    Octavos: 5,
    Cuartos: 6,
    Semifinal: 8,
    Final: 10
};
function buildLeaderboard(participants, predictions, state) {
    return predictions.map((prediction)=>{
        const participant = participants.find((item)=>item.id === prediction.participantId);
        if (!participant || participant.status !== 'validado') {
            return null;
        }
        const breakdown = scorePrediction(prediction, state);
        return {
            participant,
            breakdown,
            total: breakdown.reduce((sum, item)=>sum + item.points, 0)
        };
    }).filter((entry)=>entry !== null).sort((a, b)=>b.total - a.total);
}
function scorePrediction(prediction, state) {
    const groupMatchPoints = state.matches.reduce((sum, match)=>{
        if (match.stage !== 'Grupo' || match.status !== 'finalizado') {
            return sum;
        }
        const pick = prediction.matches.find((item)=>item.matchId === match.id);
        return sum + (pick ? scoreGroupMatch(pick, match) : 0);
    }, 0);
    const knockoutPoints = state.matches.reduce((sum, match)=>{
        if (match.stage === 'Grupo' || match.status !== 'finalizado') {
            return sum;
        }
        const pick = prediction.matches.find((item)=>item.matchId === match.id);
        return sum + (pick ? scoreKnockoutMatch(pick, match) : 0);
    }, 0);
    return [
        {
            label: 'Partidos de grupo',
            points: groupMatchPoints
        },
        {
            label: 'Primeros de grupo',
            points: scoreGroupWinners(prediction, state)
        },
        {
            label: 'Clasificados',
            points: scoreQualifiedTeams(prediction, state)
        },
        {
            label: 'Mejores terceros',
            points: scoreBestThirds(prediction, state)
        },
        {
            label: 'Eliminatorias',
            points: knockoutPoints
        },
        {
            label: 'Semifinalistas',
            points: scoreSemifinalists(prediction, state)
        },
        {
            label: 'Campeon',
            points: state.champion && prediction.champion === state.champion ? 40 : 0
        },
        {
            label: 'Goleador',
            points: state.topScorer && prediction.topScorer === state.topScorer ? 25 : 0
        },
        {
            label: 'MVP',
            points: state.mvp && prediction.mvp === state.mvp ? 25 : 0
        }
    ];
}
function scoreGroupMatch(prediction, match) {
    const signPoints = sameSign(prediction, match) ? 1 : 0;
    const exactPoints = exactScore(prediction, match) ? 2 : 0;
    return signPoints + exactPoints;
}
function scoreKnockoutMatch(prediction, match) {
    const signPoints = knockoutSignPoints(prediction, match);
    const exactPoints = exactScore(prediction, match) ? knockoutExactPoints[match.stage] ?? 5 : 0;
    return signPoints + exactPoints;
}
function knockoutSignPoints(prediction, match) {
    if (prediction.homeScore === prediction.awayScore && match.homeScore === match.awayScore) {
        return prediction.penaltyWinner === match.penaltyWinner ? 2 : 1;
    }
    return sameSign(prediction, match) ? 2 : 0;
}
function sameSign(prediction, match) {
    if (match.homeScore === undefined || match.awayScore === undefined) {
        return false;
    }
    return sign(prediction.homeScore, prediction.awayScore) === sign(match.homeScore, match.awayScore);
}
function exactScore(prediction, match) {
    return prediction.homeScore === match.homeScore && prediction.awayScore === match.awayScore;
}
function sign(home, away) {
    if (home > away) return '1';
    if (home < away) return '2';
    return 'X';
}
function scoreGroupWinners(prediction, state) {
    return Object.entries(state.groupWinners).reduce((sum, [group, winner])=>{
        return sum + (prediction.groupWinners[group] === winner ? 4 : 0);
    }, 0);
}
function scoreQualifiedTeams(prediction, state) {
    return Object.entries(state.groupQualified).reduce((sum, [group, teams])=>{
        const predicted = prediction.groupQualified[group] ?? [];
        const hits = teams.filter((team)=>predicted.includes(team)).length;
        return sum + hits * 2;
    }, 0);
}
function scoreBestThirds(prediction, state) {
    return state.bestThirds.filter((team)=>prediction.bestThirds.includes(team)).length * 2;
}
function scoreSemifinalists(prediction, state) {
    const hits = state.semifinalists.filter((team)=>prediction.semifinalists.includes(team)).length;
    const table = [
        0,
        3,
        8,
        14,
        20
    ];
    return table[hits] ?? 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$scoring$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/scoring.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const publicTabs = [
    'Formulario',
    'Cuadro',
    'Clasificacion'
];
const adminTabs = [
    'Panel',
    'Cuadro',
    'Participantes',
    'Predicciones',
    'Eliminatorias',
    'Resultados',
    'Clasificacion',
    'Reglas'
];
const tabs = [
    ...publicTabs,
    ...adminTabs
];
const participantsStorageKey = 'porra-2026-participants';
const predictionsStorageKey = 'porra-2026-predictions';
const tournamentStorageKey = 'porra-2026-tournament';
const adminPin = '2026';
const groups = 'ABCDEFGHIJKL'.split('');
const knockoutStages = [
    'Ronda de 32',
    'Octavos',
    'Cuartos',
    'Semifinal',
    'Final'
];
const allTeams = Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"].matches.filter((match)=>match.stage === 'Grupo').flatMap((match)=>[
        match.home,
        match.away
    ]))).sort((a, b)=>a.localeCompare(b));
const flags = {
    Algeria: '🇩🇿',
    Argentina: '🇦🇷',
    Australia: '🇦🇺',
    Austria: '🇦🇹',
    Belgium: '🇧🇪',
    'Bosnia and Herzegovina': '🇧🇦',
    Brazil: '🇧🇷',
    Canada: '🇨🇦',
    'Cape Verde': '🇨🇻',
    Colombia: '🇨🇴',
    Croatia: '🇭🇷',
    Curacao: '🇨🇼',
    Czechia: '🇨🇿',
    'DR Congo': '🇨🇩',
    Ecuador: '🇪🇨',
    Egypt: '🇪🇬',
    England: '🏴',
    France: '🇫🇷',
    Germany: '🇩🇪',
    Ghana: '🇬🇭',
    Haiti: '🇭🇹',
    Iran: '🇮🇷',
    Iraq: '🇮🇶',
    'Ivory Coast': '🇨🇮',
    Japan: '🇯🇵',
    Jordan: '🇯🇴',
    Mexico: '🇲🇽',
    Morocco: '🇲🇦',
    Netherlands: '🇳🇱',
    'New Zealand': '🇳🇿',
    Norway: '🇳🇴',
    Panama: '🇵🇦',
    Paraguay: '🇵🇾',
    Portugal: '🇵🇹',
    Qatar: '🇶🇦',
    'Saudi Arabia': '🇸🇦',
    Scotland: '🏴',
    Senegal: '🇸🇳',
    'South Africa': '🇿🇦',
    'South Korea': '🇰🇷',
    Spain: '🇪🇸',
    Sweden: '🇸🇪',
    Switzerland: '🇨🇭',
    Tunisia: '🇹🇳',
    Turkiye: '🇹🇷',
    'United States': '🇺🇸',
    Uruguay: '🇺🇾',
    Uzbekistan: '🇺🇿'
};
function loadParticipants() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const savedParticipants = localStorage.getItem(participantsStorageKey);
    if (!savedParticipants) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["participants"];
    }
    try {
        return JSON.parse(savedParticipants).map((participant)=>({
                ...participant,
                accessCode: participant.accessCode ?? createAccessCode(participant.name)
            }));
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["participants"];
    }
}
function loadPredictions() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const savedPredictions = localStorage.getItem(predictionsStorageKey);
    if (!savedPredictions) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictions"];
    }
    try {
        return JSON.parse(savedPredictions);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictions"];
    }
}
function loadTournamentState() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const savedTournamentState = localStorage.getItem(tournamentStorageKey);
    if (!savedTournamentState) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"];
    }
    try {
        return JSON.parse(savedTournamentState);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"];
    }
}
function App() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Formulario');
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('publico');
    const [adminPinInput, setAdminPinInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adminError, setAdminError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [apiReady, setApiReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(loadParticipants);
    const [predictions, setPredictions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(loadPredictions);
    const [tournamentState, setTournamentState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(loadTournamentState);
    const [editingParticipantId, setEditingParticipantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reviewParticipantId, setReviewParticipantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPredictionParticipantId, setSelectedPredictionParticipantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedKnockoutParticipantId, setSelectedKnockoutParticipantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeKnockoutStage, setActiveKnockoutStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Ronda de 32');
    const [matchPredictions, setMatchPredictions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [knockoutPredictions, setKnockoutPredictions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [publicForm, setPublicForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        accessCode: '',
        name: '',
        contact: '',
        alias: '',
        champion: '',
        topScorer: '',
        mvp: '',
        semifinalists: [],
        groupWinners: {},
        groupQualified: {},
        bestThirds: [],
        matches: {}
    });
    const publicParticipant = participants.find((participant)=>participant.accessCode.toUpperCase() === publicForm.accessCode.trim().toUpperCase());
    const publicFormErrors = validatePublicForm(publicForm, publicParticipant);
    const [predictionMeta, setPredictionMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        champion: '',
        topScorer: '',
        mvp: '',
        semifinalists: [],
        groupWinners: {},
        groupQualified: {},
        bestThirds: []
    });
    const [participantForm, setParticipantForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        contact: '',
        status: 'pendiente'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            async function loadFromApi() {
                try {
                    const [participantsResponse, predictionsResponse, tournamentResponse] = await Promise.all([
                        fetch('/api/participants'),
                        fetch('/api/predictions'),
                        fetch('/api/tournament')
                    ]);
                    if (!participantsResponse.ok || !predictionsResponse.ok || !tournamentResponse.ok) {
                        throw new Error('API unavailable');
                    }
                    const [apiParticipants, apiPredictions, apiTournament] = await Promise.all([
                        participantsResponse.json(),
                        predictionsResponse.json(),
                        tournamentResponse.json()
                    ]);
                    if (Array.isArray(apiParticipants) && apiParticipants.length > 0) {
                        setParticipants(apiParticipants);
                    }
                    if (Array.isArray(apiPredictions) && apiPredictions.length > 0) {
                        setPredictions(apiPredictions);
                    }
                    if (Array.isArray(apiTournament.matches) && apiTournament.matches.length > 0) {
                        setTournamentState({
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"],
                            matches: apiTournament.matches.map({
                                "App.useEffect.loadFromApi": (match)=>({
                                        ...match,
                                        date: match.date ? String(match.date).slice(0, 10) : undefined
                                    })
                            }["App.useEffect.loadFromApi"])
                        });
                    }
                } catch  {
                // LocalStorage remains the development fallback when DATABASE_URL is not configured.
                } finally{
                    setApiReady(true);
                }
            }
            loadFromApi();
        }
    }["App.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            localStorage.setItem(participantsStorageKey, JSON.stringify(participants));
            if (apiReady) {
                syncApi('/api/participants', participants);
            }
        }
    }["App.useEffect"], [
        apiReady,
        participants
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            localStorage.setItem(predictionsStorageKey, JSON.stringify(predictions));
            if (apiReady) {
                syncApi('/api/predictions', predictions);
            }
        }
    }["App.useEffect"], [
        apiReady,
        predictions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            localStorage.setItem(tournamentStorageKey, JSON.stringify(tournamentState));
            if (apiReady) {
                syncApi('/api/tournament', tournamentState);
            }
        }
    }["App.useEffect"], [
        apiReady,
        tournamentState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (!selectedPredictionParticipantId) {
                setMatchPredictions({});
                return;
            }
            const savedPrediction = predictions.find({
                "App.useEffect.savedPrediction": (prediction)=>prediction.participantId === selectedPredictionParticipantId
            }["App.useEffect.savedPrediction"]);
            setMatchPredictions(Object.fromEntries((savedPrediction?.matches ?? []).map({
                "App.useEffect": (prediction)=>[
                        prediction.matchId,
                        prediction
                    ]
            }["App.useEffect"])));
            setPredictionMeta({
                champion: savedPrediction?.champion ?? '',
                topScorer: savedPrediction?.topScorer ?? '',
                mvp: savedPrediction?.mvp ?? '',
                semifinalists: savedPrediction?.semifinalists ?? [],
                groupWinners: savedPrediction?.groupWinners ?? {},
                groupQualified: savedPrediction?.groupQualified ?? {},
                bestThirds: savedPrediction?.bestThirds ?? []
            });
        }
    }["App.useEffect"], [
        predictions,
        selectedPredictionParticipantId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (!selectedKnockoutParticipantId) {
                setKnockoutPredictions({});
                return;
            }
            const savedPrediction = predictions.find({
                "App.useEffect.savedPrediction": (prediction)=>prediction.participantId === selectedKnockoutParticipantId
            }["App.useEffect.savedPrediction"]);
            setKnockoutPredictions(Object.fromEntries((savedPrediction?.matches ?? []).map({
                "App.useEffect": (prediction)=>[
                        prediction.matchId,
                        prediction
                    ]
            }["App.useEffect"])));
        }
    }["App.useEffect"], [
        predictions,
        selectedKnockoutParticipantId
    ]);
    const paidPlayers = participants.filter((player)=>player.status === 'validado');
    const pendingPlayers = participants.filter((player)=>player.status === 'pendiente');
    const completedMatches = tournamentState.matches.filter((match)=>match.status === 'finalizado');
    const lockedPredictions = predictions.filter((prediction)=>prediction.locked);
    const validatedParticipants = participants.filter((participant)=>participant.status === 'validado');
    const qualification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "App.useMemo[qualification]": ()=>buildQualification(tournamentState.matches)
    }["App.useMemo[qualification]"], [
        tournamentState.matches
    ]);
    const scoringTournamentState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "App.useMemo[scoringTournamentState]": ()=>({
                ...tournamentState,
                groupWinners: Object.fromEntries(qualification.groupWinners.map({
                    "App.useMemo[scoringTournamentState]": (item)=>[
                            item.group,
                            item.team
                        ]
                }["App.useMemo[scoringTournamentState]"])),
                groupQualified: Object.fromEntries(groups.map({
                    "App.useMemo[scoringTournamentState]": (group)=>[
                            group,
                            [
                                ...qualification.groupWinners.filter({
                                    "App.useMemo[scoringTournamentState]": (item)=>item.group === group
                                }["App.useMemo[scoringTournamentState]"]).map({
                                    "App.useMemo[scoringTournamentState]": (item)=>item.team
                                }["App.useMemo[scoringTournamentState]"]),
                                ...qualification.groupRunnersUp.filter({
                                    "App.useMemo[scoringTournamentState]": (item)=>item.group === group
                                }["App.useMemo[scoringTournamentState]"]).map({
                                    "App.useMemo[scoringTournamentState]": (item)=>item.team
                                }["App.useMemo[scoringTournamentState]"]),
                                ...qualification.bestThirds.filter({
                                    "App.useMemo[scoringTournamentState]": (item)=>item.group === group
                                }["App.useMemo[scoringTournamentState]"]).map({
                                    "App.useMemo[scoringTournamentState]": (item)=>item.team
                                }["App.useMemo[scoringTournamentState]"])
                            ]
                        ]
                }["App.useMemo[scoringTournamentState]"])),
                bestThirds: qualification.bestThirds.map({
                    "App.useMemo[scoringTournamentState]": (item)=>item.team
                }["App.useMemo[scoringTournamentState]"])
            })
    }["App.useMemo[scoringTournamentState]"], [
        qualification,
        tournamentState
    ]);
    const leaderboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "App.useMemo[leaderboard]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$scoring$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLeaderboard"])(participants, predictions, scoringTournamentState)
    }["App.useMemo[leaderboard]"], [
        participants,
        predictions,
        scoringTournamentState
    ]);
    const visibleTabs = mode === 'publico' ? publicTabs : adminTabs;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "sidebar",
                "aria-label": "Navegacion principal",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "Porra Mundial 2026"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "Admin de la porra"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "nav-list",
                        children: visibleTabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: activeTab === tab ? 'nav-item active' : 'nav-item',
                                onClick: ()=>setActiveTab(tab),
                                type: "button",
                                children: tab
                            }, tab, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mode-switch",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: mode === 'publico' ? 'mode-button active' : 'mode-button',
                                onClick: ()=>{
                                    setMode('publico');
                                    setActiveTab('Formulario');
                                },
                                type: "button",
                                children: "Publico"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: mode === 'admin' ? 'mode-button active' : 'mode-button',
                                onClick: ()=>{
                                    if (adminPinInput !== adminPin) {
                                        setAdminError('PIN incorrecto');
                                        return;
                                    }
                                    setAdminError('');
                                    setMode('admin');
                                    setActiveTab('Panel');
                                },
                                type: "button",
                                children: "Admin"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    mode === 'publico' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-login",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "PIN admin",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        onChange: (event)=>setAdminPinInput(event.target.value),
                                        type: "password",
                                        value: adminPinInput
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            adminError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: adminError
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 388,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "workspace",
                children: [
                    activeTab === 'Formulario' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Alta publica"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Formulario de la porra"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 399,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-action",
                                        disabled: publicFormErrors.length > 0,
                                        onClick: ()=>{
                                            if (!publicParticipant) {
                                                return;
                                            }
                                            const participantId = publicParticipant.id;
                                            const displayName = publicForm.alias.trim() || publicParticipant.name;
                                            const matches = Object.values(publicForm.matches).filter((prediction)=>Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore));
                                            setParticipants((current)=>current.map((participant)=>participant.id === participantId ? {
                                                        ...participant,
                                                        name: displayName
                                                    } : participant));
                                            setPredictions((current)=>{
                                                const nextPrediction = {
                                                    participantId,
                                                    locked: true,
                                                    champion: publicForm.champion,
                                                    semifinalists: publicForm.semifinalists,
                                                    topScorer: publicForm.topScorer,
                                                    mvp: publicForm.mvp,
                                                    groupWinners: publicForm.groupWinners,
                                                    groupQualified: publicForm.groupQualified,
                                                    bestThirds: publicForm.bestThirds,
                                                    matches
                                                };
                                                return current.some((prediction)=>prediction.participantId === participantId) ? current.map((prediction)=>prediction.participantId === participantId ? nextPrediction : prediction) : [
                                                    ...current,
                                                    nextPrediction
                                                ];
                                            });
                                            setPublicForm({
                                                accessCode: '',
                                                name: '',
                                                contact: '',
                                                alias: '',
                                                champion: '',
                                                topScorer: '',
                                                mvp: '',
                                                semifinalists: [],
                                                groupWinners: {},
                                                groupQualified: {},
                                                bestThirds: [],
                                                matches: {}
                                            });
                                        },
                                        type: "button",
                                        children: "Enviar prediccion"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-intake",
                                children: [
                                    publicFormErrors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "validation-panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Faltan datos para enviar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 464,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                children: publicFormErrors.map((error)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: error
                                                    }, error, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 465,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 463,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "meta-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Datos del participante"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "meta-grid",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Codigo de acceso",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                onChange: (event)=>setPublicForm((form)=>({
                                                                            ...form,
                                                                            accessCode: event.target.value
                                                                        })),
                                                                placeholder: "PORRA-XXXX",
                                                                value: publicForm.accessCode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Nombre",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                disabled: true,
                                                                placeholder: "Se carga con el codigo",
                                                                value: publicParticipant?.name ?? ''
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 485,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Alias en ranking",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                onChange: (event)=>setPublicForm((form)=>({
                                                                            ...form,
                                                                            alias: event.target.value
                                                                        })),
                                                                placeholder: "Nombre publico",
                                                                value: publicForm.alias
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 474,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "meta-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Prediccion pre-torneo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 502,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "meta-grid",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamSelect, {
                                                        label: "Campeon",
                                                        onChange: (value)=>setPublicForm((form)=>({
                                                                    ...form,
                                                                    champion: value
                                                                })),
                                                        teams: allTeams,
                                                        value: publicForm.champion
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Maximo goleador",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                onChange: (event)=>setPublicForm((form)=>({
                                                                            ...form,
                                                                            topScorer: event.target.value
                                                                        })),
                                                                placeholder: "Nombre del jugador",
                                                                value: publicForm.topScorer
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 512,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "MVP",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                onChange: (event)=>setPublicForm((form)=>({
                                                                            ...form,
                                                                            mvp: event.target.value
                                                                        })),
                                                                placeholder: "Nombre del jugador",
                                                                value: publicForm.mvp
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTeamPicker, {
                                                label: "Semifinalistas",
                                                limit: 4,
                                                onChange: (teams)=>setPublicForm((form)=>({
                                                            ...form,
                                                            semifinalists: teams
                                                        })),
                                                selected: publicForm.semifinalists,
                                                teams: allTeams
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 527,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTeamPicker, {
                                                label: "Mejores terceros",
                                                limit: 8,
                                                onChange: (teams)=>setPublicForm((form)=>({
                                                            ...form,
                                                            bestThirds: teams
                                                        })),
                                                selected: publicForm.bestThirds,
                                                teams: allTeams
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 534,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "meta-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Clasificados por grupo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group-picks-grid",
                                                children: groups.map((group)=>{
                                                    const groupTeams = teamsForGroup(tournamentState.matches, group);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group-pick",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                children: [
                                                                    "Grupo ",
                                                                    group
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 549,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamSelect, {
                                                                label: "Primero",
                                                                onChange: (value)=>setPublicForm((form)=>({
                                                                            ...form,
                                                                            groupWinners: {
                                                                                ...form.groupWinners,
                                                                                [group]: value
                                                                            }
                                                                        })),
                                                                teams: groupTeams,
                                                                value: publicForm.groupWinners[group] ?? ''
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTeamPicker, {
                                                                label: "Clasificados",
                                                                limit: 3,
                                                                onChange: (teams)=>setPublicForm((form)=>({
                                                                            ...form,
                                                                            groupQualified: {
                                                                                ...form.groupQualified,
                                                                                [group]: teams
                                                                            }
                                                                        })),
                                                                selected: publicForm.groupQualified[group] ?? [],
                                                                teams: groupTeams
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, group, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 544,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 542,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prediction-board",
                                        children: groups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PredictionGroup, {
                                                group: group,
                                                matches: tournamentState.matches.filter((match)=>match.group === group),
                                                onChange: (matchId, side, value)=>{
                                                    const parsedValue = value === '' ? Number.NaN : Number(value);
                                                    setPublicForm((form)=>{
                                                        const previous = form.matches[matchId] ?? {
                                                            matchId,
                                                            homeScore: Number.NaN,
                                                            awayScore: Number.NaN
                                                        };
                                                        return {
                                                            ...form,
                                                            matches: {
                                                                ...form.matches,
                                                                [matchId]: {
                                                                    ...previous,
                                                                    [side]: parsedValue
                                                                }
                                                            }
                                                        };
                                                    });
                                                },
                                                predictions: publicForm.matches
                                            }, group, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 580,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 578,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Panel' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Estado general"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 617,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Ranking y control del torneo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 618,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 616,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-action",
                                        type: "button",
                                        children: "Recalcular puntos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 620,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 615,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "metric-grid",
                                "aria-label": "Resumen",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                                        label: "Jugadores validados",
                                        value: paidPlayers.length.toString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 624,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                                        label: "Pagos pendientes",
                                        value: pendingPlayers.length.toString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 625,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                                        label: "Partidos cerrados",
                                        value: completedMatches.length.toString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                                        label: "Porras bloqueadas",
                                        value: lockedPredictions.length.toString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 627,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 623,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "content-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel wide",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-title",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Clasificacion"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "desglose auditable"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 632,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ranking-list",
                                                children: leaderboard.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                        className: "ranking-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: index + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 639,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        children: entry.participant.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 641,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: entry.breakdown.map((item)=>`${item.label}: ${item.points}`).join(' · ')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 642,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: [
                                                                    entry.total,
                                                                    " pts"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 644,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, entry.participant.id, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 638,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 636,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-title",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Proximas tareas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 651,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "admin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 650,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "task-list",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Validar pagos pendientes."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Cerrar pronosticos de grupos antes del inicio."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Introducir marcadores oficiales tras cada partido."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 657,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Abrir ronda de 32 cuando FIFA publique cruces."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 654,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 649,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 630,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    activeTab === 'Cuadro' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Fase de grupos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 669,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Cuadro Mundial 2026"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 668,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fixture-count",
                                        children: "104 partidos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 672,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "worldcup-board",
                                children: groups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupCard, {
                                        group: group,
                                        matches: tournamentState.matches.filter((match)=>match.group === group),
                                        qualifiedTeams: qualification.directQualified,
                                        thirdQualifiedTeams: qualification.bestThirds.map((standing)=>standing.team)
                                    }, group, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 676,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 674,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "qualification-summary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                        className: "subsection-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Clasificacion automatica"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 687,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Equipos clasificados"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 686,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "qualification-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QualificationList, {
                                                title: "Primeros",
                                                items: qualification.groupWinners
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 691,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QualificationList, {
                                                title: "Segundos",
                                                items: qualification.groupRunnersUp
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 692,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QualificationList, {
                                                title: "Mejores terceros",
                                                items: qualification.bestThirds.map((standing)=>({
                                                        group: standing.group,
                                                        team: standing.team,
                                                        points: standing.points,
                                                        goalDifference: standing.goalDifference
                                                    }))
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 693,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 690,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 685,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "knockout-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                        className: "subsection-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Eliminatorias"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 706,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "De dieciseisavos a la final"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 707,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 705,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "knockout-board",
                                        children: knockoutStages.map((stage)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "knockout-column",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: stage === 'Ronda de 32' ? 'Dieciseisavos' : stage
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 712,
                                                        columnNumber: 21
                                                    }, this),
                                                    tournamentState.matches.filter((match)=>match.stage === stage).map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KnockoutCard, {
                                                            match: match,
                                                            resolvedAway: resolveKnockoutSlot(match.away, qualification),
                                                            resolvedHome: resolveKnockoutSlot(match.home, qualification)
                                                        }, match.id, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 716,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, stage, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 711,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 709,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 704,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 666,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Participantes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Registro"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 734,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Participantes y pago manual"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 735,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 733,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "secondary-action",
                                        onClick: ()=>{
                                            setParticipants((current)=>current.filter((player)=>!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["participants"].some((initial)=>initial.id === player.id)));
                                            setEditingParticipantId(null);
                                        },
                                        type: "button",
                                        children: "Quitar ejemplos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 737,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 732,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "entry-form",
                                onSubmit: (event)=>{
                                    event.preventDefault();
                                    const name = participantForm.name.trim();
                                    const contact = participantForm.contact.trim();
                                    if (!name || !contact) {
                                        return;
                                    }
                                    setParticipants((current)=>[
                                            ...current,
                                            {
                                                id: crypto.randomUUID(),
                                                name,
                                                contact,
                                                accessCode: createAccessCode(name),
                                                status: participantForm.status
                                            }
                                        ]);
                                    setParticipantForm({
                                        name: '',
                                        contact: '',
                                        status: 'pendiente'
                                    });
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Nombre",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                onChange: (event)=>setParticipantForm((form)=>({
                                                            ...form,
                                                            name: event.target.value
                                                        })),
                                                placeholder: "Nombre del jugador",
                                                required: true,
                                                value: participantForm.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 777,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 775,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Contacto",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                onChange: (event)=>setParticipantForm((form)=>({
                                                            ...form,
                                                            contact: event.target.value
                                                        })),
                                                placeholder: "Telefono o email",
                                                required: true,
                                                value: participantForm.contact
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 786,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 784,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Estado",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                onChange: (event)=>setParticipantForm((form)=>({
                                                            ...form,
                                                            status: event.target.value
                                                        })),
                                                value: participantForm.status,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "pendiente",
                                                        children: "Pendiente"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "validado",
                                                        children: "Validado"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "retirado",
                                                        children: "Retirado"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 806,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 795,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 793,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-action",
                                        type: "submit",
                                        children: "Dar de alta"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 809,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 751,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "table-wrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Nombre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Contacto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Codigo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 818,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Estado"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Acciones"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 815,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 814,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: participants.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: editingParticipantId === player.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                "aria-label": `Nombre de ${player.name}`,
                                                                onChange: (event)=>{
                                                                    const name = event.target.value;
                                                                    setParticipants((current)=>current.map((item)=>item.id === player.id ? {
                                                                                ...item,
                                                                                name
                                                                            } : item));
                                                                },
                                                                value: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 828,
                                                                columnNumber: 27
                                                            }, this) : player.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 826,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: editingParticipantId === player.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                "aria-label": `Contacto de ${player.name}`,
                                                                onChange: (event)=>{
                                                                    const contact = event.target.value;
                                                                    setParticipants((current)=>current.map((item)=>item.id === player.id ? {
                                                                                ...item,
                                                                                contact
                                                                            } : item));
                                                                },
                                                                value: player.contact
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 844,
                                                                columnNumber: 27
                                                            }, this) : player.contact
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 842,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                children: player.accessCode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 858,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                "aria-label": `Estado de ${player.name}`,
                                                                className: "inline-select",
                                                                onChange: (event)=>{
                                                                    const status = event.target.value;
                                                                    setParticipants((current)=>current.map((item)=>item.id === player.id ? {
                                                                                ...item,
                                                                                status
                                                                            } : item));
                                                                },
                                                                value: player.status,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "pendiente",
                                                                        children: "Pendiente"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 871,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "validado",
                                                                        children: "Validado"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 872,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "retirado",
                                                                        children: "Retirado"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 873,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 860,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 859,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "row-actions",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "small-action",
                                                                        onClick: ()=>{
                                                                            setEditingParticipantId((current)=>current === player.id ? null : player.id);
                                                                        },
                                                                        type: "button",
                                                                        children: editingParticipantId === player.id ? 'Guardar' : 'Editar'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 878,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "small-action",
                                                                        onClick: ()=>setReviewParticipantId(player.id),
                                                                        type: "button",
                                                                        children: "Revisar"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 887,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "danger-action",
                                                                        disabled: player.status === 'retirado',
                                                                        onClick: ()=>{
                                                                            setParticipants((current)=>current.map((item)=>item.id === player.id ? {
                                                                                        ...item,
                                                                                        status: 'retirado'
                                                                                    } : item));
                                                                            setEditingParticipantId((current)=>current === player.id ? null : current);
                                                                        },
                                                                        type: "button",
                                                                        children: "Baja"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 894,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "delete-action",
                                                                        onClick: ()=>{
                                                                            setParticipants((current)=>current.filter((item)=>item.id !== player.id));
                                                                            setEditingParticipantId((current)=>current === player.id ? null : current);
                                                                        },
                                                                        type: "button",
                                                                        children: "Eliminar"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 909,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 877,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 876,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, player.id, true, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 825,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 823,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 813,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 812,
                                columnNumber: 13
                            }, this),
                            reviewParticipantId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PredictionReview, {
                                onClose: ()=>setReviewParticipantId(null),
                                participant: participants.find((participant)=>participant.id === reviewParticipantId),
                                prediction: predictions.find((prediction)=>prediction.participantId === reviewParticipantId)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 927,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 731,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Predicciones' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Pre-torneo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 940,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Predicciones por participante"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 941,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 939,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "header-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "secondary-action",
                                                onClick: ()=>{
                                                    setPredictions((current)=>seedGroupPredictions(current, validatedParticipants));
                                                },
                                                type: "button",
                                                children: "Cargar demo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 944,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "primary-action",
                                                disabled: !selectedPredictionParticipantId,
                                                onClick: ()=>{
                                                    const matches = Object.values(matchPredictions).filter((prediction)=>Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore));
                                                    setPredictions((current)=>{
                                                        const nextPrediction = {
                                                            participantId: selectedPredictionParticipantId,
                                                            locked: true,
                                                            champion: predictionMeta.champion,
                                                            semifinalists: predictionMeta.semifinalists,
                                                            topScorer: predictionMeta.topScorer,
                                                            mvp: predictionMeta.mvp,
                                                            groupWinners: predictionMeta.groupWinners,
                                                            groupQualified: predictionMeta.groupQualified,
                                                            bestThirds: predictionMeta.bestThirds,
                                                            matches
                                                        };
                                                        const exists = current.some((prediction)=>prediction.participantId === selectedPredictionParticipantId);
                                                        return exists ? current.map((prediction)=>prediction.participantId === selectedPredictionParticipantId ? nextPrediction : prediction) : [
                                                            ...current,
                                                            nextPrediction
                                                        ];
                                                    });
                                                },
                                                type: "button",
                                                children: "Guardar prediccion"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 953,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 943,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 938,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prediction-toolbar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Participante",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                onChange: (event)=>setSelectedPredictionParticipantId(event.target.value),
                                                value: selectedPredictionParticipantId,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Seleccionar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1001,
                                                        columnNumber: 19
                                                    }, this),
                                                    validatedParticipants.map((participant)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: participant.id,
                                                            children: participant.name
                                                        }, participant.id, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 1003,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 997,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 995,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prediction-summary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: Object.keys(matchPredictions).length
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1008,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "marcadores rellenados"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1009,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1007,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 994,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "prediction-meta",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "meta-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Bonus finales"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1015,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "meta-grid",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamSelect, {
                                                        label: "Campeon",
                                                        onChange: (value)=>setPredictionMeta((meta)=>({
                                                                    ...meta,
                                                                    champion: value
                                                                })),
                                                        teams: allTeams,
                                                        value: predictionMeta.champion
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1017,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Maximo goleador",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                onChange: (event)=>setPredictionMeta((meta)=>({
                                                                            ...meta,
                                                                            topScorer: event.target.value
                                                                        })),
                                                                placeholder: "Nombre del jugador",
                                                                value: predictionMeta.topScorer
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 1025,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1023,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "MVP",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                onChange: (event)=>setPredictionMeta((meta)=>({
                                                                            ...meta,
                                                                            mvp: event.target.value
                                                                        })),
                                                                placeholder: "Nombre del jugador",
                                                                value: predictionMeta.mvp
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 1035,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1033,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1016,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTeamPicker, {
                                                label: "Semifinalistas",
                                                limit: 4,
                                                onChange: (teams)=>setPredictionMeta((meta)=>({
                                                            ...meta,
                                                            semifinalists: teams
                                                        })),
                                                selected: predictionMeta.semifinalists,
                                                teams: allTeams
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1042,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTeamPicker, {
                                                label: "Mejores terceros",
                                                limit: 8,
                                                onChange: (teams)=>setPredictionMeta((meta)=>({
                                                            ...meta,
                                                            bestThirds: teams
                                                        })),
                                                selected: predictionMeta.bestThirds,
                                                teams: allTeams
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1049,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1014,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "meta-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Clasificados por grupo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1059,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group-picks-grid",
                                                children: groups.map((group)=>{
                                                    const groupTeams = teamsForGroup(tournamentState.matches, group);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group-pick",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                children: [
                                                                    "Grupo ",
                                                                    group
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 1065,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamSelect, {
                                                                label: "Primero",
                                                                onChange: (value)=>setPredictionMeta((meta)=>({
                                                                            ...meta,
                                                                            groupWinners: {
                                                                                ...meta.groupWinners,
                                                                                [group]: value
                                                                            }
                                                                        })),
                                                                teams: groupTeams,
                                                                value: predictionMeta.groupWinners[group] ?? ''
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 1066,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTeamPicker, {
                                                                label: "Clasificados",
                                                                limit: 3,
                                                                onChange: (teams)=>setPredictionMeta((meta)=>({
                                                                            ...meta,
                                                                            groupQualified: {
                                                                                ...meta.groupQualified,
                                                                                [group]: teams
                                                                            }
                                                                        })),
                                                                selected: predictionMeta.groupQualified[group] ?? [],
                                                                teams: groupTeams
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 1077,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, group, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1064,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1060,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1058,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1013,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prediction-board",
                                children: groups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PredictionGroup, {
                                        group: group,
                                        matches: tournamentState.matches.filter((match)=>match.group === group),
                                        onChange: (matchId, side, value)=>{
                                            const parsedValue = value === '' ? Number.NaN : Number(value);
                                            setMatchPredictions((current)=>{
                                                const previous = current[matchId] ?? {
                                                    matchId,
                                                    homeScore: Number.NaN,
                                                    awayScore: Number.NaN
                                                };
                                                return {
                                                    ...current,
                                                    [matchId]: {
                                                        ...previous,
                                                        [side]: parsedValue
                                                    }
                                                };
                                            });
                                        },
                                        predictions: matchPredictions
                                    }, group, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1096,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 937,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Eliminatorias' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Ronda a ronda"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1131,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Predicciones de eliminatorias"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1132,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-action",
                                        disabled: !selectedKnockoutParticipantId,
                                        onClick: ()=>{
                                            const filledKnockoutPredictions = Object.values(knockoutPredictions).filter((prediction)=>Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore));
                                            setPredictions((current)=>{
                                                const existing = current.find((prediction)=>prediction.participantId === selectedKnockoutParticipantId);
                                                const groupPredictions = existing?.matches.filter((prediction)=>{
                                                    const match = tournamentState.matches.find((item)=>item.id === prediction.matchId);
                                                    return match?.stage === 'Grupo';
                                                }) ?? [];
                                                const nextPrediction = {
                                                    participantId: selectedKnockoutParticipantId,
                                                    locked: existing?.locked ?? true,
                                                    champion: existing?.champion ?? '',
                                                    semifinalists: existing?.semifinalists ?? [],
                                                    topScorer: existing?.topScorer ?? '',
                                                    mvp: existing?.mvp ?? '',
                                                    groupWinners: existing?.groupWinners ?? {},
                                                    groupQualified: existing?.groupQualified ?? {},
                                                    bestThirds: existing?.bestThirds ?? [],
                                                    matches: [
                                                        ...groupPredictions,
                                                        ...filledKnockoutPredictions
                                                    ]
                                                };
                                                return existing ? current.map((prediction)=>prediction.participantId === selectedKnockoutParticipantId ? nextPrediction : prediction) : [
                                                    ...current,
                                                    nextPrediction
                                                ];
                                            });
                                        },
                                        type: "button",
                                        children: "Guardar ronda"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prediction-toolbar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Participante",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                onChange: (event)=>setSelectedKnockoutParticipantId(event.target.value),
                                                value: selectedKnockoutParticipantId,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Seleccionar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1184,
                                                        columnNumber: 19
                                                    }, this),
                                                    validatedParticipants.map((participant)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: participant.id,
                                                            children: participant.name
                                                        }, participant.id, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 1186,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1180,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Ronda",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                onChange: (event)=>setActiveKnockoutStage(event.target.value),
                                                value: activeKnockoutStage,
                                                children: knockoutStages.map((stage)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: stage,
                                                        children: stage === 'Ronda de 32' ? 'Dieciseisavos' : stage
                                                    }, stage, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1199,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1192,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1190,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prediction-summary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: tournamentState.matches.filter((match)=>match.stage === activeKnockoutStage).length
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1204,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "partidos de la ronda"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1209,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1177,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "knockout-prediction-list",
                                children: tournamentState.matches.filter((match)=>match.stage === activeKnockoutStage).map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KnockoutPredictionRow, {
                                        match: match,
                                        onChange: (matchId, side, value)=>{
                                            const parsedValue = value === '' ? Number.NaN : Number(value);
                                            setKnockoutPredictions((current)=>{
                                                const previous = current[matchId] ?? {
                                                    matchId,
                                                    homeScore: Number.NaN,
                                                    awayScore: Number.NaN
                                                };
                                                return {
                                                    ...current,
                                                    [matchId]: {
                                                        ...previous,
                                                        [side]: parsedValue
                                                    }
                                                };
                                            });
                                        },
                                        onPenaltyWinnerChange: (matchId, penaltyWinner)=>{
                                            setKnockoutPredictions((current)=>{
                                                const previous = current[matchId] ?? {
                                                    matchId,
                                                    homeScore: Number.NaN,
                                                    awayScore: Number.NaN
                                                };
                                                return {
                                                    ...current,
                                                    [matchId]: {
                                                        ...previous,
                                                        penaltyWinner
                                                    }
                                                };
                                            });
                                        },
                                        prediction: knockoutPredictions[match.id]
                                    }, match.id, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1217,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1213,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1128,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Resultados' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Panel admin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1266,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Resultados oficiales de grupos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1267,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "header-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "secondary-action",
                                                onClick: ()=>setTournamentState((current)=>seedOfficialGroupResults(current)),
                                                type: "button",
                                                children: "Cargar demo"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "secondary-action",
                                                onClick: ()=>setTournamentState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"]),
                                                type: "button",
                                                children: "Reiniciar resultados"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1277,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1269,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1264,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "results-board",
                                children: groups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "results-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: [
                                                    "Grupo ",
                                                    group
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1289,
                                                columnNumber: 19
                                            }, this),
                                            tournamentState.matches.filter((match)=>match.stage === 'Grupo' && match.group === group).map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OfficialResultRow, {
                                                    match: match,
                                                    onChange: (matchId, side, value)=>{
                                                        const parsedValue = value === '' ? undefined : Number(value);
                                                        setTournamentState((current)=>({
                                                                ...current,
                                                                matches: current.matches.map((item)=>{
                                                                    if (item.id !== matchId) {
                                                                        return item;
                                                                    }
                                                                    const nextMatch = {
                                                                        ...item,
                                                                        [side]: parsedValue
                                                                    };
                                                                    const hasResult = nextMatch.homeScore !== undefined && nextMatch.awayScore !== undefined;
                                                                    return {
                                                                        ...nextMatch,
                                                                        status: hasResult ? 'finalizado' : 'programado'
                                                                    };
                                                                })
                                                            }));
                                                    }
                                                }, match.id, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1293,
                                                    columnNumber: 23
                                                }, this))
                                        ]
                                    }, group, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1286,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1263,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Clasificacion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Ranking"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1328,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Clasificacion de participantes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1329,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1327,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fixture-count",
                                        children: [
                                            leaderboard.length,
                                            " participantes"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1326,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "leaderboard-page",
                                children: leaderboard.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "leaderboard-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "leaderboard-rank",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1338,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            entry.total,
                                                            " pts"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1339,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1337,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "leaderboard-detail",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: entry.participant.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1342,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: entry.participant.contact
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1343,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "score-breakdown",
                                                        children: entry.breakdown.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "score-pill",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: item.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 1347,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: item.points
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/App.tsx",
                                                                        lineNumber: 1348,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, item.label, true, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 1346,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1344,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1341,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, entry.participant.id, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1336,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1334,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1325,
                        columnNumber: 11
                    }, this),
                    activeTab === 'Reglas' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "section-header",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "Mundial 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 1363,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Reglas adaptadas"
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 1364,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 1362,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1361,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rules-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Rule, {
                                        title: "Fase de grupos",
                                        text: "Signo 1-X-2: 1 punto. Resultado exacto: 3 puntos. Pleno de signos del grupo: 10 puntos."
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1368,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Rule, {
                                        title: "Clasificados",
                                        text: "Primeros de grupo con tabla progresiva. Segundos por grupo. Mejores terceros por equipo clasificado, sin exigir el grupo exacto."
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1369,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Rule, {
                                        title: "Eliminatorias",
                                        text: "Ronda de 32 incluida. Se predice marcador tras 120 minutos y ganador por penaltis si hay empate."
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1370,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Rule, {
                                        title: "Bonus finales",
                                        text: "Campeon: 40. Semifinalistas: 3, 8, 14 o 20. Maximo goleador: 25. MVP: 25."
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1360,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 332,
        columnNumber: 5
    }, this);
}
_s(App, "RoWBu9uqsXAgqNCn1Xz+RCQlHWo=");
_c = App;
function KnockoutCard({ match, resolvedAway, resolvedHome }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "knockout-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "knockout-meta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: match.id.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1392,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            formatDate(match.date),
                            " · ",
                            match.venue
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1393,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1391,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "knockout-team",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: teamLabel(resolvedHome ?? match.home)
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1396,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: match.homeScore ?? '-'
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1397,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1395,
                columnNumber: 7
            }, this),
            resolvedHome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                className: "resolved-slot",
                children: match.home
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1399,
                columnNumber: 24
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "knockout-team",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: teamLabel(resolvedAway ?? match.away)
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1401,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: match.awayScore ?? '-'
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1402,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1400,
                columnNumber: 7
            }, this),
            resolvedAway && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                className: "resolved-slot",
                children: match.away
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1404,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1390,
        columnNumber: 5
    }, this);
}
_c1 = KnockoutCard;
function KnockoutPredictionRow({ match, onChange, onPenaltyWinnerChange, prediction }) {
    const isDraw = prediction !== undefined && Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore) && prediction.homeScore === prediction.awayScore;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "knockout-prediction-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "knockout-meta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: match.id.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            formatDate(match.date),
                            " · ",
                            match.venue
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1430,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1428,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "knockout-score-editor",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: teamLabel(match.home)
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1433,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        "aria-label": `${match.home} goles tras 120 minutos`,
                        min: "0",
                        onChange: (event)=>onChange(match.id, 'homeScore', event.target.value),
                        type: "number",
                        value: Number.isNaN(prediction?.homeScore) || prediction?.homeScore === undefined ? '' : prediction.homeScore
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1434,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "prediction-separator",
                        children: "-"
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1441,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        "aria-label": `${match.away} goles tras 120 minutos`,
                        min: "0",
                        onChange: (event)=>onChange(match.id, 'awayScore', event.target.value),
                        type: "number",
                        value: Number.isNaN(prediction?.awayScore) || prediction?.awayScore === undefined ? '' : prediction.awayScore
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: teamLabel(match.away)
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1449,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1432,
                columnNumber: 7
            }, this),
            isDraw && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "penalty-picker",
                children: [
                    "Ganador por penaltis",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        onChange: (event)=>onPenaltyWinnerChange(match.id, event.target.value),
                        value: prediction?.penaltyWinner ?? '',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Seleccionar"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1458,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: match.home,
                                children: match.home
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1459,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: match.away,
                                children: match.away
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1460,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1454,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1452,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1427,
        columnNumber: 5
    }, this);
}
_c2 = KnockoutPredictionRow;
function OfficialResultRow({ match, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "official-result-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                children: formatDate(match.date)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1477,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: teamLabel(match.home)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                "aria-label": `Resultado oficial ${match.home}`,
                min: "0",
                onChange: (event)=>onChange(match.id, 'homeScore', event.target.value),
                type: "number",
                value: match.homeScore ?? ''
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1479,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "prediction-separator",
                children: "-"
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                "aria-label": `Resultado oficial ${match.away}`,
                min: "0",
                onChange: (event)=>onChange(match.id, 'awayScore', event.target.value),
                type: "number",
                value: match.awayScore ?? ''
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1487,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: teamLabel(match.away)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1494,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                children: match.status === 'finalizado' ? 'Finalizado' : 'Pendiente'
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1495,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1476,
        columnNumber: 5
    }, this);
}
_c3 = OfficialResultRow;
function PredictionReview({ onClose, participant, prediction }) {
    if (!participant) {
        return null;
    }
    const completedMatches = prediction?.matches.filter((match)=>Number.isFinite(match.homeScore) && Number.isFinite(match.awayScore)).length ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "review-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "panel-title",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    "Revision de ",
                                    participant.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1521,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: participant.contact
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1522,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1520,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "small-action",
                        onClick: onClose,
                        type: "button",
                        children: "Cerrar"
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1524,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1519,
                columnNumber: 7
            }, this),
            !prediction ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-copy",
                children: "Este participante aun no tiene prediccion guardada."
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1527,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "review-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "score-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Marcadores de grupo"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1531,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    completedMatches,
                                    "/72"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1532,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1530,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "score-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Campeon"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1535,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: prediction.champion || '-'
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1536,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1534,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "score-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Semifinalistas"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1539,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    prediction.semifinalists.length,
                                    "/4"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1540,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1538,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "score-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Mejores terceros"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1543,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    prediction.bestThirds.length,
                                    "/8"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1544,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1542,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "score-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Goleador"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1547,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: prediction.topScorer || '-'
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1548,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "score-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "MVP"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1551,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: prediction.mvp || '-'
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1552,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1550,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1529,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1518,
        columnNumber: 5
    }, this);
}
_c4 = PredictionReview;
function GroupCard({ group, matches, qualifiedTeams, thirdQualifiedTeams }) {
    const standings = buildGroupStandings(matches);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "group-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `group-letter group-${group.toLowerCase()}`,
                children: group
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1575,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "group-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixture-panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mini-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Fecha"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1579,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Partido"
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1580,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1578,
                                columnNumber: 11
                            }, this),
                            matches.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "fixture-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                            children: formatDate(match.date)
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 1584,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fixture-teams",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: teamLabel(match.home)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1586,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: match.homeScore === undefined ? '-' : match.homeScore
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1587,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    children: "vs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1588,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: match.awayScore === undefined ? '-' : match.awayScore
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1589,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: teamLabel(match.away)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1590,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 1585,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, match.id, true, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 1583,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1577,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "standings-panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    "Grupo ",
                                    group
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1596,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "standings-table",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Pos"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1600,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Seleccion"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1601,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Pts"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1602,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "J"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1603,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "GF"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1604,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "GC"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 1605,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 1599,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1598,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: standings.map((standing, index)=>{
                                            const isDirect = qualifiedTeams.includes(standing.team);
                                            const isBestThird = thirdQualifiedTeams.includes(standing.team);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: isDirect ? 'qualified-row' : isBestThird ? 'third-row' : undefined,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1615,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: teamLabel(standing.team)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1616,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: standing.points
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1617,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: standing.played
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1618,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: standing.goalsFor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1619,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: standing.goalsAgainst
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/App.tsx",
                                                        lineNumber: 1620,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, standing.team, true, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 1614,
                                                columnNumber: 17
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 1608,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1597,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1595,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1576,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1574,
        columnNumber: 5
    }, this);
}
_c5 = GroupCard;
function buildGroupStandings(matches) {
    const standings = new Map();
    matches.forEach((match)=>{
        ensureStanding(standings, match.home);
        ensureStanding(standings, match.away);
        if (match.status !== 'finalizado' || match.homeScore === undefined || match.awayScore === undefined) {
            return;
        }
        const home = standings.get(match.home);
        const away = standings.get(match.away);
        home.played += 1;
        away.played += 1;
        home.goalsFor += match.homeScore;
        home.goalsAgainst += match.awayScore;
        away.goalsFor += match.awayScore;
        away.goalsAgainst += match.homeScore;
        if (match.homeScore > match.awayScore) {
            home.won += 1;
            away.lost += 1;
            home.points += 3;
        } else if (match.homeScore < match.awayScore) {
            away.won += 1;
            home.lost += 1;
            away.points += 3;
        } else {
            home.drawn += 1;
            away.drawn += 1;
            home.points += 1;
            away.points += 1;
        }
        home.goalDifference = home.goalsFor - home.goalsAgainst;
        away.goalDifference = away.goalsFor - away.goalsAgainst;
    });
    return Array.from(standings.values()).sort((a, b)=>{
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return a.team.localeCompare(b.team);
    });
}
function buildQualification(matches) {
    const groupResults = groups.map((group)=>{
        const standings = buildGroupStandings(matches.filter((match)=>match.stage === 'Grupo' && match.group === group)).map((standing)=>({
                ...standing,
                group
            }));
        return {
            group,
            standings
        };
    });
    const groupWinners = [];
    const groupRunnersUp = [];
    const thirds = [];
    groupResults.forEach(({ group, standings })=>{
        const hasPlayedMatches = standings.some((standing)=>standing.played > 0);
        if (!hasPlayedMatches) {
            return;
        }
        if (standings[0]) groupWinners.push({
            group,
            team: standings[0].team
        });
        if (standings[1]) groupRunnersUp.push({
            group,
            team: standings[1].team
        });
        if (standings[2]) thirds.push(standings[2]);
    });
    const bestThirds = thirds.sort((a, b)=>{
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return a.team.localeCompare(b.team);
    }).slice(0, 8);
    const thirdAssignments = assignThirdPlacedSlots(bestThirds);
    return {
        groupWinners,
        groupRunnersUp,
        bestThirds,
        thirdAssignments,
        directQualified: [
            ...groupWinners,
            ...groupRunnersUp
        ].map((item)=>item.team)
    };
}
function resolveKnockoutSlot(slot, qualification) {
    const directMatch = slot.match(/^([12])([A-L])$/);
    if (directMatch) {
        const [, position, group] = directMatch;
        const source = position === '1' ? qualification.groupWinners : qualification.groupRunnersUp;
        return source.find((item)=>item.group === group)?.team;
    }
    const thirdMatch = slot.match(/^3([A-L/]+)$/);
    if (thirdMatch) {
        return qualification.thirdAssignments[slot];
    }
    return undefined;
}
function assignThirdPlacedSlots(bestThirds) {
    const slots = [
        '3A/B/C/D/F',
        '3C/D/F/G/H',
        '3C/E/F/H/I',
        '3E/H/I/J/K',
        '3A/E/H/I/J',
        '3B/E/F/I/J',
        '3E/F/G/I/J',
        '3D/E/I/J/L'
    ];
    const assignments = {};
    const usedTeams = new Set();
    slots.forEach((slot)=>{
        const eligibleGroups = slot.replace('3', '').split('/');
        const third = bestThirds.find((standing)=>eligibleGroups.includes(standing.group) && !usedTeams.has(standing.team));
        if (!third) {
            return;
        }
        assignments[slot] = third.team;
        usedTeams.add(third.team);
    });
    return assignments;
}
function seedGroupPredictions(current, players) {
    const groupMatches = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"].matches.filter((match)=>match.stage === 'Grupo');
    const seededPredictions = players.slice(0, 2).map((player, playerIndex)=>{
        const matchPredictions = groupMatches.map((match, matchIndex)=>({
                matchId: match.id,
                ...demoResult(matchIndex, playerIndex + 1)
            }));
        const predictedMatches = groupMatches.map((match)=>{
            const prediction = matchPredictions.find((item)=>item.matchId === match.id);
            return {
                ...match,
                homeScore: prediction.homeScore,
                awayScore: prediction.awayScore,
                status: 'finalizado'
            };
        });
        const predictedQualification = buildQualification(predictedMatches);
        const offset = playerIndex * 5;
        return {
            participantId: player.id,
            locked: true,
            champion: allTeams[(offset + 1) % allTeams.length],
            semifinalists: [
                allTeams[(offset + 1) % allTeams.length],
                allTeams[(offset + 7) % allTeams.length],
                allTeams[(offset + 13) % allTeams.length],
                allTeams[(offset + 19) % allTeams.length]
            ],
            topScorer: playerIndex === 0 ? 'Kylian Mbappe' : 'Harry Kane',
            mvp: playerIndex === 0 ? 'Pedri' : 'Lionel Messi',
            groupWinners: Object.fromEntries(predictedQualification.groupWinners.map((item)=>[
                    item.group,
                    item.team
                ])),
            groupQualified: Object.fromEntries(groups.map((group)=>[
                    group,
                    [
                        ...predictedQualification.groupWinners.filter((item)=>item.group === group).map((item)=>item.team),
                        ...predictedQualification.groupRunnersUp.filter((item)=>item.group === group).map((item)=>item.team),
                        ...predictedQualification.bestThirds.filter((item)=>item.group === group).map((item)=>item.team)
                    ]
                ])),
            bestThirds: predictedQualification.bestThirds.map((item)=>item.team),
            matches: matchPredictions
        };
    });
    const seededIds = new Set(seededPredictions.map((prediction)=>prediction.participantId));
    return [
        ...current.filter((prediction)=>!seededIds.has(prediction.participantId)),
        ...seededPredictions
    ];
}
function validatePublicForm(form, participant) {
    const errors = [];
    const groupMatches = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tournamentState"].matches.filter((match)=>match.stage === 'Grupo');
    const completeMatches = groupMatches.filter((match)=>{
        const prediction = form.matches[match.id];
        return prediction && Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore);
    });
    if (!form.accessCode.trim()) errors.push('Codigo de acceso');
    if (form.accessCode.trim() && !participant) errors.push('Codigo de acceso valido');
    if (!form.champion) errors.push('Campeon');
    if (!form.topScorer.trim()) errors.push('Maximo goleador');
    if (!form.mvp.trim()) errors.push('MVP');
    if (form.semifinalists.length !== 4) errors.push('4 semifinalistas');
    if (form.bestThirds.length !== 8) errors.push('8 mejores terceros');
    if (completeMatches.length !== groupMatches.length) {
        errors.push(`Marcadores de grupos completos (${completeMatches.length}/${groupMatches.length})`);
    }
    groups.forEach((group)=>{
        if (!form.groupWinners[group]) {
            errors.push(`Primero del grupo ${group}`);
        }
        if ((form.groupQualified[group] ?? []).length !== 3) {
            errors.push(`3 clasificados del grupo ${group}`);
        }
    });
    return errors;
}
function demoResult(index, seed) {
    const patterns = [
        [
            2,
            0
        ],
        [
            1,
            1
        ],
        [
            0,
            2
        ],
        [
            3,
            1
        ],
        [
            1,
            0
        ],
        [
            2,
            2
        ],
        [
            0,
            1
        ],
        [
            4,
            2
        ],
        [
            2,
            3
        ],
        [
            3,
            0
        ],
        [
            1,
            2
        ],
        [
            0,
            0
        ]
    ];
    const [homeScore, awayScore] = patterns[(index * 5 + seed * 7) % patterns.length];
    return {
        homeScore,
        awayScore
    };
}
function createAccessCode(name) {
    const prefix = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase().padEnd(4, 'X');
    return `PORRA-${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
function syncApi(path, body) {
    fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).catch(()=>{
    // Keep the localStorage copy as fallback while working without a database.
    });
}
function seedOfficialGroupResults(state) {
    return {
        ...state,
        matches: state.matches.map((match, index)=>{
            if (match.stage !== 'Grupo') {
                return match;
            }
            return {
                ...match,
                ...demoResult(index, 9),
                status: 'finalizado'
            };
        })
    };
}
function QualificationList({ title, items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "qualification-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                children: title
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1942,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "qualification-items",
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "qualification-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Grupo ",
                                    item.group
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1946,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: teamLabel(item.team)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1947,
                                columnNumber: 13
                            }, this),
                            'points' in item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: [
                                    item.points,
                                    " pts · DG ",
                                    item.goalDifference
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1949,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${item.group}-${item.team}`, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1945,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1943,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1941,
        columnNumber: 5
    }, this);
}
_c6 = QualificationList;
function ensureStanding(standings, team) {
    if (standings.has(team)) {
        return;
    }
    standings.set(team, {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
    });
}
function PredictionGroup({ group, matches, onChange, predictions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "prediction-group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: [
                    "Grupo ",
                    group
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1989,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "prediction-fixtures",
                children: matches.map((match)=>{
                    const prediction = predictions[match.id];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prediction-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                children: formatDate(match.date)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1996,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: teamLabel(match.home)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1997,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                "aria-label": `${match.home} goles contra ${match.away}`,
                                min: "0",
                                onChange: (event)=>onChange(match.id, 'homeScore', event.target.value),
                                type: "number",
                                value: Number.isNaN(prediction?.homeScore) || prediction?.homeScore === undefined ? '' : prediction.homeScore
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 1998,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "prediction-separator",
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 2005,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                "aria-label": `${match.away} goles contra ${match.home}`,
                                min: "0",
                                onChange: (event)=>onChange(match.id, 'awayScore', event.target.value),
                                type: "number",
                                value: Number.isNaN(prediction?.awayScore) || prediction?.awayScore === undefined ? '' : prediction.awayScore
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 2006,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: teamLabel(match.away)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 2013,
                                columnNumber: 15
                            }, this)
                        ]
                    }, match.id, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 1995,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 1990,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 1988,
        columnNumber: 5
    }, this);
}
_c7 = PredictionGroup;
function TeamSelect({ label, onChange, teams, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        children: [
            label,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                onChange: (event)=>onChange(event.target.value),
                value: value,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "Seleccionar"
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 2037,
                        columnNumber: 9
                    }, this),
                    teams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: team,
                            children: team
                        }, team, false, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 2039,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2036,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 2034,
        columnNumber: 5
    }, this);
}
_c8 = TeamSelect;
function MultiTeamPicker({ label, limit, onChange, selected, teams }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        className: "multi-picker",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                children: [
                    label,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            selected.length,
                            "/",
                            limit
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 2061,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2061,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "multi-options",
                children: teams.map((team)=>{
                    const checked = selected.includes(team);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "check-option",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                checked: checked,
                                disabled: !checked && selected.length >= limit,
                                onChange: (event)=>{
                                    if (event.target.checked) {
                                        onChange([
                                            ...selected,
                                            team
                                        ]);
                                        return;
                                    }
                                    onChange(selected.filter((item)=>item !== team));
                                },
                                type: "checkbox"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 2067,
                                columnNumber: 15
                            }, this),
                            teamLabel(team)
                        ]
                    }, team, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 2066,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2062,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 2060,
        columnNumber: 5
    }, this);
}
_c9 = MultiTeamPicker;
function teamsForGroup(matches, group) {
    return Array.from(new Set(matches.filter((match)=>match.group === group).flatMap((match)=>[
            match.home,
            match.away
        ])));
}
function teamLabel(team) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "team-label",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flag",
                "aria-hidden": "true",
                children: flags[team] ?? '🏳️'
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2102,
                columnNumber: 7
            }, this),
            team
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 2101,
        columnNumber: 5
    }, this);
}
function formatDate(date) {
    if (!date) return '-';
    const [, month, day] = date.split('-');
    return `${day}/${month}`;
}
function Metric({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "metric",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: value
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 2116,
        columnNumber: 5
    }, this);
}
_c10 = Metric;
function Rule({ title, text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: title
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: text
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 2127,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 2125,
        columnNumber: 5
    }, this);
}
_c11 = Rule;
const __TURBOPACK__default__export__ = App;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "App");
__turbopack_context__.k.register(_c1, "KnockoutCard");
__turbopack_context__.k.register(_c2, "KnockoutPredictionRow");
__turbopack_context__.k.register(_c3, "OfficialResultRow");
__turbopack_context__.k.register(_c4, "PredictionReview");
__turbopack_context__.k.register(_c5, "GroupCard");
__turbopack_context__.k.register(_c6, "QualificationList");
__turbopack_context__.k.register(_c7, "PredictionGroup");
__turbopack_context__.k.register(_c8, "TeamSelect");
__turbopack_context__.k.register(_c9, "MultiTeamPicker");
__turbopack_context__.k.register(_c10, "Metric");
__turbopack_context__.k.register(_c11, "Rule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$App$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/App.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$App$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_06zlp_5._.js.map