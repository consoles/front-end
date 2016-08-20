/**
 * Created by yiihua-013 on 16/7/19.
 */
'use strict'

// step1. 为面板加入控制元素
function Resizable(panelId) {
    let panel = document.getElementById(panelId)
    let r = document.createElement('div'),
        b = document.createElement('div'),
        rb = document.createElement('div')

    r.class = r.className = 'ui-resizable-right ui-resizable-ctrl'
    b.class = b.className = 'ui-resizable-bottom ui-resizable-ctrl'
    rb.class = rb.className = 'ui-resizable-right-bottom ui-resizable-ctrl'

    panel.appendChild(r)
    panel.appendChild(b)
    panel.appendChild(rb)

    r.addEventListener('mousedown', e => {
        onMouseDown(e, panel, r, 'r')
    })
    b.addEventListener('mousedown', e => {
        onMouseDown(e, panel, b, 'b')
    })
    rb.addEventListener('mousedown', e => {
        onMouseDown(e, panel, rb, 'rb')
    })
}

// step2. 控制元素支持拖拽
let mPanel, // 面板
    mCtrl, // 控制元素
    mType // 类型(r,b,rb)

let moving = 0, // 鼠标是否按在控制元素,开始拖动
    mStartX = 0, // 鼠标相对控制元素的位置
    mStartY = 0,
    mToX = 0, // 鼠标新位置
    mToY = 0

function onMouseDown(e, panel, ctrl, type) {
    e = e || window.event

    mStartX = e.pageX - ctrl.offsetLeft
    mStartY = e.pageY - ctrl.offsetTop

    mPanel = panel
    mCtrl = ctrl
    mType = type

    // 侦听处理移动事件
    moving = setInterval(onMove, 10)
}

function onMove() {
    if (moving) {

        let minLeft = mPanel.offsetLeft,
            minTop = mPanel.offsetTop

        let toX = mToX - mStartX
        let toY = mToY - mStartY

        // 碰撞检测,范围限定
        toX = Math.max(toX,minLeft)
        toY = Math.max(toY,minTop)

        switch (mType) {
            case 'r':
                mCtrl.style.left = toX + 'px'
                mPanel.style.width = toX + 10 + 'px'
                break
            case 'b':
                mCtrl.style.top = toY + 'px'
                mPanel.style.height = toY + 10 + 'px'
                break
            case 'rb':
                mCtrl.style.left = toX + 'px'
                mCtrl.style.top = toY + 'px'
                mPanel.style.width = toX + 20 + 'px'
                mPanel.style.height = toY+ 20 + 'px'
                break
            default:
                break
        }

    }
}


document.onmousemove = e => {
    e = e || window.event
    mToX = e.pageX
    mToY = e.pageY
}
document.onmouseup = () => {
    clearInterval(moving)
    moving = 0
    let cls = document.querySelectorAll('.ui-resizable-ctrl')
    cls.forEach(el => {
        el.style.left = ''
        el.style.top = ''
    })
}

Resizable('ui-resizable')