function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#toggle-btn');
    const formSection = document.querySelector('.form-section');
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
        toggleBtn.style.visibility = 'hidden';
        formSection.style.marginLeft = '250px'; // 사이드바 너비와 동일하게 설정
    } else {
        toggleBtn.style.visibility = 'visible';
        formSection.style.marginLeft = '0';
    }
}

window.onload = function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const formSection = document.querySelector('.form-section');

    if (window.innerWidth < 768) {
        sidebar.classList.remove('active');
        toggleBtn.style.visibility = 'visible';
        formSection.style.marginLeft = '0';
    } else {
        sidebar.classList.add('active');
        toggleBtn.style.visibility = 'hidden';
        formSection.style.marginLeft = '250px'; // 사이드바 너비와 동일하게 설정
    }
}

window.onresize = function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const formSection = document.querySelector('.form-section');

    if (window.innerWidth < 768 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        toggleBtn.style.visibility = 'visible';
        formSection.style.marginLeft = '0';
    } else if (window.innerWidth >= 768 && !sidebar.classList.contains('active')) {
        sidebar.classList.add('active');
        toggleBtn.style.visibility = 'hidden';
        formSection.style.marginLeft = '250px'; // 사이드바 너비와 동일하게 설정
    }
}

function previewThumbnail(event) {
    var container = document.getElementById('image-thumbnail-container');
    container.innerHTML = '';

    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
        var image = document.createElement('img');
        image.src = URL.createObjectURL(files[i]);
        image.alt = '이미지 미리보기';
        image.style.maxWidth = '119px';
        image.style.marginTop = '150px';
        container.appendChild(image);
    }
}
