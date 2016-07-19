/**
 * Created by yiihua-013 on 16/7/18.
 */

'use strict'

let $ = selector => document.querySelector(selector)
let $$ = selector => document.querySelectorAll(selector)

let getPosition = node => {
    let left = node.offsetLeft,
        top = node.offsetTop

    let parent = node.offsetParent
    while (parent) {
        left += parent.offsetLeft
        top += parent.offsetTop
        parent = parent.offsetParent
    }
    return {
        "left": left,
        "top": top
    }
}

/**
 * 禁止图片被选中
 */
document.onselectstart = new Function('event.returnValue = false')

/**
 * 设置选取区域高亮可见
 */
let setChoiceHighlight = () => {
    let top = mainDiv.offsetTop,
        right = mainDiv.offsetLeft + mainDiv.offsetWidth,
        bottom = mainDiv.offsetTop + mainDiv.offsetHeight,
        left = mainDiv.offsetLeft

    let img = $$('img')[1]
    img.style.clip = `rect(${top}px,${right}px,${bottom}px,${left}px)`
}

/**
 * 图片预览
 */
let setPreview = () => {
    let top = mainDiv.offsetTop,
        right = mainDiv.offsetLeft + mainDiv.offsetWidth,
        bottom = mainDiv.offsetTop + mainDiv.offsetHeight,
        left = mainDiv.offsetLeft

    let img = $$('img')[2]
    img.style.left = -left + 'px'
    img.style.top = -top + 'px'
    img.style.clip = `rect(${top}px,${right}px,${bottom}px,${left}px)`
}

let boxDiv = $('#box'),
    mainDiv = $('#main'),
    divs = $$('#main div')

// 8个触点
let upTouchPoint = divs[1],
    rightUpTouchPoint = divs[2],
    rightTouchPoint = divs[4],
    rightDownTouchPoint = divs[7],
    downTouchPoint = divs[6],
    leftDownTouchPoint = divs[5],
    leftTouchPoint = divs[3],
    leftUpTouchPoint = divs[0]

let ifKeyDown = false
let contact = '' // 被按下的触点

let moveUp = e => {
    let y = e.clientY
    let top = getPosition(boxDiv).top
    if (y < top) y = top

    let height = mainDiv.offsetHeight - 2 // 选择层高度
    let mainY = getPosition(leftUpTouchPoint).top + 4 // 左上角纵坐标
    let addHeight = mainY - y // 拖动后应该增加的高度

    mainDiv.style.height = height + addHeight + 'px'
    mainDiv.style.top = mainDiv.offsetTop - mainY + y + 'px'
}

let moveDown = e => {
    let y = e.clientY
    let bottom = getPosition(boxDiv).top + boxDiv.offsetHeight
    if (y > bottom) y = bottom
    let height = mainDiv.offsetHeight - 2
    let mainY = getPosition(leftUpTouchPoint).top + 4
    let addHeight = y - mainY - height
    mainDiv.style.height = height + addHeight + 'px'
}

let moveLeft = e => {
    let x = e.clientX
    let left = getPosition(boxDiv).left
    if (x < left) x = left
    let width = mainDiv.offsetWidth - 2
    let mainX = getPosition(leftUpTouchPoint).left + 4
    let addWidth = mainX - x

    mainDiv.style.width = width + addWidth + 'px'
    mainDiv.style.left = mainDiv.offsetLeft - mainX + x + 'px'
}

let moveRight = e => {
    let x = e.clientX
    let right = getPosition(boxDiv).left + boxDiv.offsetWidth
    if (x > right) x = right
    let width = mainDiv.offsetWidth - 2
    let mainX = getPosition(leftUpTouchPoint).left + 4
    let addWidth = x - width - mainX

    mainDiv.style.width = width + addWidth + 'px'
}

upTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'up'
})
rightUpTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'right-up'
})
rightTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'right'
})
rightDownTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'right-down'
})
downTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'down'
})
leftDownTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'left-down'
})
leftTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'left'
})
leftUpTouchPoint.addEventListener('mousedown', e => {
    e.stopPropagation()
    ifKeyDown = true
    contact = 'left-up'
})

window.addEventListener('mouseup', e => {
    ifKeyDown = false
    contact = ''
})
window.addEventListener('mousemove', e => {
    if (ifKeyDown) {
        switch (contact) {
            case 'up' :
                moveUp(e)
                break
            case 'right-up':
                moveRight(e)
                moveUp(e)
                break
            case 'right':
                moveRight(e)
                break
            case 'right-down':
                moveRight(e)
                moveDown(e)
                break
            case 'down':
                moveDown(e)
                break
            case 'left-down':
                moveLeft(e)
                moveDown(e)
                break
            case 'left':
                moveLeft(e)
                break
            case 'left-up':
                moveLeft(e)
                moveUp(e)
                break
            default:
                break
        }
    }
    setChoiceHighlight()
    setPreview()
})

jQuery('#main').draggable({containment: 'parent', drag: setChoiceHighlight})
