document.querySelector('img').addEventListener('click', event => {
    const image = document.createElement('img')
    image.setAttribute('src', 'check.png')
    image.classList.add('check')

    image.style.width = '25px'
    image.style.height = '25px'

    image.style.position = 'absolute'
    image.style.top = event.offsetY - 12 //12 because that is half the size of cross.png so this centers it on the mouse cursor
    image.style.left = event.offsetX - 12

    document.querySelector('div').appendChild(image)
})
