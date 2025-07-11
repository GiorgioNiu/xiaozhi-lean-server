{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww38200\viewh19980\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const AV = require('leanengine');\
\
/**\
 * \uc0\u23450 \u20041 \u19968 \u20010 \u21517 \u20026  'addChatLog' \u30340 \u20113 \u20989 \u25968 \
 * \uc0\u23427 \u20250 \u25509 \u25910 \u26469 \u33258 \u23567 \u26234 \u35774 \u22791 \u30340 POST\u35831 \u27714 \
 */\
AV.Cloud.define('addChatLog', async (request) => \{\
  // \uc0\u20174 \u35831 \u27714 \u20013 \u33719 \u21462  question, answer \u21644  device_id\
  const \{ question, answer, device_id \} = request.params;\
\
  // \uc0\u31616 \u21333 \u30340 \u25968 \u25454 \u26657 \u39564 \
  if (!question || !answer) \{\
    // \uc0\u22914 \u26524 \u32570 \u23569 \u24517 \u35201 \u25968 \u25454 \u65292 \u23601 \u21521 \u23458 \u25143 \u31471 \u36820 \u22238 \u19968 \u20010 \u38169 \u35823 \
    throw new AV.Cloud.Error('Question and answer are required.', \{ code: 400 \});\
  \}\
\
  // \uc0\u36825 \u37324 \u30340  'ChatLog' \u24517 \u39035 \u21644 \u24744 \u22312 LeanCloud\u32593 \u31449 \u19978 \u21019 \u24314 \u30340 Class\u21517 \u31216 \u23436 \u20840 \u19968 \u33268 \
  const ChatLog = AV.Object.extend('ChatLog');\
  const chatLog = new ChatLog();\
\
  // \uc0\u35774 \u32622 \u35201 \u20445 \u23384 \u21040 \u25968 \u25454 \u34920 \u37324 \u30340 \u20869 \u23481 \
  chatLog.set('question', question);\
  chatLog.set('answer', answer);\
  chatLog.set('deviceId', device_id || 'unknown'); // \uc0\u22914 \u26524 \u35774 \u22791 \u27809 \u19978 \u25253 ID\u65292 \u23601 \u35760 \u24405 \u20026 unknown\
\
  // \uc0\u23581 \u35797 \u23558 \u25968 \u25454 \u20445 \u23384 \u21040 \u20113 \u31471 \
  try \{\
    await chatLog.save();\
    console.log(`\uc0\u25104 \u21151 \u20445 \u23384 \u26085 \u24535 : Q: $\{question\}`); // \u36825 \u26465 \u26085 \u24535 \u20250 \u26174 \u31034 \u22312 LeanCloud\u30340 \u21518 \u21488 \u26085 \u24535 \u20013 \
    // \uc0\u36820 \u22238 \u25104 \u21151 \u20449 \u24687 \u32473 \u23567 \u26234 \u35774 \u22791 \u65288 \u34429 \u28982 \u35774 \u22791 \u30446 \u21069 \u19981 \u20250 \u22788 \u29702 \u36825 \u20010 \u36820 \u22238 \u65289 \
    return \{ success: true, message: 'Log added successfully.' \};\
  \} catch (error) \{\
    console.error('\uc0\u20445 \u23384 \u32842 \u22825 \u35760 \u24405 \u22833 \u36133 :', error);\
    // \uc0\u22914 \u26524 \u20445 \u23384 \u22833 \u36133 \u65292 \u36820 \u22238 \u19968 \u20010 \u26381 \u21153 \u22120 \u38169 \u35823 \
    throw new AV.Cloud.Error('Failed to save data.', \{ code: 500 \});\
  \}\
\});}