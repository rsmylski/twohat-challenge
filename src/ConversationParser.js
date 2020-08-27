import { readFileSync } from 'fs';
import { inspect } from 'util';

class ConversationParser {
  /**
   * Contruct a ConversationParser with nconf config
   * @param {nconf} config
   */
  constructor(config) {
    this.config = config;
    this.parseConversationData = this.parseConversationData.bind(this);
    this.findFiltered = this.findFiltered.bind(this);
    this.getFlagCounts = this.getFlagCounts.bind(this);
    this.getTopicCounts = this.getTopicCounts.bind(this);
    this.getPlayerCounts = this.getPlayerCounts.bind(this);
    this.getRepeatedWords = this.getRepeatedWords.bind(this);
    this.displayDetailedResults = this.displayDetailedResults.bind(this);
  }

  /**
   * Open and parse a conversation data file at given path - outputs basic results after parsing
   * @param {String} path
   */
  parseConversationData = (path) => {
    const jsonData = readFileSync(path);
    const conversations = JSON.parse(jsonData);
    if (Array.isArray(conversations)) {
      const filteredConversations = this.findFiltered(conversations);
      const flags = this.getFlagCounts(conversations);
      const topics = this.getTopicCounts(conversations);
      const players = this.getPlayerCounts(conversations);
      const threshold = 3;
      const repeatedWords = this.getRepeatedWords(conversations, threshold);
      const filteredWords = this.getRepeatedWords(filteredConversations, threshold);
      /* eslint-disable no-console */
      console.log(`Total conversations: ${conversations.length}`);
      console.log(`Found ${filteredConversations.length} filtered conversations`);
      console.log(`Found ${flags.length} different conversation flags`);
      console.log(`Found ${topics.length} different conversation topics`);
      console.log(`Found ${players.length} different players`);
      console.log(`Found ${repeatedWords.length} words repeated more than ${threshold} times`);
      console.log(
        `Found ${filteredWords.length} words from filtered conversations repeated more than ${threshold} times`,
      );
      /* eslint-enable no-console */

      if (this.config.get('filtered')) {
        this.displayDetailedResults('All Filtered Conversations', filteredConversations);
      }
      if (this.config.get('flags')) {
        this.displayDetailedResults('All Flag Counts', flags);
      }
      if (this.config.get('topics')) {
        this.displayDetailedResults('All Topic Counts', topics);
      }
      if (this.config.get('players')) {
        this.displayDetailedResults('All Player Counts', players);
      }
      if (this.config.get('repeated')) {
        this.displayDetailedResults('All Repeated Words', repeatedWords);
      }
      if (this.config.get('filteredRepeated')) {
        this.displayDetailedResults('All Filtered Repeated Words', filteredWords);
      }
    } else {
      throw new Error('Data not in expected array format');
    }
  };

  /**
   * Return all conversations that were marked as filtered
   * @param {Array} conversations
   * @returns {Array}
   */
  findFiltered = (conversations) => conversations.filter((conversation) => conversation.filtered === 1);

  /**
   * Return a list of all the conversation flags with a count of how many times each was found
   * @param {Array} conversations
   * @returns {Array}
   */
  getFlagCounts = (conversations) => {
    const flags = [];
    conversations.forEach((conversation) => {
      const index = flags.findIndex((element) => element.flags === conversation.flags);
      if (index === -1) {
        flags.push({ flags: conversation.flags, count: 1 });
      } else {
        flags[index].count += 1;
      }
    });
    return flags;
  };

  /**
   * Return a list of all the conversation topics with a count of how many times each was found
   * @param {Array} conversations
   * @returns {Array}
   */
  getTopicCounts = (conversations) => {
    const topics = [];
    conversations.forEach((conversation) => {
      if (Array.isArray(conversation.topics)) {
        conversation.topics.forEach((topic) => {
          const index = topics.findIndex((element) => element.topic === topic.topic);
          if (index === -1) {
            topics.push({ topic: topic.topic, count: 1 });
          } else {
            topics[index].count += 1;
          }
        });
      }
    });
    return topics;
  };

  /**
   * Return a list of all the player identifiers with a count of how many conversations each player had
   * @param {Array} conversations
   * @returns {Array}
   */
  getPlayerCounts = (conversations) => {
    const players = [];
    conversations.forEach((conversation) => {
      const index = players.findIndex((element) => element.player === conversation.player);
      if (index === -1) {
        players.push({ player: conversation.player, count: 1 });
      } else {
        players[index].count += 1;
      }
    });
    return players;
  };

  /**
   * Return a list of all the words used more than the given threshold,
   * with a count of how many times each was used
   * @param {Array} conversations
   * @param {Integer} repeatThreshold
   * @returns {Array}
   */
  getRepeatedWords = (conversations, threshold) => {
    const allWords = [];
    conversations.forEach((conversation) => {
      const words = conversation.simplified.trim().replace(/\s/, ' ').split(' ');
      words.forEach((word) => {
        const index = allWords.findIndex((element) => element.word === word);
        if (index === -1) {
          allWords.push({ word, count: 1 });
        } else {
          allWords[index].count += 1;
        }
      });
    });
    return allWords.filter((element) => element.count > threshold);
  };

  /**
   * Display detailed output of an array of objects, prefaced by a message
   * @param {String} message
   * @param {Array} elements
   */
  displayDetailedResults = (message, elements) => {
    // eslint-disable-next-line no-console
    console.log(`${message}\n${inspect(elements, { maxArrayLength: 1000, depth: 4 })}\n\n`);
  };
}

export default ConversationParser;
