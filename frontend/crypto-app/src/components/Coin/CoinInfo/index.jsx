import React from 'react'
import "./styles.css";

function CoinInfo({heading, desc}) {
    const shortDesc = 
    desc.slice(0,200)+ "<span style='color:var(--grey)'>Read More..</span>"
    const longDesc = desc;

  return (
    <div className='coinpage-grey-wrapper'>
        <h2 className='coin-info-heading'>{heading}</h2>
        <p className='coin-info-desc'
        dsngerouslySetInnerHTML={{_html: shortDesc}}       
        />
    </div>
  )
}

export default CoinInfo;