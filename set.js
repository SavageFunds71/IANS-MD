const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUhxemEweEF4UStaczgwU0hGZ0F0cE9JdEJHL0Jta3M1SWUxK1lFUjZGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHg0Njl0MEFza3ZKL1Q1WHdKQkVQd0xSM2M2amJYeTZoSEo4ejJleGl5RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQ0QxZG12bUZVRm1hR2RtbmlyWFNnT0ZwVHFoN3RmVnVLd0pibnJGKzFjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGSDFVaUxSS1UzT3ZmWER3SS9wMVh1Rys1NHp4U09qOEx6TnZtRHdERkU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhDbmtxd3M0aWplTVlIZ244dmluMGNVZWVqanJXL0FrdjEwNWMyV0JUM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllycWdWWnFZWVNqZXE1ODhMUHdDUVAxSmVFMUpnMnBMcFlac3VtdStDQk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUV1MXRBcHdFcGkyd1hkVFpobGRDUHB2d0FIMC84RlJMaU5XUUZMTEMwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWFucW54MGNncWVCMXNOdUE5aGVRWXN5YXcwd3R5YkhpTUNEdkUrRHZnaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt5Qy90QVIyc2RZNFZncnJuMkptRW5PVlExOUF1QTlLdWR4YWw1OWRsU0E0Wk4xT3dVTzdUVjBnSDMxeTBEcHBpaG5IWW1kSVZMajBZSXg0WnpGL2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjksImFkdlNlY3JldEtleSI6IlVYWlZlR3FOM1p1UE5kc1cxTmFnZnluajA3TjBqQmVkdG9yVGxzTEk3N3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikhhd0IycVQxUU9PX0tGaUpzNjNWVkEiLCJwaG9uZUlkIjoiMWU4MWVkMDItZDBkMS00ZTViLWE0YjgtNmViNTk3OTVjMWMyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxLTnd6aUpyTWxHZ3lWWGpiZkRSclRZc21OYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTZG03ZWo3UkRKS0ZWdCtKYWswR1o0SGxOUDQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUTY0RE5EN00iLCJtZSI6eyJpZCI6IjIzNDkwMjk1NjUxMjk6MjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2F2YWdlIEZ1bmRzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLSDd0SVFERUsrR2c3WUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrMWw5Mld0cXlqaG5DUGk2MU5kVDlGTGN3TzRqdU5SOUVFdFdoVmduY2kwPSIsImFjY291bnRTaWduYXR1cmUiOiJyTlM1a3FTajNreXdLNFdudjRieEEwNjNQK3lUU2xQemxLUDdUNFpybkdya0pXVFF3akpiZnhwbjdxK01GZWVnUjI5MkRJWlcralkzaHZCd3JQQmNBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYjRlRUVoWFQrWU1IQjhGbWlwTTNTcmVwQXBocU1ZZ1RRWlB0cy8vZWlCMFRLMnpKYnNVa0J2Tlkrc2p1aWNaRjBhNTVoRDc4aGJPckJUNklHV2I4anc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI5NTY1MTI5OjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZ0WmZkbHJhc280WndqNHV0VFhVL1JTM01EdUk3alVmUkJMVm9WWUozSXQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM5MDg5MjR9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ian Taracha",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349029565129",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BEST CODER MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/76337c73fe48a2aa4466b.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
