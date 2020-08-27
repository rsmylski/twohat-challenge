import nconf from 'nconf';
import ConversationParser from '../src/ConversationParser';

describe('ConversationParser', () => {
  const sampleParsedConvesations = [
    {
      count: 0,
      text: 'no ur not boring ',
      topics: [
        {
          topic: 0,
          relevance: 64,
          confidence: 224,
        },
        {
          topic: 3,
          relevance: 0,
          confidence: 224,
        },
      ],
      player: '2820',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'no ur not boring',
    },
    {
      count: 0,
      text: 'n i went u 2 r discusting n carried walkin on',
      topics: [
        {
          topic: 0,
          relevance: 160,
          confidence: 1,
        },
        {
          topic: 3,
          relevance: 0,
          confidence: 224,
        },
        {
          topic: 12,
          relevance: 64,
          confidence: 224,
        },
      ],
      player: '2975',
      flags: 0,
      client_id: 999,
      filtered: 1,
      simplified: 'n i went u 2 r discusting n carried walkin on',
    },
    {
      count: 0,
      text: 'hey',
      topics: [
        {
          topic: 0,
          relevance: 0,
          confidence: 224,
        },
      ],
      player: '2997',
      flags: 4251727,
      client_id: 999,
      filtered: 0,
      simplified: 'hey',
    },
    {
      count: 0,
      text: 'i just get bored easily',
      topics: [
        {
          topic: 0,
          relevance: 32,
          confidence: 224,
        },
      ],
      player: '2820',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'i just get bored easily',
    },
    {
      count: 0,
      text: 'lol !!1',
      topics: [
        {
          topic: 0,
          relevance: 64,
          confidence: 224,
        },
        {
          topic: 12,
          relevance: 64,
          confidence: 224,
        },
      ],
      player: '2882',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'lol !!1',
    },
    {
      count: 0,
      text: "mhm I've been asleep most of today",
      topics: [
        {
          topic: 0,
          relevance: 64,
          confidence: 224,
        },
      ],
      player: '2863',
      flags: 2,
      client_id: 999,
      filtered: 0,
      simplified: "mhm i've been asleep most of today",
    },
    {
      count: 0,
      text: 'n thn she goes 2 r head of yr lyk',
      topics: [
        {
          topic: 0,
          relevance: 64,
          confidence: 32,
        },
        {
          topic: 4,
          relevance: 128,
          confidence: 224,
        },
        {
          topic: 3,
          relevance: 0,
          confidence: 224,
        },
        {
          topic: 12,
          relevance: 64,
          confidence: 224,
        },
      ],
      player: '2975',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'n thn she goes 2 r head of yr lyk',
    },
    {
      count: 0,
      text: 'late night and ill',
      topics: [
        {
          topic: 0,
          relevance: 32,
          confidence: 224,
        },
      ],
      player: '2863',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'late night and ill',
    },
    {
      count: 0,
      text: 'i have none',
      topics: [
        {
          topic: 0,
          relevance: 32,
          confidence: 224,
        },
        {
          topic: 3,
          relevance: 0,
          confidence: 224,
        },
      ],
      player: '2820',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'i have none',
    },
    {
      count: 0,
      text: 'boooooooo',
      topics: [
        {
          topic: 0,
          relevance: 64,
          confidence: 224,
        },
      ],
      player: '2863',
      flags: 2,
      client_id: 999,
      filtered: 0,
      simplified: 'boooooooo',
    },
    {
      count: 0,
      text: 'whats up',
      topics: [
        {
          topic: 0,
          relevance: 32,
          confidence: 224,
        },
      ],
      player: '2997',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'whats up',
    },
    {
      count: 0,
      text: 'sofi said this',
      topics: [
        {
          topic: 0,
          relevance: 160,
          confidence: 224,
        },
        {
          topic: 3,
          relevance: 0,
          confidence: 224,
        },
      ],
      player: '2975',
      flags: 0,
      client_id: 999,
      filtered: 1,
      simplified: 'sofi said this',
    },
    {
      count: 0,
      text: 'y wud u do tht',
      topics: [
        {
          topic: 0,
          relevance: 64,
          confidence: 224,
        },
        {
          topic: 12,
          relevance: 64,
          confidence: 224,
        },
        {
          topic: 4,
          relevance: 64,
          confidence: 224,
        },
      ],
      player: '2882',
      flags: 0,
      client_id: 999,
      filtered: 0,
      simplified: 'y wud u do tht',
    },
    {
      count: 0,
      text: 'lol',
      topics: [
        {
          topic: 0,
          relevance: 32,
          confidence: 224,
        },
      ],
      player: '2987',
      flags: 4247631,
      client_id: 999,
      filtered: 0,
      simplified: 'lol',
    },
    {
      count: 0,
      text: 'i am dalek khan........ exterminate!!!!!!',
      topics: [
        {
          topic: 0,
          relevance: 128,
          confidence: 224,
        },
        {
          topic: 2,
          relevance: 128,
          confidence: 224,
        },
        {
          topic: 3,
          relevance: 128,
          confidence: 224,
        },
        {
          topic: 12,
          relevance: 0,
          confidence: 224,
        },
      ],
      player: '2879',
      flags: 0,
      client_id: 999,
      filtered: 1,
      simplified: 'i am dalek khan ........ exterminate !!!!!!',
    },
  ];

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('parseConversationData', () => {
    it('Errors with invalid path', () => {
      const parser = new ConversationParser({});
      expect(() => parser.parseConversationData('invalidPath.json')).toThrow(/no such file or directory/);
    });

    it('Errors if data file is not valid json', () => {
      const parser = new ConversationParser(nconf);
      expect(() => parser.parseConversationData('tests/notJson.json')).toThrow(/Unexpected token/);
    });

    it('Errors if data file is valid json, but not an array', () => {
      const parser = new ConversationParser(nconf);
      expect(() => parser.parseConversationData('tests/notArray.json')).toThrow(/not in expected array/);
    });

    it('Does not error with a valid path', () => {
      const parser = new ConversationParser(nconf);
      expect(() => parser.parseConversationData('tests/validData.json')).not.toThrow();
    });
  });

  describe('findFiltered', () => {
    it('Filters out conversations marked "filtered: 1"', () => {
      const parser = new ConversationParser(nconf);
      const filtered = parser.findFiltered(sampleParsedConvesations);
      expect(filtered).not.toHaveLength(sampleParsedConvesations.length);
      expect(filtered).toHaveLength(3);
    });
  });

  describe('getFlagCounts', () => {
    it("Finds all unique flags and a count of each flag's usage", () => {
      expect.assertions(5);
      const parser = new ConversationParser(nconf);
      const flags = parser.getFlagCounts(sampleParsedConvesations);
      expect(flags).toHaveLength(4);
      flags.forEach((flag) => {
        if (flag.flags === 0) {
          expect(flag.count).toEqual(11);
        }
        if (flag.flags === 4251727) {
          expect(flag.count).toEqual(1);
        }
        if (flag.flags === 2) {
          expect(flag.count).toEqual(2);
        }
        if (flag.flags === 4247631) {
          expect(flag.count).toEqual(1);
        }
      });
    });
  });

  describe('getTopicCounts', () => {
    it("Finds all unique topics and a count of each topic's usage", () => {
      expect.assertions(6);
      const parser = new ConversationParser(nconf);
      const topics = parser.getTopicCounts(sampleParsedConvesations);
      expect(topics).toHaveLength(5);
      topics.forEach((topic) => {
        if (topic.topic === 0) {
          expect(topic.count).toEqual(15);
        }
        if (topic.topic === 3) {
          expect(topic.count).toEqual(6);
        }
        if (topic.topic === 12) {
          expect(topic.count).toEqual(5);
        }
        if (topic.topic === 4) {
          expect(topic.count).toEqual(2);
        }
        if (topic.topic === 2) {
          expect(topic.count).toEqual(1);
        }
      });
    });
  });

  describe('getPlayerCounts', () => {
    it("Finds all unique players and a count of each player's conversations", () => {
      expect.assertions(8);
      const parser = new ConversationParser(nconf);
      const players = parser.getPlayerCounts(sampleParsedConvesations);
      expect(players).toHaveLength(7);
      players.forEach((player) => {
        if (player.player === '2820') {
          expect(player.count).toEqual(3);
        }
        if (player.player === '2975') {
          expect(player.count).toEqual(3);
        }
        if (player.player === '2997') {
          expect(player.count).toEqual(2);
        }
        if (player.player === '2882') {
          expect(player.count).toEqual(2);
        }
        if (player.player === '2863') {
          expect(player.count).toEqual(3);
        }
        if (player.player === '2987') {
          expect(player.count).toEqual(1);
        }
        if (player.player === '2879') {
          expect(player.count).toEqual(1);
        }
      });
    });
  });

  describe('getRepeatedWords', () => {
    it('Finds all words that have been repeated over 2 times and a count how many times each was used', () => {
      expect.assertions(8);
      const parser = new ConversationParser(nconf);
      const words = parser.getRepeatedWords(sampleParsedConvesations, 1);
      expect(words).toHaveLength(7);
      words.forEach((word) => {
        if (word.word === 'n') {
          expect(word.count).toEqual(3);
        }
        if (word.word === 'i') {
          expect(word.count).toEqual(4);
        }
        if (word.word === 'u') {
          expect(word.count).toEqual(2);
        }
        if (word.word === '2') {
          expect(word.count).toEqual(2);
        }
        if (word.word === 'r') {
          expect(word.count).toEqual(2);
        }
        if (word.word === 'of') {
          expect(word.count).toEqual(2);
        }
        if (word.word === 'lol') {
          expect(word.count).toEqual(2);
        }
      });
    });
  });

  describe('displayDetailedResults', () => {
    it('Outputs the full array/object of a set of results to the console', () => {
      const parser = new ConversationParser(nconf);
      const spy = jest.spyOn(console, 'log');
      const flags = parser.getFlagCounts(sampleParsedConvesations);
      parser.displayDetailedResults('All of the flags', flags);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('All of the flags'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('4251727'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('4247631'));
    });
  });
});
