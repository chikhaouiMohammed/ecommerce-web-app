
const SectionHeading = ({title}) => {
  return (
    <div className='w-full flex justify-start items-center gap-[26px] font-open mb-[70px]'>
      <div className='h-[30px] w-[6px] bg-aztecPurple rounded-[10px]'></div>
      <div className='text-darkGrey text-[34px] font-bold'>{title}</div>
    </div>
  )
}

export default SectionHeading
