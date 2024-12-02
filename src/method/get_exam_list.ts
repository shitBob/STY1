import { instance } from "@/instance";
import { useMemberStore } from '@/stores/member';
import { useExamListStore} from '@/stores/examlist';

const memberStore = useMemberStore();
const examListStore = useExamListStore();

export const get_exam_list =async ()=>{
    // 获取做题列表
    await instance.get(`/exam/${memberStore.profile.id}`).then(res=>{
     
      // 保存做题列表到store中
      if (res.data.code === 200) {
       console.log("题单状态",res.data.data.status);
    
      examListStore.setexamList(res.data.data.status);
      }
    }).catch(err=>{
      console.log(err);
      alert('获取考试列表失败');
    })
  }