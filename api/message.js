const { CharacterAI } = require('../character_ai/client');

module.exports = async (req, res) => {
  const { characterId, message } = req.query;
  if (!characterId || !message) {
    return res.status(400).json({ error: 'characterId and message query params required' });
  }
  const client = new CharacterAI();
  if (process.env.CHARACTERAI_KEY) {
    await client.authenticateWithToken(process.env.CHARACTERAI_KEY);
  } else {
    await client.authenticateAsGuest();
  }
  const chat = await client.createOrContinueConversation(characterId);
  const response = await chat.sendAndAwaitResponse(message, true);
  res.status(200).json({ text: response.text });
};
