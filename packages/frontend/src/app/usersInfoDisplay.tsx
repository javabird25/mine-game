import React from 'react';
import fullLife from './img/FilledHearth.svg'
import emptyLife from './img/EmptyHearth.svg'
import fullMana from './img/FilledMana.svg'
import emptyMana from './img/EmptyMana.svg'
import './App.css';

const maxHealth = 3;
const maxMana=5;

interface IUserInfo {
  nickname: string;
  img: string;
  numberLife: number;
  numberMana: number;
  hisTurn: boolean
}

const testUser = {
  nickname: "Ender",
  img: 'https://www.blast.hk/attachments/64804/',
  numberLife: 2,
  numberMana: 1,
  hisTurn: true
}
const testUser2 = {
  nickname: "Protoch",
  img: 'https://www.blast.hk/attachments/64804/',
  numberLife: 3,
  numberMana: 2,
  hisTurn: true
}

function UserInfoDisplay() {
  return (
    <div className='usersInfoBar'>
      <UserInfo userInfo={testUser}/>
      <UserInfo userInfo={testUser2}/>
    </div>
  )
    ;
}

function UserInfo({userInfo}:{ userInfo : IUserInfo}) {
  const hearts = [...Array(maxHealth)].map((_, i) =>
    <img src={userInfo.numberLife > i ? fullLife : emptyLife} key={i} alt='' height='23px' width='33px'/>)
  const mana = [...Array(maxMana)].map((_, i) =>
    <img src={userInfo.numberMana > i ? fullMana : emptyMana} alt='' height='30px' width='40px'/>)
  return (
    <div className="userInfo">
      <img src={userInfo.img} className="userAvatar" alt=''/>
      <div className='userData'>
        <p className="userNickname">
          {userInfo.nickname}
        </p>
        <div className='userIconBar'>
          {hearts}
        </div>
        <div className='userIconBar'>
          {mana}
        </div>
      </div>
    </div>
  );
}

export default UserInfoDisplay;
