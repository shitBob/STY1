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
    question_options: [] as {}[],
    question_multi: [] as boolean[],
    question_contain: [] as boolean[],
    quesion_get:[] as boolean[],
    quesion_summit:[] as boolean[],

    })
  const questionInfoInit = (num: number) => {
    questionInfo.question_num = num
    questionInfo.question_content = new Array(num).fill('')
    questionInfo.question_pic = new Array(num).fill('')
    questionInfo.question_answer = new Array(num).fill('')  // 正确答案
    questionInfo.question_mem_answer = new Array(num).fill('')  // 学生答案
    questionInfo.question_options = new Array(num).fill({})
    questionInfo.quesion_summit = new Array(num).fill(false)
    questionInfo.quesion_get = new Array(num).fill(false)
  }
  function parseOptions(optionStr:string) {
  if (optionStr !== '' && optionStr!== undefined && optionStr!== null)
  {
    const options: { [key: string]: string } = {};
    const lines = optionStr.split('\n');
    lines.forEach(line => {
        const key = line[0];
        const value = line.slice(1).trim();
        options[key] = value;
    });
    return options;
  }
  else {
    return {A: '', B: '', C: '', D: ''};
  }
   
}
  const setonequesion = (i: number, content: string,
     pic: string, 
     options: string,
    answer: string,mlt:boolean,NUM:boolean) => {
    questionInfo.question_content[i] = content
    questionInfo.question_pic[i] = pic

    let result: { [key: string]: string } = parseOptions(options)

    questionInfo.question_options[i] = result
   
    questionInfo.question_answer[i] = answer
    questionInfo.quesion_get[i] = true
    questionInfo.question_multi[i] = mlt
    questionInfo.question_contain[i] = NUM

  }
  const setanswer = (i: number, answer: string,mem_ans:string) => {
    questionInfo.question_answer[i] = answer
    questionInfo.question_mem_answer[i] = mem_ans
    questionInfo.quesion_summit[i] = true
  }
  const reset = () => {
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