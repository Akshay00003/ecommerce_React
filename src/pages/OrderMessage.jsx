
import { Link, useParams } from 'react-router-dom'
import TopBar from '../components/HomeComponents/TopBar'

const OrderMessage = () => {
    const {name}=useParams()
  return (
    <div className='w-full flex flex-col items-center max-h-screen'>
    <TopBar />
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gradient-to-t from-blue-950 to-blue-600'>
   <p className='text-4xl text-white'>Congratulations  <span className='text-5xl font-bold text-yellow-300'>{name}</span></p>
   <p className='text-xl text-red-400 mt-5'>Your Order has been Placed !!! <Link to={'/'}><span className='text-white text-sm underline hover:text-red-500'>Click here to continue Shopping</span></Link></p>
    </div>
      
    </div>
  )
}

export default OrderMessage
