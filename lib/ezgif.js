const { Duplex, Readable, Writable } = require('stream')
const cheerio = require('cheerio');
const FormData = require('form-data')
const { default: Axios } = require('axios');
const { exec } = require('child_process');
const qs = require('querystring')
const fs = require('fs');

/**
 * Convert Buffer to Readable Stream
 * @param {Buffer} buffer
 * @returns {ReadableStream}
 */
function buffer2Stream(buffer) {
     return new Readable({
          read() {
               this.push(buffer)
               this.push(null)
          }
     })
}

function uploadwebp(path) {
     return new Promise((resolve, reject) => {
          exec(`curl -X POST -H "Content-Type: multipart/form-data" -H "Accept: application/json" -F "berkas=@${path}" http://mrhrtz-wabot.000webhostapp.com/upload.php`, (err, stdout, stderr) => {
               if (err) {
                    reject({
                         status: false,
                         message: "Created By MRHRTZ"
                    });
                    return
               }
               const result = stdout
               resolve(result)
          })
     })
}

function png2webpUrl(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`https://ezgif.com/png-to-webp?url=${url}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                         file: file,
                         token: token,
                         convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    Axios({
                         method: 'post',
                         url: 'https://ezgif.com/apng-to-webp/' + gotdata.file,
                         data: bodyFormThen,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                         }
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         // console.log(data)
                         const result = 'https:' + $('div#output > p.outfile > img').attr('src')
                         resolve({
                              status: true,
                              message: "Created By MRHRTZ",
                              result: result
                         })
                    }).catch(reject)
               })
               .catch(reject)
     })
}

function apng2webpUrl(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`https://ezgif.com/apng-to-webp?url=${url}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                         file: file,
                         token: token,
                         convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    Axios({
                         method: 'post',
                         url: 'https://ezgif.com/apng-to-webp/' + gotdata.file,
                         data: bodyFormThen,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                         }
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         // console.log(data)
                         const result = 'https:' + $('div#output > p.outfile > img').attr('src')
                         resolve({
                              status: true,
                              message: "Created By MRHRTZ",
                              result: result
                         })
                    }).catch(reject)
               })
               .catch(reject)
     })
}

function webp2mp4Url(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`https://ezgif.com/webp-to-mp4?url=${url}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                         file: file,
                         token: token,
                         convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    Axios({
                         method: 'post',
                         url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                         data: bodyFormThen,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                         }
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                         resolve({
                              status: true,
                              message: "Created By MRHRTZ",
                              result: result
                         })
                    }).catch(reject)
               })
               .catch(reject);
     })
}

function reverseVideoFile(path) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('new-image', fs.createReadStream(path))
          console.log(bodyForm)
          Axios({
               method: 'post',
               url: 'https://ezgif.com/reverse-video',
               data: bodyForm,
               headers: {
                    'Content-Type': `video/mp4`
               }
          }).then(({ data }) => {
               const bodyFormThen = new FormData()
               const $ = cheerio.load(data)
               const file = $('input[name="file"]').attr('value')
               const token = $('input[name="token"]').attr('value')
               const convert = $('input[name="file"]').attr('value')
               const gotdata = {
                    file: file,
                    token: token,
                    convert: convert
               }
               console.log(data)
               fs.writeFileSync('./data.html', data)
               bodyFormThen.append('file', gotdata.file)
               bodyFormThen.append('token', gotdata.token)
               bodyFormThen.append('convert', gotdata.convert)
               bodyFormThen.append('audio', 'on')
               bodyFormThen.append('mute', 'off')
               Axios({
                    method: 'post',
                    url: 'https://ezgif.com/reverse-video/' + gotdata.file + '?ajax=true',
                    data: bodyFormThen,
                    headers: {
                         'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                    }
               }).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const datext = $('p.outfile > video > source').attr('src').split('.')
                    const ext = datext[datext.length - 1]
                    const result = 'https:' + $('p.outfile > video > source').attr('src')
                    resolve({
                         status: true,
                         message: "Created By MRHRTZ",
                         result: result,
                         ext: ext
                    })
               }).catch(reject)
          }).catch(reject)
     })
}



function webp2gifFile(path) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('new-image-url', '')
          bodyForm.append('new-image', fs.createReadStream(path))
          Axios({
               method: 'post',
               url: 'https://s6.ezgif.com/webp-to-mp4',
               data: bodyForm,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
               }
          }).then(({ data }) => {
               const bodyFormThen = new FormData()
               const $ = cheerio.load(data)
               const file = $('input[name="file"]').attr('value')
               const token = $('input[name="token"]').attr('value')
               const convert = $('input[name="file"]').attr('value')
               const gotdata = {
                    file: file,
                    token: token,
                    convert: convert
               }
               bodyFormThen.append('file', gotdata.file)
               bodyFormThen.append('token', gotdata.token)
               bodyFormThen.append('convert', gotdata.convert)
               Axios({
                    method: 'post',
                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                    data: bodyFormThen,
                    headers: {
                         'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                    }
               }).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                    resolve({
                         status: true,
                         message: "Created By MRHRTZ",
                         result: result
                    })
               }).catch(reject)
          }).catch(reject)
     })
}


function voiceremover(pathfile) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('fileName', fs.createReadStream('./src/voice.mp3'))
          Axios({
               method: 'post',
               url: 'https://aivocalremover.com/FileTest',
               data: bodyForm,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
               }
          }).then(({ data }) => {
               console.log(data)
               Axios({
                    method: 'post',
                    url: 'https://aivocalremover.com/ProcessM',
                    data: qs.stringify({
                         file_name: data.file_name,
                         action: 'watermark_video'
                    }),
                    headers: {
                         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
               }).then(({ data }) => {
                    console.log(data)
               })
          })
     })
}

voiceremover()

function slineMetadata(id) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://dl.stickershop.line.naver.jp/products/0/0/1/${id}/android/productInfo.meta`)
               .then(({ data }) => {
                    const id = data.packageId
                    const title = data.title.en
                    const author = data.author.en
                    const ani = data.hasAnimation
                    let stickers = []
                    data.stickers.forEach((rest) => {
                         stickers.push(rest)
                    })
                    resolve({
                         id: id,
                         title: title,
                         animate: ani,
                         author: author,
                         stickers: stickers
                    })
               }).catch(reject)
     })
}

function getStikerLine(url) {
     return new Promise((resolve, reject) => {
          const id = url.match(/[0-9]/g).join('')
          slineMetadata(id)
               .then(async (a) => {
                    const id = a.id
                    const author = a.author
                    const title = a.title
                    const stiker = a.stickers
                    let urls = []
                    if (a.animate) {
                         for (let i = 0; i < stiker.length; i++) {
                              urls.push(`https://sdl-stickershop.line.naver.jp/products/0/0/1/${id}/android/animation/${stiker[0].id}.png`)
                         }
                    } else if (!a.animate) {
                         for (let i = 0; i < stiker.length; i++) {
                              urls.push(`http://dl.stickershop.line.naver.jp/stickershop/v1/sticker/${stiker[0].id}/android/sticker.png`)
                         }
                    }
                    resolve({
                         status: true,
                         message: "Created By MRHRTZ",
                         result: {
                              author: author,
                              id: id,
                              title: title,
                              animated: a.animate,
                              stickers: urls
                         }
                    })
               }).catch(reject)
     })
}

// getStikerLine('https://store.line.me/stickershop/product/9409/id')
//https://s3.ezgif.com/apng-to-webp
// webp2gifFile('../beleis/media/sticker/cekanim.webp')
// apng2webpUrl('https://sdl-stickershop.line.naver.jp/products/0/0/1/9409/android/animation/20047912.png')
// slineMetadata('9409')
// reverseVideoFile('E:/Users/user/Downloads/VID_20191223_150450.3gp')
// png2webpUrl('http://www.picturetopeople.org/out/picturetopeople.org-5023ed7f88464ecf297d7cdfec77904e05394e2552304f4ed6.png')
//      .then(async (a) => {
//           const stiker = a.stickers
//           const id = a.id
//           let urls = []
//           for (let i = 0; i < stiker.length; i++) {
//                const dapetcv = await apng2webpUrl(`https://sdl-stickershop.line.naver.jp/products/0/0/1/${id}/android/animation/${stiker[i].id}.png`)
//                urls.push(dapetcv.result)
//           }
          // console.log(a)
          // console.log(urls)
     // })
     // .catch(a => console.log(a))


module.exports = { webp2mp4Url, webp2gifFile, reverseVideoFile, voiceremover }
