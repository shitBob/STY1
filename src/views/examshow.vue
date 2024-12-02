<template>
  测试界面
  <van-collapse v-model="activeNames" accordion v-for="(item, index) in memberStore.profile.profession">
  <van-collapse-item  v-if="item>0" :title="num_to_profession(index+1)" :name="index+1">
    <van-cell title="考试次数:" > </van-cell>
    <van-cell title="优秀次数:">  </van-cell>  
    <van-button @click="start_exam(index+1)" type="primary" style="margin-top: 10px;margin-left: 80px;">开始考试</van-button>
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
import { get_exam_list } from '@/method/get_exam_list';
import { useExamListStore } from '@/stores/examlist';
 import { useQuestionInfoStore } from "@/stores/quesioninfo"

const router = useRouter();
const active = ref('exam');
const memberStore = useMemberStore();
const examListStore = useExamListStore();
const activeNames = ref('1');
const questionListStore = useQuestionListStore();
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

const start_exam = (index:any) => {
  //console.log("start!")
  instance.post("/exam/send",{
    profession:index,
    userId:memberStore.profile.id,
  }).then(res => { 
    if (res.data.code == 200) {
      questionInfoStore.questionInfoInit(res.data.data.question_Num)
    //  console.log(res.data.data.question_Num)
      for (let i=0;i<res.data.data.question_Num;i++)
    {
     
      questionInfoStore.setonequesion(i,res.data.data.exam_questionlist[i].questionScript,
        res.data.data.exam_questionlist[i].questionPicture,
        res.data.data.exam_questionlist[i].optionDescription,
        res.data.data.exam_questionlist[i].cAnswer,
      )
    }
    router.push({name:'exam',params:{id:memberStore.profile.id,
    profession:index,
    exam_id:1,
    quesion_index:1,
    quesion_num:res.data.data.question_Num}});
    
    }
    else {
      alert("申请失败，请检查网络1")

    }

  }).catch((err)=>{
    alert(err)
  })
  

}


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

//get_exam_list()
//console.log(examListStore.examList.examList_status)
  
  
  </script>
  
  <style>
  
  </style>