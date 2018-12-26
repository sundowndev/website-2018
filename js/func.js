function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hide(els){
    if(typeof els == 'string'){
        document.querySelector(els).style.display = 'none';
    }else if(typeof els == 'object'){
        els.style.display = 'none';
        els.style.opacity = 0;
    }
}

function show(els){
    if(typeof els == 'string'){
        document.querySelector(els).style.display = '';
        document.querySelector(els).style.opacity = 1;
    }else if(typeof els == 'object'){
        els.style.display = '';
        els.style.opacity = 1;
    }
}

async function fadein(element) {
    if (element.classList.contains('fade-out')) {
        element.classList.remove('fade-out');
    }
    
    element.classList.add('fade-in');
    element.style.display = '';
    
    await sleep(400);
    
    element.style.opacity = 1;
}

async function fadeout(element) {
    if (element.classList.contains('fade-in')) {
        element.classList.remove('fade-in');
    }
    
    element.classList.add('fade-out');
    
    await sleep(400);
    
    element.style.display = 'none';
    element.style.opacity = 0;
}

async function showSection(sectionID){    
    let sectionActive = document.querySelector('.section.active');
    let section = document.querySelector('#'+sectionID);
        
    if(sectionActive != section && section != null){
        fadeout(sectionActive);

        await sleep(300);

        sectionActive.classList.remove('active');
        
        if(sectionID == 'project'){
            bgOverlay.classList.add('transparent');
        }else{
            bgOverlay.classList.remove('transparent');
        }

        await sleep(300);

        hide(section);
        section.classList.add('active');
        fadein(section);
    }
}

async function toggleMenu(){
    if(menu.classList.contains('open')){
        menuBurger.classList.toggle('close');
        fadeout(menu);
        await sleep(300);
        menu.classList.toggle('open');
        fadein(content);
        show(menu);
    }else{   
        menuBurger.classList.toggle('close');
        fadeout(content);
        await sleep(200);
        hide(content);
        await sleep(200);
        hide(menu);
        menu.classList.toggle('open');
        fadein(menu);
    }
}

function setProject(project, show = true){
    let title1 = document.querySelector('.project-title1');
    let title2 = document.querySelector('.project-title2');
    let desc = document.querySelector('.project-desc');
    let client = document.querySelector('.project-client');
    let role = document.querySelector('.project-role');
    let date = document.querySelector('.project-date');
    let btnSeemore = document.querySelector('.project-url');
    
    title1.textContent = project.name;
    title2.textContent = project.name;
    desc.textContent = project.desc;
    if(project.client != ''){
        client.textContent = 'Client : ' + project.client;
    }else{
        client.textContent = '';
    }
    role.textContent = project.role;
    date.textContent = project.date;
    btnSeemore.href = project.url;
    
    bgImage.style.backgroundImage = "url("+dir_images + '/' + project.thumbnail+")";
    
    if(show){
        showSection('project');
    }
}