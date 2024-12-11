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

    <template style="display: flex;align-items: center;
     justify-content: center; margin-top:20px ;margin-bottom: 20px;" >
    <van-count-down :time="time">
  <template #default="timeData">
    <span class="block">{{ timeData.hours }}</span>
    <span class="colon">:</span>
    <span class="block">{{ timeData.minutes }}</span>
    <span class="colon">:</span>
    <span class="block">{{ timeData.seconds }}</span>
  </template>
  </van-count-down>
   </template>
    <div style="overflow: auto;">
    <text>{{questionInfoStore.questionInfo.question_content[Number($route.params.quesion_index)-1]}}</text>
    
    
    <template v-if = "questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]==true">
    <van-icon name="success" size="40" color="green" v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]=== checked.join('')" />
    <van-icon name="cross" size="40"  color="red" v-else="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]!== checked.join('')" />
    </template>
    
    <ul v-for="(value,key) in questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1]">
    <li >{{key}}: {{value}}</li>
    </ul>

    <van-divider>题目描述</van-divider>
    
    <van-image :src="questionInfoStore.questionInfo.question_pic[Number($route.params.quesion_index)-1]" fit="scale-down" preview  @click="showImagePreview1"
      style="width: 80%;height: 200px;margin-bottom: 10px;" />
    <van-divider>图片演示，可以点击查看大图</van-divider>
    <template v-if="questionInfoStore.questionInfo.question_contain[Number($route.params.quesion_index)-1]==false">
   
    
    <van-checkbox-group v-if="route.path.includes('profession')" v-model="checked" 
    :max="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1].length>1?4:1"
      :disabled="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]"
      style=" display: flex;
       flex-direction: row; 
       width: 300px;
         "
       >
      <van-checkbox v-for="(value,key,index) in questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1]"
      :name="key"
      style="flex:1"
       label-position="left" icon-size="24px" 
        >
         <template #icon="props">
    <img  style=" height: 20px;" 
      :src="checked.indexOf(key)!== -1? letteractive[index] : letterurldefalut[index]" />
       </template>


        </van-checkbox>
    </van-checkbox-group>
    </template>

    <template v-else>
   <p style="font-weight: bold;">  <b>该题目包含多个问题,请以此填入答案选项：</b></p>
     <template v-for="(Index) in questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1].length">
     <span style="font-weight: bold;"> 问题{{Index}}</span>: <br>
     <van-checkbox-group v-if="route.path.includes('profession')"
      v-model="checked_mul[Index].value" 
     :max="1"
      :disabled="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]"
      style=" display: flex;
       flex-direction: row; 
       width: 300px;
       margin-bottom: 10px;
         "
       >
      <van-checkbox v-for="(value,key,index) in questionInfoStore.questionInfo.question_options[Number($route.params.quesion_index)-1]"
      :name="key"
      style="flex:1"
       label-position="left" icon-size="24px" 
        >
         <template #icon="props">
    <img  style=" height: 20px;" 
      :src="checked_mul[Index].value.indexOf(key)!== -1? letteractive[index] : letterurldefalut[index]" />
       </template>
    </van-checkbox>
    </van-checkbox-group>


     </template>
     
     </template>

     
    
    
    <template v-if="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1] && questionInfoStore.questionInfo.question_contain[Number($route.params.quesion_index)-1]==false" >
      正确答案：<span style="color: green;font-weight: bold;">{{questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]}}</span>  <br>
      选择的答案：<span v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]=== checked.join('')" style="color: green;font-weight: bold;">{{checked.join('')}}</span>
      <span v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]!== checked.join('')" style="color: red;font-weight: bold;">{{checked.join('')}}</span>  <br> 
    
    </template>
    <template v-if="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1] && questionInfoStore.questionInfo.question_contain[Number($route.params.quesion_index)-1]==true" >
      正确答案：<span style="color: green;font-weight: bold;">{{questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]}}</span>  <br>
      选择的答案：<span v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]=== questionInfoStore.questionInfo.question_mem_answer[Number($route.params.quesion_index)-1]" style="color: green;font-weight: bold;">
        {{questionInfoStore.questionInfo.question_mem_answer[Number(route.params.quesion_index)-1]}}</span>
      <span v-if="questionInfoStore.questionInfo.question_answer[Number($route.params.quesion_index)-1]!== checked.join('')" style="color: red;font-weight: bold;">
        {{questionInfoStore.questionInfo.question_mem_answer[Number(route.params.quesion_index)-1]}}</span>  <br> 
    </template>
    
    
    <van-button v-if="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]==false" 
    type="primary" 
    size="large"
    style="  margin-top: 20px; /* 与上方元素间距为20px */
           margin-bottom: 30px; /* 与下方元素间距为30px */"
           @click="handin">提交本题
           </van-button>

           


           <van-button v-if="questionInfoStore.questionInfo.quesion_summit[Number($route.params.quesion_index)-1]==true && currentPage== pagecount" 
    type="primary" 
    size="large"
    style="  margin-top: 20px; /* 与上方元素间距为20px */
           margin-bottom: 30px; /* 与下方元素间距为30px */"
           @click="handin_exam">提交试卷
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
      import A from "@/icon/A_round.png"
      import B from "@/icon/B_round.png"
      import C from "@/icon/C_round.png"
      import D from "@/icon/D_round.png"  
      import E from "@/icon/E_round.png"
      import F from "@/icon/F_round.png"
      import G from "@/icon/G_round.png"
      import H from "@/icon/H_round.png"
      import A_active from "@/icon/A_round_solid.png"
      import B_active from "@/icon/B_round_solid.png"
      import C_active from "@/icon/C_round_solid.png"
      import D_active from "@/icon/D_round_solid.png"  
      import E_active from "@/icon/E_round_solid.png"
      import F_active from "@/icon/F_round_solid.png"
      import G_active from "@/icon/G_round_solid.png"
      import H_active from "@/icon/H_round_solid.png" 
      const questionInfoStore = useQuestionInfoStore()
      const route = useRoute()
      const router = useRouter()
      const memberStore = useMemberStore()
      const checked = ref([] as string[]);
      const time = ref(60*60*24*3*1000) // 3天

      const checked_mul = ref([ ref([] as string[]), ref([] as string[]),
      ref([] as string[]),
      ref([] as string[]),ref([] as string[])] );
      

      const onClickLeft = () => {
       
        router.push({name:'examshow',params:{id:memberStore.profile.id}})
        questionInfoStore.reset()
      }
      //console.log(questionInfoStore.questionInfo.question_content[Number(route.params.quesion_index)-1])
     
      const pagecount=ref<number>(route.params.quesion_num as unknown as number);
      //console.log(pagecount.value)
      const currentPage = ref(1) ;
    
      const onChange = () => {
       
          router.push({name: 'exam',params: {id: memberStore.profile.id,
            profession: route.params.profession,
            exam_id: route.params. exam_id,
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
    
    
    
    
    const showImagePreview1 = () => {
      showImagePreview({
      images: [
        questionInfoStore.questionInfo.question_pic[Number(route.params.quesion_index)-1]
      ],
      closeable: true,
    });
    }
    
    const handin = () =>
     {
      questionInfoStore.questionInfo.quesion_summit[Number(route.params.quesion_index)-1]=true
      if(questionInfoStore.questionInfo.question_contain[Number(route.params.quesion_index)-1]==false)
      questionInfoStore.questionInfo.question_mem_answer[Number(route.params.quesion_index)-1]=checked.value.sort().join("")
      else{
        for (let i=1;i<=questionInfoStore.questionInfo.question_answer[Number(route.params.quesion_index)-1].length;i++){
          questionInfoStore.questionInfo.question_mem_answer[Number(route.params.quesion_index)-1]+=checked_mul.value[i].value.join("")
          console.log(questionInfoStore.questionInfo.question_mem_answer[Number(route.params.quesion_index)-1])
        }
      }

      
     }
     const handin_exam = () =>
     {
      const correctNum=ref(0)
       for(let i=0;i<pagecount.value;i++){
        if (questionInfoStore.questionInfo.question_answer[i]=== questionInfoStore.questionInfo.question_mem_answer[i])
       {
        correctNum.value+=1
       }
          
       }
       instance.post('/exam/confirm',{
         userId: memberStore.profile.id,
         profession: Number(route.params.profession),
         correctNum: correctNum.value,
       }).then(res => {
          if (res.data.code === 200) {
            router.push({name: 'exam_result',params: {tolnum:route.params.quesion_num,
              correctNum:correctNum.value}})
            
          }
       })

     }
    const letterurldefalut=[] as string[]
    const letteractive=[] as string[]
    letterurldefalut[0]=A;
    letteractive[0]=A_active;
    letterurldefalut[1]=B;
    letteractive[1]=B_active;
    letterurldefalut[2]=C;
    letteractive[2]=C_active;
    letterurldefalut[3]=D;
    letteractive[3]=D_active;
    letterurldefalut[4]=E;
    letteractive[4]=E_active;
    letterurldefalut[5]=F;
    letteractive[5]=F_active;
    letterurldefalut[6]=G;
    letteractive[6]=G_active;
    letterurldefalut[7]=H;
    letteractive[7]=H_active;
   


  
      </script>
      
      <style>
        .colon {
    display: inline-block;
    margin: 0 4px;
    color: #1989fa;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #1989fa;
  }
      </style>