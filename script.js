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