const { Client } = require ("@notionhq/client");


//notion start
const notion = new Client({ auth: "" })

const databaseId = "";
 async function addItem(text,context,desc="") {
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
          },
          'Context': {
            select: {
              name: context,
            },
          },
          "Description": {
            rich_text: [
              { "text": {
                  "content":desc ,
              },
              },
            ],
          },
        }
      },
    })
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}
// notion end.



const { Telegraf } = require('telegraf');
//todo change message deleter to a list.

const bot = new Telegraf('');

var lastMsgId = "";
var secondlastMsgId = "";
var content = "";

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to Home Notion Bot', {
    })
})


bot.on('message', (ctx) => {
    console.log(ctx.update.message.text);
    console.log(secondlastMsgId)
    secondlastMsgId?  bot.telegram.deleteMessage(ctx.chat.id,secondlastMsgId):"";
    content = ctx.update.message.text;
    let aMessage = `where do you want me to put that?`;
 
    bot.telegram.sendMessage(ctx.chat.id, aMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Personal",
                        callback_data: 'personal'
                    },
                    {
                        text: "Content",
                        callback_data: 'content'
                    },
                    {
                      text: "Learning",
                      callback_data: 'learning'
                  },
                  {
                    text: "Ideas",
                    callback_data: 'ideas'
                },

                ],

            ]
        }
    }).then((m) => {
      lastMsgId = m.message_id;
    })
})


bot.action('personal', ctx => {actions(ctx,"Personal")}
 )
 bot.action('content', ctx => {actions(ctx,"Content")}
 )
 bot.action('learning', ctx => {actions(ctx,"Learning")}
 )
 bot.action('ideas', ctx => {actions(ctx,"Ideas")}
 )


actions = (ctx,choice) => {
  console.log(ctx.chat.id)
  bot.telegram.sendMessage(ctx.chat.id, 'Thankyou').then((m) => {
    secondlastMsgId = m.message_id;
  });

  // addItem(content,"Personal")
  let a = content.split("\n")
  a[1] == ""?  addItem(a[0],choice,content) : addItem(content, choice,"")
  
  bot.telegram.deleteMessage(ctx.chat.id,lastMsgId)
 
}
    

  

 

bot.launch();