import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = reactive({
      id:-1,
      PhoneNum:'',
      name:'',
      profession:[],
      token:''
    })


    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.id = val.id
      profile.PhoneNum = val.PhoneNum
      profile.name = val.name
      profile.profession = val.profession
      profile.token = val.token

    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.id=-1;
      profile.PhoneNum='';
      profile.name='';
      profile.profession=[];
      profile.token=''
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
   persist: true
   
}
)
