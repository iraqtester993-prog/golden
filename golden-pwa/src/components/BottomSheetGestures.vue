<template><span aria-hidden="true"></span></template>
<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
let sheet=null, startY=0, distance=0, active=false
const start=event=>{const target=event.target;const candidate=target.closest?.('.sheet, .bottom-sheet');if(!candidate)return;const scroll=target.closest?.('.sheet-scroll');if(scroll&&scroll.scrollTop>0)return;sheet=candidate;startY=event.touches[0].clientY;distance=0;active=true}
const move=event=>{if(!active||!sheet)return;distance=Math.max(0,event.touches[0].clientY-startY);if(!distance)return;if(event.cancelable)event.preventDefault();sheet.style.transition='none';sheet.style.transform=`translateY(${Math.min(distance,260)}px)`}
const end=()=>{if(!active||!sheet)return;const current=sheet;current.style.transition='transform .22s ease';current.style.transform='';if(distance>90){const overlay=current.parentElement;overlay?.dispatchEvent(new MouseEvent('click',{bubbles:true}))}active=false;sheet=null;distance=0}
onMounted(()=>{document.addEventListener('touchstart',start,{passive:true});document.addEventListener('touchmove',move,{passive:false});document.addEventListener('touchend',end,{passive:true})})
onBeforeUnmount(()=>{document.removeEventListener('touchstart',start);document.removeEventListener('touchmove',move);document.removeEventListener('touchend',end)})
</script>
