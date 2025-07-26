import React from 'react'
import { motion } from 'motion/react'
import { Calendar, Star } from 'lucide-react'

interface CardProps {
  title: string;
  image: string;
  year: number;
}

const Card: React.FC<CardProps> = ({ title, image, year }) => {
  return (
    <motion.div 
      className="glass rounded-2xl overflow-hidden cursor-pointer group relative"
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <motion.img 
          src={image || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400'} 
          alt={title} 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-slate-400 text-sm">{year}</span>
          <motion.div
            className="flex items-center gap-1 text-yellow-400"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-slate-300">IMDb</span>
          </motion.div>
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </motion.div>
  )
}

export default Card
