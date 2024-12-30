// // Enable type checking
// // @ts-check

// const NotionParse = require('@kodaps/notion-parse');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const go = async () => {
//   if (process.env.NOTION_SECRET) {
//     try {
//       await NotionParse.parseNotion(
//         process.env.NOTION_SECRET,
//         './src/content',
//         [
//           { 
//             databaseId: process.env.NOTION_DATABASE_ID || '', contentType: 'Blog', 
//             startCursor: undefined 
//           },
//         ]
//       )
//     //   console.log('Done');
//     } catch (error) {
//       console.error('Error while parsing Notion data:', error);
//     }
//   } else {
//     console.error('Missing NOTION_SECRET environment variable');
//   }
// };

// go().then(()=>{
//     console.log('Done');
// })
const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_SECRET });

const fetchBlogData = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
      start_cursor: undefined, // Ensure undefined is passed
    });
    console.log('Blog Data:', response);
  } catch (error) {
    console.error('Error querying Notion:', error.message);
  }
};

fetchBlogData();