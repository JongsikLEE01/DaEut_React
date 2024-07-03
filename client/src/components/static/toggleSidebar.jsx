function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar')
    const toggleBtn = document.querySelector('#toggle-btn')
    const formSection = document.querySelector('.form-section')
    sidebar.classList.toggle('active')
    if (sidebar.classList.contains('active')) {
        sidebar.style.maxWidth = "250px"
        toggleBtn.style.left = '250px'
        toggleBtn.style.visibility = 'hidden'
    } else {
        sidebar.style.maxWidth = "0"
        toggleBtn.style.left = '10px'
        formSection.style.marginLeft = '0'
        toggleBtn.style.visibility = 'visible'
    }
}

window.onload = function () {
    const sidebar = document.getElementById('sidebar')
    const toggleBtn = document.getElementById('toggle-btn')
    const formSection = document.querySelector('.form-section')

    if (window.innerWidth < 768) {
        sidebar.classList.remove('active')
        sidebar.style.maxWidth = "0"
        toggleBtn.style.left = '10px'
        formSection.style.marginLeft = '0'
        toggleBtn.style.visibility = 'visible'
    } else {
        sidebar.classList.add('active')
        sidebar.style.maxWidth = "250px"
        toggleBtn.style.left = '250px'
        toggleBtn.style.visibility = 'hidden'
    }
}

window.onresize = function () {
    const sidebar = document.getElementById('sidebar')
    const toggleBtn = document.getElementById('toggle-btn')
    const formSection = document.querySelector('.form-section')

    if (window.innerWidth < 768 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active')
        sidebar.style.maxWidth = "0"
        toggleBtn.style.left = '10px'
        formSection.style.marginLeft = '0'
        toggleBtn.style.visibility = 'visible'
    } else if (window.innerWidth >= 768 && !sidebar.classList.contains('active')) {
        sidebar.classList.add('active')
        sidebar.style.maxWidth = "250px"
        toggleBtn.style.left = '250px'
        toggleBtn.style.visibility = 'hidden'
    }
}

function previewThumbnail(event) {
    var container = document.getElementById('image-thumbnail-container')
    container.innerHTML = ''

    var files = event.target.files
    for (var i = 0 ; i < files.length;  i++) {
        var image = document.createElement('img')
        image.src = URL.createObjectURL(files[i])
        image.alt = '이미지 미리보기'
        image.style.maxWidth = '119px'
        image.style.marginTop = '150px'
        container.appendChild(image)
    }
}
