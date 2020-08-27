import nconf from 'nconf';
import ConversationParser from './ConversationParser';

const main = (config) => {
  const parser = new ConversationParser(config);
  try {
    parser.parseConversationData('data.json');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not open data file: ${error}`);
  }
};

nconf.argv().env();
main(nconf);
