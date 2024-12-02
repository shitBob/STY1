import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'
import { useMemberStore } from './member'

const memberStore = useMemberStore()
export const useExamListStore = defineStore('examList', 
    () => {
    const examList=reactive({
        examList_status:[],
    })
    const setexamList= (val:any) => {
        examList.examList_status=val
    }

    const resetexamList= () => {
        examList.examList_status=[]
    }

    return {
        examList,
        setexamList,
        resetexamList
        }
    },
    {
        persist: true
        
     })