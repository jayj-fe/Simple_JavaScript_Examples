class passwordControl {
  constructor(target){
    this.area = target
    this.item = this.area.querySelector(".js-password-control");
    this.init();
  }

  init(){
    let isDragging = false;
    let originX = null;
    let originLeft = null;

    this.item?.addEventListener("mousedown", (e) => {
      isDragging = true;
      originX = e.clientX;
      originLeft = this.item.offsetLeft;
      this.item.classList.add('moving');
    })

    this.item?.addEventListener("touchstart", (e) => {
      isDragging = true;
      originX = e.targetTouches[0].clientX;
      originLeft = this.item.offsetLeft
      this.item.classList.add('moving');
    });

    this.item?.addEventListener('mouseup', (e) => {
      isDragging = false;
      this.item.classList.remove('moving');
      const widthCheck = this.area.offsetWidth;
      let currentLeft = this.item.style.left;
      currentLeft = currentLeft.slice(0, 2);
      if(currentLeft > (widthCheck/2)){
        this.item.style.left = `${widthCheck}px`;
        tooltipShow("비밀번호 4자리와 ‘*’를 눌러주세요.");
      }else{
        this.item.style.left = `0px`;
      }
    })

    this.item?.addEventListener("touchend", (e) => {
      isDragging = false;
      this.item.classList.remove('moving');
      const widthCheck = this.area.offsetWidth;
      let currentLeft = this.item.style.left;
      currentLeft = currentLeft.slice(0, -2);
      if(currentLeft > (widthCheck/2)){
        this.item.style.left = `${widthCheck}px`;
        tooltipShow("비밀번호 4자리와 ‘*’를 눌러주세요.");
      }else{
        this.item.style.left = `0px`;
      }
    })

    document.addEventListener('mousemove', (e) => {
      if(isDragging){
        const diffX = e.clientX - originX;
        this.item.style.left = `${Math.min(Math.max(0, originLeft+diffX))}px`;
      }
    });

    document.addEventListener('touchmove', (e) => {
      if(isDragging){
        const diffX = e.targetTouches[0].clientX - originX;
        this.item.style.left = `${Math.min(Math.max(0, originLeft+diffX))}px`;
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", function() {
  const jsSwiper = document.querySelectorAll(".js-swipe-open")
  jsSwiper.forEach((item)=>{
    new passwordControl(item)
  })
  
});