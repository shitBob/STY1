import { instance } from "@/instance";
import {useQuestionInfoStore} from "@/stores/quesioninfo";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const questionInfo = useQuestionInfoStore();
export const get_quesion  = (
    profession:number,
    list_index:number,
    quesion_index:number)=>
{
    const res=instance.post("/question/send",{
        QuestionList_index:list_index,
        Questionindex:quesion_index,
        profession:profession,
        userid:memberStore.profile.id
    }).then((res:any)=>{
        //console.log(res);
        if(res.data.code==200){
         
           return res.data.data;
        }
        else{
            console.log("sb");
            return null;
        }
    }).catch((err:any)=>{
        console.log(err);
        return null;
    });
}
   
        
