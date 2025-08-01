
import { messageStore } from '../store/messageStore'
import Sidebar from '../components/Sidebar';
import NoChatContainer from '../components/NoChatContainer';
import ChatConatiner from '../components/ChatConatiner';

export default function Home() {

  const {selectedUser}=messageStore();
  // console.log("i am selected user",selectedUser)
  return (
    <div className='min-vh-100 bg-light' >

      <div className='d-flex align-items-center justify-content-center pt-5 px-4'>

         <div className='bg-light rounded-3 shadow-lg w-100' style={{height:"calc(100vh-8rem)"}}>
           <div className='d-flex vh-100 rounded-lg overflow-hidden'>

            <Sidebar/>

            {!selectedUser ? <NoChatContainer/>:<ChatConatiner/>}

           </div>
         </div>

      </div>
      
    </div>
  )
}
