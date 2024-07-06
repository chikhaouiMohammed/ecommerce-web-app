import shopIcon from '../../images/PrimaryButton/shopping cart.png'
import forwardIcon from '../../images/PrimaryButton/right.png'


const PrimaryButton = (props) => {
  return (
    <div className="cursor-pointer px-5 font-medium font-open text-lg flex justify-center gap-3 items-center rounded-[8px] text-white h-[54px] transition-all duration-300 bg-aztecPurple hover:bg-[#6620C1] hover:shadow-md">
      {props.shopIcon && <div className='w-[20px] h-[20px]'><img className='w-full h-full' src={shopIcon} alt="" /></div>}
      <span>{props.title}</span>
      {props.forwardIcon && <div className='w-[20px] h-[20px]'><img className='w-full h-full' src={forwardIcon} alt="" /></div>}
    </div>
  )
}

export default PrimaryButton
