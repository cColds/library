(()=>{const e=document.querySelector("#add-book-id"),t=document.querySelector(".remove-all"),n=document.querySelector(".modal-container"),d=document.querySelector(".close"),c=document.querySelector(".book-title"),a=document.querySelector(".book-author"),o=document.querySelector(".book-pages"),r=document.querySelector(".book-read"),s=document.querySelector(".error"),i=document.querySelector(".submit-button"),l=document.querySelector(".library-info-container");function u(){n.classList.toggle("show")}function m(e,t){e?(t.textContent="Read",t.classList.remove("not-read")):(t.classList.add("not-read"),t.textContent="Not Read")}e.addEventListener("click",(()=>{u(),c.value="",a.value="",o.value="",s.textContent="⠀",r.checked=!1})),d.addEventListener("click",u),i.addEventListener("click",(()=>{c.validity.valid&&a.validity.valid&&o.validity.valid?(function(){const e=new L(c.value,a.value,o.value,r.checked);v.push(e),l.classList.add("hide"),y()}(),u()):s.textContent="*All fields must be filled"}));const v=[];class L{constructor(e,t,n,d){this.title=e,this.author=t,this.pages=n,this.read=d}}function h(e){const{indexNumber:t}=e.target.closest("[data-index-number]").dataset;return Number(t)}function y(){const e=document.querySelector(".card-container");e.innerHTML="";let n=-1;v.forEach((d=>{const c=document.createElement("div"),a=document.createElement("button"),o=document.createElement("div"),r=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div"),u=document.createElement("button");c.dataset.indexNumber=`${n+=1}`,o.classList.add("card-info"),a.classList.add("remove-card"),r.classList.add("title-card"),s.classList.add("author-card"),i.classList.add("pages-card"),u.classList.add("read-card"),c.classList.add("card"),a.textContent="❌",r.textContent=d.title,s.textContent=`by ${d.author}`,i.textContent=`${d.pages} pages`,m(d.read,u),u.addEventListener("click",(e=>{const t=h(e);v[t].read=!v[t].read,m(d.read,u)})),a.addEventListener("click",(e=>{const t=h(e);v.splice(t,1),c.remove(),c.innerHTML="",v.length||l.classList.remove("hide"),y()})),t.addEventListener("click",(()=>{v.length=0,e.innerHTML="",l.classList.remove("hide")})),o.append(r,s,i,u),c.append(a,o),e.append(c)}))}})();