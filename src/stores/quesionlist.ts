import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'
import { useMemberStore } from './member'

const memberStore = useMemberStore()
export const useQuestionListStore = defineStore('questionList', 
    () => {
    const questionList=reactive({
        questionList_status:[],
    })
    const setquestionList= (val:any) => {
        questionList.questionList_status=val
    }

    const resetquestionList= () => {
        questionList.questionList_status=[]
    }

    return {
        questionList,
        setquestionList,
        resetquestionList
        }
    },
    {
        persist: true
        
     })