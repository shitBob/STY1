<template>
做题页面

<van-collapse v-model="activeNames" accordion v-for="(item, index) in memberStore.profile.profession">
  <van-collapse-item :title="num_to_profession(index+1)" :name="index+1" v-if="item!= 0">
   <template v-for="list_index in Math.ceil(item % 10 == 0? item/10 : item/10 )" >
    <van-cell-group inset>
  <van-cell  value="内容"  is-link :to="{name: 'exercise',params: {id: memberStore.profile.id,profession: index+1,
    list_index: list_index-1,
    quesion_index:1,
    quesion_num:(item-(list_index-1)*10>=10? 10:item-(list_index-1)*10)}}">


    <template #title>
    <span class="custom-title">{{ '练习' +' '+ (list_index)}} &nbsp; </span>
    <van-tag type="success" v-if="questionListStore.questionList.questionList_status[index][list_index-1]">已完成</van-tag>
    <van-tag type="danger"   v-else>未完成</van-tag>
  </template>
 
  </van-cell>
   </van-cell-group>
    </template>
  </van-collapse-item>
</van-collapse>


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
import { instance } from '@/instance';
import { useQuestionListStore} from '@/stores/quesionlist';
import { get_exercise_list } from '@/method/get_exercise_list';
import {useQuestionInfoStore}  from '@/stores/quesioninfo';

const questionInfoStore = useQuestionInfoStore();

const num_to_profession = (index:any) => {
  if (index === 1) {
    return '低压';
  } else if (index === 2) {
    return '高压';
  } else if (index === 3) {
    return '高处';
  } else if (index === 4) {
    return '焊工';
  }


}



const router = useRouter();
const active = ref('exercise');
const memberStore = useMemberStore();
const questionListStore = useQuestionListStore();
const activeNames = ref('1');
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


get_exercise_list();






</script>

<style>

</style>