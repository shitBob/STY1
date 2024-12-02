import { instance } from "@/instance";
import { useMemberStore } from '@/stores/member';
import { useQuestionListStore} from '@/stores/quesionlist';

const memberStore = useMemberStore();
const questionListStore = useQuestionListStore();

export const get_exercise_list =async ()=>{
    // 获取做题列表
    await instance.get(`/exercise/${memberStore.profile.id}`).then(res=>{
     
      // 保存做题列表到store中
      if (res.data.code === 200) {
        // console.log("题单状态",res.data.data.status);
        
      questionListStore.setquestionList(res.data.data.status);
      }
    }).catch(err=>{
      console.log(err);
      alert('获取做题列表失败');
    })
  }