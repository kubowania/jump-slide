document.addEventListener('DOMContentLoaded', () => {
    const prince = document.querySelector('.character')
    let isJumping = false
    let isGoingRight = false
    let isGoingLeft = false
    let bottom = 0
    let gravity = 0.9
    let left = 0
    let leftTimerId
    let rightTimerId

    function jump() {
        if (isJumping) return
        prince.classList.remove('character-sliding')
        prince.classList.add('character')
        let upTimerId = setInterval(function () {
          //jump down
          if (bottom > 250) {
            clearInterval(upTimerId)
            let downTimerId = setInterval(function () {
              if (bottom < 0 ) {
                clearInterval(downTimerId)
                isJumping = false
              }
              bottom -= 5
              bottom = bottom * gravity
              prince.style.bottom = bottom + 'px'
            },20)
          }
          //jump up
          isJumping = true
          bottom +=30
          bottom = bottom * gravity
          prince.style.bottom = bottom + 'px'
        },20)
      }

      function slideLeft() {
        prince.classList.remove('character')
        prince.classList.add('character-sliding')
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            console.log('going left')
            left -=5
            prince.style.left = left + 'px'
        },20)
      }

      function slideRight() {
        prince.classList.remove('character')
        prince.classList.add('character-sliding')
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function () {
            console.log('going right')
            left +=5
            prince.style.left = left + 'px'
        },20)
      }

    //assign functions to keycodes
    function control(e) {
        if(e.keyCode === 39) {
            slideRight() //if we press the right arrow on our keyboard
        } else if (e.keyCode === 38) {
            jump() // if we press the up arrow
        } else if (e.keyCode === 37) {
            slideLeft() // if we press left
        } 
    }
    document.addEventListener('keyup', control)
})
