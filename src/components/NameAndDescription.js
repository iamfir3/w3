const NameAndDescription=({name,shortDescription})=>{
    return <section className="leading-5 mt-[20px] w-full">
    <p className="font-medium text-[16px] lg:text-[34px] md:text-[26px] md:font-semibold">
      {name}
    </p>
    <p className="text-[#626262] text-[14px] font-medium mt-[3px] lg:text-[20px] md:text-[16px] md:font-semibold leading-7 md:mt-[13px] w-full">
      This is for short description of the product
    </p>
  </section>
}

export default NameAndDescription;