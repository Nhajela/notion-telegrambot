const { Client } = require ("@notionhq/client");

const notion = new Client({ auth: "secret_7drVNvc6xw0JpiRfHBspPuw9s9iBEunq1HCti3nXT1w" })

const databaseId = "9f60bfd852904a1fbecc58c988477980";

export async function addItem(text) {
  try {
    await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: databaseId },
        properties: {
          title: { 
            title:[
              {
                "text": {
                  "content": text
                }
              }
            ]
          }
        }
      },
    })
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}
