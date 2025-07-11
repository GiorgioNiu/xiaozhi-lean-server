const AV = require('leanengine');

AV.Cloud.define('addChatLog', async (request) => {
  const { question, answer, device_id } = request.params;
  if (!question || !answer) {
    throw new AV.Cloud.Error('Question and answer are required.', { code: 400 });
  }
  const ChatLog = AV.Object.extend('ChatLog');
  const chatLog = new ChatLog();
  chatLog.set('question', question);
  chatLog.set('answer', answer);
  chatLog.set('deviceId', device_id || 'unknown');
  try {
    await chatLog.save();
    return { success: true, message: 'Log added successfully.' };
  } catch (error) {
    console.error('Failed to save chat log:', error);
    throw new AV.Cloud.Error('Failed to save data.', { code: 500 });
  }
});