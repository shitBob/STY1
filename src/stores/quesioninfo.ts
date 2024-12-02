import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionInfoStore = defineStore('questionInfo', () => {
  const questionInfo = reactive({
    question_num: 0,
  //  question_pointe: 0,
    question_content: [] as string[],
    question_pic: [] as string[],
    question_answer: [] as string[],
    question_mem_answer:  [] as string[],
    question_options: [] as {a: string, b: string, c: string, d: string}[],
    quesion_get:[] as boolean[],
    quesion_summit:[] as boolean[],
    })
  const questionInfoInit = (num: number) => {
    questionInfo.question_num = num
    questionInfo.question_content = new Array(num).fill('')
    questionInfo.question_pic = new Array(num).fill('')
    questionInfo.question_answer = new Array(num).fill('')  // 正确答案
    questionInfo.question_mem_answer = new Array(num).fill('')  // 学生答案
    questionInfo.question_options = new Array(num).fill({a: '', b: '', c: '', d: ''})
    questionInfo.quesion_summit = new Array(num).fill(false)
    questionInfo.quesion_get = new Array(num).fill(false)
  }
  const setonequesion = (i: number, content: string,
     pic: string, 
     options: {a: string, b: string, c: string, d: string},
    answer: string) => {
    questionInfo.question_content[i] = content
    questionInfo.question_pic[i] = pic
    questionInfo.question_options[i] = options
    questionInfo.question_answer[i] = answer
    questionInfo.quesion_get[i] = true
  }
  const setanswer = (i: number, answer: string,mem_ans:string) => {
    questionInfo.question_answer[i] = answer
    questionInfo.question_mem_answer[i] = mem_ans
    questionInfo.quesion_summit[i] = true
  }
  const reset = () => {
    questionInfo.question_num = 0
    questionInfo.question_content = []
    questionInfo.question_pic = []
    questionInfo.question_answer = []
    questionInfo.question_options = []
    questionInfo.quesion_summit = []
    questionInfo.quesion_get = []
    questionInfo.question_mem_answer = []
  }
  return {
    questionInfo,
    questionInfoInit,
    setonequesion,
    setanswer,
    reset
  }
},
{
  persist: true
  
}

)