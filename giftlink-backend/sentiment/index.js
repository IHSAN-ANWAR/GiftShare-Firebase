const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

/**
 * Analyze sentiment of a text
 * @param {string} text - The text to analyze
 * @returns {object} - Sentiment analysis result with score and classification
 */
function analyzeSentiment(text) {
  if (!text || typeof text !== 'string') {
    return {
      score: 0,
      classification: 'neutral',
      tokens: []
    };
  }

  const tokens = tokenizer.tokenize(text.toLowerCase());
  const score = analyzer.getSentiment(tokens);
  
  let classification = 'neutral';
  if (score > 0.1) {
    classification = 'positive';
  } else if (score < -0.1) {
    classification = 'negative';
  }

  return {
    score: parseFloat(score.toFixed(4)),
    classification,
    tokens
  };
}

module.exports = {
  analyzeSentiment
};
