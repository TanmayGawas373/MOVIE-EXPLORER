import React from 'react'
import {motion} from 'motion/react'

interface CardProps {
  title: string;
  image: string;
  year: number;
}

const Card: React.FC<CardProps> = ({ title, image, year }) => {
  return (
    <motion.div 
    className="card bg-base-0 w-80 h-60 shadow-sm opacity-100 "
    whileHover={{y:-10}}
    >
      <figure>
        <img src={image||'https://i.pinimg.com/736x/c5/ce/5c/c5ce5c9b1a835c67a5c9e465dd5f1a47.jpg'} alt={title} className='w-full h-50'/>
      </figure>
      <div className="card-body opacity-100" >
        <h2 className="card-title">{title} ({year})</h2>
      </div>
    </motion.div>
  )
}

export default Card
