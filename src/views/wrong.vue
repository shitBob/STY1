<template>
    错题界面,待开发
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="exercise" icon="records-o">做题</van-tabbar-item>
      <van-tabbar-item name="exam"     icon="notes-o">测试</van-tabbar-item>
      <van-tabbar-item name="wrong" icon="label-o">错题</van-tabbar-item>
    </van-tabbar>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useMemberStore } from '@/stores/member';
    const memberStore = useMemberStore();
  const router = useRouter();
    const active = ref('wrong');
   
    const onChange = ()=>{
  if(active.value === 'exercise'){
    router.push({name:'exerciseshow',params:{id:memberStore.profile.id}});
  }
  if(active.value === 'wrong'){
    router.push({name:'wrong',params:{id:memberStore.profile.id}});
  }
  if(active.value === 'exam'){
    router.push({name:'examshow',params:{id:memberStore.profile.id}});
  }
}
    
    
    
    </script>
    
    <style>
    
    </style>