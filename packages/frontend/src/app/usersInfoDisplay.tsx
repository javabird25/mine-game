import React from 'react';
import fullLife from './img/FilledHearth.svg'
import emptyLife from './img/EmptyHearth.svg'
import fullMana from './img/FilledMana.svg'
import emptyMana from './img/EmptyMana.svg'
import './App.css';

interface userInfo {
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

function usersInfoDisplay() {
  return (
    <div className='usersInfoBar'>
      <UserInfo nickname={testUser.nickname} img={testUser.img} numberLife={testUser.numberLife}
                numberMana={testUser.numberMana} hisTurn={testUser.hisTurn}/>
      <UserInfo nickname={testUser2.nickname} img={testUser2.img} numberLife={testUser2.numberLife}
                numberMana={testUser2.numberMana} hisTurn={testUser2.hisTurn}/>
    </div>
  )
    ;
}

function UserInfo(props: userInfo) {
  return (
    <div className="userInfo">
      <img src={props.img} className="userAvatar" alt=''/>
      <div className='userData'>
        <p className="userNickname">
          {props.nickname}
        </p>
        <div className='userIconBar'>
          <img src={props.numberLife > 0 ? fullLife : emptyLife} alt='' height='23px' width='33px'/>
          <img src={props.numberLife > 1 ? fullLife : emptyLife} alt='' height='23px' width='33px'/>
          <img src={props.numberLife > 2 ? fullLife : emptyLife} alt='' height='23px' width='33px'/>
        </div>
        <div className='userIconBar'>
          <img src={props.numberMana > 0 ? fullMana : emptyMana} alt='' height='30px' width='40px'/>
          <img src={props.numberMana > 1 ? fullMana : emptyMana} alt='' height='30px' width='40px'/>
          <img src={props.numberMana > 2 ? fullMana : emptyMana} alt='' height='30px' width='40px'/>
          <img src={props.numberMana > 3 ? fullMana : emptyMana} alt='' height='30px' width='40px'/>
          <img src={props.numberMana > 4 ? fullMana : emptyMana} alt='' height='30px' width='40px'/>
        </div>
      </div>
    </div>
  );
}

export default usersInfoDisplay();
