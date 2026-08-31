<template>
  <article class="document-card" :class="{ uploaded: file }">
    <span class="material-symbols-outlined doc-icon">{{ file ? 'check_circle' : icon }}</span>
    <div><b>{{ title }}</b><small>{{ file ? 'تمت إضافة الصورة' : 'الخيار الأساسي: التقاط صورة حية' }}</small></div>
    <div class="choice-row"><label><input class="file-input" type="file" accept="image/*" capture="environment" @change="emitFile"/><span class="material-symbols-outlined">photo_camera</span>التقاط</label><label><input class="file-input" type="file" accept="image/*" @change="emitFile"/><span class="material-symbols-outlined">upload</span>من الهاتف</label></div>
  </article>
</template>
<script setup>
defineProps({ title:String, icon:String, file:[Object,String] })
const emit=defineEmits(['change'])
const emitFile=event=>{const file=event.target.files?.[0];if(file)emit('change',file)}
</script>
<style scoped>
.document-card{display:flex;align-items:center;gap:12px;padding:13px;border:1px solid rgba(196,154,59,.28);border-radius:17px;background:linear-gradient(135deg,rgba(196,154,59,.08),var(--surface-container))}.document-card.uploaded{border-color:var(--success)}.doc-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:rgba(196,154,59,.12);color:var(--primary);font-size:25px}.uploaded .doc-icon{background:rgba(52,211,153,.12);color:var(--success)}.document-card>div:nth-child(2){flex:1}.document-card b{display:block;color:var(--on-surface);font-size:12px}.document-card small{display:block;margin-top:3px;color:var(--on-surface-variant);font-size:10px}.choice-row{display:flex;gap:7px;margin-top:8px}.choice-row label{display:flex;align-items:center;gap:4px;padding:6px 8px;border:1px solid rgba(196,154,59,.36);border-radius:9px;background:rgba(196,154,59,.07);color:var(--primary);font-size:10px;cursor:pointer}.choice-row .material-symbols-outlined{font-size:16px}.file-input{display:none}@media(max-width:360px){.document-card{align-items:flex-start;flex-wrap:wrap}.document-card .choice-row{width:100%}}
</style>
