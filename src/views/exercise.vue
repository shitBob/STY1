<template>
<!-- 具体练习页面<br>
这里是id:{{ $route.params.id }} <br>
专业序号是 : {{ $route.params.profession }} <br>
题单序号是 : {{ $route.params.list_index }} <br>
题目序号是 : {{ $route.params.quesion_index}} <br> -->
<van-nav-bar
  
  left-text="返回"
  right-text=""
  left-arrow
  @click-left="onClickLeft"
>
  <template #title>
   题目序号：{{ $route.params.quesion_index }} 
    </template>
</van-nav-bar>
<div style="overflow: auto;">
<text>{{questionInfoStore.questionInfo.question_content[Number($route.params.quesion_index)-1]}}</text>


<template v-if = "questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]==true">
<van-icon name="success" size="40" color="green" v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]=== checked.join('')" />
<van-icon name="cross" size="40"  color="red" v-else="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]!== checked.join('')" />
</template>

<van-divider>题目描述</van-divider>


<van-image :src="questionInfoStore.questionInfo.question_pic[Number($route.params.quesion_index)-1]" fit="scale-down" preview  @click="showImagePreview1"
  style="width: 80%;height: 200px;margin-bottom: 10px;" />
<van-divider>图片演示，可以点击查看大图</van-divider>

<van-checkbox-group v-if="route.path.includes('profession')" v-model="checked" :max="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1].length>1?4:1"
  :disabled="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]">
  <van-checkbox name="a" style="margin-top: 5px ;
    margin-bottom: 10px ;" >A:   {{questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1].a}}</van-checkbox>
  <van-checkbox name="b" style="margin-top: 5px ;
    margin-bottom: 10px ;">B:   {{questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1].b}}</van-checkbox>
  <van-checkbox name="c" style="margin-top: 5px ;
    margin-bottom: 10px ;">C:   {{questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1].c}}</van-checkbox>
  <van-checkbox name="d" style="margin-top: 10px ;
    margin-bottom: 5px ;">D:   {{questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1].d}}</van-checkbox>
</van-checkbox-group>


<template v-if="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]">
  正确答案：<span style="color: green;font-weight: bold;">{{questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]}}</span>  <br>
  选择的答案：<span v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]=== checked.join('')" style="color: green;font-weight: bold;">{{checked.join('')}}</span>
  <span v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]!== checked.join('')" style="color: red;font-weight: bold;">{{checked.join('')}}</span>  <br> 

</template>


<van-button v-if="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]==false" 
type="primary" 
size="large"
style="  margin-top: 20px; /* 与上方元素间距为20px */
       margin-bottom: 30px; /* 与下方元素间距为30px */"
       @click="handin">提交本题
       </van-button>


<van-pagination v-model="currentPage" :page-count="pagecount" mode="simple"  prev-text="上一题"
next-text="下一题" @change="onChange"
 style="opacity: 0.8 " />
</div>




  </template>
  
  <script setup lang="ts">
  import {useRouter} from "vue-router"
  import {useMemberStore} from "@/stores/member"
  import { get_exercise_list } from '@/method/get_exercise_list'
  import { ref,reactive,toRaw,onMounted } from 'vue'
  import { useRoute,onBeforeRouteUpdate } from 'vue-router'
  import { get_quesion } from "@/method/get_quesion"
  import { useQuestionInfoStore } from "@/stores/quesioninfo"
  import { instance } from "@/instance"
  import { showImagePreview } from 'vant';

  const questionInfoStore = useQuestionInfoStore()
  const route = useRoute()
  const router = useRouter()
  const memberStore = useMemberStore()
  const checked = ref([] as string[]);

  const onClickLeft = () => {
    get_exercise_list()
    //questionInfoStore.reset()
    router.push({name:'exerciseshow',params:{id:memberStore.profile.id}})
    
  }


  const pagecount=ref<number>(route.params.quesion_num as unknown as number);
  //console.log(pagecount.value)
  const currentPage = ref(1) ;

  const onChange = () => {
   
      router.push({name: 'exercise',params: {id: memberStore.profile.id,
        profession: route.params.profession,
        list_index: route.params.list_index,
        quesion_index: currentPage.value,
        quesion_num:route.params.quesion_num}})
        
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        });
     
       
    if (questionInfoStore.questionInfo.quesion_summit[currentPage.value-1]==true)
    {
      checked.value=questionInfoStore.questionInfo.question_mem_answer[currentPage.value-1].split('')
    }
    else{
      checked.value=[]
    }

        

  }


  const Getquesion =  (i:number) => {
    
  //  console.log(questionInfoStore.questionInfo.quesion_get)
    if (questionInfoStore.questionInfo.quesion_get[i-1]==false){

      const res=instance.post("/question/send",{
        questionList_index:Number(route.params.list_index),
        questionindex:Number(route.params.quesion_index),  
        profession:Number(route.params.profession),
        userid:memberStore.profile.id
    }).then((res:any)=>{
        //console.log(res);
        if(res.data.code==200){
         
          questionInfoStore.setonequesion(i-1,res.data.data.questionScript,
          res.data.data.questionPicture,
          res.data.data.optionDescription,
         res.data.data.cAnswer)
        }
        else{
          alert("获取题目失败，请检查网络")
        }
    }).catch((err:any)=>{
      alert("获取题目失败，请检查网络")
    });
     
      
  }


}
const showImagePreview1 = () => {
  showImagePreview({
  images: [
    questionInfoStore.questionInfo.question_pic[Number(route.params.quesion_index)-1]
  ],
  closeable: true,
});
}

const handin = () => {
  instance.post("/question/confrim",{
      QuestionList_index:Number(route.params.list_index),
      Questionindex:Number(route.params.quesion_index),  
      profession:Number(route.params.profession),
      userId:memberStore.profile.id,
      answer:checked.value.join("")
  }).then((res:any)=>{
      if(res.data.code==200){
        questionInfoStore.questionInfo.quesion_summit[Number(route.params.quesion_index)-1]=true
        questionInfoStore.questionInfo.question_mem_answer[Number(route.params.quesion_index)-1]=checked.value.sort().join("")

      }
      else{
        alert("提交失败，请检查网络")
      }
  }).catch((err:any)=>{
    alert("提交失败，请检查网络")
  });

}


  questionInfoStore.questionInfoInit(Number(pagecount.value))
  for(let i=1;i<=pagecount.value;i++){
    Getquesion(i)
  }


  


  
  </script>
  
  <style>
  
  </style>