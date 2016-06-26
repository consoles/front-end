/**
 * Created by gaopengfei on 2016/6/11.
 */
'use strict'

const fs = require('fs')
const path = require('path')

const koa = require('koa')
const favicon = require('koa-favicon')
const serve = require('koa-static')
const moment = require('moment')
const logger = require('koa-logger')
const router = require('koa-router')()

class Util {
    static parseRSSAsync(rssUrl) {
        return new Promise(function (resolve, reject) {
            require('rss-parser').parseURL(rssUrl, function (err, parsed) {
                if (err) reject(err)
                resolve(parsed.feed)
            })
        })
    }

    static readFileAsync(fpath, encoding) {
        return new Promise(function (resolve, reject) {
            fs.readFile(fpath, encoding || 'utf-8', function (err, content) {
                if (err) reject(err)
                resolve(content)
            })
        })
    }
}

let app = koa()

app.use(serve(path.join(__dirname, 'public')))
app.use(favicon(__dirname + 'public/icon.png'))

let content
router.get('/api/articles', function *(next) {
    // cache
    if (!content) {
        let rssUrl = 'http://cn.engadget.com/rss.xml'
        content = yield Util.parseRSSAsync(rssUrl)
    }
    this.body = content.entries.map((entry, index) => {
            return {
                id: index + 1,
                date: moment(new Date(entry.pubDate)).format('YYYY-MM-DD'),
                headline: entry.title,
                body: entry.content,
                author: `AUTHOR_${index + 1}`
            }
        }
    )
})

app.use(logger())
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(80, function () {
    console.log('koa server started at the port 80')
})