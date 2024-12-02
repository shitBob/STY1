<template>
    <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="telnum"
        name="电话号码"
        label="电话号码"
        placeholder="电话号码"
        :rules="[{ required: true, message: '请填写电话号码' }]"
      />
      <van-field
     v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue'
  import {useMemberStore} from '@/stores/member'
  import axios from 'axios';
  import {useRouter} from "vue-router"
  import {instance} from "@/instance";
  const telnum=ref("");
  const password=ref("");
  const memberStore=useMemberStore();
  const router=useRouter()
  
  const goto=()=>{
          router.push({name:'exerciseshow',params:{id:memberStore.profile.id}})
      }
  
  const onSubmit=()=>
  {
   
    memberStore.setProfile({
        id:0,
        PhoneNum:telnum.value,
        name:'',
        profession:'',
      })
     
      getdata();
  
      
  
  
  }
  
  const getdata = async () => {
        await instance.post('/login',{
     phone: telnum.value,password:password.value}).then(res => {
       //   console.log(res)
        if (res.data.code === 200) {
            console.log(res.headers['content-type'])
          memberStore.setProfile({
            id:res.data.data.id,
            phone:res.data.data.phone,
            name:res.data.data.name,
            profession:res.data.data.profession,
            token:res.data.token,})
           console.log("id: ",memberStore.profile.id)
            goto();
          } else if (res.data.code === 401) {
            alert('该账号未注册，请和管理员联系')
          }

        }).catch(err => {
          console.log(err)
          alert('登录失败，请检查网络或联系管理员')
        })
      }
  
  
  
  
  
  
  
  </script>
  
  <style>
  
  </style>