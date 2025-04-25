function fetchName() {
    
    const fetchBtn = document.getElementById('ftc-btn');
    fetchBtn.classList.add('shimmer');
    fetchBtn.disabled = true;
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(res => {
            renderData(res);
            
            fetchBtn.classList.remove('shimmer');
            fetchBtn.disabled = false;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            
            fetchBtn.classList.remove('shimmer');
            fetchBtn.disabled = false;
        });
}

let time_count = 5000;
function refreshData() {
    const refreshBtn = document.getElementById('refresh-btn');
    const progressLoader = refreshBtn.querySelector('.progress-loader');
    
    refreshBtn.classList.add('shimmer');
    refreshBtn.disabled = true;
    progressLoader.style.width = '0';
    
    
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        progressLoader.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 100);
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(res => {
            
            progressLoader.style.width = '100%';
            setTimeout(() => {
                renderData(res);
                refreshBtn.classList.remove('shimmer');
                refreshBtn.disabled = false;
                progressLoader.style.width = '0';
            }, time_count);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            refreshBtn.classList.remove('shimmer');
            refreshBtn.disabled = false;
            progressLoader.style.width = '0';
            clearInterval(progressInterval);
        });
        time_count*=2;
        console.log(time_count);
}

function renderData(data1) {
    
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`item${i}`).textContent = `Name${i}`;
        document.getElementById(`item${i}`).style.opacity = '0';
        document.getElementById(`item${i}`).style.animation = 'none';
    }
    
   
    void document.getElementById('userList').offsetHeight;
    
    
    for (let i = 0; i < data1.length; i++) {
        const item = document.getElementById(`item${i+1}`);
        item.textContent = data1[i].name;
        item.style.opacity = '0';
        item.style.animation = 'fadeIn 0.4s ease forwards';
        item.style.animationDelay = `${(i+1)*0.1}s`;
    }
}