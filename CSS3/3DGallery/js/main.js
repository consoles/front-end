/**
 * Created by yiihua-013 on 16/7/20.
 */

'use strict'

let $ = selector => {
    let method = selector.startsWith('.') ? 'getElementsByClassName' : 'getElementById'
    return document[method](selector.slice(1))
}

/**
 * 生成[min,max]之间的随机数
 * @param range
 * @returns {number}
 */
let random = (range) => {
    let max = Math.max.apply(null, range)
    let min = Math.min.apply(null, range)
    return Math.round((Math.random() * (max - min)) + min)
}

let $wrap = $('#wrap')

// 翻面控制
function trun(el) {
    let cls = el.className
    let index = el.id.split('_')[1]

    let $nav = $(`#nav_${index}`)

    if (!/photo-center/.test(cls)) return rsort(index)

    if (/photo-front/.test(cls)) {
        cls = cls.replace(/photo-front/, 'photo-back')
        $nav.classList.add('i-back')
    } else {
        cls = cls.replace(/photo-back/, 'photo-front')
        $nav.classList.remove('i-back')
    }
    return el.className = cls
}

// 输出所有海报
function addPhotos() {
    let tpl = wrap.innerHTML

    let html = []
    let nav = []

    // 生成一张海报的同时生成一个导航项目
    data.forEach((d, index) => {
        let _html = tpl
            .replace('{{index}}', index)
            .replace('{{img}}', d.img)
            .replace('{{caption}}', d.caption)
            .replace('{{desc}}', d.desc)
        html.push(_html)

        let p =
            nav.push(`<span id="nav_${index}" class="i" onclick="trun($('#photo_${index}'))">&nbsp;</span>`)
    })
    html.push(`<div class="nav">${nav.join('')}</div>`)
    let len = data.length
    $wrap.innerHTML = html.join('') // 默认是以逗号分隔,这里需要特别注意
    rsort(random([0, len]))
}
addPhotos()

// 排序海报
function rsort(index) {
    let photos = Array.from($('.photo')) // 将NodeList转化为真正的数组
    photos.forEach(p => {
        p.classList.remove('photo-center')
        p.classList.remove('photo-front')
        p.classList.remove('photo-back')

        p.classList.add('photo-front')

        p.style.left = ''
        p.style.top = ''
        p.style.transform = 'rotate(360deg) scale(1.3)'
    })

    let photoCenter = $(`#photo_${index}`)
    photoCenter.classList.add('photo-center')
    photos.splice(index, 1)

    // 把剩下的海报分成左右两个区域
    let photosLeft = photos.splice(0, Math.ceil(photos.length / 2))
    let photosRight = photos

    let ranges = range()

    for (let p of photosLeft) {
        p.style.left = random(ranges.left.x) + 'px'
        p.style.top = random(ranges.left.y) + 'px'
        p.style.transform = `rotate(${random([-150, 150])}deg) scale(1)`
    }
    for (let p of photosRight) {
        p.style.left = random(ranges.right.x) + 'px'
        p.style.top = random(ranges.right.y) + 'px'
        p.style.transform = `rotate(${random([-150, 150])}deg) scale(1)`
    }

    // 控制按钮处理
    let navs = Array.from($('.i'))
    navs.forEach(nav => {
        nav.classList.remove('i-current')
        nav.classList.remove('i-back')
    })

    $(`#nav_${index}`).classList.add('i-current')
}

// 计算左右分区的范围
function range() {
    let range = {
        left: {
            x: [],
            y: []
        },
        right: {
            x: [],
            y: []
        }
    }

    let wrap = {
        w: $wrap.clientWidth,
        h: $wrap.clientHeight
    }

    let $photo = $('.photo')[0]

    let photo = {
        w: $photo.clientWidth,
        h: $photo.clientHeight
    }

    range.wrap = wrap
    range.photo = photo

    range.left.x = [0 - photo.w / 4 + 130, wrap.w / 2 - photo.w * 5 / 4 + 130]
    range.left.y = [0 - photo.h / 4 + 160, wrap.h - photo.h * 3 / 4 +130]

    range.right.x = [wrap.w / 2 + photo.w / 4 + 130, wrap.w - photo.w / 4 + 130]
    range.right.y = range.left.y

    return range
}