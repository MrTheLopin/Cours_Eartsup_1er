const input=document.querySelector("#search");const items=[...document.querySelectorAll(".shortcut")];if(input){input.addEventListener("input",()=>{const q=input.value.toLowerCase().trim();items.forEach(i=>{i.style.display=i.textContent.toLowerCase().includes(q)?"flex":"none"})})}

async function showLastUpdate(){
  const hero=document.querySelector(".hero");
  if(!hero)return;
  const badge=document.createElement("div");
  badge.className="last-update";
  badge.textContent="Dernière mise à jour : chargement…";
  hero.insertBefore(badge,hero.firstElementChild);
  try{
    const response=await fetch("https://api.github.com/repos/MrTheLopin/Cours_Eartsup_1er/commits?per_page=1",{headers:{Accept:"application/vnd.github+json"}});
    if(!response.ok)throw new Error("GitHub API");
    const data=await response.json();
    const date=new Date(data[0].commit.author.date);
    badge.textContent="Dernière mise à jour : "+new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(date);
  }catch(e){
    badge.textContent="Dernière mise à jour : disponible sur GitHub";
  }
}
showLastUpdate();

function buildCourseSidebar(){
  const sections=[...document.querySelectorAll("main > .section[id]")];
  if(sections.length<2)return;
  const sidebar=document.createElement("aside");
  sidebar.className="course-sidebar";
  sidebar.setAttribute("aria-label","Navigation de la page");
  const title=document.createElement("div");
  title.className="course-sidebar-title";
  title.innerHTML="<span>PLAN</span><strong>Sur cette page</strong>";
  sidebar.appendChild(title);
  const list=document.createElement("nav");
  list.className="course-sidebar-list";
  sections.forEach((section,index)=>{
    const heading=section.querySelector(".section-head h2");
    const label=heading?heading.textContent.trim():section.id;
    const link=document.createElement("a");
    link.href="#"+section.id;
    link.innerHTML='<span class="course-sidebar-number">'+String(index+1).padStart(2,"0")+"</span><span>"+label+"</span>";
    list.appendChild(link);
  });
  sidebar.appendChild(list);
  const close=document.createElement("button");
  close.className="course-sidebar-toggle";
  close.type="button";
  close.setAttribute("aria-label","Ouvrir ou fermer le plan");
  close.textContent="☰";
  document.body.append(sidebar,close);
  const links=[...list.querySelectorAll("a")];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
      }
    });
  },{rootMargin:"-25% 0px -65% 0px",threshold:0});
  sections.forEach(section=>observer.observe(section));
  close.addEventListener("click",()=>document.body.classList.toggle("sidebar-open"));
  links.forEach(link=>link.addEventListener("click",()=>document.body.classList.remove("sidebar-open")));
}
document.addEventListener("DOMContentLoaded",buildCourseSidebar);
