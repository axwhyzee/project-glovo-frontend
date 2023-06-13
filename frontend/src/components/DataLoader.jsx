import _ from "lodash";
import { useEffect } from 'react';
import { getAllPosts, getEdgesWithIds } from '../network/api';

const DUMMY_GRAPH = (() => {
    const letters = [
        { i: 0, upper: "Α", lower: "α", name: "Alpha", en: "a" },
        { i: 1, upper: "Β", lower: "β", name: "Beta", en: "b" },
        { i: 2, upper: "Γ", lower: "γ", name: "Gamma", en: "g" },
        { i: 3, upper: "Δ", lower: "δ", name: "Delta", en: "d" },
        { i: 4, upper: "Ε", lower: "ε", name: "Epsilon", en: "e" },
        { i: 5, upper: "Ζ", lower: "ζ", name: "Zeta", en: "z" },
        { i: 6, upper: "Η", lower: "η", name: "Eta", en: "h" },
        { i: 7, upper: "Θ", lower: "θ", name: "Theta", en: "th" },
        { i: 8, upper: "Ι", lower: "ι", name: "Iota", en: "i" },
        { i: 9, upper: "Κ", lower: "κ", name: "Kappa", en: "k" },
        { i: 10, upper: "Λ", lower: "λ", name: "Lambda", en: "l" },
        { i: 11, upper: "Μ", lower: "μ", name: "Mu", en: "m" },
        { i: 12, upper: "Ν", lower: "ν", name: "Nu", en: "n" },
        { i: 13, upper: "Ξ", lower: "ξ", name: "Xi", en: "x" },
        { i: 14, upper: "Ο", lower: "ο", name: "Omicron", en: "o" },
        { i: 15, upper: "Π", lower: "π", name: "Pi", en: "p" },
        { i: 16, upper: "Ρ", lower: "ρ", name: "Rho", en: "r" },
        { i: 17, upper: "Σ", lower: "σ", name: "Sigma", en: "s" },
        { i: 18, upper: "Τ", lower: "τ", name: "Tau", en: "t" },
        { i: 19, upper: "Υ", lower: "υ", name: "Upsilon", en: "u" },
        { i: 20, upper: "Φ", lower: "φ", name: "Phi", en: "ph" },
        { i: 21, upper: "Χ", lower: "χ", name: "Chi", en: "ch" },
        { i: 22, upper: "Ψ", lower: "ψ", name: "Psi", en: "ps" },
        { i: 23, upper: "Ω", lower: "ω", name: "Omega", en: "o" }
    ];
    // 24*24 = 400+
    const nodes = ((seed, n = 400) => {
        const d = new Set();
        while (d.size < n) {
            d.add(_.sampleSize(seed, 2).map(p => p.name).join('-'));
        }
        return Array.from(d, (str, i) => ({i, name: str}));
    })(letters);

    const edges = ((nodes, n = Math.trunc(nodes.length * 0.7)) => {
        const sampleSpace = Array.from(
            { length: nodes.length - 1 },
            (_, i) => nodes.length - i - 1
        ).flatMap((n, i) => Array.from({ length: n }, (_, x) => [i, i + x + 1]));

        return _.sampleSize(sampleSpace, n).map(([x, y], i) => ({
            i,
            s: x,
            t: y,
            w: Math.trunc(Math.random() * 10 + 1)
        }));
    })(nodes).map((d) => ({ ...d, source: d.s, target: d.t }));

    return { nodes, edges };
})();

const DUMMY_POST = ({"articles":[{"title":"Biden slams McCarthy, tells him to 'take default off the table' in debt ceiling fight","url":"https://www.cnbc.com/2023/04/19/biden-slams-mccarthy-debt-ceiling-fight.html","datetime":1681937813,"publisher":"CNBC","keys":["debt ceiling brinkmanship","wednesday slammed house republicans","mccarthy","president joe biden","national debt"]},{"title":"Trump made a bundle of cash selling NFTs, financial filings show","url":"https://www.cnbc.com/2023/04/14/trump-made-a-bundle-of-cash-selling-nfts-financial-filings-show.html","datetime":1681508846,"publisher":"CNBC","keys":["cards","financial disclosure form","nft int llc","trading cards","unique digital assets"]},{"title":"UK parliament's standards commissioner investigating PM Sunak","url":"https://www.cnbc.com/2023/04/17/uk-parliaments-standards-commissioner-investigating-pm-sunak.html","datetime":1681734032,"publisher":"CNBC","keys":["prime minister rishi sunak","commissioner","investigation","standards","parliament website"]},{"title":"Fox News apologizes to judge in defamation case for failing to disclose Rupert Murdoch's role at the network","url":"https://www.cnbc.com/2023/04/16/fox-news-apologizes-to-judge-for-failing-to-disclose-rupert-murdochs-role-at-the-network.html","datetime":1681656266,"publisher":"CNBC","keys":["dominion claims","murdoch","fox attorney blake rohrbacher","delaware superior court judge eric davis","fox news"]},{"title":"Fox-Dominion defamation trial to start Tuesday after delay, judge says ","url":"https://www.cnbc.com/2023/04/17/dominion-defamation-lawsuit-against-fox-news-delayed.html","datetime":1681691701,"publisher":"CNBC","keys":["dominion voting systems","dominion spokesperson","most defamation cases","judge eric davis","trial delay"]},{"title":"Trump has raised $34 million so far in 2023, including the indictment bump","url":"https://www.cnbc.com/2023/04/15/trump-has-raised-34-million-so-far-in-2023-including-the-indictment-bump.html","datetime":1681576712,"publisher":"CNBC","keys":["presidential race","dollar gop donors","new york charges","trump","fundraising numbers"]},{"title":"Supreme Court Justice Clarence Thomas reportedly has been claiming thousands of dollars annually from a shuttered real estate firm","url":"https://www.cnbc.com/2023/04/16/clarence-thomas-has-been-claiming-thousands-of-dollars-annually-from-a-shuttered-real-estate-firm.html","datetime":1681661732,"publisher":"CNBC","keys":["old conservative associate justice","justice","financial disclosure law","ginger holdings llc","thomas"]},{"title":"G-7 vows to step up moves to renewable energy, zero carbon","url":"https://www.cnbc.com/2023/04/16/g7-vows-to-step-up-moves-to-renewable-energy-zero-carbon.html","datetime":1681634517,"publisher":"CNBC","keys":["energy prices","clean energy transition","energy security","historic global carbon emissions","global carbon emissions"]},{"title":"McCarthy pledges a vote on one-year debt limit hike – without clear GOP support","url":"https://www.cnbc.com/2023/04/17/kevin-mccarthy-wall-street-speech.html","datetime":1681739097,"publisher":"CNBC","keys":["mccarthy","own fractious caucus","debt ceiling proposal","republican efforts","debt ceiling hike"]},{"title":"Macron addresses France amid anger over pension reform","url":"https://www.cnbc.com/2023/04/17/macron-addresses-france-amid-anger-over-pension-reform.html","datetime":1681756766,"publisher":"CNBC","keys":["macron","retirement age","french president","unpopular pension plan","france unemployment rate"]}],"page":1,"pages":19,"status":"Success"});

function DataLoader({ offline = false, setGraphData, setPostData }) {
    useEffect(() => {
        const loadGraph = async () => {
            setGraphData(await getEdgesWithIds() || { nodes:[], edges:[] });
        }
        const loadPosts = async () => {
            setPostData(await getAllPosts());
        }
        
        loadGraph();
        loadPosts();
    }, []);

    return null;
}

export default DataLoader;